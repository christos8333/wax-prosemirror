import { Plugin, PluginKey } from 'prosemirror-state';

const testPlugin = new PluginKey('moveCursorPlugin');

export default () => {
  return new Plugin({
    key: testPlugin,
    filterTransaction: (transaction, state) => {
      // if (
      //   transaction.getMeta('fromOutside') &&
      //   transaction.doc &&
      //   transaction.doc.type &&
      //   transaction.doc.type.name === 'multiple_drop_down_container'
      // ) {
      //   return false;
      // }

      return true;
    },
  });
};
