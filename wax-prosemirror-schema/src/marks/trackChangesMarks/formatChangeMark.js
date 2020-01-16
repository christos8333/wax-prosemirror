const format_change = {
  attrs: {
    user: {
      default: 0
    },
    username: {
      default: ""
    },
    date: {
      default: 0
    },
    before: {
      default: []
    },
    after: {
      default: []
    }
  },
  inclusive: false,
  group: "track",
  parseDOM: [
    {
      tag: "span.format-change",
      getAttrs(dom) {
        return {
          user: parseInt(dom.dataset.user),
          username: dom.dataset.username,
          date: parseInt(dom.dataset.date),
          before: parseFormatList(dom.dataset.before),
          after: parseFormatList(dom.dataset.after)
        };
      }
    }
  ],
  toDOM(node) {
    return [
      "span",
      {
        class: `format-change user-${node.attrs.user}`,
        "data-user": node.attrs.user,
        "data-username": node.attrs.username,
        "data-date": node.attrs.date,
        "data-before": JSON.stringify(node.attrs.before),
        "data-after": JSON.stringify(node.attrs.after)
      }
    ];
  }
};

export default format_change;
