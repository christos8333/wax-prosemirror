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

const t = `<p class="paragraph">Based on the equation below</p>
<math-display class="math-node">x + y = 5</math-display><p class="paragraph">Which ones are correct?</p>
<p class="paragraph"></p>
<div id="" class="multiple-choice"><div class="multiple-choice-option" id="d7b65415-ff82-446f-afa4-accaa3837f4a" correct="false" feedback="">
<p class="paragraph">answer 1</p><p class="paragraph"><math-inline class="math-node">x+y=1</math-inline></p></div>
<div class="multiple-choice-option" id="e7d6bb2f-7cd7-44f1-92a0-281e72157538" correct="true" feedback="">
<p class="paragraph">answer 2</p></div><div class="multiple-choice-option" id="d6fc749f-afae-4203-9562-d68c380a86e5" correct="false" feedback="1111111">
<p class="paragraph">answer 3</p></div></div>

<div id="" class="fill-the-gap"><p class="paragraph">A <span id="bfd4376c-4424-455e-9187-f53282fa1024" class="fill-the-gap">DNA</span> molecule is very long and usually consists of hundreds or thousands of genes.</p><p class="paragraph">An electron having a certain discrete amount of <span id="14dedf44-728f-4384-835f-e3af82b25623" class="fill-the-gap">energy</span> is something like a ball on a staircase.</p></div><p class="paragraph"></p>`;

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
