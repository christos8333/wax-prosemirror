import { v4 as uuidv4 } from 'uuid';

const questionNode = {
  attrs: {
    class: { default: 'multiple-choice-question' },
    id: { default: uuidv4() },
  },
  group: 'block questions',
  content: 'block*',
  defining: true,

  // atom: true,
  parseDOM: [
    {
      tag: 'div.multiple-choice-question',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM: node => ['div', node.attrs, 0],
};

export default questionNode;
