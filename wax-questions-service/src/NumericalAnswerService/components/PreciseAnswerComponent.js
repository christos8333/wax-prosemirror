import React, { useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { DocumentHelpers, WaxContext } from 'wax-prosemirror-core';

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

const PreciseAnswerComponent = ({ node }) => {
  const context = useContext(WaxContext);
  const [precise, setPrecise] = useState('');

  const preciseRef = useRef(null);

  const onlyNumbers = value => {
    return value
      .replace(/[^0-9.;]/g, '')
      .replace(/(\..*?)\..*/g, '$1')
      .replace(/^0[^.]/, '0');
  };

  const SaveValuesToNode = () => {
    const allNodes = getNodes(context.pmViews.main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        const obj = {
          exactAnswer: onlyNumbers(preciseRef.current.value),
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

  return (
    <AnswerContainer>
      <ValueContainer>
        <label htmlFor="preciseAnswer">
          <ValueInnerContainer>
            <span>Precise Answer</span>
            <input
              name="preciseAnswer"
              onChange={onChangePrecice}
              ref={preciseRef}
              type="text"
              value={precise}
            />
          </ValueInnerContainer>
        </label>
      </ValueContainer>
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
