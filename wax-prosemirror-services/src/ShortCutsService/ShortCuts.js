import { injectable } from 'inversify';
import { keymap } from 'prosemirror-keymap';
import { undo, redo } from 'prosemirror-history';

import {
  wrapInList,
  splitListItem,
  liftListItem,
  sinkListItem,
} from 'prosemirror-schema-list';

import {
  baseKeymap,
  chainCommands,
  exitCode,
  selectParentNode,
  joinBackward,
  selectNodeBackward,
  deleteSelection,
} from 'prosemirror-commands';

const backSpace = chainCommands(
  deleteSelection,
  joinBackward,
  selectNodeBackward,
);

const backSpaceShortCut = (state, dispatch, view) =>
  backSpace(
    state,
    tr => dispatch(tr.setMeta('inputType', 'backwardsDelete')),
    view,
  );

const undoShortCut = (state, dispatch, view) =>
  undo(state, tr => dispatch(tr.setMeta('inputType', 'historyUndo')), view);

const redoShortCut = (state, dispatch, view) =>
  redo(state, tr => dispatch(tr.setMeta('inputType', 'historyRedo')), view);

@injectable()
class ShortCuts {
  constructor(plugins, schema) {
    this.insertBreak = this.insertBreak.bind(this);
    this.insertRule = this.insertRule.bind(this);
    this.PmPlugins = plugins;
    this.schema = schema;
    this.keys = this.getKeys();
  }

  insertBreak(state, dispatch) {
    const br = this.schema.nodes.hard_break.create();
    dispatch(state.tr.replaceSelectionWith(br).scrollIntoView());
    return true;
  }

  insertRule(state, dispatch) {
    const hr = this.schema.nodes.horizontal_rule.create();
    dispatch(state.tr.replaceSelectionWith(hr).scrollIntoView());
    return true;
  }

  createShortCuts() {
    const shortCuts = keymap(this.createKeyBindings());
    this.PmPlugins.add('shortcuts', shortCuts);
  }

  addShortCut(shortcut) {
    Object.assign(this.keys, shortcut);
    this.createShortCuts();
  }

  createKeyBindings() {
    Object.keys(baseKeymap).forEach(key => {
      if (this.keys[key]) {
        this.keys[key] = chainCommands(this.keys[key], baseKeymap[key]);
      } else {
        this.keys[key] = baseKeymap[key];
      }
    });
    return this.keys;
  }

  getKeys() {
    return {
      'Mod-z': undoShortCut,
      'Shift-Mod-z': redoShortCut,
      Backspace: backSpaceShortCut,
      'Mod-y': redoShortCut,
      Escape: selectParentNode,
      'Mod-Enter': chainCommands(exitCode, this.insertBreak),
      'Shift-Enter': chainCommands(exitCode, this.insertBreak),
      'Ctrl-Enter': chainCommands(exitCode, this.insertBreak),
      'Mod-_': this.insertRule,
      'Mod-[': liftListItem(this.schema.nodes.list_item),
      'Mod-]': sinkListItem(this.schema.nodes.list_item),
      Enter: splitListItem(this.schema.nodes.list_item),
      'Shift-Ctrl-8': wrapInList(this.schema.nodes.bulletlist),
      'Shift-Ctrl-9': wrapInList(this.schema.nodes.orderedlist),
    };
  }
}

export default ShortCuts;
