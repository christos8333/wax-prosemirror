/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useRef } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { StepMap } from 'prosemirror-transform';
import styled from 'styled-components';

const styles = {
  border: '1px solid black',
};

export default ({ node, view, getPos }) => {
  console.log(node);
  const editorRef = useRef();
  let questionView;
  useLayoutEffect(() => {
    questionView = new EditorView(
      { mount: editorRef.current },
      {
        state: EditorState.create({
          doc: node,
          // plugins: [keymap(createKeyBindings()), ...app.getPlugins()],
        }),
        dispatchTransaction,
        handleDOMEvents: {
          // blur: () => {
          //   view[noteId].dispatch(
          //     view[noteId].state.tr.setSelection(
          //       new TextSelection(view[noteId].state.tr.doc.resolve(0)),
          //     ),
          //   );
          // },

          mousedown: () => {
            // Kludge to prevent issues due to the fact that the whole
            // footnote is node-selected (and thus DOM-selected) when
            // the parent editor is focused.

            if (view.hasFocus()) questionView.focus();
          },
        },

        attributes: {
          spellcheck: 'false',
        },
      },
    );
  }, []);

  const dispatchTransaction = tr => {
    console.log('dispatch', questionView.state.applyTransaction(tr));
    let { state, transactions } = questionView.state.applyTransaction(tr);
    questionView.updateState(state);

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

  console.log(questionView);
  if (questionView) {
    const { state } = questionView;
    const start = node.content.findDiffStart(state.doc.content);
    if (start != null) {
      let { a: endA, b: endB } = node.content.findDiffEnd(state.doc.content);
      const overlap = start - Math.min(endA, endB);
      if (overlap > 0) {
        endA += overlap;
        endB += overlap;
      }
      questionView.dispatch(
        state.tr
          .replace(start, endB, node.slice(start, endA))
          .setMeta('fromOutside', true),
      );
    }
  }

  const clickMe = () => {
    console.log(node.attrs);
    view.dispatch(view.state.tr);
  };

  return (
    <>
      <div ref={editorRef} style={styles} />
      <button onClick={clickMe}>Click me</button>
    </>
  );
};
