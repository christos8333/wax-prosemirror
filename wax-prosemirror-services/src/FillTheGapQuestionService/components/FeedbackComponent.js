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
        disabled={readOnly}
        onChange={feedBackInput}
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
