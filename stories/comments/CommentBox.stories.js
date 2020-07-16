import React, { useState } from 'react'
import { lorem, name } from 'faker'
import { range } from 'lodash'
import styled from 'styled-components'

import CommentBox from '../../wax-prosemirror-components/src/ui/comments/CommentBox'

const commentData = range(5).map(() => ({
  content: lorem.sentences(3),
  displayName: name.findName(),
  timestamp: '3 days ago',
}))

const Demo = styled.div`
  margin-bottom: 24px;
  border-bottom: 1px solid gray;
  padding: 12px;
  display: flex;
  justify-content: flex-end;

  > span {
    background: gray;
    color: white;
    margin-left: 8px;
    padding: 4px 8px;
  }
`

export const Base = () => {
  const [active, setActive] = useState(false)

  return (
    <>
      <Demo>
        <button onClick={() => setActive(false)} type="button">
          reset state
        </button>
        <span>demo purposes only</span>
      </Demo>

      <CommentBox
        active={active}
        commentData={commentData}
        commentId="4"
        onClickBox={id => setActive(true)}
        onClickResolve={id => console.log('resolve id', id)}
      />
    </>
  )
}

export const NotActive = () => (
  <CommentBox
    commentData={commentData}
    commentId="4"
    onClickBox={id => console.log('set active', id)}
    onClickResolve={id => console.log('resolve id', id)}
  />
)

export const Active = () => (
  <CommentBox
    active
    commentData={commentData}
    commentId="4"
    onClickBox={id => console.log('set active', id)}
    onClickResolve={id => console.log('resolve id', id)}
  />
)

export default {
  component: CommentBox,
  title: 'Comments/Comment Box',
}
