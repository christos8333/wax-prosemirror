/* eslint-disable no-param-reassign */
const commentMark = showTitle => {
  const comment = {
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
          const parsedDom = {
            class: hook.dom.getAttribute('class'),
            id: hook.dom.dataset.id,
            group: hook.dom.dataset.group,
            viewid: hook.dom.dataset.viewid,
            conversation: JSON.parse(hook.dom.dataset.conversation),
          };

          if (showTitle) {
            parsedDom.title = hook.dom.dataset.title;
          }

          Object.assign(hook, parsedDom);
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

      if (showTitle) {
        hook.value[1]['data-title'] = hook.node.attrs.title;
      }

      next();
    },
  };

  if (showTitle) {
    comment.attrs.title = { default: '' };
  }

  return comment;
};

export default commentMark;
