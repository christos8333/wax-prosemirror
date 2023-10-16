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
        const widget = document.createElement('span');
        widget.setAttribute('id', 'fake-cursor');

        if (newState.selection.from === newState.selection.to) {
          createDecoration = DecorationSet.create(newState.doc, [
            Decoration.widget(newState.selection.from, widget, {
              key: 'fakecursor',
            }),
          ]);
        }
        setTimeout(() => {
          widget.setAttribute('contenteditable', true);
          if (
            navigator.userAgent.includes('Firefox') &&
            newState.selection.$from.nodeBefore == null
          ) {
            widget.setAttribute('style', 'visibility:hidden');
          } else {
            widget.setAttribute('style', 'display:none');
          }
        });
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
        focus: (view, event) => {
          event.preventDefault();
          const fakeCursor = document.getElementById('fake-cursor');
          if (fakeCursor) {
            if (
              navigator.userAgent.includes('Firefox') &&
              view.state.selection.$from.nodeBefore == null
            ) {
              fakeCursor.style.visibility = 'hidden';
            } else {
              fakeCursor.style.display = 'none';
            }
          }
        },
        blur: (view, event) => {
          event.preventDefault();
          if (view && event.relatedTarget === null) {
            setTimeout(() => {
              view.focus();
            });
          } else {
            const fakeCursor = document.getElementById('fake-cursor');
            if (fakeCursor) {
              if (
                navigator.userAgent.includes('Firefox') &&
                view.state.selection.$from.nodeBefore == null
              ) {
                fakeCursor.style.visibility = 'visible';
              } else {
                fakeCursor.style.display = 'inline';
              }
            }
          }
        },
      },
    },
  });
};
