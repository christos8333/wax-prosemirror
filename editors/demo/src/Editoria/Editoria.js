import React, { useLayoutEffect, useState, useMemo } from 'react';

import { Wax } from 'wax-prosemirror-core';

import { EditoriaLayout, EditoriaMobileLayout } from './layout';
import { config, configMobile } from './config';
import { demo } from './demo';
import { debounce } from 'lodash';

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

  const EditoriaComponent = useMemo(
    () => (
      <>
        <Wax
          key={key}
          config={finalConfig}
          autoFocus
          placeholder="Type Something..."
          fileUpload={file => renderImage(file)}
          value={`<p class="paragraph"><span class="small-caps">some</span> text</p><h2>h2</h2><h3>a head</h3><h4>fff</h4><h1>ttt</h1>`}
          // readonly
          layout={layout}
          onChange={debounce(source => {
            console.log(source);
          }, 3000)}
          onBlur={source => console.log(source)}
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
