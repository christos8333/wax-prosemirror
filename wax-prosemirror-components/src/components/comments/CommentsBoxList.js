import React, { Fragment, useState, useEffect, useCallback } from "react";
import { each } from "lodash";
import CommentBox from "./CommentBox";

//TODO find from marks actual comment mark
export default ({ comments, view }) => {
  const [position, setPosition] = useState();

  const setTops = useCallback(() => {
    let commentEl = null;
    let commentElTop = 0;
    const allCommentsTop = {};

    each(comments, (entry, pos) => {
      const WaxSurface = view.dom.getBoundingClientRect();
      const id = entry.node.marks[0].attrs.id;
      commentEl = document.getElementById(id);
      commentElTop = commentEl.getBoundingClientRect().top - WaxSurface.top;
      allCommentsTop[id] = commentElTop;
    });

    return allCommentsTop;
  });

  useEffect(
    () => {
      setPosition(setTops());
    },
    [JSON.stringify(setTops())]
  );

  return (
    <Fragment>
      {comments.map(comment => {
        const id = comment.node.marks[0].attrs.id;
        return (
          <CommentBox
            key={comment.node.marks[0].attrs.id}
            mark={comment.node.marks[0]}
            view={view}
            top={position[id]}
          />
        );
      })}
    </Fragment>
  );
};
