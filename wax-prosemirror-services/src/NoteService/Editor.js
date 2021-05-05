/* eslint-disable react/destructuring-assignment */
/* eslint react/prop-types: 0 */
import React, { useEffect, useRef, useContext, useMemo } from 'react';
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
  let clickInNote = false;
  let typing = false;
  // eslint-disable-next-line react/destructuring-assignment
  const isEditable = context.view.main.props.editable(editable => {
    return editable;
  });

  useEffect(() => {
    noteView = new EditorView(
      { mount: editorRef.current },
      {
        editable: () => isEditable,
        state: EditorState.create({
          doc: node,
          plugins: [keymap(createKeyBindings()), ...context.app.getPlugins()],
        }),
        // This is the magic part
        dispatchTransaction,
        handleDOMEvents: {
          blur: () => {
            context.view[noteId].dispatch(
              context.view[noteId].state.tr.setSelection(
                new TextSelection(context.view[noteId].state.tr.doc.resolve(0)),
              ),
            );
          },

          mousedown: () => {
            context.updateView({}, noteId);
            clickInNote = true;
            // Kludge to prevent issues due to the fact that the whole
            // footnote is node-selected (and thus DOM-selected) when
            // the parent editor is focused.
            if (noteView.hasFocus()) noteView.focus();
          },
        },
        handleTextInput: (editorView, from, to, text) => {
          typing = true;
        },
        transformPasted: slice => {
          return transformPasted(slice, noteView);
        },

        attributes: {
          spellcheck: 'false',
        },
      },
    );

    // Set Each note into Wax's Context
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
      ? trackedTransaction(transaction, noteView.state, user, 'notes', noteId)
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
    setTimeout(() => {
      if (clickInNote) context.updateView({}, noteId);
      clickInNote = false;
      if (noteView.state.selection.from !== noteView.state.selection.to)
        context.updateView({}, noteId);
    }, 20);

    const findReplace = context.app.PmPlugins.get('findAndReplacePlugin');
    const matches = findReplace.getState(noteView.state).allMatches;
    if (matches.length > 0 && !typing && context.activeViewId === noteId)
      context.updateView({}, noteId);
    // UNTIL HERE

    if (!tr.getMeta('fromOutside')) {
      const outerTr = view.state.tr;
      const offsetMap = StepMap.offset(noteFound[0].pos + 1);
      for (let i = 0; i < transactions.length; i++) {
        let { steps } = transactions[i];
        for (let j = 0; j < steps.length; j++)
          outerTr.step(steps[j].map(offsetMap));
      }

      if (outerTr.docChanged)
        view.dispatch(outerTr.setMeta('outsideView', noteId));
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
  const NoteEditorContainerComponent = useMemo(
    () => <NoteEditorContainer ref={editorRef} />,
    [],
  );
  return <>{NoteEditorContainerComponent}</>;
};
