import { injectable } from "inversify";
import { keymap } from "prosemirror-keymap";
import { undoInputRule } from "prosemirror-inputrules";
import { undo, redo } from "prosemirror-history";

import {
  wrapInList,
  splitListItem,
  liftListItem,
  sinkListItem
} from "prosemirror-schema-list";

import {
  baseKeymap,
  setBlockType,
  chainCommands,
  exitCode,
  selectParentNode
} from "prosemirror-commands";

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
    this.PmPlugins.add("shortcuts", shortCuts);
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
      "Mod-z": undo,
      "Shift-Mod-z": redo,
      Backspace: undoInputRule,
      "Mod-y": redo,
      Escape: selectParentNode,
      "Mod-Enter": chainCommands(exitCode, this.insertBreak),
      "Shift-Enter": chainCommands(exitCode, this.insertBreak),
      "Ctrl-Enter": chainCommands(exitCode, this.insertBreak),
      "Mod-_": this.insertRule,
      "Mod-[": liftListItem(this.schema.nodes.list_item),
      "Mod-]": sinkListItem(this.schema.nodes.list_item),
      Enter: splitListItem(this.schema.nodes.list_item),
      "Shift-Ctrl-8": wrapInList(this.schema.nodes.bulletlist)
      "Shift-Ctrl-9": wrapInList(this.schema.nodes.orderedlist)
    };
  }

  extendKeys() {
    const keys = this.getKeys();
  }
}

export default ShortCuts;
