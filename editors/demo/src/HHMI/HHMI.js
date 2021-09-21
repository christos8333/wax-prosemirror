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
const t = `<p class="paragraph">sdfsd</p><p class="paragraph">fdfs</p><div id="4cdb7e13-514d-4c6d-b2f3-f5b1a07af10a" class="mutiple-choice"><div class="mutiple-choice-option" id="d394ff84-5153-49e2-af12-141b05883be4" correct="false" feedback=""><p class="paragraph">rwerewrwer</p></div><div class="mutiple-choice-option" id="4efaa449-4d06-448b-98cd-a3b1c58b5b62" correct="false" feedback=""><p class="paragraph"></p></div></div>`;

const Hhmi = () => {
  return (
    <>
      <Wax
        config={config}
        autoFocus
        fileUpload={file => renderImage(file)}
        value={t}
        // readonly
        layout={HhmiLayout}
        onChange={source => console.log(source)}
      />
    </>
  );
};

export default Hhmi;
