const deletion = {
  attrs: {
    id: { default: "" },
    user: { default: 0 },
    username: { default: "" },
    date: { default: 0 },
    group: { default: "" }
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
          date: parseInt(dom.dataset.date),
          group: dom.dataset.group
        };
      }
    }
  ],
  toDOM(node) {
    return [
      "span",
      {
        class: `deletion user-${node.attrs.user}`,
        "data-id": node.attrs.id,
        "data-user": node.attrs.user,
        "data-username": node.attrs.username,
        "data-date": node.attrs.date,
        "data-group": node.attrs.group
      }
    ];
  }
};
export default deletion;
