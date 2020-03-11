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
  const { view: { main } } = useContext(WaxContext);

  const [position, setPosition] = useState({
    position: "absolute",
    ...defaultOverlay
  });

  let mark = {};

  //TODO probably is best each component to calculate it's own position and not have a default
  const calculatePositionTemp = (main, from, to) => {
    const WaxSurface = main.dom.offsetParent.firstChild.getBoundingClientRect();
    const start = main.coordsAtPos(from);
    const end = main.coordsAtPos(to);
    let left = WaxSurface.width;
    const top = end.top - WaxSurface.top;
    return {
      top,
      left
    };
  };

  // Sets Default position at the end of the annotation.
  const calculatePosition = (main, from, to) => {
    const WaxSurface = main.dom.offsetParent.getBoundingClientRect();
    const start = main.coordsAtPos(from);
    const end = main.coordsAtPos(to);
    let left = end.left - WaxSurface.left;
    const top = end.top - WaxSurface.top + 20;
    return {
      top,
      left
    };
  };

  const displayOnSelection = (main, options) => {
    const { selection } = main.state;
    const { from, to } = selection;
    if (from === to) return defaultOverlay;

    const { left, top } = calculatePositionTemp(main, from, to);
    return {
      left,
      top,
      from,
      to,
      selection
    };
  };

  const displayOnMark = (main, options) => {
    const { markType, followCursor } = options;
    const PMmark = main.state.schema.marks[markType];
    mark = DocumentHelpers.findMark(main.state, PMmark);

    if (!isObject(mark)) return defaultOverlay;
    const { from, to } = followCursor ? main.state.selection : mark;

    const { left, top } = calculatePosition(main, from, to);

    return {
      left,
      top,
      from,
      to,
      mark
    };
  };

  const updatePosition = useCallback((followCursor = true) => {
    if (!main) return defaultOverlay;
    const { markType, selection } = options;

    if (selection) return displayOnSelection(main, options);

    return displayOnMark(main, options);
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
