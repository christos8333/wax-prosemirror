/* eslint-disable */

import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const fakeCursorPlugin = new PluginKey('fakeCursorPlugin');
export default props => {
  return new Plugin({
    key: fakeCursorPlugin,
    state: {
      init: (_, state) => {},
      apply(tr, prev, _, newState) {
        let createDecoration;
        if (newState.selection.from === newState.selection.to) {
          const widget = document.createElement('fakecursor');
          createDecoration = DecorationSet.create(newState.doc, [
            Decoration.widget(newState.selection.from, widget, {
              key: 'fakecursor',
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
        const fakeCursorPluginState = state && fakeCursorPlugin.getState(state);
        if (fakeCursorPluginState)
          return fakeCursorPluginState.createDecoration;
      },
      handleDOMEvents: {
        focus: (view, _event) => {},
        blur: (view, _event) => {},
      },
    },
  });
};
