import { v4 as uuidv4 } from 'uuid';

const essayPromptNode = {
  attrs: {
    class: { default: 'essay-prompt' },
    id: { default: uuidv4() },
  },
  group: 'block questions',
  content: 'block*',
  defining: true,

  parseDOM: [
    {
      tag: 'div.essay-prompt',
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

export default essayPromptNode;
