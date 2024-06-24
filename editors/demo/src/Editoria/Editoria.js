import React, {
  useLayoutEffect,
  useState,
  useMemo,
  useEffect,
  useRef,
} from 'react';

import { Wax } from 'wax-prosemirror-core';

import { EditoriaLayout, EditoriaMobileLayout } from './layout';
import { config, configMobile } from './config';
import { demo } from './demo';
import { debounce } from 'lodash';
import { TablesService } from 'wax-table-service';

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
  const [myConfig, setMyConfig] = useState(config);
  const [myName, setMyName] = useState('COKO');
  const [isFirst, setFirst] = useState(true);

  let layout = EditoriaLayout;
  let finalConfig = config;
  let key = 'editoria';

  if (width < 600) {
    layout = EditoriaMobileLayout;
    finalConfig = configMobile;
    key = 'editoriaMobile';
  }
  const editorRef = useRef();

  // useEffect(() => {
  //   console.log('sss');
  //   // const configObj = config(yjsProvider, ydoc, 'christos')
  //   setTimeout(() => {
  //     setFirst(false);
  //   }, 5000);
  //   // configObj.services = [...configObj.services, new TablesService()]
  // }, [isFirst]);

  if (!isFirst) {
    // configObj.services = [...configObj.services, new TablesService()]
    // configObj.name = 'ddd';
    config.name = 'Ffdfd';
    // setMyConfig({ ...myConfig });
  }

  return (
    <>
      <button
        onClick={() => {
          console.log(myConfig);
          // myConfig.PmPlugins = [];
          // myConfig.services = [...myConfig.services, new TablesService()];
          myConfig.name = 'Ffdfd';
          setMyConfig({ ...myConfig });
        }}
      >
        {' '}
        change config
      </button>

      <button
        onClick={() => {
          setMyName('GIANNIS');
        }}
      >
        {' '}
        change name
      </button>

      <Wax
        ref={editorRef}
        key={key}
        config={config}
        autoFocus
        placeholder="Type Something..."
        fileUpload={file => renderImage(file)}
        // value={demo}
        // readonly
        layout={layout}
        name={myName}
        onChange={debounce(source => {
          console.log(JSON.stringify(source));
        }, 200)}
        user={user}
        scrollMargin={200}
        scrollThreshold={200}
      />
    </>
  );

  // const EditoriaComponent = useMemo(
  //   () => (
  //     <>
  //       <button
  //         onClick={() => {
  //           console.log(myConfig);
  //           myConfig.PmPlugins = [];
  //           myConfig.services = [...myConfig.services, new TablesService()];
  //           setMyConfig({ ...myConfig });
  //         }}
  //       >
  //         {' '}
  //         change config
  //       </button>

  //       <Wax
  //         ref={editorRef}
  //         key={key}
  //         config={myConfig}
  //         autoFocus
  //         placeholder="Type Something..."
  //         fileUpload={file => renderImage(file)}
  //         // value={demo}
  //         // readonly
  //         layout={layout}
  //         // onChange={debounce(source => {
  //         //   console.log(JSON.stringify(source));
  //         // }, 200)}
  //         user={user}
  //         scrollMargin={200}
  //         scrollThreshold={200}
  //       />
  //     </>
  //   ),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [layout, myConfig],
  // );
  // return <>{EditoriaComponent}</>;
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
