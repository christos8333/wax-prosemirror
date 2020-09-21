import React from 'react';

import CommentReply from '../../wax-prosemirror-components/src/ui/comments/CommentReply';

const onClickPost = value => console.log('on click post', value);

export const Base = () => (
  <CommentReply isNewComment onClickPost={onClickPost} />
);

export const ReplyToExistingDiscussion = () => (
  <CommentReply isNewComment={false} onClickPost={onClickPost} />
);

export default {
  component: CommentReply,
  title: 'Comments/Comment Reply',
};
