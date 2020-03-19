//TODO Parse conversation
const comment = {
  attrs: {
    id: {},
    conversation: {}
  },
  inclusive: false,
  excludes: "",
  group: "annotation",
  parseDOM: [
    {
      tag: "span.comment[data-id]",
      getAttrs(dom) {
        return {
          id: parseInt(dom.dataset.id)
        };
      }
    }
  ],
  toDOM(node) {
    return [
      "span",
      {
        class: "comment",
        "data-id": node.attrs.id
      }
    ];
  }
};

export default comment;
