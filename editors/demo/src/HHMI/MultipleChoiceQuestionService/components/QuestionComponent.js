/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';
import EditorComponent from './EditorComponent';
import FeedbackComponent from './FeedbackComponent';

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  &:before {
    bottom: -20px;
    content: 'Answer ' counter(question-item-multiple);
    counter-increment: question-item-multiple;
    position: relative;
  }
`;

const QuestionWrapperInner = styled.div`
  border: 1px solid #a5a1a2;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

const CorrectLabel = styled.span`
  margin-left: auto;
`;

const ChooseAnswer = styled.div`
  border: 1px solid #a5a1a2;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  height: 25px;
  margin-left: auto;
  padding: 4px;
  >div: first-of-type {
    padding-right: 4px;
  }
`;

const YesNoContainer = styled.div`
  bottom: 3px;
  color: #a5a1a2;
  position: relative;
`;

const Question = styled.div`
  display: flex;
  flex-direction: row;

  .ProseMirror {
    background: #ebebf0;
    padding: 5px;
    width: 90%;
  }
`;

export default ({ node, view, getPos }) => {
  console.log(node);
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

  const removeOption = () => {};

  const setNoYesValues = () => {};

  return (
    <QuestionWrapper>
      <CorrectLabel>Correct?</CorrectLabel>
      <QuestionWrapperInner>
        <Question>
          <EditorComponent node={node} view={view} getPos={getPos} />
          <ChooseAnswer>
            <YesNoContainer onClick={setNoYesValues}>No</YesNoContainer>
            <YesNoContainer onClick={setNoYesValues}>Yes</YesNoContainer>
          </ChooseAnswer>
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
        <button onClick={removeOption}> X </button>
      </QuestionWrapperInner>
    </QuestionWrapper>
  );
};
