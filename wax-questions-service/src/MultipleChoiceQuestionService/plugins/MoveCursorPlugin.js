import { Plugin, PluginKey } from 'prosemirror-state';

const testPlugin = new PluginKey('moveCursorPlugin');

export default () => {
  return new Plugin({
    key: testPlugin,
    filterTransaction: (transaction, state, b) => {
      state.doc.descendants((editorNode, pos) => {
        if (editorNode.type.name === 'fill_the_gap_container') {
          if (transaction.selection.from - 2 === pos) {
            return false;
          }
        }
      });

      return true;
    },
  });
};
