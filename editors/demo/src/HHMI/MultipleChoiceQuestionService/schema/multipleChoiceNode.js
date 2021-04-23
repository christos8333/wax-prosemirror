const multipleChoiceNode = {
  group: 'inline',
  content: 'inline*',
  inline: true,
  // atom: true,
  attrs: {
    id: { default: '' },
  },
  toDOM: node => ['multiple-choice', node.attrs, 0],
  parseDOM: [
    {
      tag: 'multiple-choice',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
        };
      },
    },
  ],
};

// const multipleChoiceNode = {
//   group: 'block multiple',
//   content: 'text*',
//   atom: true,
//   code: true,
//   toDOM: () => ['multiple-choice', { class: 'multiple-choice' }, 0],
//   parseDOM: [
//     {
//       tag: 'multiple-choice',
//     },
//   ],
// };

// const multipleChoiceNode = {
//   content: 'block+',
//   group: 'block',
//   defining: true,
//   //   parseDOM: [{ tag: 'multiple-choice' }],
//   toDOM() {
//     // return ['multiple-choice', 0];
//   },
// };

export default multipleChoiceNode;
