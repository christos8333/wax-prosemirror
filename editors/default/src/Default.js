import React, { Component } from "react";
import { Wax, CreateSchema } from "wax-prosemirror-core";
import { DefaultSchema } from "wax-prosemirror-schema";
import "wax-prosemirror-layouts/layouts/default-layout.css";
import "wax-prosemirror-themes/themes/default-theme.css";

const plugins = [];
const keys = {};

const options = {
  schema: new CreateSchema(DefaultSchema)
};

class Default extends Component {
  render() {
    return (
      <Wax
        options={options}
        autoFocus
        placeholder="Type Something..."
        theme="default"
        layout="default"
        debug
      />
    );
  }
}

export default Default;
