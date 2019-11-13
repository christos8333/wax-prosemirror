import React, { Component } from "react";
import { Wax, CreateSchema } from "wax-prosemirror-core";
import { DefaultSchema } from "wax-prosemirror-schema";

const plugins = [];
const keys = {};

const options = {
  schema: new CreateSchema(DefaultSchema)
};

class Default extends Component {
  render() {
    return (
      <Wax options={options} autoFocus placeholder="Type Something..." debug />
    );
  }
}

export default Default;
