import React from 'react'
// import { lorem } from 'faker'

import CommentReply from '../../wax-prosemirror-components/src/ui/comments/CommentReply'

const onClickPost = value => console.log('on click post', value)

export const Base = () => <CommentReply onClickPost={onClickPost} />

export default {
  component: CommentReply,
  title: 'Comments/Comment Reply',
}
