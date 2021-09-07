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

const data = `<p class="paragraph"></p><div id="1a351d6c-13af-4f66-b5bd-8b995fffbd48" class="mutiple-choice"><div class="mutiple-choice-option" id="cf2b1908-e611-44cd-8a5b-8d0cad5c3df0" correct="true" feedback=""><p class="paragraph"></p></div><p class="paragraph"></p></div>`;

const Hhmi = () => {
  return (
    <>
      <Wax
        config={config}
        autoFocus
        fileUpload={file => renderImage(file)}
        value={data}
        // readonly
        layout={HhmiLayout}
        onChange={source => console.log(source)}
      />
    </>
  );
};

export default Hhmi;
