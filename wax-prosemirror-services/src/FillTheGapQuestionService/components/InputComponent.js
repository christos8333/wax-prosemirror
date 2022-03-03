/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React, { useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const AnswerInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  color: #535e76;
  display: inline-flex;
  width: 120px;

  &:focus {
    outline: none;
  }
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const [answer, setAnswer] = useState(' ');
  const [typing, setTyping] = useState(false);
  const answerRef = useRef(null);

  useEffect(() => {}, []);

  const handleKeyDown = e => {
    setTyping(true);
    if (e.key === 'Backspace') {
      context.view.main.dispatch(
        context.view.main.state.tr.setSelection(
          TextSelection.create(context.view.main.state.tr.doc, null),
        ),
      );
    }
  };

  const setAnswerInput = () => {
    setAnswer(answerRef.current.value);
  };

  const saveAnswer = () => {
    return false;
  };

  const onFocus = () => {
    context.view.main.dispatch(
      context.view.main.state.tr.setSelection(
        TextSelection.create(context.view.main.state.tr.doc, null),
      ),
    );
  };

  return (
    <AnswerInput
      onBlur={saveAnswer}
      onChange={setAnswerInput}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      ref={answerRef}
      type="text"
      value={answer}
    />
  );
};
