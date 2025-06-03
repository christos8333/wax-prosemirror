import { Plugin, NodeSelection, TextSelection } from 'prosemirror-state';

const removeFigureOnTyping = () => {
  return new Plugin({
    props: {
      handleTextInput(view, from, to, text) {
        const { state, dispatch } = view;
        const { selection } = state;

        if (
          selection instanceof NodeSelection &&
          selection.node.type.name === 'image'
        ) {
          const $pos = state.doc.resolve(selection.from);

          for (let depth = $pos.depth; depth >= 0; depth--) {
            const node = $pos.node(depth);
            if (node.type.name === 'figure') {
              const figureStart = $pos.before(depth);
              const figureEnd = $pos.after(depth);

              const tr = state.tr.replaceRangeWith(
                figureStart,
                figureEnd,
                state.schema.text(text),
              );

              tr.setSelection(
                TextSelection.create(tr.doc, figureStart + text.length + 1),
              );

              dispatch(tr);
              return true;
            }
          }
        }

        return false;
      },
    },
  });
};

export default removeFigureOnTyping;
