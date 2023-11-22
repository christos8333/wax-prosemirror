/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Icon } from 'wax-prosemirror-core';
import Switch from './Switch';

const StyledSwitch = styled(Switch)`
  display: flex;
  margin-left: auto;
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
const YesNoSwitch = ({
  customProps,
  node: { node },
  isEditable,
  handleChange,
  checked,
  checkedAnswerMode,
}) => {
  const { testMode, showFeedBack } = customProps;

  if (showFeedBack && node) {
    const correct = node.attrs.correct ? 'YES' : 'NO';
    const answer = node.attrs.answer ? 'YES' : 'NO';
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
      checkedChildren="YES"
      disabled={!isEditable && !testMode}
      label="Correct?"
      labelPosition="left"
      onChange={handleChange}
      text={node?.textContent}
      unCheckedChildren="NO"
    />
  );
};

export default YesNoSwitch;
