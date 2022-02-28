import { css } from 'styled-components';

import { lighten, th } from '@pubsweet/ui-toolkit';

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
    pointer-events: none;
    user-select: none;
  }

  /* .ProseMirror title {
    display: inline;
    font-size: 14px;
  } */

  .ProseMirror footnote {
    font-variant-numeric: lining-nums proportional-nums;
    display: inline-block;
    text-align: center;
    width: 17px;
    height: 17px;
    background: white;
    border-bottom: 2px solid black;
    color: black;
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

  /*Track Changes*/

  span.deletion {
    text-decoration: line-through;
    color: ${th('colorError')};
    footnote {
      background: ${th('colorError')};
    }
  }

  span.insertion {
    color: royalblue;
    footnote {
      background: royalblue;
    }
  }

  .selected-insertion {
    background: ${lighten('royalblue', 0.65)};
  }

  .selected-deletion {
    background: ${lighten('indianred', 0.65)};
  }

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
    border-left: 2px solid royalblue;
    left: -10px;
    height: 100%;
  }

  .insertion .show-insertion {
    color: black;
  }

  .deletion .hide-deletion {
    display: none;
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
      /* color: black; */
    }
  }

  span.search-result {
    background: #bee594;
  }
`;
