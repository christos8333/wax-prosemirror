import React, { Fragment } from "react";
import CommentBox from "./CommentBox";

export default ({ comments, view, position }) => {
  return (
    <Fragment>
      {comments.map((comment, index) => {
        const { attrs: { id } } = comment;
        const top = position[index] ? position[index][id] : 0;
        return (
          <CommentBox
            key={id}
            mark={comment}
            view={view}
            top={top}
            dataComment={`comment-${id}`}
          />
        );
      })}
    </Fragment>
  );
};
