/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { StepMap } from 'prosemirror-transform';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { WaxContext } from 'wax-prosemirror-core';

const EditorComponent = ({ node, view, getPos }) => {
  const editorRef = useRef();

  const context = useContext(WaxContext);
  let questionView;
  const questionId = node.attrs.id;

  useEffect(() => {
    questionView = new EditorView(
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
            context.updateView({}, questionId);
            // Kludge to prevent issues due to the fact that the whole
            // footnote is node-selected (and thus DOM-selected) when
            // the parent editor is focused.
            if (questionView.hasFocus()) questionView.focus();
          },
        },

        attributes: {
          spellcheck: 'false',
        },
      },
    );

    //Set Each note into Wax's Context
    context.updateView(
      {
        [questionId]: questionView,
      },
      questionId,
    );
  }, []);

  const dispatchTransaction = tr => {
    let { state, transactions } = questionView.state.applyTransaction(tr);
    questionView.updateState(state);
    context.updateView({}, questionId);

    if (!tr.getMeta('fromOutside')) {
      let outerTr = view.state.tr,
        offsetMap = StepMap.offset(getPos() + 1);
      for (let i = 0; i < transactions.length; i++) {
        let steps = transactions[i].steps;
        for (let j = 0; j < steps.length; j++)
          outerTr.step(steps[j].map(offsetMap));
      }
      if (outerTr.docChanged) view.dispatch(outerTr);
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
    };
  };

  return <div ref={editorRef} />;
};

export default EditorComponent;
