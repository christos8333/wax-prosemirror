/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React, { useState, useContext, useEffect } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { Icon } from 'wax-prosemirror-components';
import { NodeSelection } from 'prosemirror-state';
import styled from 'styled-components';
import Switch from '../../components/Switch';

const StyledSwitch = styled(Switch)`
  display: flex;
  margin-left: auto;

  .ant-switch-checked {
    background-color: green;
  }
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

  const isEditable = view.main.props.editable(editable => {
    return editable;
  });

  const customProps = context.view.main.props.customValues;

  useEffect(() => {
    const allNodes = getNodes(main);
    allNodes.forEach(singNode => {
      if (singNode.node.attrs.id === node.attrs.id) {
        setChecked(singNode.node.attrs.correct);
      }
    });
  }, [getNodes(main)]);

  const handleChange = () => {
    setChecked(!checked);
    setCheckedAnswerMode(!checkedAnswerMode);

    const key = isEditable ? 'correct' : 'answer';
    const value = isEditable ? !checked : !checkedAnswerMode;

    main.dispatch(
      main.state.tr.setSelection(
        NodeSelection.create(main.state.doc, getPos()),
      ),
    );
    const parentContainer = DocumentHelpers.findParentOfType(
      main.state,
      main.state.config.schema.nodes.multiple_choice_single_correct_container,
    );
    let parentPosition = 0;

    main.state.doc.descendants((parentNode, parentPos) => {
      if (
        parentNode.type.name === 'multiple_choice_single_correct_container' &&
        parentNode.attrs.id === parentContainer.attrs.id
      ) {
        parentPosition = parentPos;
      }
    });

    const { tr } = main.state;

    parentContainer.descendants((element, position) => {
      if (
        element.type.name === 'multiple_choice_single_correct' &&
        element.attrs.id === node.attrs.id
      ) {
        tr.setNodeMarkup(getPos(), undefined, {
          ...element.attrs,
          [key]: value,
        });
      } else if (
        element.type.name === 'multiple_choice_single_correct' &&
        element.attrs.correct
      ) {
        tr.setNodeMarkup(parentPosition + position + 1, undefined, {
          ...element.attrs,
          [key]: false,
        });
      }
    });

    main.dispatch(tr);
  };

  if (customProps.showFeedBack) {
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

const getNodes = view => {
  const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
  const multipleChoiceNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'multiple_choice_single_correct') {
      multipleChoiceNodes.push(node);
    }
  });
  return multipleChoiceNodes;
};

export default CustomSwitch;
