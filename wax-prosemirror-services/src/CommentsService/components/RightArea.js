/* eslint react/prop-types: 0 */
import { Mark } from 'prosemirror-model';
import React, { useContext, useState, useMemo, useCallback } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { each, uniqBy, sortBy } from 'lodash';
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core';
import BoxList from './BoxList';

export default ({ area, users }) => {
  const {
    pmViews,
    pmViews: { main },
    app,
    activeView,
    options: { comments },
  } = useContext(WaxContext);

  console.log('sddssd', comments);

  const commentPlugin = app.PmPlugins.get('commentPlugin');
  const trakChangePlugin = app.PmPlugins.get('trackChangePlugin');

  const [marksNodes, setMarksNodes] = useState([]);

  const [position, setPosition] = useState();
  const [isFirstRun, setFirstRun] = useState(true);

  const setTops = useCallback(() => {
    const result = [];
    let markNodeEl = null;
    let annotationTop = 0;
    let boxHeight = 0;
    let top = 0;
    let WaxSurface = {};
    let WaxSurfaceMarginTop = '';
    const allCommentsTop = [];
    let panelWrapper = {};
    let panelWrapperHeight = {};
    if (main) {
      WaxSurface = main.dom.getBoundingClientRect();
      WaxSurfaceMarginTop = window.getComputedStyle(main.dom).marginTop;
    }
    console.log(marksNodes);
    each(marksNodes[area], (markNode, pos) => {
      const id =
        markNode instanceof Mark ? markNode.attrs.id : markNode.node.attrs.id;
      let activeTrackChange = null;
      const activeComment = commentPlugin.getState(activeView.state).comment;
      if (trakChangePlugin)
        activeTrackChange = trakChangePlugin.getState(activeView.state)
          .trackChange;

      let isActive = false;
      if (
        (activeComment && id === activeComment.attrs.id) ||
        (activeTrackChange && id === activeTrackChange.attrs.id)
      )
        isActive = true;

      // annotation top
      if (area === 'main') {
        markNodeEl = document.querySelector(`[data-id="${id}"]`);
        if (markNodeEl)
          annotationTop =
            markNodeEl.getBoundingClientRect().top -
            WaxSurface.top +
            parseInt(WaxSurfaceMarginTop.slice(0, -2), 10);
      } else {
        // Notes
        panelWrapper = document.getElementsByClassName('panelWrapper');
        panelWrapperHeight = panelWrapper[0].getBoundingClientRect().height;

        markNodeEl = document
          .querySelector('#notes-container')
          .querySelector(`[data-id="${id}"]`);
        if (markNodeEl) {
          const WaxContainerTop = document
            .querySelector('#wax-container')
            .getBoundingClientRect().top;

          annotationTop =
            markNodeEl.getBoundingClientRect().top -
            panelWrapperHeight -
            WaxContainerTop -
            50;
        }
      }

      let boxEl = null;
      // get height of this markNode box
      if (markNodeEl) {
        boxEl = document.querySelector(`div[data-box="${id}"]`);
      }
      if (boxEl) {
        boxHeight = parseInt(boxEl.offsetHeight, 10);
        // where the box should move to
        top = annotationTop;
      }
      // if the above comment box has already taken up the height, move down
      if (pos > 0) {
        const previousBox = marksNodes[area][pos - 1];
        const previousEndHeight = previousBox.endHeight;
        if (annotationTop < previousEndHeight) {
          top = previousEndHeight + 2;
        }
      }
      // store where the box ends to be aware of overlaps in the next box
      markNode.endHeight = top + boxHeight + 4;
      result[pos] = top;
      allCommentsTop.push({ [id]: result[pos] });

      // if active, move as many boxes above as needed to bring it to the annotation's height
      if (isActive) {
        markNode.endHeight = annotationTop + boxHeight + 3;
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

  const recalculateTops = () => {
    setTimeout(() => {
      setPosition(setTops());
    });
  };

  useDeepCompareEffect(() => {
    setMarksNodes(updateMarks(pmViews));
    if (isFirstRun) {
      setTimeout(() => {
        setPosition(setTops());
        setFirstRun(false);
      }, 400);
    } else {
      setPosition(setTops());
    }
  }, [updateMarks(pmViews), setTops()]);

  const CommentTrackComponent = useMemo(
    () => (
      <BoxList
        area={area}
        commentsTracks={marksNodes[area] || []}
        position={position}
        recalculateTops={recalculateTops}
        users={users}
        view={main}
      />
    ),
    [marksNodes[area] || [], position, users],
  );
  return <>{CommentTrackComponent}</>;
};

const updateMarks = views => {
  if (views.main) {
    const allInlineNodes = [];

    Object.keys(views).forEach(eachView => {
      allInlineNodes.push(
        ...DocumentHelpers.findInlineNodes(views[eachView].state.doc),
      );
    });

    const allBlockNodes = DocumentHelpers.findBlockNodes(views.main.state.doc);
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
