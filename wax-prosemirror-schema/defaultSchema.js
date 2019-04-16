const pDOM = ["p", 0];
const defaultSchema = {
  doc: {
    content: "block+"
  },

  paragraph: {
    content: "inline*",
    group: "block",
    parseDOM: [{ tag: "p" }],
    toDOM() {
      return pDOM;
    }
  }
};

export default defaultSchema;
