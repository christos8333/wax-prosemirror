import React, { useContext, useEffect, useState } from 'react';
import { WaxContext, Icon } from 'wax-prosemirror-core';
import { v4 as uuidv4 } from 'uuid';
import styled, { css } from 'styled-components';
import ReadOnlyDropDown from './ReadOnlyDropDown';

const activeStylesContainer = css`
  background: #535e76;
  border-radius: 2px;
`;

const activeStylesSvg = css`
  fill: white !important;
`;

const StyledIconActionContainer = styled.span`
  font-variant-numeric: lining-nums proportional-nums;
  display: inline-block;
  height: 24px;
  width: 24px;
  cursor: pointer;
  ${props => props.isActive && activeStylesContainer}
`;

const StyledIconAction = styled(Icon)`
  ${props => props.isActive && activeStylesSvg}
  display: inline-block;
`;

const AnswerContainer = styled.div`
  display: inline-block;
  border-bottom: ${props =>
    props.isCorrect ? '1px solid #008000;' : '1px solid #FF3030'};
  border-top: ${props =>
    props.isCorrect ? '1px solid #008000;' : '1px solid #FF3030'};
  border-radius: 192px;
  padding: 2px 4px 2px 4px;
`;

const CorrectAnswer = styled.span``;

const Answer = styled.span``;

export default ({ node, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
    pmViews,
    activeViewId,
  } = context;

  const [isActive, setIsActive] = useState(false);

  const customProps = main.props.customValues;
  const posFrom = pmViews[activeViewId].state.selection.from;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;
  useEffect(() => {
    setIsActive(false);
    if (getPos() === posFrom) {
      setIsActive(true);
    }
  }, [posFrom]);

  if (!readOnly) {
    return (
      <StyledIconActionContainer isActive={isActive}>
        1
        {/* <StyledIconAction isActive={isActive} name="mulitpleDropDown" /> */}
      </StyledIconActionContainer>
    );
  }

  if (!(readOnly && customProps && !customProps.showFeedBack)) {
    const answer = node.attrs.options.find(
      option => option.value === node.attrs.answer,
    );

    const correct = node.attrs.options.find(
      option => option.value === node.attrs.correct,
    );

    const isCorrect = node.attrs.correct === node.attrs.answer;

    return (
      <AnswerContainer isCorrect={isCorrect}>
        Correct:
        {correct && <CorrectAnswer> {correct.label} | &nbsp;</CorrectAnswer>}
        Answer: {answer && <Answer> {answer.label}</Answer>}
      </AnswerContainer>
    );
  }

  return <ReadOnlyDropDown getPos={getPos} node={node} uniqueId={uuidv4()} />;
};
