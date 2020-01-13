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
  heading: {
    attrs: {
      level: { default: 1 },
      track: { default: [] }
    },
    content: "inline*",
    group: "block",
    defining: true,
    parseDOM: [
      {
        tag: "h1",
        attrs: { level: 1 },
        getAttrs(dom) {
          return {
            track: parseTracks(dom.dataset.track)
          };
        }
      },
      {
        tag: "h2",
        attrs: { level: 2 },
        getAttrs(dom) {
          return {
            track: parseTracks(dom.dataset.track)
          };
        }
      },
      {
        tag: "h3",
        attrs: { level: 3 },
        getAttrs(dom) {
          return {
            track: parseTracks(dom.dataset.track)
          };
        }
      }
    ],
    toDOM(node) {
      const attrs = {};
      if (node.attrs.track.length) {
        attrs["data-track"] = JSON.stringify(node.attrs.track);
      }
      return [`h${node.attrs.level}`, attrs, 0];
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
