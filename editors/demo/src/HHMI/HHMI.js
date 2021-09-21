import React from 'react';

import { Wax } from 'wax-prosemirror-core';

import { HhmiLayout } from './layout';
import { config } from './config';

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
      <Wax
        config={config}
        autoFocus
        fileUpload={file => renderImage(file)}
        value=""
        // readonly
        layout={HhmiLayout}
        // onChange={source => console.log(source)}
      />
    </>
  );
};

export default Hhmi;
