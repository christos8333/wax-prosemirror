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
        const widget = document.createElement('fakecursor');
        if (newState.selection.from === newState.selection.to) {
          createDecoration = DecorationSet.create(newState.doc, [
            Decoration.widget(newState.selection.from, widget, {
              key: 'fakecursor',
            }),
          ]);
        }
        setTimeout(() => {
          widget.setAttribute('contenteditable', true);
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
          const fakeCursor = document.getElementsByTagName('fakecursor');
          if (fakeCursor && fakeCursor[0]) {
            for (let i = 0; i < fakeCursor.length; i++) {
              if (navigator.userAgent.includes('Firefox')) {
                fakeCursor[i].style.visibility = 'hidden';
              } else {
                fakeCursor[i].style.display = 'none';
              }
            }
          }
        },
        blur: (view, event) => {
          event.preventDefault();
          if (view && event.relatedTarget === null) {
            view.focus();
          } else {
            const fakeCursor = document.getElementsByTagName('fakecursor');
            if (fakeCursor && fakeCursor[0]) {
              for (let i = 0; i < fakeCursor.length; i++) {
                if (navigator.userAgent.includes('Firefox')) {
                  fakeCursor[i].style.visibility = 'visible';
                } else {
                  fakeCursor[i].style.display = 'inline';
                }
              }
            }
          }
        },
      },
    },
  });
};
