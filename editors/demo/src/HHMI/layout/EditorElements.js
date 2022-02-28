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

    &:focus {
      outline: none;
    }
  }

  .ProseMirror .wax-selection-marker {
    background-color: ${th('colorSelection')};
    opacity: 0.8;
  }

  div[contenteditable='false'] {
    .math-src {
      pointer-events: none;
      user-select: none;
    }
  }

  ul,
  ol {
    padding-left: 30px;
  }

  blockquote {
    border-left: 3px solid #eee;
    margin-left: 0;
    margin-right: 0;
    padding-left: 1em;
  }

  figure {
    display: table;
    margin-left: auto;
    margin-right: auto;
    word-break: break-word;

    img {
      cursor: default;
      height: auto;
      max-width: 100%;
      width: auto;
    }

    figcaption {
      background: #e2ebff;
      caption-side: bottom;
      display: table-caption;
      max-width: 100%;
      min-height: 20px;
      padding: 4px;
      width: auto;

      &:focus {
        outline: none;
      }
      &:before {
        content: 'Caption: ';
        font-weight: bold;
      }
    }
  }

  sup,
  sub {
    line-height: 0;
  }

  strong {
    font-weight: bold;
  }

  /* Tables */

  table {
    border: 1px solid #eee;
    border-collapse: initial;
    border-spacing: 0;
    border-width: 0 thin thin 0;
    margin: 0;
    overflow: hidden;
    page-break-inside: avoid;
    table-layout: fixed;
    width: 100%;
  }

  th,
  td {
    border: 1px solid #eee;
    /*width: 200px;*/
    padding: 2px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
  }

  .tableWrapper {
    overflow-x: auto;
  }

  .column-resize-handle {
    background-color: #adf;
    bottom: 0;
    pointer-events: none;
    position: absolute;
    right: -2px;
    top: 0;
    width: 4px;
    z-index: 20;
  }

  .ProseMirror.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
  /* Give selected cells a blue overlay */
  .selectedCell:after {
    background: rgba(200, 200, 255, 0.4);
    bottom: 0;
    content: '';
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  }
`;
