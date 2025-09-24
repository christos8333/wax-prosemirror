import { Plugin, PluginKey, TextSelection } from 'prosemirror-state';

const citationFooterSelectionPluginKey = new PluginKey(
  'citationFooterSelectionPlugin',
);

export default () => {
  return new Plugin({
    key: citationFooterSelectionPluginKey,
    props: {
      handleDOMEvents: {
        mousedown(view, event) {
          // Check if this is a double-click
          if (event.detail === 2) {
            const { state } = view;
            const pos = view.posAtDOM(event.target, 0);

            if (pos !== null) {
              // Find the citation footer node
              let footerPos = null;
              let footerSize = null;

              state.doc.descendants((node, nodePos) => {
                if (node.type.name === 'citations_data_node') {
                  footerPos = nodePos;
                  footerSize = node.nodeSize;
                }
              });

              // If there's a footer and the click is near it, prevent default selection
              if (footerPos !== null && footerSize !== null) {
                const footerEnd = footerPos + footerSize;

                // If the click is within or very close to the footer node
                if (pos >= footerPos - 10 && pos <= footerEnd + 10) {
                  // Prevent the default double-click selection
                  event.preventDefault();

                  // Set a safe cursor position instead
                  const safePos = Math.max(0, footerPos - 1);
                  const newSelection = TextSelection.near(
                    state.doc.resolve(safePos),
                  );
                  view.dispatch(state.tr.setSelection(newSelection));

                  return true;
                }
              }
            }
          }

          return false;
        },
      },

      // Intercept selection changes to prevent selections that include the footer
      handleKeyDown(view, event) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
          const { state } = view;
          const { selection } = state;

          // Check if the selection includes the citation footer
          let footerPos = null;
          let footerSize = null;

          state.doc.descendants((node, pos) => {
            if (node.type.name === 'citations_data_node') {
              footerPos = pos;
              footerSize = node.nodeSize;
            }
          });

          if (footerPos !== null && footerSize !== null) {
            const footerEnd = footerPos + footerSize;

            // If selection overlaps with footer, prevent deletion
            if (selection.from < footerEnd && selection.to > footerPos) {
              event.preventDefault();

              // Move cursor to a safe position instead
              const safePos = Math.max(0, footerPos - 1);
              const newSelection = TextSelection.near(
                state.doc.resolve(safePos),
              );
              view.dispatch(state.tr.setSelection(newSelection));

              return true;
            }
          }
        }

        return false;
      },
    },

    appendTransaction(transactions, oldState, newState) {
      const { selection } = newState;

      // Check if the new selection includes the citation footer
      let footerPos = null;
      let footerSize = null;

      newState.doc.descendants((node, pos) => {
        if (node.type.name === 'citations_data_node') {
          footerPos = pos;
          footerSize = node.nodeSize;
        }
      });

      if (footerPos !== null && footerSize !== null) {
        const footerEnd = footerPos + footerSize;

        // If selection overlaps with footer, move cursor to a safe position
        if (selection.from < footerEnd && selection.to > footerPos) {
          const { tr } = newState;
          const safePos = Math.max(0, footerPos - 1);
          const newSelection = TextSelection.near(
            newState.doc.resolve(safePos),
          );
          tr.setSelection(newSelection);
          return tr;
        }
      }

      return null;
    },
  });
};
