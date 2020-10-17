import { injectable } from 'inversify';
import { keymap } from 'prosemirror-keymap';
import { undo, redo } from 'prosemirror-history';

import {
  wrapInList,
  splitListItem,
  liftListItem,
  sinkListItem,
} from 'prosemirror-schema-list';
import { NodeSelection, TextSelection } from 'prosemirror-state';

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

const backSpaceShortCut = (state, dispatch, view) => {
  const { $from, $to } = state.selection;
  const { nodeBefore } = $from;
  if (!nodeBefore) {
    return false;
  }

  if (nodeBefore.type.name === 'math_inline') {
    const index = $from.index($from.depth);
    const $beforePos = state.doc.resolve($from.posAtIndex(index - 1));

    dispatch(state.tr.setSelection(new NodeSelection($beforePos)));

    return true;
  }

  state.doc.nodesBetween($from.pos, $to.pos, (node, from) => {
    if (node.type.name === 'math_display') {
      const $start = state.tr.doc.resolve(state.tr.selection.$anchor.start());
      const $end = state.tr.doc.resolve(state.tr.selection.$anchor.end());

      dispatch(state.tr.setSelection(new TextSelection($start, $end)));
    }
  });

  backSpace(
    state,
    tr => dispatch(tr.setMeta('inputType', 'backwardsDelete')),
    view,
  );
  return true;
};

const undoShortCut = (state, dispatch, view) =>
  undo(state, tr => dispatch(tr.setMeta('inputType', 'Undo')), view);

const redoShortCut = (state, dispatch, view) =>
  redo(state, tr => dispatch(tr.setMeta('inputType', 'Redo')), view);

@injectable()
class ShortCuts {
  constructor(plugins, schema) {
    this.insertBreak = this.insertBreak.bind(this);
    this.pressEnter = this.pressEnter.bind(this);
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

  pressEnter(state, dispatch) {
    // LISTS
    if (splitListItem(this.schema.nodes.list_item)(state)) {
      splitListItem(this.schema.nodes.list_item)(state, dispatch);
      return true;
    }

    return false;
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
      Enter: this.pressEnter,
      'Shift-Ctrl-8': wrapInList(this.schema.nodes.bulletlist),
      'Shift-Ctrl-9': wrapInList(this.schema.nodes.orderedlist),
    };
  }
}

export default ShortCuts;
