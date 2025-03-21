import React, { useLayoutEffect, useState, useMemo, useRef } from 'react';

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
  const editorRef = useRef();

  const EditoriaComponent = useMemo(
    () => (
      <>
        <Wax
          ref={editorRef}
          key={key}
          config={finalConfig}
          autoFocus
          placeholder="Type Something..."
          fileUpload={file => renderImage(file)}
          value={demo}
          // readonly
          layout={layout}
          // onChange={debounce(source => {
          //   console.log(source);
          // }, 200)}
          user={user}
          scrollMargin={200}
          scrollThreshold={200}
        />
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
