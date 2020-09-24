/* eslint react/prop-types: 0 */
import React, { useEffect, useRef, useContext, useState } from 'react';
import { filter } from 'lodash';
import { EditorView } from 'prosemirror-view';
import { EditorState, TextSelection } from 'prosemirror-state';
import { StepMap } from 'prosemirror-transform';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { undo, redo } from 'prosemirror-history';
import { WaxContext } from 'wax-prosemirror-core';
import { NoteEditorContainer } from 'wax-prosemirror-components';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import transformPasted from './helpers/TransformPasted';
import trackedTransaction from '../TrackChangeService/track-changes/trackedTransaction';

export default ({ node, view }) => {
  const editorRef = useRef();
  const context = useContext(WaxContext);
  const noteId = node.attrs.id;
  let noteView;
  let updateMainView = true;

  useEffect(() => {
    noteView = new EditorView(
      { mount: editorRef.current },
      {
        state: EditorState.create({
          doc: node,
          plugins: [keymap(createKeyBindings()), ...context.app.getPlugins()],
        }),
        // This is the magic part
        dispatchTransaction,
        handleDOMEvents: {
          mousedown: () => {
            context.updateView({}, noteId);

            // Kludge to prevent issues due to the fact that the whole
            // footnote is node-selected (and thus DOM-selected) when
            // the parent editor is focused.
            if (noteView.hasFocus()) noteView.focus();
          },
        },
        transformPasted: slice => {
          return transformPasted(slice, noteView);
        },
        handleKeyPress: (noteEditorView, from, to, content) => {
          updateMainView = false;
        },
      },
    );

    //Set Each note into Wax's Context
    context.updateView(
      {
        [noteId]: noteView,
      },
      noteId,
    );
    if (context.view[noteId]) {
      context.view[noteId].focus();
    }
  }, []);

  const dispatchTransaction = transaction => {
    const { user } = view.props;
    const TrackChange = context.app.config.get(
      'config.EnableTrackChangeService',
    );

    const tr = TrackChange.enabled
      ? trackedTransaction(transaction, noteView.state, user, 'notes')
      : transaction;

    const { state, transactions } = noteView.state.applyTransaction(tr);
    noteView.updateState(state);

    const allNotes = DocumentHelpers.findChildrenByType(
      view.state.doc,
      view.state.schema.nodes.footnote,
      true,
    );

    const noteFound = filter(allNotes, {
      node: { attrs: { id: noteId } },
    });

    // TODO Remove timeout and use state to check if noteView has changed
    if (updateMainView) {
      setTimeout(() => {
        context.updateView({}, noteId);
      }, 20);
    }

    if (!tr.getMeta('fromOutside')) {
      const outerTr = view.state.tr;
      const offsetMap = StepMap.offset(noteFound[0].pos + 1);
      for (let i = 0; i < transactions.length; i++) {
        let { steps } = transactions[i];
        for (let j = 0; j < steps.length; j++)
          outerTr.step(steps[j].map(offsetMap));
      }

      if (outerTr.docChanged)
        view.dispatch(outerTr.setMeta('outsideView', 'notes'));
      updateMainView = true;
    }
  };

  const createKeyBindings = () => {
    const keys = getKeys();
    Object.keys(baseKeymap).forEach(key => {
      keys[key] = baseKeymap[key];
    });
    return keys;
  };

  const getKeys = () => {
    return {
      'Mod-z': () => undo(view.state, view.dispatch),
      'Mod-y': () => redo(view.state, view.dispatch),
      // 'Mod-u': () => Commands.markActive(noteView.state.config.schema.marks.underline)(noteView.state),
    };
  };

  if (context.view[noteId]) {
    const { state } = context.view[noteId];
    const start = node.content.findDiffStart(state.doc.content);
    if (start != null) {
      let { a: endA, b: endB } = node.content.findDiffEnd(state.doc.content);
      const overlap = start - Math.min(endA, endB);
      if (overlap > 0) {
        endA += overlap;
        endB += overlap;
      }
      context.view[noteId].dispatch(
        state.tr
          .replace(start, endB, node.slice(start, endA))
          .setMeta('fromOutside', true),
      );
    }
  }

  return <NoteEditorContainer ref={editorRef} />;
};
