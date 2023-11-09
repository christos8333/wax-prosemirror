import React, { useRef, useState } from 'react';
import styled from 'styled-components';

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

const ExactAnswerComponent = () => {
  const [exact, setExact] = useState('');
  const [marginError, setMarginError] = useState('');

  const exactRef = useRef(null);
  const errorRef = useRef(null);

  const onChangeExact = () => {
    setExact(exactRef.current.value);
  };

  const onChangeError = () => {
    setMarginError(errorRef.current.value);
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

export default ExactAnswerComponent;
