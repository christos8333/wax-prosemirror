import { css } from 'styled-components';

import { th } from '@pubsweet/ui-toolkit';

/* All styles regarding ProseMirror surface and elements */

const fontWriting = css`
  font-family: ${th('fontWriting')};
  font-size: ${th('fontSizeBase')};
  color: ${th('colorText')};
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

  .question {
    border: 1px solid green;
    counter-reset: question-item-multiple;
    margin: 38px;
    padding: 20px;

    &:before {
      bottom: 45px;
      content: 'Answer Group ' counter(multiple-question) '.';
      counter-increment: multiple-question;
      position: relative;
      right: 20px;
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

  /* placeholder */
  .empty-node::before {
    color: #aaa;
    float: left;
    font-style: italic;
    pointer-events: none;
    height: 0;
  }

  p.empty-node:first-child::before {
    content: attr(data-content);
  }

  /* invisible characters */
  .invisible {
    pointer-events: none;
    user-select: none;
  }

  .invisible:before {
    caret-color: inherit;
    color: gray;
    display: inline-block;
    font-weight: 400;
    font-style: normal;
    line-height: 1em;
    width: 0;
  }

  .invisible--space:before {
    content: '·';
  }

  .invisible--break:before {
    content: '¬';
  }

  .invisible--par:after {
    content: '¶';
  }

  /* == Math Nodes ======================================== */

  .math-node {
    min-width: 1em;
    min-height: 1em;
    font-size: 0.95em;
    font-family: 'Consolas', 'Ubuntu Mono', monospace;
    cursor: auto;
    .ProseMirror {
      box-shadow: none;
      min-height: 100%;
      padding: 0;
      background: #eee;
      color: rgb(132, 33, 162);
    }
  }

  .math-node.empty-math .math-render::before {
    content: '(empty)';
    color: red;
  }

  .math-node .math-render.parse-error::before {
    content: '(math error)';
    color: red;
    cursor: help;
  }

  .math-node.ProseMirror-selectednode {
    outline: none;
  }

  .math-node .math-src {
    color: rgb(132, 33, 162);
    display: none;
    tab-size: 4;
  }

  .math-node.ProseMirror-selectednode .math-src {
    display: flex;
  }
  .math-node.ProseMirror-selectednode .math-render {
    display: none;
  }

  /* -- Inline Math --------------------------------------- */

  math-inline {
    display: inline;
    white-space: nowrap;
  }

  math-inline .math-render {
    display: inline-block;
    font-size: 0.85em;
    cursor: pointer;
  }

  math-inline .math-src .ProseMirror {
    display: inline;
  }

  math-inline .math-src::after,
  math-inline .math-src::before {
    content: '$';
    color: #b0b0b0;
  }

  /* -- Block Math ---------------------------------------- */

  math-display {
    display: block;
  }

  math-display .math-render {
    display: block;
  }

  math-display.ProseMirror-selectednode {
    background-color: #eee;
  }

  math-display .math-src .ProseMirror {
    width: 100%;
    display: block;
  }

  math-display .math-src::after,
  math-display .math-src::before {
    content: '$$';
    text-align: left;
    color: #b0b0b0;
  }

  math-display .katex-display {
    margin: 0;
  }

  /* -- Selection Plugin ---------------------------------- */

  p::selection,
  p > *::selection {
    background-color: #c0c0c0;
  }
  .katex-html *::selection {
    background-color: none !important;
  }

  .math-node.math-select .math-render {
    background-color: #c0c0c0ff;
  }
  math-inline.math-select .math-render {
    padding-top: 2px;
  }

  .transform-icon {
    transform: rotate(40deg);
  }
`;
