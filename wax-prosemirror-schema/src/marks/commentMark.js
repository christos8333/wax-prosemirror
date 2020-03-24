const comment = {
  attrs: {
    userId: {},
    conversation: {}
  },
  inclusive: false,
  excludes: "",
  parseDOM: [
    {
      tag: "span.comment[data-userId]",
      getAttrs(dom) {
        return {
          userId: parseInt(dom.dataset.userId)
        };
      }
    }
  ],
  toDOM(node) {
    return [
      "span",
      {
        class: "comment",
        "data-userId": node.attrs.userId
      }
    ];
  }
};

export default comment;
