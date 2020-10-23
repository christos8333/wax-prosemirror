import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { th } from '@pubsweet/ui-toolkit';

import CommentItemList from './CommentItemList';
import CommentReply from './CommentReply';

const inactive = css`
  background: ${th('colorBackgroundHue')};
  cursor: pointer;
  transition: box-shadow 0.2s;
  /* transition: background-color 0.2s; */

  &:hover {
    /* background: white; */
    box-shadow: 0 0 1px 2px ${th('colorBackgroundTabs')};
  }
`;

const Wrapper = styled.div`
  background: white;
  border: 1px solid ${th('colorBackgroundTabs')};
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: ${th('fontInterface')};

  ${props => !props.active && inactive}
`;

const Head = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px 0;
`;

const Resolve = styled.button`
  align-self: flex-end;
  border: none;
  background: none;
  color: #0042c7;
  cursor: pointer;
  margin-bottom: 12px;

  &:hover {
    background: ${th('colorBackgroundHue')};
    border: none;
  }
`;

const StyledReply = styled(CommentReply)`
  border-top: ${props => !props.isNewComment && `3px solid #E1EBFF`};
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
    onTextAreaBlur,
  } = props;

  // send signal to make this comment active
  const onClickWrapper = () => {
    if (active) return;
    onClickBox(commentId);
  };

  if (!active && (!commentData || commentData.length === 0)) return null;

  return (
    <Wrapper active={active} className={className} onClick={onClickWrapper}>
      {active && commentData.length > 0 && (
        <Head>
          <Resolve onClick={() => onClickResolve(commentId)}>Resolve</Resolve>
        </Head>
      )}

      <CommentItemList active={active} data={commentData} />

      {active && (
        <StyledReply
          onTextAreaBlur={onTextAreaBlur}
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
  /** List of objects containing data for comment items */
  commentData: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      timestamp: PropTypes.string.number,
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
  /** Function to run when text area loses focus */
  onTextAreaBlur: PropTypes.func.isRequired,
};

CommentBox.defaultProps = {
  active: false,
  commentData: [],
};

export default CommentBox;
