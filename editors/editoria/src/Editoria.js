import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Wax, CreateSchema } from "wax-prosemirror-core";
import { EditoriaSchema } from "wax-prosemirror-schema";
import { orderedList, bulletList, listItem } from "prosemirror-schema-list";
import { MainMenuBar, SideMenuBar } from "wax-prosemirror-components";
import "wax-prosemirror-layouts/layouts/editoria-layout.css";
import "wax-prosemirror-themes/themes/editoria-theme.css";

const plugins = [];
const keys = {};

const extraNodes = {
  ordered_list: {
    ...orderedList,
    content: "list_item+",
    group: "block"
  },
  bullet_list: {
    ...bulletList,
    content: "list_item+",
    group: "block"
  },
  list_item: {
    ...listItem,
    content: "paragraph block*",
    group: "block"
  }
};

EditoriaSchema.nodes = { ...EditoriaSchema.nodes, ...extraNodes };

const options = {
  schema: new CreateSchema(EditoriaSchema)
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow-y: hidden;
  #root {
    height:100vh;
    width:100vw;
  }
  }
`;
const StyledWax = styled(Wax)`
  .wax-surface-scroll {
    height: ${props => (props.debug ? "50vh" : "100%")};
  }
`;

class Editoria extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <StyledWax
          options={options}
          autoFocus
          placeholder="Type Something..."
          theme="editoria"
          layout="editoria"
          debug
          renderLayout={({ editor, ...props }) => (
            <React.Fragment>
              <MainMenuBar {...props} />
              <div className="wax-surface-container">
                <SideMenuBar {...props} />
                {editor}
              </div>
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}

export default Editoria;
