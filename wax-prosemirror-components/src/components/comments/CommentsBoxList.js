import React, { Fragment } from "react";
import CommentBox from "./CommentBox";

export default ({ comments, view }) => {
  return (
    <Fragment>
      {comments.map(comment => (
        <CommentBox key="" node={comment.node} view={view} />
      ))}
    </Fragment>
  );
};
