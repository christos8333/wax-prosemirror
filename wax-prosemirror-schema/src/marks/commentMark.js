const comment = {
  attrs: {
    id: { default: "" },
    group: { default: "" },
    conversation: []
  },
  inclusive: false,
  // excludes: "",
  parseDOM: [
    {
      tag: "span.comment[data-conversation]",
      getAttrs(dom) {
        return {
          id: dom.dataset.id,
          group: dom.dataset.group,
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
        "data-id": node.attrs.id,
        "data-group": node.attrs.group,
        "data-conversation": JSON.stringify(node.attrs.conversation)
      }
    ];
  }
};

export default comment;
