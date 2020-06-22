import React, { Fragment } from "react";
import styled, { createGlobalStyle } from "styled-components";

import { EditoriaLayout } from "wax-prosemirror-layouts";
import { Wax } from "wax-prosemirror-core";

import { config } from "./config";

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

const Editoria = () => (
  <Fragment>
    <GlobalStyle />
    <StyledWax
      config={config}
      autoFocus
      placeholder="Type Something..."
      fileUpload={file => renderImage(file)}
      value={`<p class="paragraph">This is the first paragraph</p><p class="paragraph">This is the second paragraph</p><p class="author">This is an author</p>`}
      // value={`<p class="paragraph"><span class="comment" data-id="834ba3c5-1fcf-4a42-8e2f-1f975f229716" data-conversation="[]" data-group="main">and a </span><span class="insertion" data-id="" data-user="1234" data-username="demo" data-date="26541557" data-group=""><span class="comment" data-id="834ba3c5-1fcf-4a42-8e2f-1f975f229716" data-conversation="[]" data-group="main">sdasdssd</span></span><span class="comment" data-id="834ba3c5-1fcf-4a42-8e2f-1f975f229716" data-conversation="[]" data-group="main">paragraph</span></p><p class="paragraph">more</p>`}
      layout={EditoriaLayout}
      TrackChange
      onChange={source => console.log(source)}
      user={user}
    />
  </Fragment>
);

export default Editoria;
