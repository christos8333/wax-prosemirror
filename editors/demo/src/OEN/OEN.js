import React, { useRef } from 'react';

import { Wax } from 'wax-prosemirror-core';

import { OenLayout } from './layout';
import { config } from './config';
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

const val = `<h3>33333</h3>><section class="section"><div class="introduction" data-type="content_structure_element"><p>Intro</p></div>
              <div class="outline" data-type="content_structure_element"><p>outline</p></div></section>
              <section class="section"><div class="introduction" data-type="content_structure_element"><p>Intro</p></div>
              <div class="outline" data-type="content_structure_element"><p>outline</p></div></section>`;

const Oen = () => {
  const editorRef = useRef();

  return (
    <Wax
      ref={editorRef}
      config={config}
      autoFocus
      placeholder="Type Something..."
      fileUpload={file => renderImage(file)}
      value={val}
      // readonly
      layout={OenLayout}
      // onChange={debounce(source => {
      //   console.log(JSON.stringify(source));
      // }, 200)}
      user={user}
    />
  );
};

export default Oen;
