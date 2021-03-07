import { SchemaHelpers } from 'wax-prosemirror-utilities';

const heading = {
  attrs: {
    id: { default: '' },
    track: { default: [] },
    group: { default: '' },
    viewid: { default: '' },
  },
  content: 'inline*',
  group: 'block',
  defining: true,
  parseDOM: [
    {
      tag: 'h2',
      getAttrs(hook, next) {
        Object.assign(hook, {
          id: hook.dom.dataset.id,
          track: SchemaHelpers.parseTracks(hook.dom.dataset.track),
          group: hook.dom.dataset.group,
          viewid: hook.dom.dataset.viewid,
        });
        next();
      },
    },
    {
      tag: 'h3',
      getAttrs(hook, next) {
        Object.assign(hook, {
          id: hook.dom.dataset.id,
          track: SchemaHelpers.parseTracks(hook.dom.dataset.track),
          group: hook.dom.dataset.group,
          viewid: hook.dom.dataset.viewid,
        });
        next();
      },
    },
    {
      tag: 'h4',
      getAttrs(hook, next) {
        Object.assign(hook, {
          id: hook.dom.dataset.id,
          track: SchemaHelpers.parseTracks(hook.dom.dataset.track),
          group: hook.dom.dataset.group,
          viewid: hook.dom.dataset.viewid,
        });
        next();
      },
    },
  ],
  toDOM(hook, next) {
    if (hook.node.attrs.track && hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        'data-id': hook.node.attrs.id,
        'data-track': JSON.stringify(hook.node.attrs.track),
        'data-group': hook.node.attrs.group,
        'data-viewid': hook.node.attrs.viewid,
      });
    }
    next();
  },
};

export default heading;
