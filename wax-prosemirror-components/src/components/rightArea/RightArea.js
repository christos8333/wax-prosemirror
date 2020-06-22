import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  Fragment,
  useCallback
} from "react";
import styled from "styled-components";
import { WaxContext } from "wax-prosemirror-core";
import { DocumentHelpers } from "wax-prosemirror-utilities";
import CommentsBoxList from "./../comments/CommentsBoxList";
import { each, uniqBy, sortBy } from "lodash";

export default ({ area }) => {
  const { view: { main }, app, activeView } = useContext(WaxContext);
  const activeCommentPlugin = app.PmPlugins.get("activeComment");
  const [marks, setMarks] = useState([]);
  const [position, setPosition] = useState();

  const setTops = useCallback(() => {
    const result = [];
    let markEl = null;
    let annotationTop = 0;
    let boxHeight = 0;
    let top = 0;
    const allCommentsTop = [];

    each(marks[area], (mark, pos) => {
      const WaxSurface = main.dom.getBoundingClientRect();
      const id = mark.attrs ? mark.attrs.id : mark.node.attrs.id;

      const activeComment = activeCommentPlugin.getState(activeView.state)
        .comment;

      let isActive = false;
      if (activeComment && id === activeComment.attrs.id) isActive = true;

      //annotation top
      if (area === "main") {
        markEl = document.querySelector(`[data-id="${id}"]`);
        if (markEl)
          annotationTop = markEl.getBoundingClientRect().top - WaxSurface.top;
      } else {
        const panelWrapper = document.getElementsByClassName("panelWrapper");
        const panelWrapperHeight = panelWrapper[0].getBoundingClientRect()
          .height;
        markEl = document
          .querySelector("#notes-container")
          .querySelector(`[data-id="${id}"]`);
        if (markEl)
          annotationTop =
            markEl.getBoundingClientRect().top - panelWrapperHeight - 50;
      }

      // get height of this mark box
      const boxEl = document.querySelector(`div[data-box="${id}"]`);
      if (boxEl) boxHeight = parseInt(boxEl.offsetHeight);

      // where the box should move to
      top = annotationTop;

      // if the above comment box has already taken up the height, move down
      if (pos > 0) {
        const previousBox = marks[area][pos - 1];
        const previousEndHeight = previousBox.endHeight;
        if (annotationTop < previousEndHeight) {
          top = previousEndHeight + 2;
        }
      }
      // store where the box ends to be aware of overlaps in the next box
      mark.endHeight = top + boxHeight + 2;
      result[pos] = top;
      allCommentsTop.push({ [id]: result[pos] });

      // if active, move as many boxes above as needed to bring it to the annotation's height
      if (isActive) {
        mark.endHeight = annotationTop + boxHeight + 2;
        result[pos] = annotationTop;
        allCommentsTop[pos][id] = result[pos];
        let b = true;
        let i = pos;

        // first one active, none above
        if (i === 0) b = false;

        while (b) {
          const boxAbove = marks[area][i - 1];
          const boxAboveEnds = boxAbove.endHeight;
          const currentTop = result[i];

          const doesOverlap = boxAboveEnds > currentTop;

          if (doesOverlap) {
            const overlap = boxAboveEnds - currentTop;
            result[i - 1] -= overlap;

            const temp = marks[area][i - 1].attrs
              ? marks[area][i - 1].attrs.id
              : marks[area][i - 1].node.attrs.id;

            allCommentsTop[i - 1][temp] = result[i - 1];
          }

          if (!doesOverlap) b = false;
          if (i <= 1) b = false;
          i -= 1;
        }
      }
    });

    return allCommentsTop;
  });

  useEffect(
    () => {
      setMarks(updateMarks(main));
      setPosition(setTops());
    },

    [JSON.stringify(updateMarks(main)), JSON.stringify(setTops())]
  );

  const CommentTrackComponent = useMemo(
    () => (
      <CommentsBoxList
        comments={marks[area] || []}
        area={area}
        view={main}
        position={position}
      />
    ),
    [marks[area] || [], position]
  );
  return <Fragment>{CommentTrackComponent}</Fragment>;
};

const updateMarks = view => {
  if (view) {
    const allBlockNodes = DocumentHelpers.findBlockNodes(view.state.doc);
    const allInlineNodes = DocumentHelpers.findInlineNodes(view.state.doc);
    const finalMarks = [];
    const finalNodes = [];

    allInlineNodes.map(node => {
      if (node.node.marks.length > 0) {
        node.node.marks.filter(mark => {
          if (
            mark.type.name === "comment" ||
            mark.type.name === "insertion" ||
            mark.type.name === "deletion" ||
            mark.type.name === "format_change"
          ) {
            mark.pos = node.pos;
            finalMarks.push(mark);
          }
        });
      }
    });

    allBlockNodes.map(node => {
      if (node.node.attrs.track && node.node.attrs.track.length > 0) {
        finalNodes.push(node);
      }
    });

    const nodesAndMarks = [...uniqBy(finalMarks, "attrs.id"), ...finalNodes];

    const groupedMarkNodes = {};

    sortBy(nodesAndMarks, ["pos"]).forEach(markNode => {
      const markNodeAttrs = markNode.attrs
        ? markNode.attrs
        : markNode.node.attrs;

      if (!groupedMarkNodes[markNodeAttrs.group]) {
        groupedMarkNodes[markNodeAttrs.group] = [markNode];
      } else {
        groupedMarkNodes[markNodeAttrs.group].push(markNode);
      }
    });
    return groupedMarkNodes;
  }
  return [];
};
