import { v4 as uuidv4 } from 'uuid';

const essayAnswerNode = {
  attrs: {
    class: { default: 'essay-answer' },
    id: { default: uuidv4() },
  },
  group: 'block questions',
  content: 'block*',
  defining: true,

  parseDOM: [
    {
      tag: 'div.essay-answer',
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

export default essayAnswerNode;
