/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Icon } from 'wax-prosemirror-core';
import Switch from '../../components/Switch';

const StyledSwitch = styled(Switch)`
  display: flex;
  margin-left: auto;

  button {
    width: 65px;
  }

  .rc-switch-inner {
    font-size: 14px;
    left: 25px;
  }

  .rc-switch-checked {
    background-color: #008000;
    border: 1px solid #008000;

    .rc-switch-inner {
      left: 6px;
    }

    :after {
      left: 42px;
    }
  }
`;

const AnswerContainer = styled.span`
  margin-left: auto;
`;

const Correct = styled.span`
  margin-right: 10px;

  span {
    color: #008000;
  }
`;

const Answer = styled.span`
  margin-right: 10px;

  span {
    color: ${props => (props.isCorrect ? ' #008000' : 'red')};
  }
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

const TrueFalseSwitch = ({
  customProps,
  node: { node },
  isEditable,
  handleChange,
  checked,
  checkedAnswerMode,
}) => {
  const { testMode, showFeedBack } = customProps;

  if (showFeedBack) {
    const correct = node.attrs.correct ? 'TRUE' : 'FALSE';
    const answer = node.attrs.answer ? 'TRUE' : 'FALSE';
    const isCorrect = node.attrs.correct === node.attrs.answer;

    return (
      <AnswerContainer>
        <Correct>
          Correct:
          <span>{correct}</span>
        </Correct>

        <Answer isCorrect={isCorrect}>
          Answer: <span>{answer}</span>
        </Answer>
        {isCorrect && <StyledIconCorrect name="done" />}
        {!isCorrect && <StyledIconWrong name="close" />}
      </AnswerContainer>
    );
  }

  return (
    <StyledSwitch
      checked={
        isEditable || (!isEditable && !testMode) ? checked : checkedAnswerMode
      }
      checkedChildren="True"
      disabled={!isEditable && !testMode}
      label="True/False?"
      labelPosition="left"
      onChange={handleChange}
      unCheckedChildren="False"
    />
  );
};

export default TrueFalseSwitch;
