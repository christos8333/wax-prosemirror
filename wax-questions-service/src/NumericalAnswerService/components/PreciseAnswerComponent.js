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

const PreciseAnswerComponent = ({ node, readOnly, testMode, showFeedBack }) => {
  const context = useContext(WaxContext);
  const [precise, setPrecise] = useState(
    node?.attrs?.answersPrecise?.preciseAnswer || '',
  );

  const [preciseStudent, setPreciseStudent] = useState(
    node.attrs.answerPrecise || '',
  );

  const preciseRef = useRef(null);
  const preciseStudentRef = useRef(null);

  const onlyNumbers = value => {
    return value
      .replace(/[^-?0-9.;]/g, '')
      .replace(/(\..*?)\..*/g, '$1')
      .replace(/^0[^.]/, '0');
  };

  const SaveValuesToNode = () => {
    const allNodes = getNodes(context.pmViews.main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        const obj = {
          preciseAnswer: onlyNumbers(preciseRef.current.value),
        };

        context.pmViews.main.dispatch(
          context.pmViews.main.state.tr.setNodeMarkup(
            singleNode.pos,
            undefined,
            {
              ...singleNode.node.attrs,
              answersPrecise: obj,
            },
          ),
        );
      }
    });
  };

  const onChangePrecice = () => {
    setPrecise(onlyNumbers(preciseRef.current.value));
    SaveValuesToNode();
  };

  const onChangePreciseStudent = () => {
    setPreciseStudent(onlyNumbers(preciseStudentRef.current.value));
    const allNodes = getNodes(context.pmViews.main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        context.pmViews.main.dispatch(
          context.pmViews.main.state.tr.setNodeMarkup(
            singleNode.pos,
            undefined,
            {
              ...singleNode.node.attrs,
              answerPrecise: onlyNumbers(preciseStudentRef.current.value),
            },
          ),
        );
      }
    });
  };

  const isCorrect = precise
    .split(';')
    .find(element => element === preciseStudent.trim());

  return (
    <AnswerContainer>
      {!testMode && !showFeedBack && (
        <ValueContainer>
          <label htmlFor="preciseAnswer">
            <ValueInnerContainer>
              <span>Precise Answer</span>
              <input
                disabled={readOnly}
                name="preciseAnswer"
                onChange={onChangePrecice}
                ref={preciseRef}
                type="text"
                value={node?.attrs?.answersPrecise?.preciseAnswer || precise}
              />
            </ValueInnerContainer>
          </label>
        </ValueContainer>
      )}
      {testMode && (
        <ValueContainer>
          <label htmlFor="exactAnswerStudent">
            <ValueInnerContainer>
              <span>Precise Answer</span>
              <input
                name="exactAnswerStudent"
                onChange={onChangePreciseStudent}
                ref={preciseStudentRef}
                type="text"
                value={preciseStudent}
              />
            </ValueInnerContainer>
          </label>
        </ValueContainer>
      )}
      {readOnly && showFeedBack && (
        <ResultContainer>
          <span>{`(Accepted Answers : ${precise.replaceAll(';', '; ')})`}</span>
          <span>
            Answer:{' '}
            <FinalResult isCorrect={isCorrect}>
              {preciseStudent} {isCorrect && <StyledIconCorrect name="done" />}
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

export default PreciseAnswerComponent;
