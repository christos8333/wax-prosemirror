import { useState, useContext, useEffect, useCallback } from "react";
import { isObject } from "lodash";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";
import { DocumentHelpers } from "wax-prosemirror-utilities";

const defaultOverlay = {
  left: null,
  top: null,
  from: null,
  to: null,
  mark: null
};

export default options => {
  const { view: { main }, activeView } = useContext(WaxContext);

  const [position, setPosition] = useState({
    position: "absolute",
    ...defaultOverlay
  });

  let mark = {};

  //TODO probably is best each component to calculate it's own position and not have a default
  const calculatePositionTemp = (activeView, from, to) => {
    const WaxSurface = activeView.dom.getBoundingClientRect();
    const start = activeView.coordsAtPos(from);
    const end = activeView.coordsAtPos(to);
    const left = WaxSurface.width + WaxSurface.x;
    const top = end.top;
    return {
      top,
      left
    };
  };

  // Sets Default position at the end of the annotation.
  const calculatePosition = (activeView, from, to) => {
    const WaxSurface = activeView.dom.getBoundingClientRect();
    const start = activeView.coordsAtPos(from);
    const end = activeView.coordsAtPos(to);
    const left = end.left;
    const top = end.top + 20;
    return {
      top,
      left
    };
  };

  const displayOnSelection = (activeView, options) => {
    const { selection } = activeView.state;
    const { from, to } = selection;
    if (from === to) return defaultOverlay;
    const { left, top } = calculatePositionTemp(activeView, from, to);
    return {
      left,
      top,
      from,
      to,
      selection
    };
  };

  const displayOnMark = (activeView, options) => {
    const { markType, followCursor } = options;
    const PMmark = activeView.state.schema.marks[markType];
    mark = DocumentHelpers.findMark(activeView.state, PMmark);

    if (!isObject(mark)) return defaultOverlay;
    const { from, to } = followCursor ? activeView.state.selection : mark;

    const { left, top } = calculatePosition(activeView, from, to);

    return {
      left,
      top,
      from,
      to,
      mark
    };
  };

  const updatePosition = useCallback((followCursor = true) => {
    if (Object.keys(activeView).length === 0) return defaultOverlay;

    const { markType, selection } = options;

    if (selection) return displayOnSelection(activeView, options);

    return displayOnMark(activeView, options);
  });

  useEffect(
    () => {
      setPosition({
        position: "absolute",
        ...updatePosition(options.followCursor)
      });
    },
    [JSON.stringify(updatePosition(options.followCursor))]
  );

  return [position, setPosition, mark];
};
