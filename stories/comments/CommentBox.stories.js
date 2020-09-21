import React, { useState } from 'react';
import { lorem, name } from 'faker';
import { range } from 'lodash';

import CommentBox from '../../wax-prosemirror-components/src/ui/comments/CommentBox';
import { Demo } from '../_helpers';

const commentData = range(5).map(() => ({
  content: lorem.sentences(3),
  displayName: name.findName(),
  timestamp: '3 days ago',
}));

const onClickPost = data => console.log(data);

export const Base = () => {
  const [active, setActive] = useState(false);

  return (
    <Demo onClickButton={() => setActive(false)}>
      <CommentBox
        active={active}
        commentData={commentData}
        commentId="4"
        onClickBox={id => setActive(true)}
        onClickPost={onClickPost}
        onClickResolve={id => console.log('resolve id', id)}
      />
    </Demo>
  );
};

export const Empty = () => (
  <CommentBox
    active
    commentData={[]}
    commentId="4"
    onClickBox={id => console.log('set active', id)}
    onClickPost={onClickPost}
    onClickResolve={id => console.log('resolve id', id)}
  />
);

export const NotActive = () => (
  <CommentBox
    commentData={commentData}
    commentId="4"
    onClickBox={id => console.log('set active', id)}
    onClickResolve={id => console.log('resolve id', id)}
  />
);

export const Active = () => (
  <CommentBox
    active
    commentData={commentData}
    commentId="4"
    onClickBox={id => console.log('set active', id)}
    onClickPost={onClickPost}
    onClickResolve={id => console.log('resolve id', id)}
  />
);

export default {
  component: CommentBox,
  title: 'Comments/Comment Box',
};
