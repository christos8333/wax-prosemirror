import { v4 as uuidv4 } from 'uuid';

const multipleChoiceSingleCorrectNode = {
  attrs: {
    class: { default: 'multiple-choice-option-single-correct' },
    id: { default: uuidv4() },
    correct: { default: false },
    feedback: { default: '' },
    singleCorrect: { default: true },
  },
  group: 'block questions',
  content: 'block*',
  defining: true,

  // atom: true,
  parseDOM: [
    {
      tag: 'div.multiple-choice-option-single-correct',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          correct: JSON.parse(dom.getAttribute('correct').toLowerCase()),
          feedback: dom.getAttribute('feedback'),
          singleCorrect: dom.getAttribute('singleCorrect'),
        };
      },
    },
  ],
  toDOM: node => ['div', node.attrs, 0],
};

export default multipleChoiceSingleCorrectNode;
