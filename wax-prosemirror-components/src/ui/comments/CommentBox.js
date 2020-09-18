import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// import { th } from '../_helpers'
import CommentItemList from './CommentItemList';
import CommentReply from './CommentReply';

const inactive = css`
  background: #e2e2e2;
  cursor: pointer;
  transition: box-shadow 0.2s;
  /* transition: background-color 0.2s; */

  &:hover {
    /* background: white; */
    box-shadow: 0 0 1px 2px gray;
  }
`;

const Wrapper = styled.div`
  background: white;
  border: 1px solid gray;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: absolute;
  /* padding: 8px 0; */

  ${props => !props.active && inactive}
`;

const Head = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px 0;
`;

const Resolve = styled.button`
  align-self: flex-end;
  cursor: pointer;
  margin-bottom: 12px;

  &:hover {
    background: blue;
  }
`;

const StyledReply = styled(CommentReply)`
  border-top: ${props => !props.isNewComment && '1px solid gray'};
`;

const CommentBox = props => {
  const {
    active,
    className,
    commentId,
    commentData,
    onClickBox,
    onClickPost,
    onClickResolve,
    top,
  } = props;

  // send signal to make this comment active
  const onClickWrapper = () => {
    if (active) return;
    onClickBox(commentId);
  };

  if (!active && (!commentData || commentData.length === 0)) return null;

  const style = {
    top: `${top}px`,
  };

  return (
    <Wrapper
      style={style}
      active={active}
      data-box={commentId}
      className={className}
      onClick={onClickWrapper}
      top={top}
    >
      {active && commentData.length > 0 && (
        <Head>
          <Resolve onClick={() => onClickResolve(commentId)}>Resolve</Resolve>
        </Head>
      )}

      <CommentItemList active={active} data={commentData} />

      {active && (
        <StyledReply
          isNewComment={commentData.length === 0}
          onClickPost={onClickPost}
        />
      )}
    </Wrapper>
  );
};

CommentBox.propTypes = {
  /** Whether this is the current active comment */
  active: PropTypes.bool,
  top: PropTypes.number,
  /** List of objects containing data for comment items */
  commentData: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    }),
  ),
  /** This comment's id in the document */
  commentId: PropTypes.string.isRequired,
  /** Function to run when box is clicked on.
   *  Use this to make comment active on click (it passes on the comment id).
   *  eg. `onClickBox = commentId => doSth(commentId)`
   *  Will only run if comment is not active already.
   */
  onClickBox: PropTypes.func.isRequired,
  /** Function to run when "post" button is clicked to send reply */
  onClickPost: PropTypes.func.isRequired,
  /** Function to run when "resolve" button is clicked */
  onClickResolve: PropTypes.func.isRequired,
};

CommentBox.defaultProps = {
  top: 0,
  active: false,
  commentData: [],
};

export default CommentBox;
