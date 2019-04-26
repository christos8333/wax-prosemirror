import React, { Component } from "react";
import { Wax, CreateSchema } from "wax-prosemirror-core";
import { EditoriaSchema } from "wax-prosemirror-schema";
import { MainMenuBar } from "wax-prosemirror-components";
import "wax-prosemirror-layouts/layouts/editoria-layout.css";
import "wax-prosemirror-themes/themes/editoria-theme.css";

const plugins = [];
const keys = {};

const options = {
  schema: new CreateSchema(EditoriaSchema)
};

class Editoria extends Component {
  render() {
    return (
      <Wax
        options={options}
        autoFocus
        placeholder="Type Something..."
        theme="editoria"
        layout="editoria"
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
