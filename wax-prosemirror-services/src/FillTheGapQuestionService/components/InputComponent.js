import React, { useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';

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

export default () => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const [answer, setAnswer] = useState(' ');
  const answerRef = useRef(null);

  useEffect(() => {}, []);

  const handleKeyDown = e => {
    if (e.key === 'Backspace') {
      main.dispatch(
        main.state.tr.setSelection(
          TextSelection.create(main.state.tr.doc, null),
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
    main.dispatch(
      main.state.tr.setSelection(TextSelection.create(main.state.tr.doc, null)),
    );
  };

  return (
    <AnswerInput
      aria-label="answer input"
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
