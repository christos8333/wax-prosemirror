import React, { Component } from "react";
import styled from "styled-components";

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

const MainEditor = styled.div`
  ${"" /* style override*/};
`;

const menuItems = [
  "undo",
  "redo",
  "strong",
  "image",
  "table",
  "tableDropDownOptions"
];

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
        renderLayout={({ editor, ...props }) => (
          <React.Fragment>
            <MainMenuBar menuItems={menuItems} {...props} />
            <MainEditor className="main-editor">{editor}</MainEditor>
          </React.Fragment>
        )}
      />
    );
  }
}

export default Default;
