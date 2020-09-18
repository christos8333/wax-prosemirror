/* eslint react/prop-types: 0 */
import { Mark } from 'prosemirror-model';
import React, { useContext, useState, useMemo, useCallback } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { each, uniqBy, sortBy } from 'lodash';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import BoxList from './BoxList';

export default ({ area }) => {
  const {
    view,
    view: { main },
    app,
    activeView,
  } = useContext(WaxContext);
  const commentPlugin = app.PmPlugins.get('commentPlugin');
  const [marksNodes, setMarksNodes] = useState([]);
  const [position, setPosition] = useState();
  const [isFirstRun, setFirstRun] = useState(true);

  const setTops = useCallback(() => {
    const result = [];
    let markNodeEl = null;
    let annotationTop = 0;
    let boxHeight = 0;
    let top = 0;
    const allCommentsTop = [];

    each(marksNodes[area], (markNode, pos) => {
      const WaxSurface = main.dom.getBoundingClientRect();
      const id =
        markNode instanceof Mark ? markNode.attrs.id : markNode.node.attrs.id;

      const activeComment = commentPlugin.getState(activeView.state).comment;

      let isActive = false;
      if (activeComment && id === activeComment.attrs.id) isActive = true;

      // annotation top
      if (area === 'main') {
        markNodeEl = document.querySelector(`[data-id="${id}"]`);
        if (markNodeEl)
          annotationTop =
            markNodeEl.getBoundingClientRect().top - WaxSurface.top;
      } else {
        const panelWrapper = document.getElementsByClassName('panelWrapper');
        const panelWrapperHeight = panelWrapper[0].getBoundingClientRect()
          .height;
        markNodeEl = document
          .querySelector('#notes-container')
          .querySelector(`[data-id="${id}"]`);
        if (markNodeEl)
          annotationTop =
            markNodeEl.getBoundingClientRect().top - panelWrapperHeight - 50;
      }

      // get height of this markNode box
      const boxEl = document.querySelector(`div[data-box="${id}"]`);
      if (boxEl) boxHeight = parseInt(boxEl.offsetHeight, 10);
      console.log(boxHeight);

      // where the box should move to
      top = annotationTop;

      // if the above comment box has already taken up the height, move down
      if (pos > 0) {
        const previousBox = marksNodes[area][pos - 1];
        const previousEndHeight = previousBox.endHeight;
        if (annotationTop < previousEndHeight) {
          top = previousEndHeight + 2;
        }
      }
      // store where the box ends to be aware of overlaps in the next box
      markNode.endHeight = top + boxHeight + 2;
      result[pos] = top;
      allCommentsTop.push({ [id]: result[pos] });

      // if active, move as many boxes above as needed to bring it to the annotation's height
      if (isActive) {
        markNode.endHeight = annotationTop + boxHeight + 2;
        result[pos] = annotationTop;
        allCommentsTop[pos][id] = result[pos];
        let b = true;
        let i = pos;

        // first one active, none above
        if (i === 0) b = false;

        while (b) {
          const boxAbove = marksNodes[area][i - 1];
          const boxAboveEnds = boxAbove.endHeight;
          const currentTop = result[i];

          const doesOverlap = boxAboveEnds > currentTop;

          if (doesOverlap) {
            const overlap = boxAboveEnds - currentTop;
            result[i - 1] -= overlap;

            const previousMarkNode =
              marksNodes[area][i - 1] instanceof Mark
                ? marksNodes[area][i - 1].attrs.id
                : marksNodes[area][i - 1].node.attrs.id;

            allCommentsTop[i - 1][previousMarkNode] = result[i - 1];
          }

          if (!doesOverlap) b = false;
          if (i <= 1) b = false;
          i -= 1;
        }
      }
    });

    return allCommentsTop;
  });

  useDeepCompareEffect(() => {
    setMarksNodes(updateMarks(view));
    if (isFirstRun) {
      setTimeout(() => {
        setPosition(setTops());
        setFirstRun(false);
      }, 400);
    } else {
      setPosition(setTops());
    }
  }, [updateMarks(view), setTops()]);

  const CommentTrackComponent = useMemo(
    () => (
      <BoxList
        commentsTracks={marksNodes[area] || []}
        area={area}
        view={main}
        position={position}
      />
    ),
    [marksNodes[area] || [], position],
  );
  return <>{CommentTrackComponent}</>;
};

//  TODO if allInlineNodes and allBlockNodes count don't change, do not compute again
const updateMarks = view => {
  if (view.main) {
    const allInlineNodes = [];

    Object.keys(view).forEach(eachView => {
      allInlineNodes.push(
        ...DocumentHelpers.findInlineNodes(view[eachView].state.doc),
      );
    });

    const allBlockNodes = DocumentHelpers.findBlockNodes(view.main.state.doc);
    const finalMarks = [];
    const finalNodes = [];

    allInlineNodes.map(node => {
      if (node.node.marks.length > 0) {
        node.node.marks.filter(mark => {
          if (
            mark.type.name === 'comment' ||
            mark.type.name === 'insertion' ||
            mark.type.name === 'deletion' ||
            mark.type.name === 'format_change'
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

    const nodesAndMarks = [...uniqBy(finalMarks, 'attrs.id'), ...finalNodes];

    const groupedMarkNodes = {};
    nodesAndMarks.forEach(markNode => {
      const markNodeAttrs = markNode.attrs
        ? markNode.attrs
        : markNode.node.attrs;

      if (!groupedMarkNodes[markNodeAttrs.group]) {
        groupedMarkNodes[markNodeAttrs.group] = [markNode];
      } else {
        groupedMarkNodes[markNodeAttrs.group].push(markNode);
      }
    });

    return {
      main: sortBy(groupedMarkNodes.main, ['pos']),
      notes: groupedMarkNodes.notes,
    };
  }
  return [];
};
