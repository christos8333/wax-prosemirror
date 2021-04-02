import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Wax } from 'wax-prosemirror-core';

import { HhmiLayout } from './layout';
import { config } from './config';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow-y: hidden;
    padding: 0;
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

const Hhmi = () => {
  return (
    <>
      <GlobalStyle />
      <Wax
        config={config}
        autoFocus
        placeholder="Type Something..."
        fileUpload={file => renderImage(file)}
        value=""
        targetFormat="JSON"
        // readonly
        layout={HhmiLayout}
        // onChange={source => console.log(source)}
        // user={user}
      />
    </>
  );
};

export default Hhmi;
