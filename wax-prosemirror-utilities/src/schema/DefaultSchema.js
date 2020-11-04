import { SchemaHelpers } from 'wax-prosemirror-utilities';

export default {
  nodes: {
    doc: {
      content: 'block+',
    },
    text: {
      group: 'inline',
    },
    hard_break: {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [{ tag: 'br' }],
      toDOM() {
        return ['br'];
      },
    },
    paragraph: {
      group: 'block',
      content: 'inline*',
      attrs: {
        id: { default: '' },
        class: { default: 'paragraph' },
        track: { default: [] },
        group: { default: '' },
      },
      parseDOM: [
        {
          tag: 'p.paragraph',
          getAttrs(dom) {
            return {
              id: dom.dataset.id,
              class: dom.getAttribute('class'),
              track: SchemaHelpers.parseTracks(dom.dataset.track),
              group: dom.dataset.group,
            };
          },
        },
      ],
      toDOM(node) {
        const attrs = SchemaHelpers.blockLevelToDOM(node);
        return ['p', attrs, 0];
      },
    },
  },
  marks: {},
};
