/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React, { useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';
import { grid, th } from '@pubsweet/ui-toolkit';

const FeedBack = styled.div`
  color: black;
  margin-top: 10px;
`;

const FeedBackLabel = styled.span`
  font-weight: 700;
`;

const FeedBackTextArea = styled.textarea`
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-family: ${th('fontWriting')};
  position: relative;
  right: 5px;
  width: 100%;
  min-height: 20px;

  &:focus {
    outline: none;
  }
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const [feedBack, setFeedBack] = useState('');
  const feedBackRef = useRef(null);

  useEffect(() => {}, []);

  const handleKeyDown = e => {};

  const feedBackInput = () => {
    setFeedBack(feedBackRef.current.value);
  };

  const saveFeedBack = () => {
    return true;
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
      <FeedBackTextArea
        cols="2"
        onBlur={saveFeedBack}
        onChange={feedBackInput}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        placeholder="Insert feedback"
        ref={feedBackRef}
        rows="2"
        type="text"
        value={feedBack}
      />
    </FeedBack>
  );
};
