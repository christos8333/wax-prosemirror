const pDOM = ["p", 0];
const defaultSchema = {
  nodes: {
    doc: {
      content: "block+"
    },
    text: {
      group: "inline"
    },

    paragraph: {
      content: "inline*",
      group: "block",
      parseDOM: [{ tag: "p" }],
      toDOM() {
        return pDOM;
      }
    }
  },
  marks: {}
};

export default defaultSchema;
