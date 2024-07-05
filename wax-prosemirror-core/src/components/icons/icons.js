/* eslint-disable react/prop-types */
/**
 * SVG source for icons: https://material.io/resources/icons
 */

import React from 'react';
import styled from 'styled-components';
import { th } from '@pubsweet/ui-toolkit';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

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

const Translation = ({ label, defaultTrans }) => {
  const { t, i18n } = useTranslation();

  return <>{!isEmpty(i18n) && i18n.exists(label) ? t(label) : defaultTrans}</>;
};

export default {
  commentBubble: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
    </Svg>
  ),
  blockquote: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M.78,8.89c0-3.07,1.53-4.3,4.3-4.34L5.38,6C3.78,6.17,3,7,3.1,8.31H4.54V12H.78Zm5.9,0c0-3.07,1.53-4.3,4.3-4.34L11.28,6C9.68,6.17,8.89,7,9,8.31h1.44V12H6.68Z" />
      <path d="M16.94,15.11c0,3.07-1.53,4.3-4.3,4.34L12.35,18c1.6-.16,2.39-1,2.28-2.3H13.18V12h3.76Zm5.9,0c0,3.07-1.53,4.3-4.3,4.34L18.24,18c1.6-.16,2.39-1,2.28-2.3H19.08V12h3.76Z" />
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
  save: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
    </Svg>
  ),
  done: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
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
      <title>
        <Translation defaultTrans="more" label="Wax.Various.more" />
      </title>
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
    <Svg className={className} viewBox="0 0 24 24">
      <path
        d="M14.837,2.538L7.587,9.617L6.826,11.846L5.707,12.94L8.752,15.912L9.869,14.818L12.153,14.075L19.402,6.995L14.837,2.538ZM21.685,6.252C22.105,6.662 22.105,7.328 21.685,7.738L13.315,15.912L11.033,16.655L9.511,18.141C9.091,18.551 8.41,18.551 7.989,18.141L3.424,13.682C3.004,13.272 3.004,12.607 3.424,12.197L4.945,10.711L5.706,8.482L14.076,0.308C14.497,-0.103 15.178,-0.103 15.598,0.308L21.685,6.252ZM14.837,5.509L16.359,6.995L10.46,12.769L8.939,11.283L14.837,5.509ZM6.468,18L4.566,20L0,18.514L3.424,15.027"
        id="highlight"
      />
      <path
        d="M7.447,18.31L7.64,18.499C8.254,19.097 9.248,19.097 9.86,18.499L10.053,18.31L22.506,18.31L22.506,21.417L1.876,21.417L1.876,19.65L4.411,20.475C4.594,20.535 4.796,20.484 4.928,20.345L6.83,18.345L6.794,18.31L7.447,18.31Z"
        id="trait"
      />
    </Svg>
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
      <title>
        <Translation
          defaultTrans="Previous"
          label="Wax.FindAndReplace.Previous"
        />
      </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </Svg>
  ),
  navigateNext: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        <Translation defaultTrans="Next" label="Wax.FindAndReplace.Next" />
      </title>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
    </Svg>
  ),
  close: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        {' '}
        <Translation defaultTrans="Close" label="Wax.Various.Close" />{' '}
      </title>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </Svg>
  ),
  reject: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        <Translation defaultTrans="Reject" label="Wax.TrackChanges.Reject" />{' '}
      </title>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </Svg>
  ),
  removeTag: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        {' '}
        <Translation
          defaultTrans="remove tag"
          label="Wax.Various.remove tag"
        />{' '}
      </title>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </Svg>
  ),
  fullScreen: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        {' '}
        <Translation
          defaultTrans="Full screen"
          label="Wax.Various.Full screen"
        />{' '}
      </title>
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </Svg>
  ),
  fullScreenExit: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        {' '}
        <Translation
          defaultTrans="Exit full screen"
          label="Wax.Various.Exit full screen"
        />{' '}
      </title>
      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
    </Svg>
  ),
  editing: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        {' '}
        <Translation
          defaultTrans="Editing"
          label="Wax.TrackChanges.Editing"
        />{' '}
      </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </Svg>
  ),
  suggesting: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        <Translation
          defaultTrans="Suggesting"
          label="Wax.TrackChanges.Suggesting"
        />{' '}
      </title>
      <path d="M22,24H2v-4h20V24z M13.06,5.19l3.75,3.75L7.75,18H4v-3.75L13.06,5.19z M17.88,7.87l-3.75-3.75 l1.83-1.83c0.39-0.39,1.02-0.39,1.41,0l2.34,2.34c0.39,0.39,0.39,1.02,0,1.41L17.88,7.87z" />
    </Svg>
  ),
  viewing: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        {' '}
        <Translation defaultTrans="Viewing" label="Wax.Various.Viewing" />{' '}
      </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </Svg>
  ),
  toggleOn: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        {' '}
        <Translation defaultTrans="Viewing" label="Wax.Various.Viewing" />{' '}
      </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
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
            <path d="M16.8279 5.64748C16.1334 5.21583 15.306 5 14.3455 5C13.5476 5 12.8383 5.16547 12.2177 5.4964C11.5971 5.82734 11.0947 6.28777 10.7106 6.8777C10.4003 6.23022 9.9422 5.76259 9.33638 5.47482C8.74533 5.17266 7.99174 5.02158 7.07562 5.02158C6.35159 5.02158 5.62017 5.11511 4.88136 5.30216C4.14255 5.48921 3.51456 5.72662 2.99739 6.01439L3.59583 7.43885C4.08344 7.19424 4.608 6.98561 5.16949 6.81295C5.74576 6.64029 6.32942 6.55396 6.92047 6.55396C7.67406 6.55396 8.27249 6.74101 8.71578 7.11511C9.17384 7.48921 9.40287 8.14389 9.40287 9.07914V9.81295L7.40808 9.8777C6.19644 9.90647 5.18427 10.0719 4.37158 10.3741C3.57366 10.6619 2.97523 11.0719 2.57627 11.6043C2.19209 12.1367 2 12.7914 2 13.5683C2 14.3453 2.16254 14.9928 2.48761 15.5108C2.82747 16.0144 3.27814 16.3885 3.83964 16.6331C4.41591 16.8777 5.05867 17 5.76793 17C6.53629 17 7.18644 16.8993 7.71838 16.6978C8.2651 16.4964 8.73794 16.2158 9.1369 15.8561C9.55063 15.482 9.92742 15.0504 10.2673 14.5612C10.5776 15.0935 10.947 15.5468 11.3755 15.9209C11.8188 16.2806 12.3212 16.554 12.8827 16.741C13.4589 16.9137 14.0869 17 14.7666 17C14.8924 17 15.0157 16.9981 15.1364 16.9944V15.3775C15.037 15.38 14.9359 15.3813 14.8331 15.3813C13.7397 15.3813 12.8974 15.0576 12.3064 14.4101C11.7301 13.7482 11.4272 12.7266 11.3977 11.3453H19V10.1799C19 9.14388 18.8079 8.23741 18.4237 7.46043C18.0543 6.68345 17.5224 6.07914 16.8279 5.64748ZM4.81486 11.8849C5.34681 11.482 6.30726 11.2518 7.69622 11.1942L9.35854 11.1295V12.1655C9.35854 12.9137 9.21078 13.5324 8.91525 14.0216C8.63451 14.5108 8.24294 14.8777 7.74055 15.1223C7.25293 15.3525 6.69883 15.4676 6.07823 15.4676C5.45763 15.4676 4.95524 15.3165 4.57106 15.0144C4.20165 14.7122 4.01695 14.2374 4.01695 13.5899C4.01695 12.8561 4.28292 12.2878 4.81486 11.8849ZM12.2842 7.41727C12.7866 6.84173 13.4663 6.55396 14.3233 6.55396C14.9292 6.55396 15.4242 6.69065 15.8083 6.96403C16.1925 7.23741 16.4733 7.6259 16.6506 8.1295C16.8427 8.61871 16.9387 9.19424 16.9387 9.85611H11.442C11.5159 8.79137 11.7966 7.97842 12.2842 7.41727Z" />
            <path d="M20.75 15.25V13H19.25V15.25H17V16.75H19.25V19H20.75V16.75H23V15.25H20.75Z" />
          </g>
        </g>
      </g>
    </Svg>
  ),
  chapterList: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        {' '}
        <Translation
          defaultTrans="Chapters"
          label="Wax.Various.Chapters"
        />{' '}
      </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </Svg>
  ),
  showTrack: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        <Translation
          defaultTrans="Show Changes"
          label="Wax.TrackChanges.Show Changes"
        />{' '}
      </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M 18 2.016 L 18 0 L 0 0 L 0 2.016 Z M 18 6.984 L 18 5.016 L 0 5.016 L 0 6.984 Z M 7.5 12 L 7.5 9.984 L 0 9.984 L 0 12 Z M 16.871 11.691 L 17.633 10.93 C 17.711 10.852 17.75 10.754 17.75 10.637 C 17.75 10.52 17.711 10.422 17.633 10.344 L 17.633 10.344 L 16.656 9.367 C 16.578 9.289 16.48 9.25 16.363 9.25 C 16.246 9.25 16.148 9.289 16.07 9.367 L 16.07 9.367 L 15.309 10.129 Z M 11.813 16.75 L 16.422 12.141 L 14.859 10.578 L 10.25 15.188 L 10.25 16.75 Z" />
    </Svg>
  ),
  acceptTrack: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        {' '}
        <Translation
          defaultTrans="Accept"
          label="Wax.TrackChanges.Accept"
        />{' '}
      </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M 18 2.016 L 18 0 L 0 0 L 0 2.016 Z M 18 6.984 L 18 5.016 L 0 5.016 L 0 6.984 Z M 7.5 12 L 7.5 9.984 L 0 9.984 L 0 12 Z M 12.563 17.078 L 18.188 11.406 L 16.781 10 L 12.563 14.219 L 10.406 12.109 L 9 13.516 Z" />
    </Svg>
  ),
  rejectTrack: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        {' '}
        <Translation
          defaultTrans="Reject"
          label="Wax.TrackChanges.Reject"
        />{' '}
      </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M 18 2.016 L 18 0 L 0 0 L 0 2.016 Z M 18 6.984 L 18 5.016 L 0 5.016 L 0 6.984 Z M 7.5 12 L 7.5 9.984 L 0 9.984 L 0 12 Z M 16.609 17.516 L 18.016 16.109 L 15.438 13.484 L 18.016 10.906 L 16.609 9.5 L 14.031 12.078 L 11.406 9.5 L 10 10.906 L 12.625 13.484 L 10 16.109 L 11.406 17.516 L 14.031 14.891 Z" />
    </Svg>
  ),
  acceptRejectTrack: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        {' '}
        <Translation
          defaultTrans="Accept"
          label="Wax.TrackChanges.Accept"
        />{' '}
      </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M 14.531 7.078 L 20.156 1.406 L 18.75 0 L 14.531 4.219 L 12.375 2.109 L 10.969 3.516 Z M 9 5.063 L 9 3.047 L 0 3.047 L 0 5.063 Z M 17.578 16.078 L 18.984 14.672 L 16.406 12.047 L 18.984 9.469 L 17.578 8.063 L 15 10.641 L 12.375 8.063 L 10.969 9.469 L 13.594 12.047 L 10.969 14.672 L 12.375 16.078 L 15 13.453 Z M 9 13.078 L 9 11.063 L 0 11.063 L 0 13.078 Z" />
    </Svg>
  ),
  checkTrack: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        {' '}
        <Translation
          defaultTrans="Accept"
          label="Wax.TrackChanges.Accept"
        />{' '}
      </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
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
  cutomInline: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 426.66667 426.66667">
      <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
    </Svg>
  ),
  IconCross: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 409.6 409.6">
      <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
    </Svg>
  ),
  IconMinus: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 409.6 409.6">
      <path
        d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467
  c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z"
      />
    </Svg>
  ),
  multipleChoice: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Add Multiple Choice </title>
      <path d="M16.54,11L13,7.46l1.41-1.41l2.12,2.12l4.24-4.24l1.41,1.41L16.54,11z M11,7H2v2h9V7z M21,13.41L19.59,12L17,14.59 L14.41,12L13,13.41L15.59,16L13,18.59L14.41,20L17,17.41L19.59,20L21,18.59L18.41,16L21,13.41z M11,15H2v2h9V15z" />
    </Svg>
  ),
  gapQuestion: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Add Fill The Gap Question </title>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v3H5z" />
    </Svg>
  ),
  insertGap: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Add Gap </title>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M18 9v4H6V9H4v6h16V9h-2z" />
    </Svg>
  ),
  plusSquare: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Add Option </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </Svg>
  ),
  deleteOutlined: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Delete Option </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />{' '}
    </Svg>
  ),
  deleteOutlinedQuestion: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Delete Question </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />{' '}
    </Svg>
  ),
  essay: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Create Essay </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </Svg>
  ),
  mulitpleDropDownQuestion: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Create Multiple DropDown Question</title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />{' '}
    </Svg>
  ),
  mulitpleDropDown: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Create DropDown </title>
      <path d="M17 5H20L18.5 7L17 5M3 2H21C22.11 2 23 2.9 23 4V8C23 9.11 22.11 10 21 10H16V20C16 21.11 15.11 22 14 22H3C1.9 22 1 21.11 1 20V4C1 2.9 1.9 2 3 2M3 4V8H14V4H3M21 8V4H16V8H21M3 20H14V10H3V20M5 12H12V14H5V12M5 16H12V18H5V16Z" />
    </Svg>
  ),
  refresh: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title> Refresh List</title>
      <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2M18 11H13L14.81 9.19A3.94 3.94 0 0 0 12 8A4 4 0 1 0 15.86 13H17.91A6 6 0 1 1 12 6A5.91 5.91 0 0 1 16.22 7.78L18 6Z" />{' '}
    </Svg>
  ),
  expand: ({ className }) => (
    <Svg className={className} fill="none" viewBox="0 0 24 24">
      <title>
        {' '}
        <Translation defaultTrans="Expand" label="Wax.Various.Expand" />
      </title>
      <path d="M7 10l5 5 5-5z" />{' '}
    </Svg>
  ),
  help: ({ className }) => (
    <Svg className={className} viewBox="0 -960 960 960">
      <title> help</title>
      <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </Svg>
  ),
  deleteIco: ({ className }) => (
    <svg
      className={className}
      fill="none"
      height="13"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>
        <Translation defaultTrans="Discard" label="Wax.Various.Discard" />
      </title>
      <path
        d="M1.65222 5.47827H18.3479"
        stroke="#FF4E4E"
        strokeLinecap="round"
      />
      <path
        d="M5.82666 5.47826V3C5.82666 2.44771 6.27438 2 6.82666 2H13.1745C13.7268 2 14.1745 2.44772 14.1745 3V5.47826"
        stroke="#FF4E4E"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.73889 5.47827L4.38207 17.0555C4.41151 17.5854 4.8498 18 5.38053 18H14.619C15.1497 18 15.588 17.5854 15.6174 17.0555L16.2606 5.47827"
        stroke="#FF4E4E"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  tryAgain: ({ className }) => (
    <svg
      className={className}
      fill="none"
      height="13"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>
        <Translation defaultTrans="Try Again" label="Wax.AI.Try again" />
      </title>
      <path
        d="M16.2963 13.0625C16.7471 12.1375 17 11.0983 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C10.8587 17 11.6812 16.8454 12.4414 16.5625"
        stroke="#595959"
      />
      <path d="M18 14L15 12V15L18 14Z" fill="#595959" stroke="#595959" />
    </svg>
  ),
  insertIco: ({ className }) => (
    <svg
      className={className}
      fill="none"
      height="13"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>
        <Translation defaultTrans="Insert" label="Wax.AI.Insert" />
      </title>
      <path d="M4 4H16" stroke="#505050" />
      <path d="M4 7H16" stroke="#505050" />
      <path d="M7 10L16 10" stroke="#505050" />
      <path d="M10 13L16 13" stroke="#505050" />
      <path d="M4 9.5V13H7.5" stroke="#505050" />
      <path d="M6 11L8 13L6 15" stroke="#505050" />
    </svg>
  ),
  replaceIco: ({ className }) => (
    <svg
      className={className}
      fill="none"
      height="13"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>
        <Translation
          defaultTrans="Replace selected text"
          label="Wax.AI.Replace selected text"
        />
      </title>
      <path d="M18 8H2L6 4" stroke="#595959" strokeLinejoin="round" />
      <path d="M2 12H18L14 16" stroke="#595959" strokeLinejoin="round" />
    </svg>
  ),
  submitIco: ({ className }) => (
    <svg
      className={className}
      fill="none"
      height="12"
      viewBox="0 0 13 12"
      width="13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>
        <Translation defaultTrans="Submit" label="Wax.AI.Submit" />
      </title>
      <path d="M0 11H8V1" stroke="#434343" />
      <path d="M3.5 4L8 1L12 4" stroke="#434343" />
    </svg>
  ),
  loaderIco: ({ className }) => (
    <svg
      className={className}
      height="17"
      viewBox="0 0 100 100"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        r="40"
        stroke="#434343"
        strokeWidth="10"
      >
        <animate
          attributeName="stroke-dasharray"
          dur="1.5s"
          repeatCount="indefinite"
          values="0,150;120,150"
        />
        <animate
          attributeName="stroke-dashoffset"
          dur="1.5s"
          repeatCount="indefinite"
          values="0;-120"
        />
      </circle>
    </svg>
  ),
  ai: ({ className }) => (
    <Svg className={className} viewBox="0 0 100 100">
      <path d="m91.09,24.24l-6.11-6.11c-.5-.49-1.15-.74-1.8-.74s-1.3.25-1.8.74L15.45,84.07c-1,.99-1,2.61,0,3.61l6.1,6.1c.49.49,1.14.75,1.8.75s1.3-.26,1.8-.75l54.36-54.37,11.58-11.56c.99-1,.99-2.62,0-3.61Zm-1.6,2.01l-9.98,9.97-6.51-6.51,9.97-9.98c.07-.05.13-.08.21-.08s.15.03.2.08l6.11,6.11s.08.12.08.2-.03.15-.08.21Z" />
      <path d="m21.71,45.16l3.54,8.23c.28.65,1.21.66,1.49,0l3.66-8.38c.88-2.03,2.5-3.65,4.53-4.53l8.39-3.66c.65-.28.65-1.21,0-1.49l-8.39-3.66c-2.03-.88-3.65-2.5-4.53-4.53l-3.66-8.39c-.28-.65-1.21-.65-1.49,0l-3.66,8.39c-.88,2.03-2.5,3.65-4.53,4.53l-8.4,3.67c-.65.28-.65,1.2,0,1.49l8.55,3.78c2.02.89,3.63,2.52,4.51,4.55Z" />
      <path d="m42.85,15.33l4.54,2.01c1.07.47,1.93,1.34,2.39,2.42l1.88,4.37c.15.35.64.35.79,0l1.94-4.45c.47-1.08,1.33-1.94,2.41-2.41l4.45-1.94c.35-.15.35-.64,0-.79l-4.45-1.94c-1.08-.47-1.94-1.33-2.41-2.41l-1.94-4.45c-.15-.35-.64-.35-.79,0l-1.94,4.45c-.47,1.08-1.33,1.94-2.41,2.41l-4.46,1.95c-.34.15-.35.64,0,.79Z" />
      <path d="m83.44,72.27l-4.73-2.06c-1.14-.5-2.05-1.41-2.55-2.55l-2.06-4.73c-.16-.37-.68-.37-.84,0l-2.06,4.73c-.5,1.14-1.41,2.05-2.55,2.55l-4.73,2.07c-.37.16-.37.68,0,.84l4.82,2.13c1.14.5,2.05,1.42,2.54,2.57l2,4.64c.16.37.68.37.84,0l2.06-4.72c.5-1.14,1.41-2.05,2.55-2.55l4.73-2.06c.37-.16.37-.68,0-.84Z" />
    </Svg>
  ),
  settings: ({ className }) => (
    <svg
      className={className}
      height="28px"
      preserveAspectRatio="none"
      version="1.1"
      viewBox="0 0 28 28"
      width="28px"
      x="0px"
      xmlns="http://www.w3.org/2000/svg"
      y="0px"
    >
      <defs>
        <g id="icon-Layer0_0_FILL">
          <path
            d="
M 21.3 8.8
Q 21.75 8.35 21.25 7.85
L 20.2 6.8
Q 19.7 6.3 19.25 6.8
L 18.05 7.95
Q 16.85 7.15 15.4 6.9
L 15.4 5.15
Q 15.4 4.5 14.75 4.5
L 13.25 4.5
Q 12.55 4.5 12.55 5.15
L 12.55 6.9
Q 11.1 7.15 9.9 8
L 8.65 6.75
Q 8.15 6.3 7.7 6.75
L 6.65 7.8
Q 6.15 8.3 6.6 8.8
L 7.9 10.1
Q 7.1 11.25 6.85 12.65
L 5.05 12.65
Q 4.35 12.65 4.35 13.35
L 4.35 14.8
Q 4.35 15.5 5.05 15.5
L 6.85 15.5
Q 7.1 16.95 7.9 18.1
L 6.65 19.35
Q 6.2 19.85 6.65 20.3
L 7.7 21.35
Q 8.25 21.9 8.7 21.4
L 10 20.15
Q 11.15 20.95 12.55 21.2
L 12.55 22.95
Q 12.55 23.6 13.25 23.6
L 14.75 23.6
Q 15.4 23.6 15.4 22.95
L 15.4 21.2
Q 16.8 20.95 18 20.2
L 19.2 21.35
Q 19.65 21.85 20.15 21.35
L 21.2 20.3
Q 21.7 19.8 21.2 19.35
L 20.05 18.15
Q 20.9 16.95 21.15 15.5
L 22.8 15.5
Q 23.5 15.5 23.5 14.8
L 23.5 13.35
Q 23.5 12.65 22.8 12.65
L 21.2 12.65
Q 20.9 11.25 20.1 10.05
L 21.3 8.8
M 10.45 10.45
Q 11.95 9 14 9 16.05 9 17.5 10.45 19 11.95 19 14 19 16.05 17.5 17.5 16.05 19 14 19 11.95 19 10.45 17.5 9 16.05 9 14 9 11.95 10.45 10.45 Z"
            fill="var(--color-blue)"
            stroke="var(--color-fill-stroke)"
          />
        </g>

        <path
          d="
M 13.144646453857423 2.0080963134765626
L 15.023285675048829 2.0080963134765626
Q 15.83736267089844 2.0080963134765626 15.83736267089844 2.8253768920898445
L 15.83736267089844 5.025747680664063
Q 17.6533805847168 5.340086364746094 19.156291961669922 6.345970153808594
L 20.659203338623048 4.900012207031249
Q 21.22279510498047 4.271334838867187 21.84900817871094 4.900012207031249
L 23.164055633544923 6.22023468017578
Q 23.79026870727539 6.848912048339843 23.22667694091797 7.414721679687501
L 21.723765563964847 8.986415100097657
Q 22.725706481933592 10.495240783691406 23.101434326171876 12.255537414550782
L 25.105316162109375 12.255537414550782
Q 25.982014465332032 12.255537414550782 25.982014465332032 13.135685729980468
L 25.982014465332032 14.958850097656251
Q 25.982014465332032 15.838998413085937 25.105316162109375 15.838998413085937
L 23.038813018798827 15.838998413085937
Q 22.725706481933592 17.66216278076172 21.661144256591797 19.170988464355467
L 23.101434326171876 20.679814147949223
Q 23.727647399902345 21.245623779296878 23.101434326171876 21.87430114746094
L 21.78638687133789 23.194523620605473
Q 21.16017379760742 23.823200988769536 20.59658203125 23.194523620605473
L 19.093670654296876 21.748565673828125
Q 17.59075927734375 22.69158172607422 15.83736267089844 23.00592041015625
L 15.83736267089844 25.20629119873047
Q 15.83736267089844 26.023571777343754 15.023285675048829 26.023571777343754
L 13.144646453857423 26.023571777343754
Q 12.267948150634766 26.023571777343754 12.267948150634766 25.20629119873047
L 12.267948150634766 23.00592041015625
Q 10.514551544189452 22.69158172607422 9.074261474609376 21.685697937011717
L 7.446107482910155 23.257391357421874
Q 6.882515716552734 23.886068725585936 6.193681335449219 23.194523620605473
L 4.878633880615234 21.87430114746094
Q 4.315042114257812 21.308491516113286 4.878633880615234 20.679814147949223
L 6.444166564941406 19.108120727539067
Q 5.442225646972656 17.66216278076172 5.129119110107422 15.838998413085937
L 2.8747520446777344 15.838998413085937
Q 1.9980537414550774 15.838998413085937 1.9980537414550774 14.958850097656251
L 1.9980537414550774 13.135685729980468
Q 1.9980537414550774 12.255537414550782 2.8747520446777344 12.255537414550782
L 5.129119110107422 12.255537414550782
Q 5.442225646972656 10.495240783691406 6.444166564941406 9.049282836914061
L 4.816012573242188 7.414721679687501
Q 4.252420806884766 6.786044311523439 4.878633880615234 6.157366943359374
L 6.193681335449219 4.837144470214843
Q 6.75727310180664 4.271334838867187 7.383486175537109 4.837144470214843
L 8.94901885986328 6.408837890625
Q 10.451930236816406 5.340086364746094 12.267948150634766 5.025747680664063
L 12.267948150634766 2.8253768920898445
Q 12.267948150634766 2.0080963134765626 13.144646453857423 2.0080963134765626 Z
M 20.346096801757813 13.95296630859375
Q 20.346096801757813 16.53054351806641 18.467457580566407 18.35370788574219 16.651439666748047 20.239739990234376 14.083966064453126 20.239739990234376 11.516492462158201 20.239739990234376 9.637853240966795 18.35370788574219 7.821835327148437 16.53054351806641 7.821835327148437 13.95296630859375 7.821835327148437 11.375389099121092 9.637853240966795 9.489356994628904 11.516492462158201 7.666192626953125 14.083966064453126 7.666192626953125 16.651439666748047 7.666192626953125 18.467457580566407 9.489356994628904 20.346096801757813 11.375389099121092 20.346096801757813 13.95296630859375 Z"
          fill="none"
          id="iconLayer0_0_1_STROKES"
          stroke="var(--color-stroke)"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="3"
          strokeWidth="1"
        />
      </defs>

      <g transform="matrix( 1.2524261474609375, 0, 0, 1.257354736328125, -3.45,-3.65) ">
        <use xlinkHref="#icon-Layer0_0_FILL" />

        <use
          transform="matrix( 0.7984466552734375, 0, 0, 0.795318603515625, 2.75,2.9) "
          xlinkHref="#iconLayer0_0_1_STROKES"
        />
      </g>
    </svg>
  ),
  send: ({ className }) => (
    <svg
      className={className}
      height="18px"
      preserveAspectRatio="none"
      version="1.1"
      viewBox="0 0 18 18"
      width="18px"
      x="0px"
      xmlns="http://www.w3.org/2000/svg"
      y="0px"
    >
      <defs>
        <g id="sendicon-Layer0_0_FILL_2">
          <path
            d="
M 6.65 9.9
L 5.65 14.6 15.4 9.4 5.65 4.2 6.65 8.9 9.25 9.4 6.65 9.9 Z"
            fill="var(--ai-tool-icon-color, #777)"
            stroke="none"
          />
        </g>
      </defs>

      <g transform="matrix( 1, 0, 0, 1, 0,0) ">
        <use xlinkHref="#sendicon-Layer0_0_FILL_2" />
      </g>
    </svg>
  ),
  copy: ({ className }) => {
    return (
      <svg
        className={className}
        id="copy"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15.243 19.194a1 1 0 1 0 0-2h-3.77a1 1 0 0 0-1 1v21.951a1 1 0 0 0 1 1h21.951a1 1 0 0 0 1-1V36.38a1 1 0 1 0-2 0v2.765h-19.95V19.194h2.769z" />
        <path d="M41.474 9.146H19.522a1 1 0 0 0-1 1v21.951a1 1 0 0 0 1 1h21.951a1 1 0 0 0 1-1V10.146a.998.998 0 0 0-.999-1zm-1 21.951H20.522V11.146h19.951v19.951z" />
      </svg>
    );
  },
  AskKb: ({ className }) => {
    return (
      <svg
        className={className}
        fill="#000000"
        version="1.1"
        viewBox="0 0 147.923 147.923"
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
      >
        <g>
          <path
            d="M92.336,116.398c1.979,0.609,4.007,1.072,6.065,1.377c-3.021,8.427-11.016,14.516-20.46,14.516H21.824
		C9.789,132.291,0,122.5,0,110.468V41.88c0-12.035,9.789-21.824,21.824-21.824h16.797C40.149,9.513,49.164,1.35,60.127,1.35h30.279
		c12.032,0,21.823,9.789,21.823,21.824V38.04c-2.046-0.42-4.129-0.688-6.235-0.779V23.174c0-8.592-6.99-15.588-15.588-15.588H60.127
		c-7.526,0-13.825,5.362-15.271,12.471h33.091c10.528,0,19.333,7.496,21.373,17.421c-2.058,0.25-4.086,0.701-6.107,1.267
		c-1.449-7.097-7.745-12.453-15.259-12.453H21.836c-8.592,0-15.588,6.997-15.588,15.589v68.588c0,8.586,6.997,15.589,15.588,15.589
		h56.118C84.433,126.05,89.998,122.049,92.336,116.398z M123.05,110.322c-17.993,10.388-41.077,4.201-51.462-13.786
		C61.199,78.555,67.389,55.468,85.37,45.085c17.987-10.382,41.077-4.205,51.466,13.786
		C147.224,76.855,141.025,99.934,123.05,110.322z M119.933,104.927c15.01-8.659,20.161-27.925,11.496-42.938
		c-8.659-15.016-27.925-20.18-42.94-11.512c-15.013,8.668-20.168,27.925-11.503,42.94S104.916,113.592,119.933,104.927z
		 M132.513,108.008l-16.21,9.354l12.471,21.592l16.21-9.354L132.513,108.008z M146.664,132.535l-16.204,9.353
		c2.582,4.481,8.306,6.017,12.775,3.423C147.711,142.729,149.258,137.011,146.664,132.535z M60.201,42.646H18.7v4.677h41.5V42.646z
		 M50.656,63.436H18.7v4.676h31.956V63.436z M18.7,88.895h31.956v-4.677H18.7V88.895z M18.7,109.676h41.5V105H18.7V109.676z
		 M98.133,84.188l-9.682-10.727l-4.628,4.187l13.695,15.149l26.755-22.283l-3.994-4.789L98.133,84.188z"
          />
        </g>
      </svg>
    );
  },
  CustomPromptsOn: ({ className }) => {
    return (
      <svg
        className={className}
        fill="#000000"
        height="13px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 330 330"
        width="13px"
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
      >
        <path
          d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
          id="XMLID_225_"
        />
      </svg>
    );
  },
};
