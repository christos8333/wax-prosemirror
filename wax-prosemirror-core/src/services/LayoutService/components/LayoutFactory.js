import React from "react";
import componentPlugin from "./componentPlugin";

export default Component => props => (
  <Component componentPlugin={componentPlugin} {...props} />
);
