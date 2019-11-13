import styled, { css } from "styled-components";

/* All styles regarding ProseMirror surface and elements */

export default css`{
  .ProseMirror {
    -moz-box-shadow: 0 0 3px #ccc;
    -webkit-box-shadow: 0 0 3px #ccc;
    box-shadow: 0 0 3px #ccc;
    width: 65%;
    min-height: 90%;
    padding: 40px;
    font-family: ${props => props.theme.fontReading};
    &:focus {
      outline: none;
    }
  }
  hr {
    padding: 2px 10px;
    border: none;
    margin: 1em 0;
  }

  hr:after {
    content: "";
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
    content: "";
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
    content: "·";
  }

  .invisible--break:before {
    content: "¬";
  }

  .invisible--par:after {
    content: "¶";
  }

  span.deletion {
    text-decoration: line-through;
    color: red;
  }

  span.insertion {
    color: blue;
  }

  .selected-insertion,
  .selected-deletion,
  .selected-format-change,
  .selected-block-change {
    background-color: #fffacf;
  }

  .format-change {
    border-bottom: 2px solid blue;
  }

  [data-track] {
    position: relative;
  }

  [data-track]::before {
    content: "";
    position: absolute;
    border-left: 2px solid blue;
    left: -10px;
    height: 100%;
  }

  li[data-track]::before,
  li [data-track]::before {
    left: -5px;
  }
`;
