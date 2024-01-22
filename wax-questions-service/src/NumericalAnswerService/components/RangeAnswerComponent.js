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

const RangeAnswerComponent = ({ node, readOnly, testMode, showFeedBack }) => {
  const context = useContext(WaxContext);
  const [minValue, setMinValue] = useState(
    node.attrs.answersRange.minAnswer || '',
  );
  const [maxValue, setMaxValue] = useState(
    node.attrs.answersRange.maxAnswer || '',
  );

  const [rangeStudentValue, setRangeStudentValue] = useState(
    node.attrs.answerRange || '',
  );

  const minRef = useRef(null);
  const maxRef = useRef(null);
  const rangeStudentRef = useRef(null);

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
          minAnswer: onlyNumbers(minRef.current.value),
          maxAnswer: onlyNumbers(maxRef.current.value),
        };

        context.pmViews.main.dispatch(
          context.pmViews.main.state.tr.setNodeMarkup(
            singleNode.pos,
            undefined,
            {
              ...singleNode.node.attrs,
              answersRange: obj,
            },
          ),
        );
      }
    });
  };

  const onChangeMin = () => {
    setMinValue(onlyNumbers(minRef.current.value));
    SaveValuesToNode();
  };

  const onChangeMax = () => {
    setMaxValue(onlyNumbers(maxRef.current.value));
    SaveValuesToNode();
  };

  const onChangeRangeStudent = () => {
    setRangeStudentValue(onlyNumbers(rangeStudentRef.current.value));
    const allNodes = getNodes(context.pmViews.main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        context.pmViews.main.dispatch(
          context.pmViews.main.state.tr.setNodeMarkup(
            singleNode.pos,
            undefined,
            {
              ...singleNode.node.attrs,
              answerRange: onlyNumbers(rangeStudentRef.current.value),
            },
          ),
        );
      }
    });
  };

  // SUBMIT

  const isCorrect = !!(
    Number(rangeStudentValue) <= Number(maxValue) &&
    Number(rangeStudentValue) >= Number(minValue)
  );

  return (
    <AnswerContainer>
      {!testMode && !showFeedBack && (
        <>
          <ValueContainer>
            <label htmlFor="minAnswer">
              <ValueInnerContainer>
                <span>Min</span>
                <input
                  disabled={readOnly}
                  name="minAnswer"
                  onChange={onChangeMin}
                  ref={minRef}
                  type="text"
                  value={minValue}
                />
              </ValueInnerContainer>
            </label>
          </ValueContainer>
          <ValueContainer>
            <label htmlFor="maxAnswer">
              <ValueInnerContainer>
                <span>Max</span>
                <input
                  disabled={readOnly}
                  name="maxAnswer"
                  onChange={onChangeMax}
                  ref={maxRef}
                  type="text"
                  value={maxValue}
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
              <span>Answer</span>
              <input
                name="exactAnswerStudent"
                onChange={onChangeRangeStudent}
                ref={rangeStudentRef}
                type="text"
                value={rangeStudentValue}
              />
            </ValueInnerContainer>
          </label>
        </ValueContainer>
      )}
      {readOnly && showFeedBack && (
        <ResultContainer>
          <span>
            Accepted Answer Range: {minValue} - {maxValue}
          </span>
          <span>
            Answer:{' '}
            <FinalResult isCorrect={isCorrect}>
              {rangeStudentValue}{' '}
              {isCorrect && <StyledIconCorrect name="done" />}
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

export default RangeAnswerComponent;
