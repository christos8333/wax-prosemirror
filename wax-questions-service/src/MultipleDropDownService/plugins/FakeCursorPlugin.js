/* eslint-disable */

import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Commands } from 'wax-prosemirror-core';

const fakeCursorPluginMultiple = new PluginKey('fakeCursorPluginMultiple');
export default props => {
  return new Plugin({
    key: fakeCursorPluginMultiple,
    state: {
      init: (_, state) => {},
      apply(tr, prev, _, newState) {
        let createDecoration;

        if (
          newState.selection.from === newState.selection.to &&
          Commands.isInTable(newState)
        ) {
          const widget = document.createElement('span');
          widget.setAttribute('id', 'fake-cursor');
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
        const fakeCursorPluginMultipleState =
          state && fakeCursorPluginMultiple.getState(state);
        if (fakeCursorPluginMultipleState)
          return fakeCursorPluginMultipleState.createDecoration;
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
                view.state.selection.$from.nodeBefore === null
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
