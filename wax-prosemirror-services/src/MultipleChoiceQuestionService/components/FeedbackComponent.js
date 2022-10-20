/* eslint-disable react/prop-types */

import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
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

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: rgb(170, 170, 170);
    font-style: italic;
  }
`;

export default ({ node, view, getPos, readOnly }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const [feedBack, setFeedBack] = useState(node.attrs.feedback);
  const feedBackRef = useRef(null);

  const feedBackInput = () => {
    setFeedBack(feedBackRef.current.value);
    const allNodes = getNodes(main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr.setNodeMarkup(getPos(), undefined, {
            ...singleNode.node.attrs,
            feedback: feedBack,
          }),
        );
      }
    });
    return false;
  };

  return (
    <FeedBack>
      <FeedBackLabel>Feedback</FeedBackLabel>
      <FeedBackInput
        autoFocus="autoFocus"
        onChange={feedBackInput}
        placeholder="Insert feedback"
        readOnly={readOnly}
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
    if (
      node.node.type.name === 'multiple_choice' ||
      node.node.type.name === 'multiple_choice_single_correct' ||
      node.node.type.name === 'true_false' ||
      node.node.type.name === 'true_false_single_correct'
    ) {
      multipleChoiceNodes.push(node);
    }
  });
  return multipleChoiceNodes;
};
