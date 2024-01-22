/* eslint-disable react/prop-types */
import React, { useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { DocumentHelpers, WaxContext, Icon } from 'wax-prosemirror-core';

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 25px;
  label {
    font-size: 12px;
  }

  input:focus {
    outline: none;
  }
`;

const ValueInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FinalResult = styled.span`
  color: ${props => (props.isCorrect ? ' #008000' : 'red')};
  font-weight: 999;
`;

const StyledIconCorrect = styled(Icon)`
  fill: #008000;
  height: 24px;
  pointer-events: none;
  width: 24px;
`;

const StyledIconWrong = styled(Icon)`
  fill: red;
  height: 24px;
  pointer-events: none;
  width: 24px;
`;

const ExactAnswerComponent = ({ node, readOnly, testMode, showFeedBack }) => {
  const context = useContext(WaxContext);
  const [exact, setExact] = useState(node.attrs.answersExact.exactAnswer || '');
  const [marginError, setMarginError] = useState(
    node.attrs.answersExact.marginError || '',
  );
  const [exactStudent, setExactStudent] = useState(
    node.attrs.answerExact || '',
  );
  const exactRef = useRef(null);
  const errorRef = useRef(null);
  const exactStudentRef = useRef(null);

  const onlyNumbers = value => {
    return value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*?)\..*/g, '$1')
      .replace(/^0[^.]/, '0');
  };

  const SaveValuesToNode = () => {
    const allNodes = getNodes(context.pmViews.main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        const obj = {
          exactAnswer: onlyNumbers(exactRef.current.value),
          marginError: onlyNumbers(errorRef.current.value),
        };

        context.pmViews.main.dispatch(
          context.pmViews.main.state.tr.setNodeMarkup(
            singleNode.pos,
            undefined,
            {
              ...singleNode.node.attrs,
              answersExact: obj,
            },
          ),
        );
      }
    });
  };

  const onChangeExact = () => {
    setExact(onlyNumbers(exactRef.current.value));
    SaveValuesToNode();
  };

  const onChangeError = () => {
    setMarginError(onlyNumbers(errorRef.current.value));
    SaveValuesToNode();
  };

  const onChangeExactStudent = () => {
    setExactStudent(onlyNumbers(exactStudentRef.current.value));
    const allNodes = getNodes(context.pmViews.main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        context.pmViews.main.dispatch(
          context.pmViews.main.state.tr.setNodeMarkup(
            singleNode.pos,
            undefined,
            {
              ...singleNode.node.attrs,
              answerExact: onlyNumbers(exactStudentRef.current.value),
            },
          ),
        );
      }
    });
  };

  // SUBMIT
  const exactMultMargin = parseFloat((exact * marginError) / 100);
  const computedMaxValue = Number(exactMultMargin) + Number(exact);
  const computedMinValue = Number(exact) - Number(exactMultMargin);
  const isCorrect = !!(
    exactStudent <= computedMaxValue && exactStudent >= computedMinValue
  );

  return (
    <AnswerContainer>
      {!testMode && !showFeedBack && (
        <>
          <ValueContainer>
            <label htmlFor="exactAnswer">
              <ValueInnerContainer>
                <span>Exact Answer</span>
                <input
                  disabled={readOnly}
                  name="exactAnswer"
                  onChange={onChangeExact}
                  ref={exactRef}
                  type="text"
                  value={exact}
                />
              </ValueInnerContainer>
            </label>
          </ValueContainer>
          <ValueContainer>
            <label htmlFor="errorAnswer">
              <ValueInnerContainer>
                <span>Margin of error (%)</span>
                <input
                  disabled={readOnly}
                  name="errorAnswer"
                  onChange={onChangeError}
                  ref={errorRef}
                  type="text"
                  value={marginError}
                />
              </ValueInnerContainer>
            </label>
          </ValueContainer>
        </>
      )}
      {testMode && (
        <ValueContainer>
          <label htmlFor="exactAnswerStudent">
            <ValueInnerContainer>
              <span>Exact Answer</span>
              <input
                name="exactAnswerStudent"
                onChange={onChangeExactStudent}
                ref={exactStudentRef}
                type="text"
                value={exactStudent}
              />
            </ValueInnerContainer>
          </label>
        </ValueContainer>
      )}
      {readOnly && showFeedBack && (
        <ResultContainer>
          <span>
            Accepted Answer Range: {computedMinValue} - {computedMaxValue}
          </span>
          <span>
            Answer:{' '}
            <FinalResult isCorrect={isCorrect}>
              {exactStudent} {isCorrect && <StyledIconCorrect name="done" />}
              {!isCorrect && <StyledIconWrong name="close" />}
            </FinalResult>
          </span>
        </ResultContainer>
      )}
    </AnswerContainer>
  );
};

const getNodes = view => {
  const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
  const numericalAnswerpContainerNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'numerical_answer_container') {
      numericalAnswerpContainerNodes.push(node);
    }
  });
  return numericalAnswerpContainerNodes;
};

export default ExactAnswerComponent;
