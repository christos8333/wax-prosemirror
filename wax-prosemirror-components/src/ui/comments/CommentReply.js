import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  background: #e2e2e2;
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
`;

const TextWrapper = styled.div``;

const ReplyTextArea = styled.textarea`
  background: #e2e2e2;
  box-sizing: border-box;
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
  padding: 8px 16px;

  ${props => props.primary && primary}
  ${props => props.disabled && `cursor: not-allowed;`}
`;

const ButtonGroup = styled.div`
  > button:not(:last-of-type) {
    margin-right: 8px;
  }
`;

const CommentReply = props => {
  const { className, isNewComment, onClickPost } = props;
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    onClickPost(value);
    setValue('');
  };

  const resetValue = e => {
    e.preventDefault();
    setValue('');
  };

  return (
    <Wrapper className={className}>
      <form onSubmit={handleSubmit}>
        <TextWrapper>
          <ReplyTextArea
            placeholder={isNewComment ? 'Write comment...' : 'Reply...'}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => {
              if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault();
                if (value) handleSubmit(e);
              }
            }}
            value={value}
          />
        </TextWrapper>

        <ActionWrapper>
          <ButtonGroup>
            <Button disabled={value.length === 0} primary type="submit">
              Post
            </Button>

            <Button disabled={value.length === 0} onClick={resetValue}>
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
};

CommentReply.defaultProps = {};

export default CommentReply;
