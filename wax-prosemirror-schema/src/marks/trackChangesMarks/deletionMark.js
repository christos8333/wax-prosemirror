const deletion = {
  attrs: {
    id: { default: "" },
    user: { default: 0 },
    username: { default: "" },
    date: { default: 0 }
  },
  inclusive: false,
  group: "track",
  parseDOM: [
    {
      tag: "span.deletion",
      getAttrs(dom) {
        return {
          id: dom.dataset.id,
          user: parseInt(dom.dataset.user),
          username: dom.dataset.username,
          date: parseInt(dom.dataset.date)
        };
      }
    }
  ],
  toDOM(node) {
    return [
      "span",
      {
        "data-id": node.attrs.id,
        class: `deletion user-${node.attrs.user}`,
        "data-user": node.attrs.user,
        "data-username": node.attrs.username,
        "data-date": node.attrs.date
      }
    ];
  }
};
export default deletion;
