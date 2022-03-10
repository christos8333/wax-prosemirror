/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React, { useState, useContext, useEffect } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { Icon } from 'wax-prosemirror-components';
import styled from 'styled-components';
import Switch from '../../components/Switch';

const StyledSwitch = styled(Switch)`
  display: flex;
  margin-left: auto;

    button {
    width: 65px;
  }

  .rc-switch-inner {
    left: 25px;
    font-size: 14px;
  }

  .rc-switch-checked {
    border: 1px solid #008000;
    background-color: #008000;

    .rc-switch-inner {
      left: 6px;
    }
    :after {
      left: 42px;
   
`;

const AnswerContainer = styled.span`
  margin-left: auto;
`;

const Correct = styled.span`
  margin-right: 10px;
  span {
   color: #008000;
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

const CustomSwitch = ({ node, getPos }) => {
  const context = useContext(WaxContext);
  const [checked, setChecked] = useState(false);
  const [checkedAnswerMode, setCheckedAnswerMode] = useState(false);

  const {
    view,
    view: { main },
  } = context;

  const customProps = context.view.main.props.customValues;

  const isEditable = view.main.props.editable(editable => {
    return editable;
  });

  useEffect(() => {
    const allNodes = getNodes(main);
    allNodes.forEach(singNode => {
      if (singNode.node.attrs.id === node.attrs.id) {
        setChecked(singNode.node.attrs.correct);
        setCheckedAnswerMode(singNode.node.attrs.answer);
      }
    });
  }, [getNodes(main)]);

  const handleChange = () => {
    setChecked(!checked);
    setCheckedAnswerMode(!checkedAnswerMode);
    const key = isEditable ? 'correct' : 'answer';
    const value = isEditable ? !checked : !checkedAnswerMode;
    const allNodes = getNodes(main);

    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr.setNodeMarkup(getPos(), undefined, {
            ...singleNode.node.attrs,
            [key]: value,
          }),
        );
      }
    });
  };

  if (customProps.showFeedBack) {
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
      checked={isEditable ? checked : checkedAnswerMode}
      checkedChildren="True"
      label="True/false?"
      labelPosition="left"
      onChange={handleChange}
      unCheckedChildren="False"
    />
  );
};

const getNodes = view => {
  const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
  const multipleChoiceNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'true_false') {
      multipleChoiceNodes.push(node);
    }
  });
  return multipleChoiceNodes;
};

export default CustomSwitch;
