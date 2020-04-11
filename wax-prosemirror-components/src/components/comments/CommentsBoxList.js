import React, { Fragment, useState, useEffect, useCallback } from "react";
import { each } from "lodash";
import CommentBox from "./CommentBox";

export default ({ comments, view, area }) => {
  const [position, setPosition] = useState();

  const setTops = useCallback(() => {
    const result = [];
    const boxes = [];
    let commentEl = null;
    let annotationTop = 0;
    let boxHeight = 0;
    let top = 0;
    const allCommentsTop = {};

    each(comments, (comment, pos) => {
      const WaxSurface = view.dom.getBoundingClientRect();
      const { attrs: { id } } = comment;
      let isActive = false;
      // if (comment.id === active) isActive = true
      commentEl = document.getElementById(id);
      //annotation top
      console.log(commentEl.getBoundingClientRect().top, commentEl.offsetTop);
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
      comment.endHeight = top + boxHeight + 2;
      result[pos] = top;

      // if active, move as many boxes above as needed to bring it to the annotation's height
      if (isActive) {
        comment.endHeight = annotationTop + boxHeight + 2;
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
