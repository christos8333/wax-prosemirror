/* eslint-disable no-param-reassign */
/* eslint react/prop-types: 0 */
import React, { useContext, useState, useMemo, useCallback } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { each, uniqBy, sortBy, groupBy } from 'lodash';
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
    const result = [];
    const allCommentsTop = [];
    
    // Cache DOM queries
    const waxSurface = main?.dom.getBoundingClientRect();
    const waxSurfaceMarginTop = main ? window.getComputedStyle(main.dom).marginTop : '';
    const panelWrapper = document.getElementsByClassName('panelWrapper');
    const panelWrapperHeight = panelWrapper[0]?.getBoundingClientRect().height || 0;
    const notesContainer = document.querySelector('#notes-container');
    const waxContainer = document.querySelector('#wax-container');
    const waxContainerTop = waxContainer?.getBoundingClientRect().top || 0;

    // Cache active track change state
    const activeTrackChange = trakChangePlugin?.getState(activeView.state).trackChange;

    // Pre-calculate common values
    const marginTopValue = parseInt(waxSurfaceMarginTop.slice(0, -2), 10) || 0;
    const baseOffset = area === 'main' ? 
      (waxSurface?.top || 0) + marginTopValue :
      panelWrapperHeight + waxContainerTop + 50;

    marksNodes[area]?.forEach((markNode, pos) => {
      const id = markNode?.node?.attrs?.id || markNode?.attrs?.id || markNode.id;
      const isActive = (activeComment && id === activeComment.id) || 
                      (activeTrackChange && id === activeTrackChange.attrs.id);

      // Get annotation position
      let annotationTop = 0;
      if (area === 'main') {
        const markNodeEl = document.querySelector(`[data-id="${id}"]`) || 
                          (pos > 0 ? document.querySelector(`[data-id="${marksNodes[area][pos - 1].id}"]`) : null);
        if (markNodeEl) {
          annotationTop = markNodeEl.getBoundingClientRect().top - baseOffset;
        }
      } else if (notesContainer) {
        const markNodeEl = notesContainer.querySelector(`[data-id="${id}"]`);
        if (markNodeEl) {
          annotationTop = markNodeEl.getBoundingClientRect().top - baseOffset;
        }
      }

      // Calculate box position
      let top = annotationTop;
      const boxEl = document.querySelector(`div[data-box="${id}"]`);
      const boxHeight = boxEl ? parseInt(boxEl.offsetHeight, 10) : 0;

      // Handle overlaps with previous boxes
      if (pos > 0) {
        const previousBox = marksNodes[area][pos - 1];
        if (annotationTop < previousBox.endHeight) {
          top = previousBox.endHeight + 2;
        }
      }

      // Store end height for next iteration
      markNode.endHeight = top + boxHeight + 4;
      result[pos] = top;
      allCommentsTop.push({ [id]: result[pos] });

      // Handle active state positioning
      if (isActive) {
        markNode.endHeight = annotationTop + boxHeight + 3;
        result[pos] = annotationTop;
        allCommentsTop[pos][id] = result[pos];

        // Adjust positions of boxes above active comment
        for (let i = pos; i > 0; i--) {
          const boxAbove = marksNodes[area][i - 1];
          const boxAboveEnds = boxAbove.endHeight;
          const currentTop = result[i];

          if (boxAboveEnds > currentTop) {
            const overlap = boxAboveEnds - currentTop;
            result[i - 1] -= overlap;
            const previousId = marksNodes[area][i - 1]?.node?.attrs?.id || 
                             marksNodes[area][i - 1]?.attrs?.id || 
                             marksNodes[area][i - 1].id;
            allCommentsTop[i - 1][previousId] = result[i - 1];
          } else {
            break;
          }
        }
      }
    });

    return allCommentsTop;
  }, [area, marksNodes, main, activeView.state, activeComment, trakChangePlugin]);

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
            activeView.state,
          )?.allCommentsDataList(),
        ),
      );
    } else {
      setMarksNodes(
        updateMarks(
          pmViews,
          CommentDecorationPluginKey?.getState(
            activeView.state,
          )?.allCommentsList(),
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
      CommentDecorationPluginKey?.getState(activeView.state)?.allCommentsList(),
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
    [marksNodes[area] || [], position, users, context.options.activeComment],
  );
  return <>{CommentTrackComponent}</>;
};

const updateMarks = (views, comments) => {
  const newComments = groupBy(comments, comm => comm.data.group) || [];
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
            mark.type.name === 'insertion' ||
            mark.type.name === 'deletion' ||
            mark.type.name === 'format_change'
          ) {
            mark.data = {};
            mark.data.pmFrom = node.pos;
            mark.from = node.pos;
            finalMarks.push(mark);
          }
        });
      }
    });

    allBlockNodes.map(node => {
      if (node.node.attrs.track && node.node.attrs.track.length > 0) {
        node.node.data = {};
        node.node.data.pmFrom = node.pos;
        finalNodes.push(node.node);
      }
    });

    const nodesAndMarks = [...uniqBy(finalMarks, 'attrs.id'), ...finalNodes];

    const groupedMarkNodes = { main: [], notes: [] };
    nodesAndMarks.forEach(markNode => {
      if (!groupedMarkNodes[markNode.attrs.group]) {
        groupedMarkNodes[markNode.attrs.group] = [markNode];
      } else {
        groupedMarkNodes[markNode.attrs.group].push(markNode);
      }
    });
    if (newComments?.main?.length > 0) {
      groupedMarkNodes.main = groupedMarkNodes.main.concat(newComments.main);
    }
    if (newComments?.notes?.length > 0)
      groupedMarkNodes.notes = groupedMarkNodes.notes.concat(newComments.notes);

    return {
      main: sortBy(groupedMarkNodes.main, ['data.pmFrom']),
      notes: groupedMarkNodes.notes,
    };
  }
  return [];
};
