import React from "react";

export default Component => () => {
  return (
    <div style={{ width: "100px", height: "100px" }}>
      Overlay Area
      <Component />
    </div>
  );
};
