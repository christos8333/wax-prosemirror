const blockLevelToDOM = node => {
  const attrs = node.attrs.track.length
    ? {
        class: node.attrs.class,
        "data-track": JSON.stringify(node.attrs.track)
      }
    : { class: node.attrs.class };
  return attrs;
};

export default {
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
        return ["br"];
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
