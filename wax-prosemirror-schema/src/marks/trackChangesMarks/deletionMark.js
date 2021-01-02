const deletion = {
  attrs: {
    class: { default: 'deletion' },
    id: { default: '' },
    user: { default: 0 },
    username: { default: '' },
    date: { default: 0 },
    group: { default: '' },
    viewid: { default: '' },
  },
  inclusive: false,
  group: 'track',
  parseDOM: [
    {
      tag: 'span.deletion',
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute('class'),
          id: hook.dom.dataset.id,
          user: parseInt(hook.dom.dataset.user),
          username: hook.dom.dataset.username,
          date: parseInt(hook.dom.dataset.date),
          group: hook.dom.dataset.group,
          viewid: hook.dom.dataset.viewid,
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    hook.value = [
      'span',
      {
        class: hook.node.attrs.class,
        'data-id': hook.node.attrs.id,
        'data-user': hook.node.attrs.user,
        'data-username': hook.node.attrs.username,
        'data-date': hook.node.attrs.date,
        'data-group': hook.node.attrs.group,
        'data-viewid': hook.node.attrs.viewid,
      },
    ];
    next();
  },
};
export default deletion;
