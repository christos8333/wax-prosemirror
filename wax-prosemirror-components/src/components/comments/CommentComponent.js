import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  Fragment,
  useCallback
} from "react";
import styled from "styled-components";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";
import { DocumentHelpers } from "wax-prosemirror-utilities";
import CommentsBoxList from "./CommentsBoxList";
import { each } from "lodash";

export default ({ area }) => {
  const { view: { main } } = useContext(WaxContext);
  const [comments, setComments] = useState([]);
  const [position, setPosition] = useState();

  const setTops = useCallback(() => {
    const result = [];
    const boxes = [];
    let commentEl = null;
    let annotationTop = 0;
    let boxHeight = 0;
    let top = 0;
    const allCommentsTop = {};

    each(comments[area], (comment, pos) => {
      const WaxSurface = main.dom.getBoundingClientRect();
      const { attrs: { id } } = comment;
      let isActive = false;
      // if (comment.id === active) isActive = true

      //annotation top
      if (area === "main") {
        commentEl = document.querySelector(`span[data-id="${id}"]`);
        if (commentEl)
          annotationTop =
            commentEl.getBoundingClientRect().top - WaxSurface.top;
      } else {
        const panelWrapper = document.getElementsByClassName("panelWrapper");
        const panelWrapperHeight = panelWrapper[0].getBoundingClientRect()
          .height;
        commentEl = document
          .querySelector("#notes-container")
          .querySelector(`span[data-id="${id}"]`);
        if (commentEl)
          annotationTop =
            commentEl.getBoundingClientRect().top - panelWrapperHeight - 50;
      }

      // get height of this comment box
      const boxEl = document.querySelector(`div[data-comment="comment-${id}"]`);
      if (boxEl) boxHeight = parseInt(boxEl.offsetHeight);

      // keep the elements to add the tops to at the end
      boxes.push(boxEl);

      // where the box should move to
      top = annotationTop;

      // if the above comment box has already taken up the height, move down
      if (pos > 0) {
        const previousBox = comments[area][pos - 1];
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
          const boxAbove = comments[area][i - 1];
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
      setComments(updateComments(main));
      setPosition(setTops());
    },

    [JSON.stringify(updateComments(main)), JSON.stringify(setTops())]
  );

  const CommentComponent = useMemo(
    () => (
      <CommentsBoxList
        comments={comments[area] || []}
        area={area}
        view={main}
        position={position}
      />
    ),
    [comments[area] || [], position]
  );
  return <Fragment>{CommentComponent}</Fragment>;
};

const updateComments = view => {
  if (view) {
    const nodes = DocumentHelpers.findChildrenByMark(
      view.state.doc,
      view.state.schema.marks.comment,
      true
    );

    const allComments = nodes.map(node => {
      return node.node.marks.filter(comment => {
        return comment.type.name === "comment";
      });
    });

    const groupedComments = {};
    allComments.forEach(comment => {
      if (!groupedComments[comment[0].attrs.group]) {
        groupedComments[comment[0].attrs.group] = [comment[0]];
      } else {
        groupedComments[comment[0].attrs.group].push(comment[0]);
      }
    });
    return groupedComments;
  }
  return [];
};
