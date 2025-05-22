/* eslint-disable no-param-reassign */
/* eslint react/prop-types: 0 */

import React, { useContext, useState, useMemo, useCallback } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { sortBy, groupBy } from 'lodash';
import {
  WaxContext,
  ApplicationContext,
  DocumentHelpers,
} from 'wax-prosemirror-core';
import BoxList from './BoxList';
import CommentDecorationPluginKey from '../plugins/CommentDecorationPluginKey';

export default ({ area, users }) => {
  const { app } = useContext(ApplicationContext);
  const context = useContext(WaxContext);
  const {
    pmViews,
    pmViews: { main },
    activeView,
    options: { activeComment },
  } = context;

  const trakChangePlugin = app.PmPlugins.get('trackChangePlugin');

  const [marksNodes, setMarksNodes] = useState([]);

  const [position, setPosition] = useState();
  const [isFirstRun, setFirstRun] = useState(true);

  const setTops = useCallback(() => {
    if (!main || !marksNodes[area]) return [];

    const WaxSurface = main.dom.getBoundingClientRect();
    const WaxSurfaceMarginTop = parseInt(
      window.getComputedStyle(main.dom).marginTop,
      10,
    );

    const activeTrackChange = trakChangePlugin?.getState(activeView.state)
      ?.trackChange;

    return marksNodes[area].reduce((allCommentsTop, markNode, pos) => {
      // Get mark node ID
      const id = markNode?.node?.attrs.id || markNode?.attrs?.id || markNode.id;

      // Check if this is the active comment
      const isActive =
        (activeComment && id === activeComment.id) ||
        (activeTrackChange && id === activeTrackChange.attrs.id);

      // Get mark node element and its position
      let markNodeEl = document.querySelector(`[data-id="${id}"]`);
      // Case for overlapping comments
      if (!markNodeEl && marksNodes[area][pos - 1]) {
        markNodeEl = document.querySelector(
          `[data-id="${marksNodes[area][pos - 1].id}"]`,
        );
      }

      if (!markNodeEl) return allCommentsTop;

      // Calculate base position
      const annotationTop =
        markNodeEl.getBoundingClientRect().top -
        WaxSurface.top +
        WaxSurfaceMarginTop;

      // Get box height
      const boxEl = document.querySelector(`div[data-box="${id}"]`);
      const boxHeight = boxEl ? parseInt(boxEl.offsetHeight, 10) : 0;

      // Calculate final position
      let top = annotationTop;

      // Handle overlap with previous box
      if (pos > 0) {
        const previousBox = marksNodes[area][pos - 1];
        if (annotationTop < previousBox.endHeight) {
          top = previousBox.endHeight + 2;
        }
      }

      // Store end height for next box
      markNode.endHeight = top + boxHeight + 4;

      // Handle active comment
      if (isActive) {
        top = annotationTop;
        markNode.endHeight = annotationTop + boxHeight + 3;

        // Adjust boxes above if needed
        for (let i = pos - 1; i >= 0; i--) {
          const boxAbove = marksNodes[area][i];
          const boxAboveEnds = boxAbove.endHeight;

          if (boxAboveEnds > top) {
            const overlap = boxAboveEnds - top;
            const previousId =
              boxAbove?.node?.attrs.id || boxAbove?.attrs?.id || boxAbove.id;

            // Update previous box position
            allCommentsTop[i][previousId] -= overlap;
            boxAbove.endHeight -= overlap;
          } else {
            break;
          }
        }
      }

      // Add position to result
      allCommentsTop.push({ [id]: top });
      return allCommentsTop;
    }, []);
  }, [marksNodes, activeComment, trakChangePlugin]);

  const recalculateTops = () => {
    setTimeout(() => {
      setPosition(setTops());
    });
  };

  useDeepCompareEffect(() => {
    if (app.config.get('config.YjsService')) {
      setMarksNodes(
        updateMarks(
          pmViews,
          CommentDecorationPluginKey?.getState(
            main.state,
          )?.allCommentsDataList(),
        ),
      );
    } else {
      setMarksNodes(
        updateMarks(
          pmViews,
          CommentDecorationPluginKey?.getState(main.state)?.allCommentsList(),
        ),
      );
    }

    let firstRunTimeout = () => true;
    if (isFirstRun) {
      firstRunTimeout = setTimeout(() => {
        setPosition(setTops());
        setFirstRun(false);
      }, 400);
    } else {
      setPosition(setTops());
    }

    return () => clearTimeout(firstRunTimeout);
  }, [
    updateMarks(
      pmViews,
      CommentDecorationPluginKey?.getState(main.state)?.allCommentsList(),
    ),
    setTops(),
  ]);

  const CommentTrackComponent = useMemo(
    () => (
      <BoxList
        activeComment={context.options.activeComment}
        area={area}
        commentsTracks={marksNodes[area] || []}
        position={position}
        recalculateTops={recalculateTops}
        users={users}
        view={main}
      />
    ),
    [marksNodes[area] || [], position],
  );
  return <>{CommentTrackComponent}</>;
};

const updateMarks = (views, comments) => {
  if (!views.main) return [];

  const newComments = groupBy(comments, comm => comm.data.group) || {};

  const allInlineNodes = [];
  const finalMarks = [];
  const finalNodes = [];

  // Collect all inline nodes
  Object.keys(views).forEach(viewKey => {
    const inlineNodes = DocumentHelpers.findInlineNodes(
      views[viewKey].state.doc,
    );
    allInlineNodes.push(...inlineNodes);
  });

  allInlineNodes.forEach(node => {
    const { marks } = node.node;
    if (marks && marks.length > 0) {
      marks.forEach(mark => {
        if (
          mark.type.name === 'insertion' ||
          mark.type.name === 'deletion' ||
          mark.type.name === 'format_change'
        ) {
          mark.data = { pmFrom: node.pos };
          mark.from = node.pos;
          finalMarks.push(mark);
        }
      });
    }
  });

  const allBlockNodes = DocumentHelpers.findBlockNodes(views.main.state.doc);
  allBlockNodes.forEach(node => {
    if (node.node.attrs.track && node.node.attrs.track.length > 0) {
      node.node.data = { pmFrom: node.pos };
      finalNodes.push(node.node);
    }
  });

  const uniqueMarks = [];
  const seenIds = {};

  finalMarks.forEach(mark => {
    const { id } = mark.attrs;
    if (!seenIds[id]) {
      seenIds[id] = true;
      uniqueMarks.push(mark);
    }
  });

  const nodesAndMarks = [...uniqueMarks, ...finalNodes];

  const groupedMarkNodes = { main: [], notes: [] };

  nodesAndMarks.forEach(markNode => {
    const { group } = markNode.attrs;
    if (groupedMarkNodes[group]) {
      groupedMarkNodes[group].push(markNode);
    } else {
      groupedMarkNodes[group] = [markNode];
    }
  });

  if (newComments.main && newComments.main.length > 0) {
    groupedMarkNodes.main = groupedMarkNodes.main.concat(newComments.main);
  }

  if (newComments.notes && newComments.notes.length > 0) {
    groupedMarkNodes.notes = groupedMarkNodes.notes.concat(newComments.notes);
  }

  // Return sorted results
  return {
    main: sortBy(groupedMarkNodes.main, ['data.pmFrom']),
    notes: groupedMarkNodes.notes,
  };
};
