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
  toggleMark,
  wrapIn,
  setBlockType,
  chainCommands,
  exitCode,
  joinUp,
  joinDown,
  lift,
  selectParentNode
} from "prosemirror-commands";

class WaxKeys {
  constructor(config) {
    this.schema = config.schema;
    this.shortCuts = config.shortCuts;

    this.insertBreak = this.insertBreak.bind(this);
    this.insertRule = this.insertRule.bind(this);
    return keymap(this.createKeyBindings());
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
      "Alt-ArrowUp": joinUp,
      "Alt-ArrowDown": joinDown,
      "Mod-BracketLeft": lift,
      Escape: selectParentNode,
      "Mod-b": toggleMark(this.schema.marks.strong),
      "Mod-i": toggleMark(this.schema.marks.em),
      "Mod-u": toggleMark(this.schema.marks.underline),
      "Mod-`": toggleMark(this.schema.marks.code),
      "Shift-Ctrl-8": wrapInList(this.schema.nodes.bullet_list),
      "Shift-Ctrl-9": wrapInList(this.schema.nodes.ordered_list),
      "Ctrl->": wrapIn(this.schema.nodes.blockquote),
      "Mod-Enter": chainCommands(exitCode, this.insertBreak),
      "Shift-Enter": chainCommands(exitCode, this.insertBreak),
      "Ctrl-Enter": chainCommands(exitCode, this.insertBreak), // mac-only?
      Enter: splitListItem(this.schema.nodes.list_item),
      "Mod-[": liftListItem(this.schema.nodes.list_item),
      "Mod-]": sinkListItem(this.schema.nodes.list_item),
      "Shift-Ctrl-0": setBlockType(this.schema.nodes.paragraph),
      "Shift-Ctrl-\\": setBlockType(this.schema.nodes.code_block),
      "Shift-Ctrl-1": setBlockType(this.schema.nodes.heading, { level: 1 }),
      "Shift-Ctrl-2": setBlockType(this.schema.nodes.heading, { level: 2 }),
      "Shift-Ctrl-3": setBlockType(this.schema.nodes.heading, { level: 3 }),
      "Shift-Ctrl-4": setBlockType(this.schema.nodes.heading, { level: 4 }),
      "Shift-Ctrl-5": setBlockType(this.schema.nodes.heading, { level: 5 }),
      "Shift-Ctrl-6": setBlockType(this.schema.nodes.heading, { level: 6 }),
      "Mod-_": this.insertRule
    };
  }

  extendKeys() {
    const keys = this.getKeys();
  }
}

export default WaxKeys;
