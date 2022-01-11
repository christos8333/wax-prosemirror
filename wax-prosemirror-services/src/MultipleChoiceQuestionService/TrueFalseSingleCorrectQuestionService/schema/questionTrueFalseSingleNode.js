import { v4 as uuidv4 } from 'uuid';

const questionTrueFalseNode = {
  attrs: {
    class: { default: 'true-false-question-single' },
    id: { default: uuidv4() },
  },
  group: 'block questions',
  content: 'block* list_item*',
  defining: true,

  // atom: true,
  parseDOM: [
    {
      tag: 'div.true-false-question-single',
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

export default questionTrueFalseNode;
