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

const RangeAnswerComponent = ({ node }) => {
  const context = useContext(WaxContext);
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  const minRef = useRef(null);
  const maxRef = useRef(null);

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
          maxError: onlyNumbers(maxRef.current.value),
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

  return (
    <AnswerContainer>
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
