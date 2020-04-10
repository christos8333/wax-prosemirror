const comment = {
  attrs: {
    id: { default: "" },
    viewId: { default: "" },
    conversation: []
  },
  inclusive: false,
  // excludes: "",
  parseDOM: [
    {
      tag: "span.comment[data-conversation]",
      getAttrs(dom) {
        return {
          id: dom.id,
          viewId: dom.dataset.viewid,
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
        id: node.attrs.id,
        "data-viewId": node.attrs.viewId,
        "data-conversation": JSON.stringify(node.attrs.conversation)
      }
    ];
  }
};

export default comment;
