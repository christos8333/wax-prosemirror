import React, { useEffect, useRef, useContext } from "react";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { StepMap } from "prosemirror-transform";
import { baseKeymap } from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";
import { undo, redo } from "prosemirror-history";
import { WaxContext } from "wax-prosemirror-core";
import { Commands } from "wax-prosemirror-utilities";
import { NoteEditorContainer } from "wax-prosemirror-components";
import { DocumentHelpers } from "wax-prosemirror-utilities";
import { filter } from "lodash";
import transformPasted from "./helpers/TransformPasted";

export default ({ node, view }) => {
  const editorRef = useRef();
  const context = useContext(WaxContext);
  const noteId = node.attrs.id;
  useEffect(() => {
    const noteView = new EditorView(
      { mount: editorRef.current },
      {
        state: EditorState.create({
          doc: node,
          plugins: [keymap(createKeyBindings()), ...context.app.getPlugins()]
        }),
        // This is the magic part
        dispatchTransaction: tr => {
          let { state, transactions } = noteView.state.applyTransaction(tr);
          noteView.updateState(state);

          const allNotes = DocumentHelpers.findChildrenByType(
            view.state.doc,
            view.state.schema.nodes.footnote,
            true
          );

          const noteFound = filter(allNotes, {
            node: { attrs: { id: noteId } }
          });

          if (!tr.getMeta("fromOutside")) {
            let outerTr = view.state.tr,
              offsetMap = StepMap.offset(noteFound[0].pos + 1);
            for (let i = 0; i < transactions.length; i++) {
              let steps = transactions[i].steps;
              for (let j = 0; j < steps.length; j++)
                outerTr.step(steps[j].map(offsetMap));
            }

            if (outerTr.docChanged) view.dispatch(outerTr);

            //Set everytime the active view into context
            context.updateView({}, noteId);
          }
        },
        handleDOMEvents: {
          mousedown: () => {
            context.updateView({}, noteId);

            // Kludge to prevent issues due to the fact that the whole
            // footnote is node-selected (and thus DOM-selected) when
            // the parent editor is focused.
            if (noteView.hasFocus()) noteView.focus();
          }
        },
        transformPasted: slice => {
          return transformPasted(slice, noteView);
        }
      }
    );

    //Set Each note into Wax's Context
    context.updateView(
      {
        [noteId]: noteView
      },
      noteId
    );
    if (context.view[noteId]) {
      context.view[noteId].focus();
    }
  }, []);

  const createKeyBindings = () => {
    const keys = getKeys();
    Object.keys(baseKeymap).forEach(key => {
      keys[key] = baseKeymap[key];
    });
    return keys;
  };

  const getKeys = () => {
    return {
      "Mod-z": () => undo(view.state, view.dispatch),
      "Mod-y": () => redo(view.state, view.dispatch),
      "Mod-u": () =>
        Commands.markActive(noteView.state.config.schema.marks.underline)(
          noteView.state
        )
    };
  };

  if (context.view[noteId]) {
    let state = context.view[noteId].state;
    let start = node.content.findDiffStart(state.doc.content);
    if (start != null) {
      let { a: endA, b: endB } = node.content.findDiffEnd(state.doc.content);
      let overlap = start - Math.min(endA, endB);
      if (overlap > 0) {
        endA += overlap;
        endB += overlap;
      }
      context.view[noteId].dispatch(
        state.tr
          .replace(start, endB, node.slice(start, endA))
          .setMeta("fromOutside", true)
      );
    }
  }

  return <NoteEditorContainer ref={editorRef} />;
};
