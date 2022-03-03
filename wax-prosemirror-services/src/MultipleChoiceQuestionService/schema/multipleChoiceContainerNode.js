import { v4 as uuidv4 } from 'uuid';

const multipleChoiceContainerNode = {
  attrs: {
    id: { default: uuidv4() },
    class: { default: 'multiple-choice' },
  },
  group: 'block questions',
  atom: true,
  content: 'block*',
  parseDOM: [
    {
      tag: 'div.multiple-choice',
      getAttrs(dom) {
        return {
          id: dom.dataset.id,
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM(node) {
    return ['div', node.attrs, 0];
  },
};

export default multipleChoiceContainerNode;
