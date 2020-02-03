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

  // Sets Default position at the end of the annotation.
  const calculatePosition = (main, mark) => {
    const { from, to } = mark;
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

  const updatePosition = useCallback((followCursor = true) => {
    if (!main) return defaultOverlay;

    //TODO also acount for the case you don't look for a mark but you need the selection to be > 1
    const PMmark = main.state.schema.marks[options.markType];
    mark = DocumentHelpers.findMark(main.state, PMmark);

    if (!isObject(mark)) return defaultOverlay;

    const { from, to } = mark
      ? followCursor ? main.state.selection : { from, to }
      : main.state.selection;

    const { left, top } = calculatePosition(main, mark);

    return {
      left,
      top,
      from,
      to,
      mark
    };
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