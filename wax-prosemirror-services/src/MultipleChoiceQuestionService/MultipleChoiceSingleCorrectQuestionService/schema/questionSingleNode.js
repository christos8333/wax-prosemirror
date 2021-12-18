import { v4 as uuidv4 } from 'uuid';

const questionSingleNode = {
  attrs: {
    class: { default: 'multiple-choice-question-single' },
    id: { default: uuidv4() },
  },
  group: 'block questions',
  content: 'block*',
  defining: true,

  // atom: true,
  parseDOM: [
    {
      tag: 'div.multiple-choice-question-single',
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

export default questionSingleNode;
