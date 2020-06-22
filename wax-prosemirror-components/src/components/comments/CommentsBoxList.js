import React, { Fragment } from "react";
import CommentBox from "./CommentBox";

export default ({ comments, view, position }) => {
  return (
    <Fragment>
      {comments.map((comment, index) => {
        const id = comment.attrs ? comment.attrs.id : comment.node.attrs.id;
        const top = position[index] ? position[index][id] : 0;
        return (
          <CommentBox
            key={id}
            mark={comment}
            view={view}
            top={top}
            dataBox={id}
          />
        );
      })}
    </Fragment>
  );
};
