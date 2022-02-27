import { useState, useContext, useLayoutEffect, useCallback } from 'react';
import { isObject } from 'lodash';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const defaultOverlay = {
  left: null,
  top: null,
  from: null,
  to: null,
  mark: null,
};

export default options => {
  const { activeView } = useContext(WaxContext);

  const [position, setPosition] = useState({
    position: 'absolute',
    zIndex: 999,
    ...defaultOverlay,
  });

  let mark = {};

  /* Sets Default position at the end of the annotation. You
  can overwrite the default position in your component.
  Check: wax-prosemirror-components/src/components/comments/CommentBubbleComponent.js
  for reposition the create new comment component.
 */
  const calculatePosition = (focusedView, from, to) => {
    const WaxSurface = focusedView.dom.getBoundingClientRect();
    const end = focusedView.coordsAtPos(to);
    const left = end.left - WaxSurface.left + 5;
    const top = end.top - WaxSurface.top + 20;
    return {
      top,
      left,
    };
  };

  const displayOnSelection = focusedView => {
    const { selection } = focusedView.state;
    const { from, to } = selection;
    if (from === to) return defaultOverlay;
    const { left, top } = calculatePosition(focusedView, from, to);
    return {
      left,
      top,
      from,
      to,
      selection,
    };
  };

  const displayOnMark = (focusedView, overlayOptions) => {
    const { markType, followCursor } = overlayOptions;
    const PMmark = focusedView.state.schema.marks[markType];
    mark = DocumentHelpers.findMark(focusedView.state, PMmark);

    if (!isObject(mark)) return defaultOverlay;
    const { from, to } = followCursor ? focusedView.state.selection : mark;

    const { left, top } = calculatePosition(focusedView, from, to);

    return {
      left,
      top,
      from,
      to,
      mark,
    };
  };

  const displayOnMarkOrSelection = (focusedView, overlayOptions) => {
    const { markType, followCursor } = overlayOptions;
    const PMmark = focusedView.state.schema.marks[markType];
    mark = DocumentHelpers.findMark(focusedView.state, PMmark);

    if (!isObject(mark)) return displayOnSelection(focusedView, overlayOptions);
    const { from, to } = followCursor ? focusedView.state.selection : mark;

    const { left, top } = calculatePosition(focusedView, from, to);
    return {
      left,
      top,
      from,
      to,
      mark,
    };
  };

  const updatePosition = useCallback((followCursor = true) => {
    if (Object.keys(activeView).length === 0) return defaultOverlay;

    const { markType, selection } = options;

    if (markType && selection)
      return displayOnMarkOrSelection(activeView, options);

    if (selection) return displayOnSelection(activeView, options);

    return displayOnMark(activeView, options);
  });

  useLayoutEffect(() => {
    setPosition({
      position: 'absolute',
      zIndex: 999,
      ...updatePosition(options.followCursor),
    });
  }, [JSON.stringify(updatePosition(options.followCursor))]);

  return [position, setPosition, mark];
};
