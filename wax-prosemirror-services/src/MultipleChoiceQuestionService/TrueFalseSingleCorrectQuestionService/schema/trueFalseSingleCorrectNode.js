import { v4 as uuidv4 } from 'uuid';

const trueFalseSingleCorrectNode = {
  attrs: {
    class: { default: 'true-false-single-correct-option' },
    id: { default: uuidv4() },
    correct: { default: false },
    feedback: { default: '' },
  },
  group: 'block questions',
  content: 'block*',
  defining: true,

  parseDOM: [
    {
      tag: 'div.true-false-single-correct-option',
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

export default trueFalseSingleCorrectNode;
