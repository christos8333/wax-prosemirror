import React, { Fragment } from "react";
import CommentBox from "./CommentBox";

//TODO find from marks actual comment mark
export default ({ comments, view }) => {
  return (
    <Fragment>
      {comments.map(comment => (
        <CommentBox
          key={comment.node.marks[0].attrs.id}
          mark={comment.node.marks[0]}
          view={view}
        />
      ))}
    </Fragment>
  );
};
