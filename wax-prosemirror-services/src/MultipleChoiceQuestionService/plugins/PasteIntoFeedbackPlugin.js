/* eslint-disable no-param-reassign */
import { Plugin, PluginKey } from 'prosemirror-state';

const PasteIntoFeedbackPlugin = new PluginKey('pasteIntoFeedbackPlugin');

export default (props, context) => {
  return new Plugin({
    key: PasteIntoFeedbackPlugin,
    props: {
      handlePaste: (view, event, slice) => {
        if (view.state.selection.from === null) return true;
      },
    },
  });
};
