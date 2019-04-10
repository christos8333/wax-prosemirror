import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
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
  faUndo,
  faRedo,
  faOutdent,
  faAngleUp,
  faAsterisk,
  faVial,
  faWheelchair
} from "@fortawesome/fontawesome-free-solid";

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
  code_block: <FontAwesomeIcon icon={faCode} />,
  ordered_list: <FontAwesomeIcon icon={faListOl} />,
  bullet_list: <FontAwesomeIcon icon={faListUl} />,
  image: <FontAwesomeIcon icon={faImage} />,
  table: <FontAwesomeIcon icon={faTable} />,
  footnote: <FontAwesomeIcon icon={faAsterisk} />,
  undo: <FontAwesomeIcon icon={faUndo} />,
  redo: <FontAwesomeIcon icon={faRedo} />,
  lift: <FontAwesomeIcon icon={faOutdent} />,
  join_up: <FontAwesomeIcon icon={faAngleUp} />,
  source: <FontAwesomeIcon icon={faVial} />,
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
  )
};
