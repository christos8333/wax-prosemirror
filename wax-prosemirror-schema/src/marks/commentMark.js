const comment = {
  attrs: {
    user: {},
    conversation: {}
  },
  inclusive: false,
  excludes: "",
  parseDOM: [
    {
      tag: "span.comment[data-user]",
      getAttrs(dom) {
        return {
          user: JSON.parse(dom.dataset.user),
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
        "data-user": JSON.stringify(node.attrs.user),
        "data-conversation": JSON.stringify(node.attrs.conversation)
      }
    ];
  }
};

export default comment;
