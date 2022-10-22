import { SchemaHelpers } from 'wax-prosemirror-core';

const format_change = {
  attrs: {
    class: { default: 'format-change' },
    id: { default: '' },
    user: { default: 0 },
    username: { default: '' },
    date: { default: 0 },
    before: { default: [] },
    after: { default: [] },
    group: { default: '' },
    viewid: { default: '' },
  },
  inclusive: false,
  group: 'track',
  parseDOM: [
    {
      tag: 'span.format-change',
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute('class'),
          id: hook.dom.dataset.id,
          user: hook.dom.dataset.user,
          username: hook.dom.dataset.username,
          date: parseInt(hook.dom.dataset.date),
          before: SchemaHelpers.parseFormatList(hook.dom.dataset.before),
          after: SchemaHelpers.parseFormatList(hook.dom.dataset.after),
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
        'data-before': JSON.stringify(hook.node.attrs.before),
        'data-after': JSON.stringify(hook.node.attrs.after),
        'data-group': hook.node.attrs.group,
        'data-viewid': hook.node.attrs.viewid,
      },
    ];
    next();
  },
};

export default format_change;
