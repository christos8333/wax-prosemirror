import React, { Component } from "react";
import { Schema } from "prosemirror-model";
import { Wax } from "wax-prosemirror-core";
import { defaultSchema } from "wax-prosemirror-schema";

const { nodes, marks } = defaultSchema;

const options = {
  schema: new Schema({ nodes, marks })
};

class Default extends Component {
  render() {
    console.log(options.schema);
    return (
      <Wax
        placeholder="Type Something..."
        options={options}
        autoFocus
        theme="default"
        layout="default"
        debug
      />
    );
  }
}

export default Default;
