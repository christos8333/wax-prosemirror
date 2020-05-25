const insertion = {
  attrs: {
    class: { default: "insertion" },
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
      tag: "span.insertion",
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute("class"),
          id: hook.dom.dataset.id,
          user: parseInt(hook.dom.dataset.user),
          username: hook.dom.dataset.username,
          date: parseInt(hook.dom.dataset.date),
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
        "data-group": hook.node.attrs.group
      }
    ];
    next();
  }
};

export default insertion;
