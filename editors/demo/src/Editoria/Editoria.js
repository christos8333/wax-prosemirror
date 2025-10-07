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
          // value={demo}
          value={`<p class="paragraph">sd fsd<span id="a1orez" class="citation-callout" data-id="a1orez">[1]</span>f sfdsd f fsdf s<span id="rhn1zf" class="citation-callout" data-id="rhn1zf">[2]</span>ds sdff <span id="a1orez" class="citation-callout" data-id="a1orez">[1]</span>sf</p><div class="citations-data" data-citation-format="vancouver">h1References<ol><li data-id="a1orez">Wells H. The Machine. The Time Machine. 2017.</li><li data-id="rhn1zf">Morrish J. Business models for machine-to-machine (M2M) communications. Machine-to-machine (M2M) Communications, 339-353.. 2015.</li></ol></div>`}
          // readonly
          layout={layout}
          onChange={debounce(source => {
            console.log(source);
          }, 200)}
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
