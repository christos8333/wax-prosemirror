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

const initialValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      attrs: {
        id: '',
        class: 'paragraph',
        track: [],
        group: '',
        viewid: '',
      },
      content: [
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'multiple_choice',
          attrs: {
            id: '206bda35-858e-422d-a90d-164b7f460eb0',
          },
          content: [
            {
              type: 'text',
              text: 'sss',
            },
          ],
        },
      ],
    },
  ],
};

const Hhmi = () => {
  return (
    <>
      <Wax
        config={config}
        autoFocus
        fileUpload={file => renderImage(file)}
        value={initialValue}
        targetFormat="JSON"
        // readonly
        layout={HhmiLayout}
        onChange={source => console.log(source)}
      />
    </>
  );
};

export default Hhmi;
