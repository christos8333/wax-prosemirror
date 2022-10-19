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

  const [feedBack, setFeedBack] = useState(' ');
  const [isFirstRun, setFirstRun] = useState(true);
  const [typing, setTyping] = useState(false);
  const feedBackRef = useRef(null);

  useEffect(() => {
    const allNodes = getNodes(main);
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
  }, [getNodes(main)]);

  const handleKeyDown = e => {
    setTyping(true);
    if (e.key === 'Backspace') {
      main.dispatch(
        main.state.tr.setSelection(
          TextSelection.create(main.state.tr.doc, null),
        ),
      );
    }
  };

  const feedBackInput = () => {
    setFeedBack(feedBackRef.current.value);
  };

  const saveFeedBack = () => {
    const allNodes = getNodes(main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr.setNodeMarkup(getPos(), undefined, {
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
    main.dispatch(
      main.state.tr.setSelection(TextSelection.create(main.state.tr.doc, null)),
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
