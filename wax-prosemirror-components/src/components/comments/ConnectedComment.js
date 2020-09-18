/* eslint react/prop-types: 0 */
import React, { useState, useEffect, useContext, memo } from 'react';
import styled from 'styled-components';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import CommentBox from '../../ui/comments/CommentBox';

const ConnectedCommentStyled = styled.div`
  position: absolute;
`;

export default ({ key, comment, dataBox, top, commentId, commentData }) => {
  const [commentAnnotation, setCommentAnnotation] = useState(comment);

  const MemorizedComponent = memo(() => {
    const {
      view,
      view: {
        main: {
          props: { user },
        },
      },
      app,
      activeView,
    } = useContext(WaxContext);
    const { state, dispatch } = activeView;

    const allCommentsWithSameId = DocumentHelpers.findAllMarksWithSameId(
      state,
      comment,
    );
    const commentMark = state.schema.marks.comment;

    let active = false;

    const styles = {
      top: `${top}px`,
    };

    const commentPlugin = app.PmPlugins.get('commentPlugin');
    const activeComment = commentPlugin.getState(activeView.state).comment;

    if (activeComment && commentId === activeComment.attrs.id) active = true;

    const onClickPost = content => {
      const { tr } = state;

      const obj = {
        content,
        displayName: user.username,
        timestamp: Math.floor(Date.now() / 300000),
      };

      commentAnnotation.attrs.conversation.push(obj);

      allCommentsWithSameId.forEach(singleComment => {
        dispatch(
          tr.addMark(
            singleComment.pos,
            singleComment.pos + singleComment.nodeSize,
            commentMark.create({
              ...((commentAnnotation && commentAnnotation.attrs) || {}),
              conversation: commentAnnotation.attrs.conversation,
            }),
          ),
        );
      });
    };

    return (
      <ConnectedCommentStyled data-box={commentId} style={styles}>
        <CommentBox
          key={commentId}
          active={active}
          dataBox={commentId}
          top={top}
          commentId={commentId}
          commentData={commentData}
          onClickPost={onClickPost}
        />
      </ConnectedCommentStyled>
    );
  });
  return <MemorizedComponent />;
};
