import React, { Component } from "react";
import { Wax, createSchema } from "wax-prosemirror-core";
import { defaultSchema } from "wax-prosemirror-schema";
import "wax-prosemirror-layouts/defaultLayout.css";
import "wax-prosemirror-themes/defaultTheme.css";

const plugins = [];
const keys = {};

const options = {
  schema: new createSchema(defaultSchema)
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
