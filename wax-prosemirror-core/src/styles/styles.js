import { css } from 'styled-components';

/* Basic styles for proseMirror view and gapCursor */

export default css`
  .ProseMirror {
    position: relative;
  }

  .ProseMirror {
    font-feature-settings: 'liga' 0; /* the above doesn't seem to work in Edge */
    font-variant-ligatures: none;
    word-wrap: break-word;
    white-space: pre-wrap;
    white-space: break-spaces;
    -webkit-font-variant-ligatures: none;
  }

  .ProseMirror pre {
    white-space: pre-wrap;
  }

  .ProseMirror li {
    position: relative;
  }

  .ProseMirror-hideselection *::selection {
    background: transparent;
  }

  .ProseMirror-hideselection *::-moz-selection {
    background: transparent;
  }

  .ProseMirror-hideselection {
    caret-color: transparent;
  }

  .ProseMirror-selectednode {
    outline: 2px solid #8cf;
  }

  /* Make sure li selections wrap around markers */

  li.ProseMirror-selectednode {
    outline: none;
  }

  li.ProseMirror-selectednode:after {
    border: 2px solid #8cf;
    bottom: -2px;
    content: '';
    left: -32px;
    pointer-events: none;
    position: absolute;
    right: -2px;
    top: -2px;
  }

  /* Protect against generic img rules */

  img.ProseMirror-separator {
    border: none !important;
    display: inline !important;
    margin: 0 !important;
  }

  .ProseMirror-gapcursor {
    display: none;
    pointer-events: none;
    position: absolute;
  }

  .ProseMirror-gapcursor:after {
    content: '';
    display: block;
    position: absolute;
    top: -2px;
    width: 20px;
    border-top: 1px solid black;
    animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
  }

  @keyframes ProseMirror-cursor-blink {
    to {
      visibility: hidden;
    }
  }

  .ProseMirror-focused .ProseMirror-gapcursor {
    display: block;
  }
`;
