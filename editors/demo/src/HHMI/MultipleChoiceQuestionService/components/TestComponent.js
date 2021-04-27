/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState, useEffect } from 'react';
import { EditorView } from 'prosemirror-view';
import { EditorState, TextSelection } from 'prosemirror-state';
import { StepMap } from 'prosemirror-transform';
import { WaxContext } from 'wax-prosemirror-core';

import styled from 'styled-components';

export default ({ node, view, getPos }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const context = useContext(WaxContext);
  const editorRef = useRef();
  let questionView;
  const questionId = node.attrs.id;

  useEffect(() => {
    questionView = new EditorView(
      { mount: editorRef.current },
      {
        state: EditorState.create({
          doc: node,
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

  const clickMe = () => {
    setShowExplanation(true);
    // view.dispatch(view.state.tr);
  };

  return (
    <>
      <div ref={editorRef} />
      <button onClick={clickMe}>Show Explanation</button>
      {showExplanation && (
        <input type="text" placeholder="type your explanation"></input>
      )}
    </>
  );
};
