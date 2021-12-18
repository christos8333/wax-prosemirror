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

const t = `<p class="paragraph"></p><div id="84db3734-94ed-4dd0-82bb-15404854df0f" class="multiple-choice"><div class="multiple-choice-question" id="38de8538-647a-489d-8474-f92d0d256c32"><p class="paragraph">question</p></div><div class="multiple-choice-option" id="debb868e-bbfe-4ba2-bf93-c963153ff791" correct="false" feedback=""><p class="paragraph">answer 1</p></div><div class="multiple-choice-option" id="810bcf10-4fcb-4d1e-9dab-ce35cbd28527" correct="false" feedback=""><p class="paragraph">answer 2</p></div></div>`;

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
        // onChange={source => console.log(source)}
      />
    </>
  );
};

export default Hhmi;
