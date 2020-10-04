import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';

import { EditoriaLayout, EditoriaMobileLayout } from 'wax-prosemirror-layouts';
import { Wax } from 'wax-prosemirror-core';

import { config } from './config';
import { demo } from './demo';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow-y: hidden;
  }

  #root {
    height:100vh;
    width:100vw;
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
  userId: '1234',
  username: 'demo',
};

let layout = EditoriaLayout;

if (window.innerWidth < 600) {
  console.log('smaller');
  layout = EditoriaMobileLayout;
}

const Editoria = () => (
  <Fragment>
    <GlobalStyle />
    <Wax
      config={config}
      autoFocus
      placeholder="Type Something..."
      fileUpload={file => renderImage(file)}
      value={demo}
      // value={`<p class="paragraph">This is the first paragraph</p><p class="paragraph">This is the second paragraph</p><p class="author">This is an author</p>`}
      layout={layout}
      // debug
      // onChange={source => console.log(source)}
      user={user}
    />
  </Fragment>
);

export default Editoria;
