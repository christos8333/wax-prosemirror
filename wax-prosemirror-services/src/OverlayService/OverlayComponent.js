import React from "react";
import { markActive } from "../lib/Utils";

export default Component => ({ view }) => {
  if (!view) return null;

  if (!markActive(view.state.schema.marks.link)(view.state)) {
    return null;
  }

  return (
    <div style={{ position: "relative", width: "100px", height: "100px" }}>
      Overlay Area
      <Component />
    </div>
  );
};
