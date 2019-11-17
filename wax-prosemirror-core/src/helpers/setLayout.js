import React from "react";
import * as layouts from "wax-prosemirror-layouts";
import Wax from "../Wax";

const setLayout = layout => props => {
  console.log(layouts, layouts[layout]);
  return <Wax {...props} Layout={layouts[layout]} />;
};
export default setLayout;
