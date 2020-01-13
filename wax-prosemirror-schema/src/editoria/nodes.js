import { tableNodes } from "prosemirror-tables";
import { parseFormatList, parseTracks, blockLevelToDOM } from "./helpers";
const pDOM = ["p", 0],
  brDOM = ["br"],
  blockquoteDOM = ["blockquote", 0];

const nodes = {
  doc: {
    content: "block+"
  },

  text: {
    group: "inline"
  },

  hard_break: {
    inline: true,
    group: "inline",
    selectable: false,
    parseDOM: [{ tag: "br" }],
    toDOM() {
      return brDOM;
    }
  },
  blockquote: {
    content: "block+",
    group: "block",
    defining: true,
    parseDOM: [{ tag: "blockquote" }],
    toDOM() {
      return blockquoteDOM;
    }
  }
};
export default nodes;
