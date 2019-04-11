import React, { Component } from "react";

import { Wax } from "wax-prosemirror-core";

class Default extends Component {
  render() {
    return <Wax debug placeholder="Type Something..." />;
  }
}

export default Default;
