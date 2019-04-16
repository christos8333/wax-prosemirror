import React, { Component } from "react";
import { Wax } from "wax-prosemirror-core";
import { defaultSchema } from "wax-prosemirror-schema";

class Default extends Component {
  render() {
    console.log(defaultSchema);
    return (
      <Wax
        placeholder="Type Something..."
        autoFocus
        theme="default"
        layout="default"
        debug
      />
    );
  }
}

export default Default;
