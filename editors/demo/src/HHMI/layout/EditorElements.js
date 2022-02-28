import { css } from 'styled-components';

import { th } from '@pubsweet/ui-toolkit';

//import 'wax-prosemirror-core/dist/index.css';

/* All styles regarding ProseMirror surface and elements */

const fontWriting = css`
  color: ${th('colorText')};
  font-family: ${th('fontWriting')};
  font-size: ${th('fontSizeBase')};
`;

export default css`
  .ProseMirror {
    background: white;
    counter-reset: multiple-question;
    line-height: 1.6;
    ${fontWriting}

    p::selection,
    h1::selection,
    h2::selection,
    h3::selection,
    code::selection,
    span::selection,
    p span::selection,
    h1 span::selection,
    h2 span::selection,
    h3 span::selection,
    h4 span::selection,
    code span::selection,
    custom-tag-block::selection,
    custom-tag-inline::selection {
      background-color: transparent;
      color: #000;
    }
  }
`;
