import { injectable } from "inversify";
import { keymap } from "prosemirror-keymap";
import { undoInputRule } from "prosemirror-inputrules";
import { undo, redo } from "prosemirror-history";

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
    this.PmPlugins = plugins;
    this.schema = schema;

    this.insertBreak = this.insertBreak.bind(this);
    this.insertRule = this.insertRule.bind(this);
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

  addShortCut() {
    /* TODO add shortcut from each package*/
  }

  createKeyBindings() {
    const keys = Object.assign(this.getKeys(), this.shortCuts);
    Object.keys(baseKeymap).forEach(key => {
      if (keys[key]) {
        keys[key] = chainCommands(keys[key], baseKeymap[key]);
      } else {
        keys[key] = baseKeymap[key];
      }
    });
    return keys;
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
      "Ctrl-Enter": chainCommands(exitCode, this.insertBreak), // mac-only?
      "Mod-_": this.insertRule
    };
  }

  extendKeys() {
    const keys = this.getKeys();
  }
}

export default ShortCuts;
