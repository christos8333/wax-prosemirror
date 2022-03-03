/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React, { useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const FeedBack = styled.div`
  color: black;
  margin-top: 10px;
  padding: 10px;
`;

const FeedBackLabel = styled.span`
  font-weight: 700;
`;

const FeedBackInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  display: flex;
  width: 100%;

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: rgb(170, 170, 170);
    font-style: italic;
  }
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const [feedBack, setFeedBack] = useState(' ');
  const [isFirstRun, setFirstRun] = useState(true);
  const [typing, setTyping] = useState(false);
  const feedBackRef = useRef(null);

  useEffect(() => {
    const allNodes = getNodes(context.view.main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        if (!typing || context.transaction.meta.inputType === 'Redo') {
          setFeedBack(singleNode.node.attrs.feedback);
        }
        if (!isFirstRun) {
          if (singleNode.node.attrs.feedback === '')
            setFeedBack(singleNode.node.attrs.feedback);
        }
      }
    });
  }, [getNodes(context.view.main)]);

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

  const feedBackInput = () => {
    setFeedBack(feedBackRef.current.value);
  };

  const saveFeedBack = () => {
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
    <FeedBack>
      <FeedBackLabel>Feedback</FeedBackLabel>
      <FeedBackInput
        onBlur={saveFeedBack}
        onChange={feedBackInput}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        placeholder="Insert feedback"
        ref={feedBackRef}
        type="text"
        value={feedBack}
      />
    </FeedBack>
  );
};

const getNodes = view => {
  const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
  const fillTheGapNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'fill_the_gap_container')
      fillTheGapNodes.push(node);
  });
  return fillTheGapNodes;
};
