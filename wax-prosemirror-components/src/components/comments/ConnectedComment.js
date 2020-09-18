/* eslint react/prop-types: 0 */
import React, { useState, useEffect, useContext, memo } from 'react';
import styled from 'styled-components';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import CommentBox from '../../ui/comments/CommentBox';

export default ({ key, comment, dataBox, top, commentId, commentData }) => {
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
    let active = false;

    const commentPlugin = app.PmPlugins.get('commentPlugin');
    const activeComment = commentPlugin.getState(activeView.state).comment;

    if (activeComment && commentId === activeComment.attrs.id) active = true;
    return (
      <CommentBox
        key={commentId}
        active={active}
        dataBox={commentId}
        top={top}
        commentId={commentId}
        commentData={commentData}
      />
    );
  });
  return <MemorizedComponent />;
};
