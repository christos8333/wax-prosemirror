import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { DocumentHelpers } from 'wax-prosemirror-core';

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

const PreciseAnswerComponent = () => {
  const [precise, setPrecise] = useState('');

  const preciseRef = useRef(null);

  const onlyNumbers = value => {
    return value
      .replace(/[^0-9.;]/g, '')
      .replace(/(\..*?)\..*/g, '$1')
      .replace(/^0[^.]/, '0');
  };

  const onChangePrecice = () => {
    setPrecise(onlyNumbers(preciseRef.current.value));
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
