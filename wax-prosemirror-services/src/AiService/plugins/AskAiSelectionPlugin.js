import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const key = new PluginKey('askAiSelectionPlugin');

export default () => {
  return new Plugin({
    key,
    state: {
      init: () => {
        return {};
      },
      apply(tr, prev, prevState, newState) {
        let createDecoration;
        const askAiInput = document.getElementById('askAiInput');
        if (askAiInput) {
          const selectionWhenBlured = tr.getMeta(key);

          const from = selectionWhenBlured
            ? selectionWhenBlured.from
            : newState.selection.from;
          const to = selectionWhenBlured
            ? selectionWhenBlured.to
            : newState.selection.to;

          createDecoration = DecorationSet.create(newState.doc, [
            Decoration.inline(from, to, {
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
      handleDOMEvents: {
        blur(view) {
          view.dispatch(view.state.tr.setMeta(key, view.state.selection));
        },
        //   focus(view) {
        //     view.dispatch(view.state.tr.setMeta(key, true));
        //   },
      },
    },
  });
};
