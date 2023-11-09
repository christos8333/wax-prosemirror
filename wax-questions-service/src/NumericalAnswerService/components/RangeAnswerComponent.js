import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const ExactAnswerContainer = styled.div`
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

const RangeAnswerComponent = () => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  const minRef = useRef(null);
  const maxRef = useRef(null);

  const onChangeMin = () => {
    setMinValue(minRef.current.value);
  };

  const onChangeMax = () => {
    setMaxValue(maxRef.current.value);
  };

  return (
    <ExactAnswerContainer>
      <ValueContainer>
        <label htmlFor="minAnswer">
          <ValueInnerContainer>
            <span>Min</span>
            <input
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
              name="maxAnswer"
              onChange={onChangeMax}
              ref={maxRef}
              type="text"
              value={maxValue}
            />
          </ValueInnerContainer>
        </label>
      </ValueContainer>
    </ExactAnswerContainer>
  );
};

export default RangeAnswerComponent;
