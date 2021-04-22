/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { StepMap } from 'prosemirror-transform';
import styled from 'styled-components';

const styles = {
  border: '1px solid black',
};

const EditorWrapper = styled.div`
  pointer-events: visible;
  user-select: all;
`;

let showExp = false;
let questionView;
export default ({ node, view, getPos }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const editorRef = useRef();
  const setEditorRef = useCallback(
    // eslint-disable-next-line consistent-return
    editorNode => {
      if (editorRef.current) {
        console.log(editorRef);
      }
      if (editorNode) {
        questionView = new EditorView(
          { mount: editorNode },
          {
            state: EditorState.create({
              doc: node,
            }),
            dispatchTransaction,
            scrollMargin: 200,
            scrollThreshold: 200,

            attributes: {
              spellcheck: 'false',
            },
          },
        );
      }
      editorRef.current = editorNode;
    },
    [],
  );
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
    setShowExplanation(true);
    showExp = true;
    view.dispatch(view.state.tr);
  };

  const MemorizedComponent = useMemo(
    () => (
      <>
        <EditorWrapper ref={setEditorRef} style={styles} />
        <button onClick={clickMe}>Add Explanation</button>
        {showExplanation && <input type="text"></input>}
      </>
    ),
    [showExplanation],
  );
  console.log(showExplanation);
  return (
    <>
      <EditorWrapper ref={setEditorRef} style={styles} />
      <button onClick={clickMe}>Show Explanation</button>
      {showExp && (
        <input type="text" placeholder="type your explanation"></input>
      )}
    </>
  );
};
