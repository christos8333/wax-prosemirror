import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const key = new PluginKey('askAiSelectionPlugin');

export default props => {
  return new Plugin({
    key,
    state: {
      init: (_, state) => {
        return {};
      },
      apply(tr, prev, prevState, newState) {
        let createDecoration;
        const askAiInput = document.getElementById('askAiInput');

        if (askAiInput) {
          createDecoration = DecorationSet.create(newState.doc, [
            Decoration.inline(newState.selection.from, newState.selection.to, {
              class: 'ask-ai-selection',
            }),
          ]);
        }

        return {
          createDecoration,
        };
      },
    },
    props: {
      decorations: state => {
        const askAiSelectionPluginState = state && key.getState(state);
        return askAiSelectionPluginState.createDecoration;
      },
      //   handleDOMEvents: {
      //     blur(view) {
      //       view.dispatch(view.state.tr.setMeta(key, false));
      //     },
      //     focus(view) {
      //       view.dispatch(view.state.tr.setMeta(key, true));
      //     },
      //   },
    },
  });
};
