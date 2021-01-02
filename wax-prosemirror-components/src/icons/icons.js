/**
 * SVG source for icons: https://material.io/resources/icons
 */

import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { th } from '@pubsweet/ui-toolkit';

import {
  faCheck,
  faParagraph,
  faHeading,
  faQuoteLeft,
  faTimes,
  faVial,
} from '@fortawesome/free-solid-svg-icons';

// default values
// to explain vertical align: https://stackoverflow.com/a/24626986
const Svg = styled.svg.attrs(() => ({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
}))`
  fill: ${th('colorPrimary')};
  height: 24px;
  vertical-align: top;
  width: 24px;
`;

export default {
  paragraph: <FontAwesomeIcon icon={faParagraph} />,
  heading: <FontAwesomeIcon icon={faHeading} />,
  blockquote: <FontAwesomeIcon icon={faQuoteLeft} />,
  source: <FontAwesomeIcon icon={faVial} />,
  check: <FontAwesomeIcon icon={faCheck} />,
  times: <FontAwesomeIcon icon={faTimes} />,
  commentBubble: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
    </Svg>
  ),
  bold: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
    </Svg>
  ),
  italic: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
    </Svg>
  ),
  undo: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
    </Svg>
  ),
  redo: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
    </Svg>
  ),
  code: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
    </Svg>
  ),
  link: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
    </Svg>
  ),
  strikethrough: ({ className }) => (
    <Svg
      className={className}
      enable-background="new 0 0 24 24"
      viewBox="0 0 24 24"
    >
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <g>
          <g>
            <path d="M6.85,7.08C6.85,4.37,9.45,3,12.24,3c1.64,0,3,0.49,3.9,1.28c0.77,0.65,1.46,1.73,1.46,3.24h-3.01 c0-0.31-0.05-0.59-0.15-0.85c-0.29-0.86-1.2-1.28-2.25-1.28c-1.86,0-2.34,1.02-2.34,1.7c0,0.48,0.25,0.88,0.74,1.21 C10.97,8.55,11.36,8.78,12,9H7.39C7.18,8.66,6.85,8.11,6.85,7.08z M21,12v-2H3v2h9.62c1.15,0.45,1.96,0.75,1.96,1.97 c0,1-0.81,1.67-2.28,1.67c-1.54,0-2.93-0.54-2.93-2.51H6.4c0,0.55,0.08,1.13,0.24,1.58c0.81,2.29,3.29,3.3,5.67,3.3 c2.27,0,5.3-0.89,5.3-4.05c0-0.3-0.01-1.16-0.48-1.94H21V12z" />
          </g>
        </g>
      </g>
    </Svg>
  ),
  underline: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" />
    </Svg>
  ),
  more: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <title> Expand </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </Svg>
  ),
  subscript: ({ className }) => (
    <Svg
      className={className}
      enable-background="new 0 0 24 24"
      viewBox="0 0 24 24"
    >
      <g>
        <rect fill="none" height="24" width="24" />
        <path d="M22,18h-2v1h3v1h-4v-2c0-0.55,0.45-1,1-1h2v-1h-3v-1h3c0.55,0,1,0.45,1,1v1C23,17.55,22.55,18,22,18z M5.88,18h2.66 l3.4-5.42h0.12l3.4,5.42h2.66l-4.65-7.27L17.81,4h-2.68l-3.07,4.99h-0.12L8.85,4H6.19l4.32,6.73L5.88,18z" />
      </g>
    </Svg>
  ),
  superscript: ({ className }) => (
    <Svg
      className={className}
      enable-background="new 0 0 24 24"
      viewBox="0 0 24 24"
    >
      <g>
        <rect fill="none" height="24" width="24" x="0" y="0" />
        <path d="M22,7h-2v1h3v1h-4V7c0-0.55,0.45-1,1-1h2V5h-3V4h3c0.55,0,1,0.45,1,1v1C23,6.55,22.55,7,22,7z M5.88,20h2.66l3.4-5.42h0.12 l3.4,5.42h2.66l-4.65-7.27L17.81,6h-2.68l-3.07,4.99h-0.12L8.85,6H6.19l4.32,6.73L5.88,20z" />
      </g>
    </Svg>
  ),
  smallCaps: ({ className }) => (
    <Svg
      className={className}
      enable-background="new 0 0 24 24"
      viewBox="0 0 24 24"
    >
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <g>
          <g>
            <path d="M2.5,4v3h5v12h3V7h5V4H2.5z M21.5,9h-9v3h3v7h3v-7h3V9z" />
          </g>
        </g>
      </g>
    </Svg>
  ),
  note: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M22 10l-6-6H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99l16-.01c1.1 0 2-.89 2-1.99v-8zm-7-4.5l5.5 5.5H15V5.5z" />
    </Svg>
  ),
  numberedList: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
    </Svg>
  ),
  bulletList: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
    </Svg>
  ),
  indentDecrease: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z" />
    </Svg>
  ),
  image: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </Svg>
  ),
  table: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z" />
    </Svg>
  ),
  /* -- table alternative icon -- */
  // table: ({ className }) => (
  //   <Svg className={className} viewBox="0 0 24 24">
  //     <path d="M0 0h24v24H0V0z" fill="none" />
  //     <path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z" />
  //   </Svg>
  // ),
  arrowUp: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
    </Svg>
  ),
  arrowDown: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </Svg>
  ),
  codeBlock: ({ className }) => (
    <Svg
      className={className}
      enable-background="new 0 0 24 24"
      viewBox="0 0 24 24"
    >
      <g>
        <rect fill="none" height="24" width="24" />
        <circle cx="12" cy="3.5" fill="none" r=".75" />
        <circle cx="12" cy="3.5" fill="none" r=".75" />
        <circle cx="12" cy="3.5" fill="none" r=".75" />
        <path d="M19,3h-4.18C14.4,1.84,13.3,1,12,1S9.6,1.84,9.18,3H5C4.86,3,4.73,3.01,4.6,3.04C4.21,3.12,3.86,3.32,3.59,3.59 c-0.18,0.18-0.33,0.4-0.43,0.64C3.06,4.46,3,4.72,3,5v14c0,0.27,0.06,0.54,0.16,0.78c0.1,0.24,0.25,0.45,0.43,0.64 c0.27,0.27,0.62,0.47,1.01,0.55C4.73,20.99,4.86,21,5,21h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M11,14.17l-1.41,1.42L6,12 l3.59-3.59L11,9.83L8.83,12L11,14.17z M12,4.25c-0.41,0-0.75-0.34-0.75-0.75S11.59,2.75,12,2.75s0.75,0.34,0.75,0.75 S12.41,4.25,12,4.25z M14.41,15.59L13,14.17L15.17,12L13,9.83l1.41-1.42L18,12L14.41,15.59z" />
      </g>
    </Svg>
  ),
  highlight: ({ className }) => (
    <Svg
      className={className}
      enable-background="new 0 0 24 24"
      viewBox="0 0 24 24"
    />
  ),
  title: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M5 4v3h5.5v12h3V7H19V4z" />
    </Svg>
  ),
  findAndReplace: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z" />
    </Svg>
  ),
  navigatePrevious: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>Previous</title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </Svg>
  ),
  navigateNext: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>Next</title>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
    </Svg>
  ),
  close: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Close </title>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </Svg>
  ),
  fullScreen: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Full screen </title>
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </Svg>
  ),
  fullScreenExit: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Exit full screen </title>
      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
    </Svg>
  ),
  matchCase: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Match Case </title>
      <path d="M2.5,4v3h5v12h3V7h5V4H2.5z M21.5,9h-9v3h3v7h3v-7h3V9z" />
    </Svg>
  ),
  editing: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Editing </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </Svg>
  ),
  suggesting: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Suggesting </title>
      <path d="M22,24H2v-4h20V24z M13.06,5.19l3.75,3.75L7.75,18H4v-3.75L13.06,5.19z M17.88,7.87l-3.75-3.75 l1.83-1.83c0.39-0.39,1.02-0.39,1.41,0l2.34,2.34c0.39,0.39,0.39,1.02,0,1.41L17.88,7.87z" />
    </Svg>
  ),
  viewing: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Viewing </title>
      <path d="M0 0h24v24H0z" fill="none" />{' '}
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />{' '}
    </Svg>
  ),
  specialCharacters: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <g>
        <rect fill="none" height="24" width="24" x="0" />
      </g>
      <g>
        <g>
          <g>
            <path d="M11.88,9.14c1.28,0.06,1.61,1.15,1.63,1.66h1.79c-0.08-1.98-1.49-3.19-3.45-3.19C9.64,7.61,8,9,8,12.14 c0,1.94,0.93,4.24,3.84,4.24c2.22,0,3.41-1.65,3.44-2.95h-1.79c-0.03,0.59-0.45,1.38-1.63,1.44C10.55,14.83,10,13.81,10,12.14 C10,9.25,11.28,9.16,11.88,9.14z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8 s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z" />
          </g>
        </g>
      </g>
    </Svg>
  ),
  chapterList: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Chapters </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </Svg>
  ),
  transformCase: ({ className }) => (
    <Svg
      className={className}
      enableBackground="new 0 0 16 16"
      fill="none"
      viewBox="0 0 28 28"
    >
      <path d="M11.44,15.353c0-2.99-1.352-5.486-5.59-5.486c-2.314,0-4.056,0.624-4.94,1.118l0.728,2.548 c0.832-0.52,2.21-0.962,3.51-0.962c1.95,0,2.314,0.962,2.314,1.639v0.183C2.964,14.365,0,15.952,0,19.253 c0,2.028,1.534,3.9,4.108,3.9c1.508,0,2.808-0.547,3.64-1.562h0.078l0.234,1.274h3.562c-0.13-0.702-0.182-1.872-0.182-3.096 V15.353z M7.592,18.239c0,0.232-0.026,0.468-0.078,0.676c-0.26,0.807-1.066,1.456-2.054,1.456c-0.884,0-1.56-0.494-1.56-1.508 c0-1.534,1.612-2.028,3.692-2.003V18.239z" />
      <path d="M23.062,5.343h-5.201l-5.355,17.524h4.108l1.247-4.498h5.019l1.353,4.498h4.264L23.062,5.343z M18.434,15.404l1.041-3.718 c0.285-1.014,0.545-2.34,0.806-3.38h0.052c0.26,1.04,0.572,2.34,0.884,3.38l1.093,3.718H18.434z" />
      <polygon points="8.025,6.584 1.999,6.584 1.999,6.833 1.999,7.461 1.999,7.709 8.025,7.709 8.025,8.95 12.442,7.146 8.025,5.343" />
    </Svg>
  ),
  lowerCaseTransform: ({ className }) => (
    <Svg
      className={className}
      enableBackground="new 0 0 28.08 28.08"
      fill="none"
      viewBox="0 0 28.08 28.08"
    >
      <path d="M5.356,5.135L0,22.659h4.108l1.248-4.498h5.018l1.352,4.498h4.264L10.556,5.135H5.356z M5.928,15.196l1.04-3.718 c0.286-1.014,0.546-2.34,0.806-3.38h0.052c0.26,1.04,0.572,2.34,0.884,3.38l1.092,3.718H5.928z" />
      <path d="M27.898,19.564v-4.42c0-2.99-1.353-5.486-5.59-5.486c-2.314,0-4.058,0.624-4.94,1.118l0.728,2.548 c0.832-0.52,2.211-0.962,3.51-0.962c1.951,0,2.314,0.962,2.314,1.639v0.183c-4.498-0.026-7.462,1.561-7.462,4.861 c0,2.028,1.534,3.9,4.108,3.9c1.508,0,2.808-0.547,3.64-1.562h0.078l0.233,1.274h3.562C27.95,21.957,27.898,20.787,27.898,19.564z M24.05,18.031c0,0.232-0.026,0.468-0.077,0.676c-0.261,0.807-1.066,1.456-2.055,1.456c-0.884,0-1.561-0.494-1.561-1.508 c0-1.534,1.613-2.028,3.692-2.003V18.031z" />
      <polygon points="21.663,8.742 26.08,6.938 21.663,5.135 21.663,6.376 15.637,6.376 15.637,6.625 15.637,7.253 15.637,7.501 21.663,7.501" />
    </Svg>
  ),
};
