import React, { Component } from "react";
import { Wax } from "wax-prosemirror-core";
import "./default.css";

class Default extends Component {
  render() {
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
