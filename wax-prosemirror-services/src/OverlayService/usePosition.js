import { useState, useContext, useEffect, useCallback } from "react";
import { isObject } from "lodash";
import { markActive, getMarkPosition } from "../lib/Utils";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";

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

  //TODO move to utilities
  const findMark = (state, PMmark) => {
    const { selection: { $from, $to }, doc } = state;

    const fromMark = $from.marks().find(mark => mark.type === PMmark);
    const toMark = $to.marks().find(mark => mark.type === PMmark);
    let markFound;
    doc.nodesBetween($from.pos, $to.pos, (node, from) => {
      if (node.marks) {
        const actualMark = node.marks.find(mark => mark.type === PMmark);
        if (actualMark) {
          markFound = {
            from,
            to: from + node.nodeSize,
            attrs: actualMark.attrs,
            contained: !fromMark || !toMark || fromMark === toMark
          };
        }
      }
    });
    return markFound;
  };

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
    mark = findMark(main.state, PMmark);

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
