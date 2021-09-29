import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { grid, th } from '@pubsweet/ui-toolkit';

const Wrapper = styled.div`
  background: ${th('colorBackgroundHue')};
  display: flex;
  flex-direction: column;
  padding: ${grid(2)} ${grid(4)};
`;

const TextWrapper = styled.div``;

const ReplyTextArea = styled.textarea`
  background: ${th('colorBackgroundHue')};
  border: 3px solid ${th('colorBackgroundTabs')};
  font-family: ${th('fontWriting')};
  position: relative;
  right: 5px;
  width: 100%;

  &:focus {
    outline: 1px solid ${th('colorPrimary')};
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
`;

const primary = css`
  background: ${th('colorPrimary')};
  color: white;
`;

const Button = styled.button`
  border: 0;
  border-radius: 5px;
  color: gray;
  cursor: pointer;
  padding: ${grid(2)} ${grid(4)};

  ${props => props.primary && primary}
  ${props => props.disabled && `cursor: not-allowed; opacity: 0.3;`}
`;

const ButtonGroup = styled.div`
  > button:not(:last-of-type) {
    margin-right: 8px;
  }
`;

const CommentReply = props => {
  const {
    className,
    isNewComment,
    onClickPost,
    isReadOnly,
    onTextAreaBlur,
  } = props;
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
  };

  return (
    <Wrapper className={className}>
      <form onSubmit={handleSubmit}>
        <TextWrapper>
          <ReplyTextArea
            cols="5"
            onBlur={() => onBlur(commentInput.current.value)}
            onChange={() => setCommentValue(commentInput.current.value)}
            onKeyDown={e => {
              if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault();
                if (commentValue) handleSubmit(e);
              }
            }}
            placeholder={isNewComment ? 'Write comment...' : 'Reply...'}
            ref={commentInput}
            rows="3"
            value={commentValue}
          />
        </TextWrapper>

        <ActionWrapper>
          <ButtonGroup>
            <Button
              disabled={commentValue.length === 0 || isReadOnly}
              primary
              type="submit"
            >
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
  isReadOnly: PropTypes.bool.isRequired,
  onTextAreaBlur: PropTypes.func.isRequired,
};

CommentReply.defaultProps = {};

export default CommentReply;
