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

const ExactAnswerComponent = ({ getPos, node }) => {
  const context = useContext(WaxContext);
  const { activeView } = context;
  const [exact, setExact] = useState('');
  const [marginError, setMarginError] = useState('');

  const exactRef = useRef(null);
  const errorRef = useRef(null);

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

  return (
    <AnswerContainer>
      <ValueContainer>
        <label htmlFor="exactAnswer">
          <ValueInnerContainer>
            <span>Exact Answer</span>
            <input
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
              name="errorAnswer"
              onChange={onChangeError}
              ref={errorRef}
              type="text"
              value={marginError}
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

export default ExactAnswerComponent;
