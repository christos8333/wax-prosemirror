const format_change = {
  attrs: {
    class: { default: "format-change" },
    id: { default: "" },
    user: { default: 0 },
    username: { default: "" },
    date: { default: 0 },
    before: { default: [] },
    after: { default: [] },
    group: { default: "" }
  },
  inclusive: false,
  group: "track",
  parseDOM: [
    {
      tag: "span.format-change",
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute("class"),
          id: hook.dom.dataset.id,
          user: parseInt(hook.dom.dataset.user),
          username: hook.dom.dataset.username,
          date: parseInt(hook.dom.dataset.date),
          before: parseFormatList(hook.dom.dataset.before),
          after: parseFormatList(hook.dom.dataset.after),
          group: hook.dom.dataset.group
        });
        next();
      }
    }
  ],
  toDOM(hook, next) {
    hook.value = [
      "span",
      {
        class: hook.node.attrs.class,
        "data-id": hook.node.attrs.id,
        "data-user": hook.node.attrs.user,
        "data-username": hook.node.attrs.username,
        "data-date": hook.node.attrs.date,
        "data-before": JSON.stringify(hook.node.attrs.before),
        "data-after": JSON.stringify(hook.node.attrs.after),
        "data-group": hook.node.attrs.group
      }
    ];
    next();
  }
};

export default format_change;
