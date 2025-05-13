import React, { useContext, useRef, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core';

const FeedBack = styled.div`
  color: black;
  margin-top: 10px;
`;

const FeedBackLabel = styled.span`
  font-weight: 700;
`;

const FeedBackInput = styled.textarea`
  border: none;
  display: flex;
  font-family: Fira Sans Condensed;
  width: 100%;
  resize: vertical;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  background-attachment: local;
  background-image: linear-gradient(to right, white 10px, transparent 10px),
    linear-gradient(to left, white 10px, transparent 10px),
    repeating-linear-gradient(
      white,
      white 30px,
      #ccc 30px,
      #ccc 31px,
      white 31px
    );
  line-height: 31px;
  padding: 8px 10px;

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: rgb(170, 170, 170);
    font-style: italic;
  }
`;

export default ({ node, getPos, readOnly }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const [isFirstRun, setFirstRun] = useState(true);
  const [feedBack, setFeedBack] = useState(node?.attrs?.feedback || '');
  const feedBackRef = useRef(null);

  const feedBackInput = () => {
    setFeedBack(feedBackRef.current.value);
    const allNodes = getNodes(main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node?.attrs?.id) {
        main.dispatch(
          main.state.tr.setNodeMarkup(getPos(), undefined, {
            ...singleNode.node.attrs,
            feedback: feedBackRef.current.value,
          }),
        );
      }
    });
    setNullSelection();
    setHeight();
    return false;
  };

  const setHeight = () => {
    const textarea = feedBackRef.current;
    if (!textarea) return;
    const heightLimit = 200;
    textarea.style.height = '';
    textarea.style.height = `${Math.min(textarea.scrollHeight, heightLimit)}px`;
  };

  const setNullSelection = () => {
    main.dispatch(
      main.state.tr.setSelection(TextSelection.create(main.state.tr.doc, null)),
    );
  };

  const onFocus = () => {
    setTimeout(() => {
      setNullSelection();
    }, 50);
  };

  useEffect(() => {
    setTimeout(() => {
      setFirstRun(false);
    });
  }, []);

  return useMemo(
    () => (
      <FeedBack>
        <FeedBackLabel>Feedback</FeedBackLabel>
        <FeedBackInput
          onChange={feedBackInput}
          onFocus={onFocus}
          placeholder="Insert feedback"
          readOnly={readOnly}
          ref={feedBackRef}
          rows="1"
          style={{ height: setHeight() }}
          type="text"
          value={node?.attrs?.feedback || feedBack}
        />
      </FeedBack>
    ),
    [feedBack, isFirstRun, node?.attrs?.feedback],
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
      node.node.type.name === 'true_false_single_correct' ||
      node.node.type.name === 'matching_container' ||
      node.node.type.name === 'fill_the_gap_container' ||
      node.node.type.name === 'multiple_drop_down_container' ||
      node.node.type.name === 'numerical_answer_container'
    ) {
      multipleChoiceNodes.push(node);
    }
  });
  return multipleChoiceNodes;
};
