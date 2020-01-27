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
  const {
    view: { main }
  } = useContext(WaxContext);

  const [position, setPosition] = useState({
    position: "absolute",
    ...defaultOverlay
  });

  let mark = {};

  const updatePosition = useCallback((followCursor = true) => {
    if (!main) return defaultOverlay;

    mark = markActive(main.state.schema.marks[options.markType])(main.state);

    if (!isObject(mark)) return defaultOverlay;

    const { from, to } = isObject(mark)
      ? followCursor
        ? main.state.selection
        : getMarkPosition(main.state.selection.$anchor, mark)
      : main.state.selection;

    const start = main.coordsAtPos(from);

    const box = main.dom.offsetParent.getBoundingClientRect();

    let left = start.left - box.left;
    let top = start.top - box.top + 20;

    return {
      left,
      top,
      from,
      to,
      mark
    };
  });

  useEffect(() => {
    setPosition({
      position: "absolute",
      ...updatePosition(options.followCursor)
    });
  }, [JSON.stringify(updatePosition(options.followCursor))]);

  return [position, setPosition, mark];
};
