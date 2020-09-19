import React from 'react';

import CommentBubble from '../../wax-prosemirror-components/src/ui/comments/CommentBubble';

export const Base = () => (
  <CommentBubble onClick={() => console.log('clicked the bubble!')} />
);

export default {
  component: CommentBubble,
  title: 'Comments/Comment Bubble',
};
