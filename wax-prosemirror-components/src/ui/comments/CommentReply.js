import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { grid, th } from '@pubsweet/ui-toolkit';

const Wrapper = styled.div`
  background: #e2e2e2;
  display: flex;
  flex-direction: column;
  padding: ${grid(2)} ${grid(4)};
`;

const TextWrapper = styled.div``;

const ReplyTextArea = styled.textarea`
  background: #e2e2e2;
  box-sizing: border-box;
  font-family: ${th('fontWriting')};
  width: 100%;
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
`;

const primary = css`
  background: gray;
  color: white;
`;

const Button = styled.button`
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  color: gray;
  padding: ${grid(2)} ${grid(4)};

  ${props => props.primary && primary}
  ${props => props.disabled && `cursor: not-allowed;`}
`;

const ButtonGroup = styled.div`
  > button:not(:last-of-type) {
    margin-right: 8px;
  }
`;

const CommentReply = props => {
  const { className, isNewComment, onClickPost, onTextAreaBlur } = props;
  const commentInput = useRef(null);
  const [commentValue, setCommentValue] = useState('');

  useEffect(() => {
    setTimeout(() => {
      if (commentInput.current && isNewComment) commentInput.current.focus();
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    onClickPost(commentValue);
    setCommentValue('');
  };

  const resetValue = e => {
    e.preventDefault();
    setCommentValue('');
  };

  const onBlur = content => {
    onTextAreaBlur(content, isNewComment);
    setCommentValue('');
  };

  return (
    <Wrapper className={className}>
      <form onSubmit={handleSubmit}>
        <TextWrapper>
          <ReplyTextArea
            ref={commentInput}
            onBlur={() => onBlur(commentInput.current.value)}
            placeholder={isNewComment ? 'Write comment...' : 'Reply...'}
            onChange={() => setCommentValue(commentInput.current.value)}
            onKeyDown={e => {
              if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault();
                if (commentValue) handleSubmit(e);
              }
            }}
            value={commentValue}
          />
        </TextWrapper>

        <ActionWrapper>
          <ButtonGroup>
            <Button disabled={commentValue.length === 0} primary type="submit">
              Post
            </Button>

            <Button disabled={commentValue.length === 0} onClick={resetValue}>
              Cancel
            </Button>
          </ButtonGroup>
        </ActionWrapper>
      </form>
    </Wrapper>
  );
};

CommentReply.propTypes = {
  isNewComment: PropTypes.bool.isRequired,
  onClickPost: PropTypes.func.isRequired,
  onTextAreaBlur: PropTypes.func.isRequired,
};

CommentReply.defaultProps = {};

export default CommentReply;
