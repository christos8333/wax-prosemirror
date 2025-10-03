/* eslint-disable no-nested-ternary */
import { Plugin, NodeSelection } from 'prosemirror-state';

const executeCommand = (event, view, action) => {
  const { state, dispatch } = view;
  const { selection } = state;

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
        dispatch(state.tr.setSelection(NodeSelection.create(state.doc, pos)));
        setTimeout(() => {
          document.execCommand(action);
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
          dispatch(state.tr.setSelection(NodeSelection.create(state.doc, pos)));
          setTimeout(() => {
            document.execCommand(action);
          }, 0);
          return true;
        }
      }
    }
  }
};

const selectFigureOnCutPlugin = () => {
  return new Plugin({
    props: {
      handleKeyDown: (view, event) => {
        let action = event.key.toLowerCase() === 'x' ? 'cut' : null;
        action = action
          ? action
          : event.key.toLowerCase() === 'c'
          ? 'copy'
          : null;

        if (event.ctrlKey || (event.metaKey && action !== null)) {
          executeCommand(event, view, action);
        }
      },
    },
  });
};

export default selectFigureOnCutPlugin;
