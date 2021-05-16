/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';
import EditorComponent from './EditorComponent';

const QuestionWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const Question = styled.div`
  display: flex;
  flex-direction: row;

  input {
    position: relative;
    top: 5px;
    width: 4%;
  }

  .ProseMirror {
    background: #ebebf0;
    padding: 5px;
    width: 96%;
  }
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanationValue, setExplanationValue] = useState('');
  const explanationRef = useRef(null);

  const onChangeExplanationInput = () => {
    setExplanationValue(explanationRef.current.value);
  };

  const clickMe = () => {
    setShowExplanation(!showExplanation);
  };

  const handleKeyDown = e => {
    if (e.key === 'Backspace') {
      context.view.main.dispatch(
        context.view.main.state.tr.setSelection(
          new TextSelection(context.view.main.state.tr.doc.resolve(0)),
        ),
      );
    }
  };

  return (
    <QuestionWrapper>
      <Question>
        <input type="checkbox" />
        <EditorComponent node={node} view={view} getPos={getPos} />
      </Question>
      <button onClick={clickMe}>Show Explanation</button>
      {showExplanation && (
        <input
          type="text"
          onKeyDown={handleKeyDown}
          ref={explanationRef}
          onChange={onChangeExplanationInput}
          placeholder="type your explanation"
          value={explanationValue}
        ></input>
      )}
    </QuestionWrapper>
  );
};
