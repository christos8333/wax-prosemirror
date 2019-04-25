import React, { Component } from "react";
import { Wax, createSchema } from "wax-prosemirror-core";
import { defaultSchema } from "wax-prosemirror-schema";
import { MainMenuBar } from "wax-prosemirror-components";
import "wax-prosemirror-layouts/defaultLayout.css";
import "wax-prosemirror-themes/defaultTheme.css";

const plugins = [];
const keys = {};

const options = {
  schema: new createSchema(defaultSchema)
};

class Editoria extends Component {
  render() {
    return (
      <Wax
        options={options}
        autoFocus
        placeholder="Type Something..."
        theme="default"
        layout="default"
        debug
        renderLayout={({ editor, ...props }) => (
          <React.Fragment>
            <MainMenuBar {...props} />
            <div>{editor}</div>
          </React.Fragment>
        )}
      />
    );
  }
}

export default Editoria;
