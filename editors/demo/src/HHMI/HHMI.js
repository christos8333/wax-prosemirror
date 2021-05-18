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
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros turpis, imperdiet viverra purus eget, ferment',
        },
      ],
    },
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
          text:
            'um porttitor dui. Etiam quis venenatis risus, sit amet bibendum turpis. this is an addition Vestibulum non nibh at dolor sodales euismod. Maecenas mattis nulla in eros pretium, eu commodo sem sagittis. Nam eu v',
        },
      ],
    },
    {
      type: 'math_display',
      content: [
        {
          type: 'text',
          text: 'x+y = 1',
        },
      ],
    },
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
          text:
            'arius justo. Nullam volutpat diam sit amet nunc aliquam convallis. Aliquam non eleifend dolor. Cras in urna lacinia, tempor tellus non, ',
        },
      ],
    },
    {
      type: 'question_wrapper',
      attrs: {
        class: 'question',
      },
      content: [
        {
          type: 'multiple_choice',
          attrs: {
            id: '7b6a992f-8a12-44b5-9112-67bfd80e053c',
          },
          content: [
            {
              type: 'text',
              text: 'r ljjfljs dfljsdl jklkfj sr wrw',
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            id: '92c98be1-41a5-4c4c-bbba-747635df8878',
          },
          content: [
            {
              type: 'text',
              text: 'fwefwrewr wwrrwe',
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            id: 'd51e74fb-a571-416e-82aa-2aef36f4218c',
          },
          content: [
            {
              type: 'text',
              text: 'da;lf kfsdf l;',
            },
            {
              type: 'math_inline',
              content: [
                {
                  type: 'text',
                  text: ' x+y=5',
                },
              ],
            },
            {
              type: 'text',
              text: ' fk dfs;ldkf',
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            id: '03c71f12-3d95-4da8-8b13-71d77f3ce6a1',
          },
          content: [
            {
              type: 'text',
              text: 'q f fwe r ',
            },
            {
              type: 'math_inline',
              content: [
                {
                  type: 'text',
                  text:
                    ' A = \\begin{bmatrix} x & y \\\\ z & w \\end{bmatrix} ',
                },
              ],
            },
            {
              type: 'text',
              text: ' f’d fsd;f skf lfsd’fls f’fsdl',
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            id: '6e42010c-7c2d-4a55-a556-0691ac3e7d39',
          },
          content: [
            {
              type: 'text',
              text: 'erw wr wrwer',
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
