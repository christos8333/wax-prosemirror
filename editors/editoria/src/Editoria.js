import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";
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

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;

    .page-wrapper {
      height: ${props => (props.debug ? "50vh" : "100vh")}
    }
  }
`;
const PageWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

class Editoria extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <PageWrapper className="page-wrapper">
          <Wax
            options={options}
            autoFocus
            placeholder="Type Something..."
            theme="editoria"
            layout="editoria"
            renderLayout={({ editor, ...props }) => (
              <React.Fragment>
                <MainMenuBar {...props} />
                <div className="wax-surface-scroll">{editor}</div>
              </React.Fragment>
            )}
          />
        </PageWrapper>
      </React.Fragment>
    );
  }
}

export default Editoria;
