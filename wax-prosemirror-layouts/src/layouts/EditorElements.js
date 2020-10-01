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
    counter-reset: footnote;
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
    code span::selection {
      background-color: transparent;
    }

    &:focus {
      outline: none;
    }
  }

  .ProseMirror .wax-selection-marker {
    background-color: ${th('colorPrimary')};
    color: white;
  }

  div[contenteditable='false'] {
    user-select: none;
    pointer-events: none;
  }

  .ProseMirror footnote {
    font-size: 0;
    display: inline-block;
    text-align: center;
    width: 17px;
    height: 17px;
    background: black;
    color: white;
    cursor: pointer;
  }

  .ProseMirror footnote::after {
    content: counter(footnote);
    position: relative;
    bottom: 2px;
    font-size: 16px;
    counter-increment: footnote;
  }

  hr {
    padding: 2px 10px;
    border: none;
    margin: 1em 0;
  }

  hr:after {
    content: '';
    display: block;
    height: 1px;
    background-color: silver;
    line-height: 2px;
  }

  ul,
  ol {
    padding-left: 30px;
  }

  blockquote {
    padding-left: 1em;
    border-left: 3px solid #eee;
    margin-left: 0;
    margin-right: 0;
  }

  img {
    cursor: default;
    width: 100%;
  }

  sup,
  sub {
    line-height: 0;
  }

  /* Tables */

  table {
    border-collapse: initial;
    border-spacing: 0;
    border-width: 0 thin thin 0;
    border: 1px solid #eee;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;
    page-break-inside: avoid;
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
    position: absolute;
    right: -2px;
    top: 0;
    bottom: 0;
    width: 4px;
    z-index: 20;
    background-color: #adf;
    pointer-events: none;
  }

  .ProseMirror.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
  /* Give selected cells a blue overlay */
  .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
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

  span.deletion {
    text-decoration: line-through;
    color: ${th('colorError')};
    footnote {
      background: ${th('colorError')};
    }
  }

  span.insertion {
    color: royalblue;
    footnote: {
      background: royalblue;
    }
  }

  .selected-insertion,
  .selected-deletion,
  .selected-format-change,
  .selected-block-change {
    background-color: #eefbfb;
  }

  .format-change {
    border-bottom: 2px solid royalblue;
  }

  [data-track] {
    position: relative;
  }

  [data-track]::before {
    content: '';
    position: absolute;
    border-left: 2px solid blue;
    left: -10px;
    height: 100%;
  }

  li[data-track]::before,
  li [data-track]::before {
    left: -5px;
  }

  span.comment {
    border-bottom: 2px solid gold;
    border-radius: 3px 3px 0 0;

    .active-comment {
      background-color: gold;
      color: black;
    }
  }
`;
