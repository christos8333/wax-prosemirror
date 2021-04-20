const multipleChoiceNode = {
  group: 'inline',
  content: 'inline*',
  inline: true,
  // atom: true,
  attrs: {
    id: { default: '' },
  },
  toDOM: () => ['multiple-choice', { class: 'multiple-choice' }, 0],
  parseDOM: [
    {
      tag: 'multiple-choice',
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
