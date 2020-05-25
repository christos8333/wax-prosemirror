const comment = {
  attrs: {
    class: { default: "comment" },
    id: { default: "" },
    group: { default: "" },
    conversation: []
  },
  inclusive: false,
  parseDOM: [
    {
      tag: "span.comment",
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute("class"),
          id: hook.dom.dataset.id,
          group: hook.dom.dataset.group,
          conversation: hook.dom.dataset.conversation
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
        "data-track": JSON.stringify(hook.node.attrs.track),
        "data-group": hook.node.attrs.group
      }
    ];
    next();
  }
};

export default comment;
