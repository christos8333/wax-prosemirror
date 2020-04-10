import React, { Fragment, useState, useEffect, useCallback } from "react";
import { each } from "lodash";
import CommentBox from "./CommentBox";

//TODO find from marks actual comment mark
export default ({ comments, view }) => {
  const [position, setPosition] = useState();

  const setTops = useCallback(() => {
    const result = [];
    const boxes = [];
    let commentEl = null;
    let annotationTop = 0;
    let boxHeight = 0;
    let top = 0;
    const allCommentsTop = {};

    each(comments, (entry, pos) => {
      const WaxSurface = view.dom.getBoundingClientRect();
      const id = entry.node.marks[0].attrs.id;
      let isActive = false;
      // if (entry.id === active) isActive = true
      commentEl = document.getElementById(id);
      //annotation top
      annotationTop = commentEl.getBoundingClientRect().top - WaxSurface.top;
      // get height of this comment box
      const boxEl = document.querySelector(`div[data-comment="comment-${id}"]`);
      if (boxEl) boxHeight = parseInt(boxEl.offsetHeight);

      // keep the elements to add the tops to at the end
      boxes.push(boxEl);

      // where the box should move to
      top = annotationTop;

      // if the above comment box has already taken up the height, move down
      if (pos > 0) {
        const previousBox = comments[pos - 1];
        const previousEndHeight = previousBox.endHeight;
        if (annotationTop < previousEndHeight) {
          top = previousEndHeight + 2;
        }
      }
      // store where the box ends to be aware of overlaps in the next box
      entry.endHeight = top + boxHeight + 2;
      result[pos] = top;

      // if active, move as many boxes above as needed to bring it to the annotation's height
      if (isActive) {
        entry.endHeight = annotationTop + boxHeight + 2;
        result[pos] = annotationTop;

        let b = true;
        let i = pos;

        // first one active, none above
        if (i === 0) b = false;

        while (b) {
          const boxAbove = comments[i - 1];
          const boxAboveEnds = boxAbove.endHeight;
          const currentTop = result[i];

          const doesOverlap = boxAboveEnds > currentTop;
          if (doesOverlap) {
            const overlap = boxAboveEnds - currentTop;
            result[i - 1] -= overlap;
          }

          if (!doesOverlap) b = false;
          if (i <= 1) b = false;
          i -= 1;
        }
      }

      allCommentsTop[id] = top;
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
            dataComment={`comment-${id}`}
          />
        );
      })}
    </Fragment>
  );
};
