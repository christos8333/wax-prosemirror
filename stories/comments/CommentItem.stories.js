import React from 'react'
import { lorem } from 'faker'

import CommentItem from '../../wax-prosemirror-components/src/ui/comments/CommentItem'

export const Base = () => (
  <CommentItem
    content={lorem.sentences(3)}
    displayName="John Doe"
    timestamp="3 days ago"
  />
)

export default {
  component: CommentItem,
  title: 'Comments/Comment Item',
}
