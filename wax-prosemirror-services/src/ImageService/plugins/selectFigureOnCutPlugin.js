import { Plugin } from 'prosemirror-state';
import { NodeSelection } from 'prosemirror-state';

const selectFigureOnCutPlugin = () => {
  return new Plugin({
    props: {
      handleKeyDown: (view, event) => {
        if (
          event.key.toLowerCase() === 'x' &&
          (event.ctrlKey || event.metaKey)
        ) {
          const { state, dispatch } = view;
          const { selection } = state;

          let imageNode;

          if (
            selection instanceof NodeSelection &&
            selection.node.type.name === 'image'
          ) {
            imageNode = selection.node;
            const $pos = view.state.doc.resolve(selection.from);

            for (let depth = $pos.depth; depth >= 0; depth--) {
              const node = $pos.node(depth);

              if (node.type.name === 'figure') {
                const pos = $pos.before(depth);
                event.preventDefault();
                dispatch(
                  state.tr.setSelection(NodeSelection.create(state.doc, pos)),
                );
                setTimeout(() => {
                  document.execCommand('cut');
                }, 0);
                return true;
              }
            }
          } else {
            const { $from } = state.selection;

            if ($from.parent.type.name === 'image') {
              for (let depth = $from.depth; depth >= 0; depth--) {
                const node = $from.node(depth);

                if (node.type.name === 'figure') {
                  const pos = $from.before(depth);
                  event.preventDefault();
                  dispatch(
                    state.tr.setSelection(NodeSelection.create(state.doc, pos)),
                  );
                  setTimeout(() => {
                    document.execCommand('cut');
                  }, 0);
                  return true;
                }
              }
            }
          }
        }
        return false;
      },
    },
  });
};

export default selectFigureOnCutPlugin;
