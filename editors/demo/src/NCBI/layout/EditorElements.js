import { css } from 'styled-components';

import { th } from '@pubsweet/ui-toolkit';

/* All styles regarding ProseMirror surface and elements */

const fontWriting = css`
  color: ${th('colorText')};
  font-family: ${th('fontWriting')};
  font-size: ${th('fontSizeBase')};
`;

export default css`
  .ProseMirror {
    background: white;
    counter-reset: footnote;
    line-height: 12px;
    width: 497px;
    white-space: pre;
    overflow-x: auto;
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
    code span::selection title::selection {
      background-color: transparent;
    }

    &:focus {
      outline: none;
    }
  }

  .ProseMirror .wax-selection-marker {
    background-color: ${th('colorSelection')};
  }

  div[contenteditable='false'] {
    pointer-events: none;
    user-select: none;
  }

  .ProseMirror title {
    display: inline;
    font-size: 14px;
  }

  ul,
  ol {
    padding-left: 30px;
  }

  sup,
  sub {
    line-height: 0;
  }
`;
