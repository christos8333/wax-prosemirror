import React from "react";
import usePosition from "./usePosition";

export default (Component, markType) => () => {
  const [position, setPosition] = usePosition(markType);

  const visible = position.left ? true : false;

  return (
    <div style={position}>
      {visible && <Component setPosition={setPosition} />}
    </div>
  );
};
