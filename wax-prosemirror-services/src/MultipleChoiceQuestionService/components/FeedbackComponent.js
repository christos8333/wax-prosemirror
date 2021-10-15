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
`;

const FeedBackLabel = styled.span`
  font-weight: 700;
`;

const FeedBackInput = styled.input`
  border: none;
  display: flex;
  width: 100%;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const [feedBack, setFeedBack] = useState('');
  const [isFirstRun, setFirstRun] = useState(true);
  const feedBackRef = useRef(null);

  useEffect(() => {
    const allNodes = getNodes(context.view.main);
    allNodes.forEach(singNode => {
      if (singNode.node.attrs.id === node.attrs.id) {
        if (!isFirstRun) {
          if (singNode.node.attrs.feedback === '')
            setFeedBack(singNode.node.attrs.feedback);
        }
        if (singNode.node.attrs.feedback !== '')
          setFeedBack(singNode.node.attrs.feedback);
      }
    });
  }, [getNodes(context.view.main)]);

  const handleKeyDown = e => {
    if (e.key === 'Backspace') {
      context.view.main.dispatch(
        context.view.main.state.tr.setSelection(
          TextSelection.create(context.view.main.state.tr.doc, 0),
        ),
      );
    }
  };

  const feedBackInput = () => {
    setFeedBack(feedBackRef.current.value);
  };

  const saveFeedBack = () => {
    const allNodes = getNodes(context.view.main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        context.view.main.dispatch(
          context.view.main.state.tr.setNodeMarkup(getPos(), undefined, {
            ...singleNode.node.attrs,
            feedback: feedBack,
          }),
        );
        setFirstRun(false);
      }
    });
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
  const multipleChoiceNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'multiple_choice') {
      multipleChoiceNodes.push(node);
    }
  });
  return multipleChoiceNodes;
};
