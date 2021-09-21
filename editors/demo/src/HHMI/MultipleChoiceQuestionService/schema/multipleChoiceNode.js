import { v4 as uuidv4 } from 'uuid';

const multipleChoiceNode = {
  attrs: {
    class: { default: 'mutiple-choice-option' },
    id: { default: uuidv4() },
    correct: { default: false },
    feedback: { default: '' },
  },
  group: 'block',
  content: 'block*',
  defining: true,

  // atom: true,
  parseDOM: [
    {
      tag: 'div.mutiple-choice-option',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
          class: dom.getAttribute('class'),
          correct: dom.getAttribute('correct'),
          feedback: dom.getAttribute('feedback'),
        };
      },
    },
  ],
  toDOM: node => ['div', node.attrs, 0],
};

export default multipleChoiceNode;
