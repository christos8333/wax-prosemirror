import React, { useMemo } from "react";

export default (Component, plugin) => ({ view }) => (
  <div>
    <Component {...plugin.getState(view.state)} />
    Overlay Area
  </div>
);
//
