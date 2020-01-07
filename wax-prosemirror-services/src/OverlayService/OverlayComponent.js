import React, { useState, useContext, useEffect, useCallback } from "react";
import { markActive } from "../lib/Utils";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";

const usePosition = view => {
  const [position, setPosition] = useState({
    position: "absolute",
    left: null,
    top: null,
    from: null,
    to: null
  });

  const updatePosition = useCallback(view => {
    let left = position.left;
    let top = position.top;
    if (!view) return { left, top };
    view = view.view;
    const { from: currentFrom, to: currentTo } = view.state.selection;

    if (
      currentFrom < position.from ||
      position.to > currentTo ||
      !position.from ||
      !position.to
    ) {
      const start = view.coordsAtPos(currentFrom);

      const box = view.dom.offsetParent.getBoundingClientRect();

      left = start.left - box.left + "px";
      top = start.top - box.top + 20 + "px";
    }

    console.log(left, top);
    return { left, top, from: currentFrom, to: currentTo };
  });

  useEffect(() => {
    setPosition({ position: "absolute", ...updatePosition(view) });
  }, [JSON.stringify(updatePosition(view))]);

  return [position, setPosition];
};

export default Component => () => {
  let { view } = useContext(WaxContext);

  const [position, setPosition] = usePosition(view);

  console.log(position);

  if (!view) return null;

  const mark = markActive(view.view.state.schema.marks.link)(view.view.state);

  const visible = mark ? true : false;

  return visible ? (
    <div style={position}>
      <Component setPosition={setPosition} />
    </div>
  ) : null;
};
