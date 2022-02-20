import { v4 as uuidv4 } from 'uuid';

const multipleChoiceSingleCorrectNode = {
  attrs: {
    class: { default: 'multiple-choice-option-single-correct' },
    id: { default: uuidv4() },
    correct: { default: false },
    answer: { default: false },
    feedback: { default: '' },
  },
  group: 'block questions',
  content: 'block*',
  defining: true,

  parseDOM: [
    {
      tag: 'div.multiple-choice-option-single-correct',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          correct: JSON.parse(dom.getAttribute('correct').toLowerCase()),
          answer: JSON.parse(dom.getAttribute('answer').toLowerCase()),
          feedback: dom.getAttribute('feedback'),
        };
      },
    },
  ],
  toDOM: node => ['div', node.attrs, 0],
};

export default multipleChoiceSingleCorrectNode;
