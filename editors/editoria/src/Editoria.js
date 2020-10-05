import React, { useLayoutEffect, useState, useEffect, useMemo } from 'react';
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

const Editoria = () => {
  const [width, height] = useWindowSize();

  let layout = EditoriaLayout;

  if (width < 600) {
    layout = EditoriaMobileLayout;
  }

  const MemorizedComponent = useMemo(
    () => (
      <>
        <GlobalStyle />
        <Wax
          config={config}
          autoFocus
          placeholder="Type Something..."
          fileUpload={file => renderImage(file)}
          value={demo}
          layout={layout}
          user={user}
        />
      </>
    ),
    [layout],
  );
  return <>{MemorizedComponent}</>;
};

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default Editoria;
