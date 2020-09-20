import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faBold,
  faItalic,
  faCheck,
  faCode,
  faSuperscript,
  faSubscript,
  faUnderline,
  faStrikethrough,
  faLink,
  faParagraph,
  faHeading,
  faQuoteLeft,
  faListOl,
  faListUl,
  faImage,
  faTable,
  faTimes,
  faUndo,
  faRedo,
  faOutdent,
  faAngleUp,
  faStickyNote,
  faVial,
  faFileCode,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

// default values
// to explain vertical align: https://stackoverflow.com/a/24626986
const Svg = styled.svg.attrs(() => ({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
}))`
  height: 24px;
  width: 24px;
  fill: gray;
  vertical-align: top;
`;

export default {
  em: <FontAwesomeIcon icon={faItalic} />,
  italic: <FontAwesomeIcon icon={faItalic} />,
  strong: <FontAwesomeIcon icon={faBold} />,
  bold: <FontAwesomeIcon icon={faBold} />,
  code: <FontAwesomeIcon icon={faCode} />,
  subscript: <FontAwesomeIcon icon={faSubscript} />,
  superscript: <FontAwesomeIcon icon={faSuperscript} />,
  underline: <FontAwesomeIcon icon={faUnderline} />,
  strikethrough: <FontAwesomeIcon icon={faStrikethrough} />,
  link: <FontAwesomeIcon icon={faLink} />,
  paragraph: <FontAwesomeIcon icon={faParagraph} />,
  heading: <FontAwesomeIcon icon={faHeading} />,
  blockquote: <FontAwesomeIcon icon={faQuoteLeft} />,
  code_block: <FontAwesomeIcon icon={faFileCode} />,
  ordered_list: <FontAwesomeIcon icon={faListOl} />,
  bullet_list: <FontAwesomeIcon icon={faListUl} />,
  image: <FontAwesomeIcon icon={faImage} />,
  table: <FontAwesomeIcon icon={faTable} />,
  footnote: <FontAwesomeIcon icon={faStickyNote} />,
  undo: <FontAwesomeIcon icon={faUndo} />,
  redo: <FontAwesomeIcon icon={faRedo} />,
  lift: <FontAwesomeIcon icon={faOutdent} />,
  join_up: <FontAwesomeIcon icon={faAngleUp} />,
  source: <FontAwesomeIcon icon={faVial} />,
  ellipses: <FontAwesomeIcon icon={faEllipsisH} />,
  small_caps: (
    <span className="small-caps">
      <svg
        width="35"
        height="20"
        viewBox="0 0 35 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.21799 1.12207L9.34998 0H0V1.12207H4.004V15.0701H5.258V1.12207H9.21799ZM14.14 6.34912L14.242 5.51611H7.935V6.34912H10.587V15.0701H11.539V6.34912H14.14Z"
          transform="translate(10.286 8.92993)"
          fill="#4F4F4F"
        />
      </svg>
    </span>
  ),
  check: <FontAwesomeIcon icon={faCheck} />,
  times: <FontAwesomeIcon icon={faTimes} />,
  commentBubble: ({ className }) => (
    <Svg viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
    </Svg>
  ),
  boldSvg: ({ className }) => (
    <Svg className={className} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
    </Svg>
  ),
};
