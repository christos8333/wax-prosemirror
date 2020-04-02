const comment = {
  attrs: {
    viewId: { default: "" },
    conversation: []
  },
  inclusive: false,
  excludes: "",
  parseDOM: [
    {
      tag: "span.comment[data-conversation]",
      getAttrs(dom) {
        return {
          viewId: dom.dataset.viewId,
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
        "data-viewId": node.attrs.viewId,
        "data-conversation": JSON.stringify(node.attrs.conversation)
      }
    ];
  }
};

export default comment;
