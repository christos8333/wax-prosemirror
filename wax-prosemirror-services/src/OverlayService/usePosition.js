import { useState, useContext, useEffect, useCallback } from "react";
import { isObject } from "lodash";
import { markActive, getMarkPosition } from "../lib/Utils";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";

export default options => {
  let { view } = useContext(WaxContext);

  const [position, setPosition] = useState({
    position: "absolute",
    left: null,
    top: null,
    from: null,
    to: null
  });

  const updatePosition = useCallback((followCursor = true) => {
    if (!view) return { left: null, top: null, to: null, from: null };

    const mark = markActive(view.state.schema.marks[options.markType])(
      view.state
    );

    if (!isObject(mark)) return { left: null, top: null, to: null, from: null };

    const { from, to } = isObject(mark)
      ? followCursor
        ? view.state.selection
        : getMarkPosition(view.state.selection.$anchor, mark)
      : view.state.selection;

    const start = view.coordsAtPos(from);

    const box = view.dom.offsetParent.getBoundingClientRect();

    let left = start.left - box.left + "px";
    let top = start.top - box.top + 20 + "px";

    return {
      left,
      top,
      from,
      to
    };
  });

  useEffect(() => {
    setPosition({
      position: "absolute",
      ...updatePosition(options.followCursor)
    });
  }, [JSON.stringify(updatePosition(options.followCursor))]);

  return [position, setPosition];
};
