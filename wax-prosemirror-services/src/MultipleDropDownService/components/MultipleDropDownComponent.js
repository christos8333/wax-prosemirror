/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { Icon } from 'wax-prosemirror-components';
import styled, { css } from 'styled-components';
import ReadOnlyDropDown from './ReadOnlyDropDown';

const activeStylesContainer = css`
  background: #535e76;
  border-radius: 2px;
`;

const activeStylesSvg = css`
  fill: white !important;
`;

const StyledIconActionContainer = styled.div`
  display: inline-block;
  padding: 2px;
  ${props => props.isActive && activeStylesContainer}
`;

const StyledIconAction = styled(Icon)`
  height: 24px;
  width: 24px;
  cursor: pointer;

  ${props => props.isActive && activeStylesSvg}
`;

const CorrectAnswer = styled.span`
  color: green;
`;

const Answer = styled.span`
  color: green;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
    pmViews,
    activeViewId,
  } = context;

  const [isActive, setIsActive] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(
    node.attrs.options.find(option => option.value === node.attrs.correct),
  );
  const customProps = main.props.customValues;
  const posFrom = pmViews[activeViewId].state.selection.from;

  const isEditable = main.props.editable(editable => {
    return editable;
  });
  const readOnly = !isEditable;
  console.log(correctAnswer, node);
  useEffect(() => {
    setIsActive(false);
    if (getPos() === posFrom) {
      setIsActive(true);
    }
  }, [posFrom, correctAnswer]);

  if (!readOnly)
    return correctAnswer ? (
      <span> {correctAnswer.label}</span>
    ) : (
      <StyledIconActionContainer isActive={isActive}>
        <StyledIconAction isActive={isActive} name="mulitpleDropDown" />
      </StyledIconActionContainer>
    );

  if (!(readOnly && customProps && !customProps.showFeedBack)) {
    const answer = node.attrs.options.find(
      option => option.value === node.attrs.answer,
    );

    return (
      <>
        {correctAnswer && <CorrectAnswer>{correctAnswer.label}</CorrectAnswer>}
        {answer && <Answer>{answer.label}</Answer>}
      </>
    );
  }

  return (
    <ReadOnlyDropDown
      getPos={getPos}
      node={node}
      options={node.attrs.options}
    />
  );
};
