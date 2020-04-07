import React, { Fragment, useEffect } from "react";
import { each } from "lodash";
import CommentBox from "./CommentBox";

//TODO find from marks actual comment mark
export default ({ comments, view }) => {
  let commentEl = null;
  let commentElTop = 0;
  let top = 0;

  if (comments.length > 0) {
    const WaxSurface = view.dom.getBoundingClientRect();
    each(comments, (entry, pos) => {
      commentElTop = 0;
      commentEl = document.getElementById(entry.node.marks[0].attrs.id);
      commentElTop = commentEl.getBoundingClientRect().top - WaxSurface.top;
      entry.node.marks[0].top = commentElTop;
    });
  }

  const setTops = () => {
    if (comments.length > 0) {
      each(comments, (entry, pos) => {
        const WaxSurface = view.dom.getBoundingClientRect();
        commentElTop = 0;
        commentEl = document.getElementById(entry.node.marks[0].attrs.id);
        commentElTop = commentEl.getBoundingClientRect().top - WaxSurface.top;
        entry.node.marks[0].top = commentElTop;
        return commentElTop;
      });
    }
  };

  useEffect(
    () => {
      console.log("change");
    },
    [setTops]
  );
  return (
    <Fragment>
      {comments.map(comment => {
        if (comment) top = comment.node.marks[0].top;
        console.log(comment.node.marks[0].attrs.id);
        return (
          <CommentBox
            key={comment.node.marks[0].top}
            mark={comment.node.marks[0]}
            view={view}
            top={top}
          />
        );
      })}
    </Fragment>
  );
};
