import React, { Component } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

import { Wax } from "wax-prosemirror-core";
import { MainMenuBar, SideMenuBar } from "wax-prosemirror-components";
import { cokoTheme } from "wax-prosemirror-themes";

import "wax-prosemirror-layouts/layouts/editoria-layout.css";
import "wax-prosemirror-layouts/vars/wax-editoria-vars.css";

import { schema, keys, plugins, rules } from "./EditorConfig";

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
// USE FOR TRACK TEST
const text = `<ul><li><p class="paragraph">this is the li content</p></li><li><p class="paragraph">And another</p></li></ul><h1>this is a title</h1><p class="paragraph" data-track="[{&quot;type&quot;:&quot;block_change&quot;,&quot;user&quot;:&quot;editor.user.id&quot;,&quot;username&quot;:&quot;editor.user.username&quot;,&quot;date&quot;:26069447,&quot;before&quot;:{&quot;type&quot;:&quot;author&quot;,&quot;attrs&quot;:{&quot;class&quot;:&quot;author&quot;}}}]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p class="author">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`;

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
          fileUpload={file => renderImage(file)}
          debug
          value=""
          user={user}
        >
          {({ editor, view, ...props }) => (
            <ThemeProvider theme={cokoTheme}>
              <React.Fragment>
                <MainMenuBar view={view} {...props} />
                <div className="wax-surface-container">
                  <SideMenuBar view={view} {...props} />
                  {editor}
                </div>
              </React.Fragment>
            </ThemeProvider>
          )}
        </StyledWax>
      </React.Fragment>
    );
  }
}

export default Editoria;
