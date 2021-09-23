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

const t = `<p class="paragraph">Based on the equation below</p><math-display class="math-node">x + y = 5</math-display><p class="paragraph">Which ones are correct?</p><p class="paragraph"></p><div id="" class="mutiple-choice"><div class="mutiple-choice-option" id="d7b65415-ff82-446f-afa4-accaa3837f4a" correct="false" feedback=""><p class="paragraph">answer 1</p><p class="paragraph"><math-inline class="math-node">x+y=1</math-inline></p></div><div class="mutiple-choice-option" id="e7d6bb2f-7cd7-44f1-92a0-281e72157538" correct="true" feedback=""><p class="paragraph">answer 2</p></div><div class="mutiple-choice-option" id="d6fc749f-afae-4203-9562-d68c380a86e5" correct="false" feedback=""><p class="paragraph">answer 3</p></div></div>`;

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
