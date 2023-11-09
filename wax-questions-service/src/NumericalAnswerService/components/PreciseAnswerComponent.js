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

const PreciseAnswerComponent = () => {
  const [precise, setPrecise] = useState('');

  const preciseRef = useRef(null);

  const onChangePrecice = () => {
    setPrecise(preciseRef.current.value);
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

export default PreciseAnswerComponent;
