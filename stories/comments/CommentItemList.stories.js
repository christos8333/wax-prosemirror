import React from 'react'
import { lorem, name } from 'faker'
import { range } from 'lodash'

import CommentItemList from '../../wax-prosemirror-components/src/ui/comments/CommentItemList'

const data = range(5).map(() => ({
  content: lorem.sentences(3),
  displayName: name.findName(),
  timestamp: '3 days ago',
}))

export const Base = () => <CommentItemList data={data} />

export const Active = () => <CommentItemList active data={data} />

export default {
  component: CommentItemList,
  title: 'Comments/Comment Item List',
}
