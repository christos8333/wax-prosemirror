import { v4 as uuidv4 } from 'uuid';

const essayQuestionNode = {
  attrs: {
    class: { default: 'essay-question' },
    id: { default: uuidv4() },
  },
  group: 'block questions',
  content: 'block*',
  defining: true,

  parseDOM: [
    {
      tag: 'div.essay-question',
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

export default essayQuestionNode;
