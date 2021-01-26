/* eslint-disable no-param-reassign */
/* eslint-disable radix */
const insertion = {
  attrs: {
    class: { default: 'insertion' },
    id: { default: '' },
    user: { default: 0 },
    username: { default: '' },
    date: { default: 0 },
    group: { default: '' },
    viewid: { default: '' },
    style: { default: null },
  },
  inclusive: false,
  group: 'track',
  parseDOM: [
    {
      tag: 'span.insertion',
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute('class'),
          style: hook.dom.getAttribute('style'),
          id: hook.dom.dataset.id,
          user: hook.dom.dataset.user,
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
        style: hook.node.attrs.style,
      },
    ];
    next();
  },
};

export default insertion;
