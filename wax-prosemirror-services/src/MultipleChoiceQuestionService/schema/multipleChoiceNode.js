import { v4 as uuidv4 } from 'uuid';

const multipleChoiceNode = {
  attrs: {
    class: { default: 'multiple-choice-option' },
    id: { default: uuidv4() },
    correct: { default: false },
    feedback: { default: '' },
  },
  group: 'block questions',
  content: 'block*',
  defining: true,

  // atom: true,
  parseDOM: [
    {
      tag: 'div.multiple-choice-option',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          correct: JSON.parse(dom.getAttribute('correct').toLowerCase()),
          feedback: dom.getAttribute('feedback'),
        };
      },
    },
  ],
  toDOM: node => ['div', node.attrs, 0],
};

export default multipleChoiceNode;
