import React, { useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { DocumentHelpers, WaxContext } from 'wax-prosemirror-core';

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

export default ({ node }) => {
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
    const allNodes = getNodes(main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr.setNodeMarkup(singleNode.pos, undefined, {
            ...singleNode.node.attrs,
            answer: answerRef.current.value,
          }),
        );
      }
    });
  };

  const onFocus = () => {
    main.dispatch(
      main.state.tr.setSelection(TextSelection.create(main.state.tr.doc, null)),
    );
  };

  return (
    <AnswerInput
      aria-label="answer input"
      onChange={setAnswerInput}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      ref={answerRef}
      type="text"
      value={answer}
    />
  );
};

const getNodes = main => {
  const allNodes = DocumentHelpers.findInlineNodes(main.state.doc);
  const fillTheGapNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'fill_the_gap') {
      fillTheGapNodes.push(node);
    }
  });
  return fillTheGapNodes;
};
