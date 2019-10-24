import React, { Component } from "react";
import { Wax, CreateSchema } from "wax-prosemirror-core";
import { XpubSchema } from "wax-prosemirror-schema";
import "wax-prosemirror-themes/themes/default-theme.css";

const options = {
  schema: new CreateSchema(XpubSchema)
};

class Xpub extends Component {
  render() {
    return (
      <Wax
        options={options}
        theme="default"
        readonly
        value="<p>this is a par</p> <h1>this is a heading</h1><ul><li> one list</li></ul>"
      />
    );
  }
}

export default Xpub;
