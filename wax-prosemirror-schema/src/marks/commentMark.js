const comment = {
  attrs: {
    conversation: []
  },
  inclusive: false,
  excludes: "",
  parseDOM: [
    {
      tag: "span.comment[data-conversation]",
      getAttrs(dom) {
        return {
          conversation: JSON.parse(dom.dataset.conversation)
        };
      }
    }
  ],
  toDOM(node) {
    return [
      "span",
      {
        class: "comment",
        "data-conversation": JSON.stringify(node.attrs.conversation)
      }
    ];
  }
};

export default comment;
