/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';

import EditorComponent from './EditorComponent';
import FeedbackComponent from './FeedbackComponent';
import SwitchComponent from './SwitchComponent';
import Button from './Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InfoRow = styled.div`
  color: black;
  display: flex;
  flex-direction: row;
  padding: 10px 0px 4px 0px;
`;

const QuestionNunber = styled.span``;

const QuestionControlsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const QuestionWrapper = styled.div`
  border: 1px solid #a5a1a2;
  border-radius: 4px;
  color: black;
  display: flex;
  flex: 2 1 auto;
  flex-direction: column;
  padding: 10px;
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    border: none;
  }

  span {
    cursor: pointer;
  }
`;

const QuestionData = styled.div`
  align-items: normal;
  display: flex;
  flex-direction: row;
`;

const FeedBack = styled.div`
  color: black;
  margin-top: 10px;
`;

const FeedBackLabel = styled.span`
  font-weight: 700;
`;

const FeedBackInput = styled.input`
  border: none;
  display: flex;
  width: 100%;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    view: { main },
  } = context;

  const [showExplanation, setShowExplanation] = useState(false);
  const [feadBack, setFeedBack] = useState('');

  const feedBackRef = useRef(null);

  const onChangeExplanationInput = () => {
    setFeedBack(feedBackRef.current.value);
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

  const removeOption = () => {
    main.state.doc.nodesBetween(getPos(), getPos() + 1, (nodes, pos) => {
      if (nodes.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr.deleteRange(getPos(), getPos() + nodes.nodeSize + 1),
        );
      }
    });
  };

  const setNoYesValues = () => {};

  const addOption = () => {};

  const questionNumber = 1;
  const questionText = '';
  const readOnly = false;
  const feedBackInput = '';
  const showAddIcon = true;
  const showRemoveIcon = true;

  return (
    <Wrapper>
      <InfoRow>
        <QuestionNunber>Answer {questionNumber}</QuestionNunber>
      </InfoRow>
      <QuestionControlsWrapper>
        <QuestionWrapper>
          <QuestionData>
            <EditorComponent node={node} view={view} getPos={getPos} />

            <SwitchComponent />
          </QuestionData>
          <FeedBack>
            <FeedBackLabel>Feedback</FeedBackLabel>
            <FeedBackInput
              onChange={feedBackInput}
              placeholder="Insert feedback"
              ref={feedBackRef}
              type="text"
              value={feadBack}
            />
          </FeedBack>
        </QuestionWrapper>
        <IconsWrapper>
          {showAddIcon && !readOnly && (
            <Button
              icon={
                <PlusSquareOutlined onClick={addOption} title="Add Option" />
              }
            />
          )}
          {showRemoveIcon && !readOnly && (
            <Button
              icon={
                <DeleteOutlined onClick={removeOption} title="Delete Option" />
              }
            />
          )}
        </IconsWrapper>
      </QuestionControlsWrapper>
    </Wrapper>

    // <QuestionWrapper>
    //   <CorrectLabel>Correct?</CorrectLabel>
    //   <QuestionWrapperInner>
    //     <Question>
    //       <EditorComponent node={node} view={view} getPos={getPos} />
    //       <ChooseAnswer>
    //         <SwitchComponent />
    //       </ChooseAnswer>
    //     </Question>
    //     <button onClick={clickMe}>Show Explanation</button>
    //     {showExplanation && (
    //       <input
    //         type="text"
    //         onKeyDown={handleKeyDown}
    //         ref={explanationRef}
    //         onChange={onChangeExplanationInput}
    //         placeholder="type your explanation"
    //         value={explanationValue}
    //       ></input>
    //     )}
    //     <button onClick={removeOption}> X </button>
    //   </QuestionWrapperInner>
    // </QuestionWrapper>
  );
};
