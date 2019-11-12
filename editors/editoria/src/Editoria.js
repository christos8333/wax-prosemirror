import React, { Fragment, Component } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

import { Wax } from "wax-prosemirror-core";
import { EditoriaLayout } from "wax-prosemirror-layouts";
import { cokoTheme } from "wax-prosemirror-themes";

import { schema, keys, plugins, rules } from "./EditorConfig";

import text from "./text";

const options = {
  schema,
  plugins,
  keys,
  rules
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

const renderImage = file => {
  const reader = new FileReader();
  return new Promise((accept, fail) => {
    reader.onload = () => accept(reader.result);
    reader.onerror = () => fail(reader.error);
    // Some extra delay to make the asynchronicity visible
    setTimeout(() => reader.readAsDataURL(file), 150);
  });
};

const user = {
  userId: "1234",
  username: "demo"
};

class Editoria extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <StyledWax
          options={options}
          autoFocus
          placeholder="Type Something..."
          fileUpload={file => renderImage(file)}
          debug
          value=""
          user={user}
        >
          {({ editor, view, ...props }) => (
            <ThemeProvider theme={cokoTheme}>
              <EditoriaLayout editor={editor} view={view} {...props} />
            </ThemeProvider>
          )}
        </StyledWax>
      </Fragment>
    );
  }
}

export default Editoria;
