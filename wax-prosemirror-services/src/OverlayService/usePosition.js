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
  const { view } = useContext(WaxContext);

  const [position, setPosition] = useState({
    position: "absolute",
    ...defaultOverlay
  });

  let mark = {};

  const updatePosition = useCallback((followCursor = true) => {
    if (!view) return defaultOverlay;

    mark = markActive(view.state.schema.marks[options.markType])(view.state);

    if (!isObject(mark)) return defaultOverlay;

    const { from, to } = isObject(mark)
      ? followCursor
        ? view.state.selection
        : getMarkPosition(view.state.selection.$anchor, mark)
      : view.state.selection;

    const start = view.coordsAtPos(from);

    const box = view.dom.offsetParent.getBoundingClientRect();

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
