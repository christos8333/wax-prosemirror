import React, { useLayoutEffect, useState, useMemo } from 'react';
import { createGlobalStyle } from 'styled-components';

import { Wax } from 'wax-prosemirror-core';

import { EditoriaLayout, EditoriaMobileLayout } from './layout';
import { config, configMobile } from './config';
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
  userId: 'b3cfc28e-0f2e-45b5-b505-e66783d4f946',
  userColor: {
    addition: 'royalblue',
    deletion: 'indianred',
  },
  username: 'admin',
};

const Editoria = () => {
  const [width] = useWindowSize();

  let layout = EditoriaLayout;
  let finalConfig = config;
  let key = 'editoria';

  if (width < 600) {
    layout = EditoriaMobileLayout;
    finalConfig = configMobile;
    key = 'editoriaMobile';
  }

  console.log(JSON.stringify('["test"]'));
  // console.log(
  //   JSON.parse('[{&quot;item&quot;:&quot;custom-tag-label-1&quot;}]'),
  // );

  const EditoriaComponent = useMemo(
    () => (
      <>
        <GlobalStyle />
        <Wax
          key={key}
          config={finalConfig}
          autoFocus
          placeholder="Type Something..."
          fileUpload={file => renderImage(file)}
          value={`<p class="paragraph">hello</p><p class="custom-tag-label-3" data-type="block">Lorem this is <span class="custom-tag-label-1,custom-tag-label-2" data-type="inline" data-tags="[&quot;custom-tag-label-1&quot;,&quot;custom-tag-label-2&quot;]">text </span>dolor si</p>`}
          // value={demo}
          // readonly
          layout={layout}
          onChange={source => console.log(source)}
          user={user}
        />
      </>
    ),
    [layout, finalConfig],
  );
  return <>{EditoriaComponent}</>;
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
