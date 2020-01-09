import React, { useMemo } from "react";
import usePosition from "./usePosition";
import { Overlay } from "wax-prosemirror-components";

export default (Component, markType) => () => {
  const [position, setPosition, mark] = usePosition(markType);
  const component = useMemo(
    () => (
      <Component setPosition={setPosition} mark={mark} position={position} />
    ),
    [JSON.stringify(mark), position]
  );
  const visible = position.left ? true : false;

  return <Overlay position={position}>{visible && component}</Overlay>;
};
