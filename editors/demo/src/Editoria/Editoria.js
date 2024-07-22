import React, {
  useLayoutEffect,
  useState,
  useMemo,
  useRef,
  useEffect,
} from 'react';

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
  const comments = [
    {
      id: 'c6863c3e-cfb1-4465-a46e-e89718e10245',
      from: 83,
      to: 94,
      data: {
        type: 'comment',
        pmFrom: 83,
        pmTo: 94,
        conversation: [
          {
            content: '345345435',
            displayName: 'admin',
            userId: 'b3cfc28e-0f2e-45b5-b505-e66783d4f946',
            timestamp: 1721647289866,
          },
          {
            content: '111',
            displayName: 'admin',
            userId: 'b3cfc28e-0f2e-45b5-b505-e66783d4f946',
            timestamp: 1721647292430,
          },
          {
            content: '222',
            displayName: 'admin',
            userId: 'b3cfc28e-0f2e-45b5-b505-e66783d4f946',
            timestamp: 1721647294920,
          },
          {
            content: '444',
            displayName: 'admin',
            userId: 'b3cfc28e-0f2e-45b5-b505-e66783d4f946',
            timestamp: 1721647307447,
          },
        ],
        title: '353443',
        group: 'main',
        viewId: 'main',
      },
    },
  ];
  let finalConfig = config(comments);
  let key = 'editoria';

  if (width < 600) {
    layout = EditoriaMobileLayout;
    finalConfig = configMobile;
    key = 'editoriaMobile';
  }
  const editorRef = useRef();

  useEffect(() => {}, []);

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
