import React, { Fragment } from "react";
import CommentBox from "./CommentBox";

export default ({ comments, view, position }) => {
  return (
    <Fragment>
      {comments.map(comment => {
        const { attrs: { id } } = comment;
        return (
          <CommentBox
            key={id}
            mark={comment}
            view={view}
            top={position[id]}
            dataComment={`comment-${id}`}
          />
        );
      })}
    </Fragment>
  );
};
