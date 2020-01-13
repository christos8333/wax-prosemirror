import { blockLevelToDOM } from "./nodes/helpers";
const pDOM = ["p", 0],
  brDOM = ["br"];
const DefaultSchema = {
  nodes: {
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
    paragraph: {
      group: "block",
      content: "inline*",
      attrs: {
        class: { default: "paragraph" },
        track: { default: [] }
      },
      parseDOM: [
        {
          tag: "p.paragraph",
          getAttrs(dom) {
            return {
              class: dom.getAttribute("class")
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = blockLevelToDOM(node);
        return ["p", attrs, 0];
      }
    }
  },
  marks: {}
};

export default DefaultSchema;
