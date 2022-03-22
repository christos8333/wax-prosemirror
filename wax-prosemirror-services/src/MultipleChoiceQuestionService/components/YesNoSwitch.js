/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Icon } from 'wax-prosemirror-components';
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
  pointer-events: none;
  height: 24px;
  width: 24px;
`;

const StyledIconWrong = styled(Icon)`
  fill: red;
  pointer-events: none;
  height: 24px;
  width: 24px;
`;
const YesNoSwitch = ({
  customProps,
  node,
  isEditable,
  handleChange,
  checked,
  checkedAnswerMode,
}) => {
  if (customProps && customProps.showFeedBack) {
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
      checked={isEditable ? checked : checkedAnswerMode}
      checkedChildren="YES"
      label="Correct?"
      labelPosition="left"
      onChange={handleChange}
      unCheckedChildren="NO"
    />
  );
};

export default YesNoSwitch;
