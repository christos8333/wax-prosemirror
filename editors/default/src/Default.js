import React from "react";
import { Wax } from "wax-prosemirror-core";
import { DefaultLayout } from "wax-prosemirror-layouts";

const Default = () => (
  <Wax autoFocus placeholder="Type Something..." layout={DefaultLayout} debug />
);

export default Default;
