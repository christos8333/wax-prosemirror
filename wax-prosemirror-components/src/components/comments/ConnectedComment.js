/* eslint react/prop-types: 0 */
import React, { useState, useEffect, useContext, memo } from 'react';
import styled from 'styled-components';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import CommentBox from '../../ui/comments/CommentBox';

export default ({ key, comment, dataBox, top, commentId, commentData }) => {
  const MemorizedComponent = memo(() => {
    return (
      <CommentBox
        key={commentId}
        comment={commentData}
        dataBox={commentId}
        top={top}
        commentId={commentId}
        commentData={commentData}
      />
    );
  });
  return <MemorizedComponent />;
};
