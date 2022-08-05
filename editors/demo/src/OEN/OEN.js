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

const val = `<p>first paragraph</p><section class=\"whatever\"><h2>Section 1 heading 2</h2><p class=\"paragraph\">normal text</p></section><section class=\"whatever\"><h2>Section 2 heading 2</h2><p class=\"paragraph\">normal text</p></section><section class=\"whatever\"><p class=\"paragraph\">some normal text</p><p class=\"paragraph\">more normal text</p></section><section class=\"whatever\"><h2>Section 4 heading 2</h2><p class=\"paragraph\">normal text</p></section><p class=\"paragraph\">some text</p><div class=\"outline\" data-type=\"content_structure_element\"><p class=\"paragraph\"></p></div>`;

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
