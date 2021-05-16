/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

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
    console.log(e.key);
    if (e.key === 'Backspace') {
      console.log('do validate');
      e.preventDefault();
      e.stopPropagation();
      return;
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
