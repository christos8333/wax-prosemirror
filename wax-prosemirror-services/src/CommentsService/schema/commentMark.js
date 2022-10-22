const commentMark = {
  attrs: {
    class: { default: 'comment' },
    id: { default: '' },
    group: { default: '' },
    viewid: { default: '' },
    conversation: [],
  },
  inclusive: false,
  excludes: '',
  parseDOM: [
    {
      tag: 'span.comment',
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute('class'),
          id: hook.dom.dataset.id,
          group: hook.dom.dataset.group,
          viewid: hook.dom.dataset.viewid,
          conversation: JSON.parse(hook.dom.dataset.conversation),
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
        'data-conversation': JSON.stringify(hook.node.attrs.conversation),
        'data-viewid': hook.node.attrs.viewid,
        'data-group': hook.node.attrs.group,
      },
    ];
    next();
  },
};

export default commentMark;
