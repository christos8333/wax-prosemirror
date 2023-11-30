import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { th, override } from '@pubsweet/ui-toolkit';
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

const inactiveButton = css`
  cursor: not-allowed;
  opacity: 0.3;
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

  ${override('Wax.CommentWrapper')}
`;

const Head = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px 0;

  ${override('Wax.CommentResolveWrapper')}
`;

const Resolve = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  color: #0042c7;
  cursor: pointer;
  margin-bottom: 12px;

  &:hover {
    background: ${th('colorBackgroundHue')};
    border: none;
  }

  ${props => props.isReadOnly && inactiveButton}

  ${override('Wax.CommentResolve')}
`;

const StyledReply = styled(CommentReply)`
  border-top: ${props => !props.isNewComment && `3px solid #E1EBFF`};

  ${override('Wax.CommentReplyWrapper')}
`;

const CommentBox = props => {
  const {
    active,
    className,
    commentId,
    commentData,
    isReadOnly,
    onClickBox,
    onClickPost,
    onClickResolve,
    onTextAreaBlur,
    title,
    showTitle,
  } = props;

  // send signal to make this comment active
  const onClickWrapper = () => {
    if (active) return;
    onClickBox(commentId);
  };

  if (!active && (!commentData || commentData.length === 0)) return null;
  const { t, i18n } = useTranslation();
  return (
    <Wrapper active={active} className={className} onClick={onClickWrapper}>
      {active && commentData.length > 0 && (
        <Head>
          <Resolve
            isReadOnly={isReadOnly}
            onClick={() => {
              if (!isReadOnly) return onClickResolve(commentId);
              return false;
            }}
          >
            {!isEmpty(i18n) && i18n.exists(`Wax.Comments.Resolve`)
              ? t(`Wax.Comments.Resolve`)
              : 'Resolve'}
          </Resolve>
        </Head>
      )}
      <CommentItemList active={active} data={commentData} title={title} />
      {active && (
        <StyledReply
          isNewComment={commentData.length === 0}
          isReadOnly={isReadOnly}
          onClickPost={onClickPost}
          onTextAreaBlur={onTextAreaBlur}
          showTitle={showTitle}
        />
      )}
    </Wrapper>
  );
};

CommentBox.propTypes = {
  /** Whether this is the current active comment */
  active: PropTypes.bool,
  isReadOnly: PropTypes.bool.isRequired,
  /** List of objects containing data for comment items */
  commentData: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      userId: PropTypes.string,
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
  title: PropTypes.string,
  showTitle: PropTypes.bool.isRequired,
};

CommentBox.defaultProps = {
  active: false,
  commentData: [],
  title: null,
};

export default CommentBox;
