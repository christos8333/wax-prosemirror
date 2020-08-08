'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styled = _interopDefault(require('styled-components'));
var waxProsemirrorThemes = require('wax-prosemirror-themes');
var waxProsemirrorCore = require('wax-prosemirror-core');
var FontAwesomeIcon = _interopDefault(require('@fortawesome/react-fontawesome'));
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var tablesFn = require('prosemirror-tables');
var Dropdown = _interopDefault(require('react-dropdown'));
require('react-dropdown/style.css');
var lodash = require('lodash');
var waxProsemirrorUtilities = require('wax-prosemirror-utilities');
var prosemirrorModel = require('prosemirror-model');
var useDeepCompareEffect = _interopDefault(require('use-deep-compare-effect'));
var prosemirrorState = require('prosemirror-state');
var reactTransitionGroup = require('react-transition-group');
var uuid = require('uuid');

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var InfoAreaContainer = styled.div(_templateObject(), ""
/* height: ${props => (props.height ? props.height : "30px")};
position: fixed;
bottom: 0;
z-index: 9999;
background: #efefef;
width: 100%;*/
);

var InfoArea = function InfoArea() {
  return /*#__PURE__*/React__default.createElement(InfoAreaContainer, null);
};

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  position: ", ";\n  left: ", ";\n  top: ", ";\n  z-index: 999;\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var OverlayContainer = styled.div(_templateObject$1(), function (props) {
  return props.position.position;
}, function (props) {
  return "".concat(props.position.left, "px");
}, function (props) {
  return "".concat(props.position.top, "px");
});

var Overlay = function Overlay(props) {
  return /*#__PURE__*/React__default.createElement(OverlayContainer, props, props.children);
};

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  opacity: ", ";\n  pointer-events: ", ";\n  color: ", ";\n  background-color: ", ";\n  &:hover {\n    background-color: ", ";\n  }\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var ButtonStyled = styled.button(_templateObject$2(), waxProsemirrorThemes.ButtonStyles, function (props) {
  return props.select ? 1 : 0.4;
}, function (props) {
  return props.select ? 'default' : 'none';
}, function (props) {
  return props.isActive ? 'white' : props.theme.colorButton;
}, function (props) {
  return props.isActive ? props.theme.colorPrimary : 'transparent';
}, function (props) {
  return props.isActive ? props.theme.colorPrimary : 'transparent';
});

var Button = function Button(_ref) {
  var _ref$view = _ref.view,
      view = _ref$view === void 0 ? {} : _ref$view,
      item = _ref.item;

  var _useContext = React.useContext(waxProsemirrorCore.WaxContext),
      main = _useContext.view.main,
      activeViewId = _useContext.activeViewId;

  if (item.onlyOnMain) {
    view = main;
  }

  return /*#__PURE__*/React__default.createElement(ButtonStyled, {
    type: "button",
    isActive: item.active && item.active(view.state),
    title: item.title,
    disabled: item.enable && !item.enable(view.state),
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
      item.run(view.state, view.dispatch);
    },
    select: item.select && item.select(view.state, activeViewId)
  }, item.content);
};

var icons = {
  em: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faItalic
  }),
  italic: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faItalic
  }),
  strong: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faBold
  }),
  bold: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faBold
  }),
  code: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faCode
  }),
  subscript: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faSubscript
  }),
  superscript: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faSuperscript
  }),
  underline: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faUnderline
  }),
  strikethrough: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faStrikethrough
  }),
  link: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faLink
  }),
  paragraph: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faParagraph
  }),
  heading: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faHeading
  }),
  blockquote: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faQuoteLeft
  }),
  code_block: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faFileCode
  }),
  ordered_list: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faListOl
  }),
  bullet_list: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faListUl
  }),
  image: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faImage
  }),
  table: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faTable
  }),
  footnote: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faStickyNote
  }),
  undo: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faUndo
  }),
  redo: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faRedo
  }),
  lift: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faOutdent
  }),
  join_up: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faAngleUp
  }),
  source: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faVial
  }),
  ellipses: /*#__PURE__*/React__default.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faEllipsisH
  }),
  small_caps: /*#__PURE__*/React__default.createElement("span", {
    className: "small-caps"
  }, /*#__PURE__*/React__default.createElement("svg", {
    width: "35",
    height: "20",
    viewBox: "0 0 35 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React__default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.21799 1.12207L9.34998 0H0V1.12207H4.004V15.0701H5.258V1.12207H9.21799ZM14.14 6.34912L14.242 5.51611H7.935V6.34912H10.587V15.0701H11.539V6.34912H14.14Z",
    transform: "translate(10.286 8.92993)",
    fill: "#4F4F4F"
  })))
};

function _templateObject$3() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  cursor: not-allowed;\n  opacity: ", ";\n  pointer-events: ", ";\n  .Dropdown-control {\n    border: none;\n  }\n  .Dropdown-arrow {\n    right: 25px;\n    top: 21px;\n  }\n  .Dropdown-menu {\n    width: 120%;\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    .Dropdown-option {\n      width: 100%;\n    }\n  }\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var DropdownStyled = styled(Dropdown)(_templateObject$3(), function (props) {
  return props.select ? 1 : 0.4;
}, function (props) {
  return props.select ? 'default' : 'none';
});
var dropDownOptions = [{
  label: 'add column before',
  value: 'addColumnBefore'
}, {
  label: 'add column after',
  value: 'addColumnAfter'
}, {
  label: 'Delete column',
  value: 'deleteColumn'
}, {
  label: 'Insert row before',
  value: 'addRowBefore'
}, {
  label: 'Insert row after',
  value: 'addRowAfter'
}, {
  label: 'Delete row',
  value: 'deleteRow'
}, {
  label: 'Delete table',
  value: 'deleteTable'
}, {
  label: 'Merge cells',
  value: 'mergeCells'
}, {
  label: 'Split cell',
  value: 'splitCell'
}, {
  label: 'Toggle header column',
  value: 'toggleHeaderColumn'
}, {
  label: 'Toggle header row',
  value: 'toggleHeaderRow'
}, {
  label: 'Toggle header cells',
  value: 'toggleHeaderCell'
}];

var TableDropDown = function TableDropDown(_ref) {
  var _ref$view = _ref.view,
      dispatch = _ref$view.dispatch,
      state = _ref$view.state,
      item = _ref.item;
  return /*#__PURE__*/React__default.createElement(DropdownStyled, {
    options: dropDownOptions,
    onChange: function onChange(option) {
      tablesFn[option.value](state, dispatch);
    },
    placeholder: "Table Options",
    select: item.select && item.select(state)
  });
};

function _templateObject$4() {
  var data = _taggedTemplateLiteral(["\n  opacity: ", ";\n  pointer-events: ", ";\n  color: #777;\n  display: inline-flex;\n  padding: 0px 10px;\n  .custom-file-upload {\n    cursor: pointer;\n  }\n  &:hover {\n  }\n  input {\n    display: none;\n  }\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var UploadImage = styled.div(_templateObject$4(), function (props) {
  return props.select ? 1 : 0.4;
}, function (props) {
  return props.select ? 'default' : 'none';
});

var ImageUpload = function ImageUpload(_ref) {
  var item = _ref.item,
      fileUpload = _ref.fileUpload,
      view = _ref.view;

  var _useContext = React.useContext(waxProsemirrorCore.WaxContext),
      activeViewId = _useContext.activeViewId;

  return /*#__PURE__*/React__default.createElement(UploadImage, {
    select: item.select && item.select(view.state, activeViewId)
  }, /*#__PURE__*/React__default.createElement("label", {
    className: "custom-file-upload",
    title: "upload image",
    htmlFor: "file-upload"
  }, item.content, /*#__PURE__*/React__default.createElement("input", {
    id: "file-upload",
    onChange: function onChange(e) {
      return fileUpload(e.target.files[0]);
    },
    type: "file"
  })));
};

function _templateObject$5() {
  var data = _taggedTemplateLiteral(["\n  border-bottom: 1px solid #d9d9d9;\n  color: #979797;\n  font-family: 'Fira Sans';\n  font-size: 15px;\n  font-weight: bold;\n  letter-spacing: 0.6px;\n  list-style: none;\n  line-height: 0;\n  margin: 5px 0;\n  display: block;\n  padding: 20px 0 10px;\n  margin-left: 10px;\n  text-align: left;\n  text-transform: uppercase;\n  width: 51%;\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var LeftMenuStyled = styled.div(_templateObject$5());

var LeftMenuTitle = function LeftMenuTitle(_ref) {
  var title = _ref.title;
  return /*#__PURE__*/React__default.createElement(LeftMenuStyled, null, title);
};

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  width: 0;\n  top: 40px;\n  position: relative;\n  right: 100%;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  background: none;\n  border: none;\n  cursor: pointer;\n  &:active {\n    outline: none;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$6() {
  var data = _taggedTemplateLiteral(["\n  border-right: 1px solid #ecedf1;\n  &:last-child {\n    border-right: none;\n  }\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var ToolGroupStyled = styled.div(_templateObject$6());
var MoreButton = styled.button(_templateObject2());
var InnerStyled = styled.div(_templateObject3());

var ToolGroupComponent = function ToolGroupComponent(_ref) {
  var view = _ref.view,
      tools = _ref.tools,
      name = _ref.name,
      title = _ref.title;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      more = _useState2[0],
      showHide = _useState2[1],
      toolsShown = [],
      rest = [],
      DisplayTitle = lodash.isFunction(title) ? title : function () {
    return title;
  };

  tools.forEach(function (tool) {
    tool.isIntoMoreSection() && tool.isDisplayed() ? rest.push(tool.renderTool(view)) : toolsShown.push(tool.renderTool(view));
  });
  return /*#__PURE__*/React__default.createElement(ToolGroupStyled, {
    "data-name": name
  }, /*#__PURE__*/React__default.createElement(DisplayTitle, null), toolsShown, rest.length && !more ? /*#__PURE__*/React__default.createElement(MoreButton, {
    title: "show more tools",
    onClick: function onClick() {
      return showHide(!more);
    }
  }, icons.ellipses) : null, more && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(MoreButton, {
    title: "hide",
    onClick: function onClick() {
      return showHide(!more);
    }
  }, icons.ellipses), /*#__PURE__*/React__default.createElement(InnerStyled, null, rest)));
};

function _templateObject$7() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  margin-top: 10px;\n  width: 2%;\n  &:after {\n    content: counter(footnote-view);\n    vertical-align: super;\n    font-size: 75%;\n    counter-increment: footnote-view;\n    cursor: pointer;\n  }\n"]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
var NoteNumberStyled = styled.div(_templateObject$7());

var onClick = function onClick() {};

var NoteNumber = function NoteNumber(_ref) {
  var number = _ref.number;
  return /*#__PURE__*/React__default.createElement(NoteNumberStyled, {
    onClick: onClick
  });
};

function _templateObject2$1() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  min-height: 20px;\n  margin-top: 10px;\n  height: 100%;\n  border-bottom: 1px solid black;\n  &:focus {\n    outline: none;\n  }\n\n  p {\n    margin: 0;\n  }\n\n  span.comment {\n    border-bottom: 2px solid #ffab20;\n    border-radius: 3px 3px 0 0;\n\n    .active-comment {\n      background-color: #ffab20;\n    }\n  }\n\n  span.deletion {\n    text-decoration: line-through;\n    color: red;\n  }\n\n  span.insertion {\n    color: blue;\n  }\n\n  .selected-insertion,\n  .selected-deletion,\n  .selected-format-change,\n  .selected-block-change {\n    background-color: #fffacf;\n  }\n\n  .format-change {\n    border-bottom: 2px solid blue;\n  }\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$8() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  min-height: 28px;\n  width: 100%;\n  position: relative;\n  margin-bottom: 5px;\n"]);

  _templateObject$8 = function _templateObject() {
    return data;
  };

  return data;
}
var NoteEditorContainerStyled = styled.div(_templateObject$8());
var NoteStyled = styled.div(_templateObject2$1());
var NoteEditorContainer = React__default.forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default.createElement(NoteEditorContainerStyled, null, /*#__PURE__*/React__default.createElement(NoteNumber, null), " ", /*#__PURE__*/React__default.createElement(NoteStyled, Object.assign({
    ref: ref
  }, props)));
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _templateObject2$2() {
  var data = _taggedTemplateLiteral(["\n  cursor: pointer;\n"]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$9() {
  var data = _taggedTemplateLiteral(["\n  padding: 20px;\n  border-radius: 3px;\n  border: 1px solid #000;\n  background: #ecedf1;\n  z-index: 9999;\n  -webkit-box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.75);\n  -moz-box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.75);\n  box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.75);\n"]);

  _templateObject$9 = function _templateObject() {
    return data;
  };

  return data;
}
var LinkWrapper = styled.div(_templateObject$9());
var Button$1 = styled.button(_templateObject2$2());

var LinkComponent = function LinkComponent(_ref) {
  var mark = _ref.mark,
      setPosition = _ref.setPosition,
      position = _ref.position;
  var href = mark ? mark.attrs.href : null;
  var linkMark = mark ? mark : null;

  var _useContext = React.useContext(waxProsemirrorCore.WaxContext),
      activeView = _useContext.activeView;

  var state = activeView.state,
      dispatch = activeView.dispatch;
  var ref = React.useRef(null);
  var linkInput = React.useRef(null);

  var _useState = React.useState('Create'),
      _useState2 = _slicedToArray(_useState, 2),
      addButtonText = _useState2[0],
      setButtonText = _useState2[1];

  var _useState3 = React.useState(linkMark),
      _useState4 = _slicedToArray(_useState3, 2),
      lastLinkMark = _useState4[0],
      setLLastLinkMark = _useState4[1];

  var _useState5 = React.useState(href),
      _useState6 = _slicedToArray(_useState5, 2),
      linkHref = _useState6[0],
      setLinkHref = _useState6[1];

  React.useEffect(function () {
    setLinkText();
    removeMarkIfEmptyHref();
  }, [ref.current, href]);

  var addLinkHref = function addLinkHref() {
    var href = linkHref;
    var linkMark = state.schema.marks.link;
    var tr = state.tr;
    dispatch(tr.addMark(mark.from, mark.to, linkMark.create(_objectSpread2({}, mark && mark.attrs || {}, {
      href: href
    }))));
    activeView.focus();
  };

  var removeLink = function removeLink() {
    dispatch(state.tr.removeMark(mark.from, mark.to, state.schema.marks.link));
    activeView.focus();
  };

  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === 'Enter' || event.which === 13) {
      addLinkHref();
    }
  };

  var updateLinkHref = function updateLinkHref() {
    var value = linkInput.current.value;
    setLinkHref(value);
  };

  var setLinkText = function setLinkText() {
    if (mark && mark.attrs.href !== '') {
      setButtonText('Update');
      setLinkHref(mark.attrs.href);
    } else {
      setButtonText('Create');
      setLinkHref('');
      if (linkInput.current) linkInput.current.focus();
    }
  };

  var removeMarkIfEmptyHref = function removeMarkIfEmptyHref() {
    var _state$selection = state.selection,
        $from = _state$selection.$from,
        $to = _state$selection.$to;
    var PMLinkMark = state.schema.marks.link;
    var actualMark = waxProsemirrorUtilities.DocumentHelpers.getSelectionMark(state, PMLinkMark);
    setLLastLinkMark(actualMark);

    if (lastLinkMark.attrs.href === '' && ($from.pos < lastLinkMark.from || $to.pos > lastLinkMark.to)) {
      dispatch(state.tr.setMeta('addToHistory', false).removeMark(lastLinkMark.from, lastLinkMark.to, state.schema.marks.link));
    }
  };

  return mark ? /*#__PURE__*/React__default.createElement(LinkWrapper, {
    ref: ref
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "text",
    ref: linkInput,
    onChange: updateLinkHref,
    onKeyPress: handleKeyDown,
    value: linkHref
  }), /*#__PURE__*/React__default.createElement(Button$1, {
    primary: true,
    onClick: addLinkHref
  }, addButtonText), /*#__PURE__*/React__default.createElement(Button$1, {
    onClick: removeLink
  }, "Remove")) : null;
};

var CommentBubbleComponent = function CommentBubbleComponent(_ref) {
  var setPosition = _ref.setPosition,
      position = _ref.position,
      showComment = _ref.showComment,
      group = _ref.group;

  var _useContext = React.useContext(waxProsemirrorCore.WaxContext),
      activeView = _useContext.activeView,
      activeViewId = _useContext.activeViewId;

  var state = activeView.state,
      dispatch = activeView.dispatch;
  React.useLayoutEffect(function () {
    var WaxSurface = activeView.dom.getBoundingClientRect();
    var selection = activeView.state.selection;
    var from = selection.from,
        to = selection.to;
    var start = activeView.coordsAtPos(from);
    var end = activeView.coordsAtPos(to);
    var difference = end.top - start.top;
    var left = WaxSurface.width + WaxSurface.x;
    var top = end.top - difference / 2 - 5;
    setPosition(_objectSpread2({}, position, {
      left: left,
      top: top
    }));
  }, [position.left]);

  var createComment = function createComment(event) {
    event.preventDefault();
    waxProsemirrorUtilities.Commands.createComment(state, dispatch, group, activeViewId);
    activeView.focus();
  };

  var isSelectionComment = function isSelectionComment() {
    var commentMark = activeView.state.schema.marks.comment;
    var mark = waxProsemirrorUtilities.DocumentHelpers.findMark(state, commentMark, true); // TODO Overlapping comments . for now don't allow

    if (mark.length >= 1) return true;
    return false;
  };

  return !isSelectionComment() && showComment(activeViewId) && /*#__PURE__*/React__default.createElement("button", {
    type: "button",
    onMouseDown: function onMouseDown(event) {
      createComment(event);
    }
  }, "create");
};

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _templateObject$a() {
  var data = _taggedTemplateLiteral(["\n  padding: 4px;\n  border-bottom: 1px solid #ffab20;\n  cursor: pointer;\n"]);

  _templateObject$a = function _templateObject() {
    return data;
  };

  return data;
}
var SinlgeCommentRow = styled.div(_templateObject$a());
var Comment = (function (_ref) {
  var comment = _ref.comment,
      activeView = _ref.activeView,
      user = _ref.user,
      active = _ref.active;
  var commentInput = React.useRef(null);

  var _useState = React.useState(comment),
      _useState2 = _slicedToArray(_useState, 2),
      commentAnnotation = _useState2[0],
      setCommentAnnotation = _useState2[1];

  var _useState3 = React.useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      commentInputValue = _useState4[0],
      setcommentInputValue = _useState4[1];

  var state = activeView.state,
      dispatch = activeView.dispatch;
  var allCommentsWithSameId = waxProsemirrorUtilities.DocumentHelpers.findAllMarksWithSameId(state, comment);
  var conversation = comment.attrs.conversation;
  var commentMark = state.schema.marks.comment;
  React.useEffect(function () {
    setTimeout(function () {
      if (commentInput.current !== null && conversation.length === 0) commentInput.current.focus();
    }, 500);
  }, [active]);

  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === 'Enter' || event.which === 13) {
      saveComment(event);
    }
  };

  var saveComment = function saveComment(event) {
    event.stopPropagation();
    var value = commentInput.current.value;
    var tr = state.tr,
        doc = state.doc;
    var obj = {
      content: value,
      displayName: user.username,
      timestamp: Math.floor(Date.now() / 300000)
    };
    commentAnnotation.attrs.conversation.push(obj);
    allCommentsWithSameId.forEach(function (singleComment) {
      dispatch(tr.addMark(singleComment.pos, singleComment.pos + singleComment.nodeSize, commentMark.create(_objectSpread2({}, commentAnnotation && commentAnnotation.attrs || {}, {
        conversation: commentAnnotation.attrs.conversation
      }))));
    });
    setcommentInputValue('');
  };

  var updateCommentInputValue = function updateCommentInputValue() {
    var value = commentInput.current.value;
    setcommentInputValue(value);
  };

  var onBlur = function onBlur() {
    var value = commentInput.current.value;

    if (conversation.length === 0 && value === '') {
      resolveComment();
    }
  };

  var resolveComment = function resolveComment(event) {
    if (event) event.stopPropagation();
    var maxPos = comment.pos;
    var minPos = comment.pos;
    allCommentsWithSameId.forEach(function (singleComment) {
      var markPosition = waxProsemirrorUtilities.DocumentHelpers.findMarkPosition(activeView, singleComment.pos, 'comment');
      if (markPosition.from < minPos) minPos = markPosition.from;
      if (markPosition.to > maxPos) maxPos = markPosition.to;
    });
    if (allCommentsWithSameId.length > 1) maxPos += lodash.last(allCommentsWithSameId).node.nodeSize;
    dispatch(state.tr.removeMark(minPos, maxPos, commentMark));
    activeView.focus();
  };

  var commentInputReply = function commentInputReply() {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("input", {
      type: "text",
      ref: commentInput,
      placeholder: "add a new comment",
      onChange: updateCommentInputValue,
      onKeyPress: handleKeyDown,
      onBlur: onBlur,
      onClick: function onClick(event) {
        event.stopPropagation();
      },
      value: commentInputValue,
      disabled: !active
    }), /*#__PURE__*/React__default.createElement("button", {
      disabled: !active,
      type: "button",
      onClick: function onClick(event) {
        return saveComment(event);
      }
    }, "Post"), /*#__PURE__*/React__default.createElement("button", {
      disabled: !active,
      type: "button",
      onClick: function onClick(event) {
        return resolveComment(event);
      }
    }, "Resolve"));
  };

  return conversation.length === 0 ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, commentInputReply()) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, conversation.map(function (singleComment, index) {
    return /*#__PURE__*/React__default.createElement(SinlgeCommentRow, {
      key: uuid.v4()
    }, "".concat(singleComment.displayName, " : ").concat(singleComment.content));
  }), commentInputReply());
});

function _templateObject$b() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  margin-top: 10px;\n  border: 1px solid #ffab20;\n  position: absolute;\n  transition: ", ";\n  top: ", ";\n  left: ", ";\n  opacity: ", ";\n"]);

  _templateObject$b = function _templateObject() {
    return data;
  };

  return data;
}
var CommentBoxStyled = styled.div(_templateObject$b(), function (_ref) {
  var state = _ref.state;
  return 'top 1s, opacity 1.5s, left 1s';
}, function (props) {
  return props.top ? "".concat(props.top, "px") : 0;
}, function (props) {
  return props.active ? "".concat(63, "%") : "".concat(65, "%");
}, function (_ref2) {
  var state = _ref2.state;

  switch (state) {
    case 'exited':
      return 0.2;

    case 'exiting':
      return 0.4;

    case 'entering':
      return 0.6;

    case 'entered':
      return 1;
  }
});
var CommentBox = (function (_ref3) {
  var comment = _ref3.comment,
      top = _ref3.top,
      dataBox = _ref3.dataBox;
  console.log('rerender');

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      animate = _useState2[0],
      setAnimate = _useState2[1];

  var id = comment.attrs.id;
  React.useEffect(function () {
    setAnimate(true);
  }, []);
  var MemorizedComponent = React.memo(function () {
    var _useContext = React.useContext(waxProsemirrorCore.WaxContext),
        view = _useContext.view,
        user = _useContext.view.main.props.user,
        app = _useContext.app,
        activeView = _useContext.activeView;

    var active = false;
    var commentPlugin = app.PmPlugins.get('commentPlugin');
    var activeComment = commentPlugin.getState(activeView.state).comment;
    if (activeComment && id === activeComment.attrs.id) active = true;

    var setCommentActive = function setCommentActive() {
      var viewId = comment.attrs.viewid;

      if (active) {
        view[viewId].focus();
        return false;
      }

      var allCommentsWithSameId = waxProsemirrorUtilities.DocumentHelpers.findAllMarksWithSameId(view[viewId].state, comment);
      var maxPos = lodash.maxBy(allCommentsWithSameId, 'pos');
      maxPos.pos += lodash.last(allCommentsWithSameId).node.nodeSize;
      view[viewId].dispatch(view[viewId].state.tr.setSelection(new prosemirrorState.TextSelection(view[viewId].state.tr.doc.resolve(maxPos.pos, maxPos.pos))));
      view[viewId].focus();
    };

    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(reactTransitionGroup.Transition, {
      "in": animate,
      timeout: 1000
    }, function (state) {
      return /*#__PURE__*/React__default.createElement(CommentBoxStyled, {
        top: top,
        state: state,
        "data-box": dataBox,
        active: active,
        onClick: setCommentActive
      }, /*#__PURE__*/React__default.createElement(Comment, {
        comment: comment,
        active: active,
        activeView: activeView,
        user: user
      }));
    }));
  });
  return /*#__PURE__*/React__default.createElement(MemorizedComponent, null);
});

function _templateObject$c() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  margin-top: 10px;\n  border: 1px solid blue;\n  position: absolute;\n  transition: ", ";\n  top: ", ";\n  left: ", ";\n  opacity: ", ";\n"]);

  _templateObject$c = function _templateObject() {
    return data;
  };

  return data;
}
var TrackChangeBoxStyled = styled.div(_templateObject$c(), function (_ref) {
  var state = _ref.state;
  return "top 1s, opacity 1.5s, left 1s";
}, function (props) {
  return props.top ? "".concat(props.top, "px") : 0;
}, function (props) {
  return props.active ? "".concat(63, "%") : "".concat(65, "%");
}, function (_ref2) {
  var state = _ref2.state;

  switch (state) {
    case "exited":
      return 0.2;

    case "exiting":
      return 0.4;

    case "entering":
      return 0.6;

    case "entered":
      return 1;
  }
});
var TrackChangeBox = (function (_ref3) {
  var trackChange = _ref3.trackChange,
      view = _ref3.view,
      top = _ref3.top,
      dataBox = _ref3.dataBox;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      animate = _useState2[0],
      setAnimate = _useState2[1];

  var _useContext = React.useContext(waxProsemirrorCore.WaxContext),
      main = _useContext.view.main,
      app = _useContext.app,
      activeView = _useContext.activeView;

  var action;

  if (trackChange instanceof prosemirrorModel.Mark) {
    if (trackChange.type.name = "format_change") {
      var _trackChange$attrs = trackChange.attrs,
          username = _trackChange$attrs.username,
          before = _trackChange$attrs.before,
          after = _trackChange$attrs.after;
      action = "User ".concat(username, " added ").concat(after[0]);
    }
  } else {
    action = "User demo changed paragraph to heading 1";
  }

  var active = false;
  React.useEffect(function () {
    setAnimate(true);
  }, []);
  return /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement(reactTransitionGroup.Transition, {
    "in": animate,
    timeout: 1000
  }, function (state) {
    return /*#__PURE__*/React__default.createElement(TrackChangeBoxStyled, {
      top: top,
      state: state,
      "data-box": dataBox,
      active: active
    }, /*#__PURE__*/React__default.createElement("div", null, action, /*#__PURE__*/React__default.createElement("button", null, "Accept"), /*#__PURE__*/React__default.createElement("button", null, "Reject")));
  }));
});

/* eslint react/prop-types: 0 */
var BoxList = (function (_ref) {
  var commentsTracks = _ref.commentsTracks,
      view = _ref.view,
      position = _ref.position;
  if (!position) return null;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, commentsTracks.map(function (commentTrack, index) {
    var id = commentTrack instanceof prosemirrorModel.Mark ? commentTrack.attrs.id : commentTrack.node.attrs.id;
    var top = position[index] ? position[index][id] : 0;

    if (commentTrack.type && commentTrack.type.name === 'comment') {
      return /*#__PURE__*/React__default.createElement(CommentBox, {
        key: id,
        comment: commentTrack,
        top: top,
        dataBox: id
      });
    }

    return /*#__PURE__*/React__default.createElement(TrackChangeBox, {
      key: id,
      trackChange: commentTrack,
      view: view,
      top: top,
      dataBox: id
    });
  }));
});

var RightArea = (function (_ref) {
  var area = _ref.area;

  var _useContext = React.useContext(waxProsemirrorCore.WaxContext),
      view = _useContext.view,
      main = _useContext.view.main,
      app = _useContext.app,
      activeView = _useContext.activeView;

  var commentPlugin = app.PmPlugins.get('commentPlugin');

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      marksNodes = _useState2[0],
      setMarksNodes = _useState2[1];

  var _useState3 = React.useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      position = _useState4[0],
      setPosition = _useState4[1];

  var _useState5 = React.useState(true),
      _useState6 = _slicedToArray(_useState5, 2),
      isFirstRun = _useState6[0],
      setFirstRun = _useState6[1];

  var setTops = React.useCallback(function () {
    var result = [];
    var markNodeEl = null;
    var annotationTop = 0;
    var boxHeight = 0;
    var top = 0;
    var allCommentsTop = [];
    var nodesMarksToIterrate = marksNodes[area] === 'main' ? lodash.sortBy(marksNodes[area], ['pos']) : marksNodes[area];
    lodash.each(nodesMarksToIterrate, function (markNode, pos) {
      var WaxSurface = main.dom.getBoundingClientRect();
      var id = markNode instanceof prosemirrorModel.Mark ? markNode.attrs.id : markNode.node.attrs.id;
      var activeComment = commentPlugin.getState(activeView.state).comment;
      var isActive = false;
      if (activeComment && id === activeComment.attrs.id) isActive = true; // annotation top

      if (area === 'main') {
        markNodeEl = document.querySelector("[data-id=\"".concat(id, "\"]"));
        if (markNodeEl) annotationTop = markNodeEl.getBoundingClientRect().top - WaxSurface.top;
      } else {
        var panelWrapper = document.getElementsByClassName('panelWrapper');
        var panelWrapperHeight = panelWrapper[0].getBoundingClientRect().height;
        markNodeEl = document.querySelector('#notes-container').querySelector("[data-id=\"".concat(id, "\"]"));
        if (markNodeEl) annotationTop = markNodeEl.getBoundingClientRect().top - panelWrapperHeight - 50;
      } // get height of this markNode box


      var boxEl = document.querySelector("div[data-box=\"".concat(id, "\"]"));
      if (boxEl) boxHeight = parseInt(boxEl.offsetHeight, 10); // where the box should move to

      top = annotationTop; // if the above comment box has already taken up the height, move down

      if (pos > 0) {
        var previousBox = marksNodes[area][pos - 1];
        var previousEndHeight = previousBox.endHeight;

        if (annotationTop < previousEndHeight) {
          top = previousEndHeight + 2;
        }
      } // store where the box ends to be aware of overlaps in the next box


      markNode.endHeight = top + boxHeight + 2;
      result[pos] = top;
      allCommentsTop.push(_defineProperty({}, id, result[pos])); // if active, move as many boxes above as needed to bring it to the annotation's height

      if (isActive) {
        markNode.endHeight = annotationTop + boxHeight + 2;
        result[pos] = annotationTop;
        allCommentsTop[pos][id] = result[pos];
        var b = true;
        var i = pos; // first one active, none above

        if (i === 0) b = false;

        while (b) {
          var boxAbove = marksNodes[area][i - 1];
          var boxAboveEnds = boxAbove.endHeight;
          var currentTop = result[i];
          var doesOverlap = boxAboveEnds > currentTop;

          if (doesOverlap) {
            var overlap = boxAboveEnds - currentTop;
            result[i - 1] -= overlap;
            var previousMarkNode = marksNodes[area][i - 1] instanceof prosemirrorModel.Mark ? marksNodes[area][i - 1].attrs.id : marksNodes[area][i - 1].node.attrs.id;
            allCommentsTop[i - 1][previousMarkNode] = result[i - 1];
          }

          if (!doesOverlap) b = false;
          if (i <= 1) b = false;
          i -= 1;
        }
      }
    });
    return allCommentsTop;
  });
  useDeepCompareEffect(function () {
    setMarksNodes(updateMarks(view));

    if (isFirstRun) {
      setTimeout(function () {
        setPosition(setTops());
        setFirstRun(false);
      }, 400);
    } else {
      setPosition(setTops());
    }
  }, [updateMarks(view), setTops()]);
  var CommentTrackComponent = React.useMemo(function () {
    return /*#__PURE__*/React__default.createElement(BoxList, {
      commentsTracks: marksNodes[area] || [],
      area: area,
      view: main,
      position: position
    });
  }, [marksNodes[area] || [], position]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, CommentTrackComponent);
}); //  TODO if allInlineNodes and allBlockNodes count don't change, do not compute again

var updateMarks = function updateMarks(view) {
  if (view.main) {
    var allInlineNodes = [];
    Object.keys(view).forEach(function (eachView) {
      allInlineNodes.push.apply(allInlineNodes, _toConsumableArray(waxProsemirrorUtilities.DocumentHelpers.findInlineNodes(view[eachView].state.doc)));
    });
    var allBlockNodes = waxProsemirrorUtilities.DocumentHelpers.findBlockNodes(view.main.state.doc);
    var finalMarks = [];
    var finalNodes = [];
    allInlineNodes.map(function (node) {
      if (node.node.marks.length > 0) {
        node.node.marks.filter(function (mark) {
          if (mark.type.name === 'comment' || mark.type.name === 'insertion' || mark.type.name === 'deletion' || mark.type.name === 'format_change') {
            mark.pos = node.pos;
            finalMarks.push(mark);
          }
        });
      }
    });
    allBlockNodes.map(function (node) {
      if (node.node.attrs.track && node.node.attrs.track.length > 0) {
        finalNodes.push(node);
      }
    });
    var nodesAndMarks = [].concat(_toConsumableArray(lodash.uniqBy(finalMarks, 'attrs.id')), finalNodes);
    var groupedMarkNodes = {};
    nodesAndMarks.forEach(function (markNode) {
      var markNodeAttrs = markNode.attrs ? markNode.attrs : markNode.node.attrs;

      if (!groupedMarkNodes[markNodeAttrs.group]) {
        groupedMarkNodes[markNodeAttrs.group] = [markNode];
      } else {
        groupedMarkNodes[markNodeAttrs.group].push(markNode);
      }
    });
    return groupedMarkNodes;
  }

  return [];
};

function _templateObject$d() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  opacity: ", ";\n  pointer-events: ", ";\n  color: ", ";\n  background-color: ", ";\n  &:hover {\n    background-color: ", ";\n  }\n"]);

  _templateObject$d = function _templateObject() {
    return data;
  };

  return data;
}
var ButtonStyled$1 = styled.button(_templateObject$d(), waxProsemirrorThemes.ButtonStyles, function (props) {
  return props.select ? 1 : 0.4;
}, function (props) {
  return props.select ? 'default' : 'none';
}, function (props) {
  return props.isActive ? 'white' : props.theme.colorButton;
}, function (props) {
  return props.isActive ? props.theme.colorPrimary : 'transparent';
}, function (props) {
  return props.isActive ? props.theme.colorPrimary : 'transparent';
});

var TrackChangeEnable = function TrackChangeEnable(_ref) {
  var _ref$view = _ref.view,
      view = _ref$view === void 0 ? {} : _ref$view,
      item = _ref.item,
      enabled = _ref.enabled;

  if (item.onlyOnMain) {
    var _useContext = React.useContext(waxProsemirrorCore.WaxContext),
        main = _useContext.view.main;

    view = main;
  }

  var _useState = React.useState(enabled),
      _useState2 = _slicedToArray(_useState, 2),
      isEnabled = _useState2[0],
      setEnabled = _useState2[1];

  return /*#__PURE__*/React__default.createElement(ButtonStyled$1, {
    type: "button",
    isActive: isEnabled,
    title: item.title,
    disabled: item.enable && !item.enable(view.state),
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
      setEnabled(!isEnabled);
      item.run(view.state, view.dispatch);
    },
    select: item.select && item.select(view.state)
  }, item.content);
};

exports.Button = Button;
exports.CommentBubbleComponent = CommentBubbleComponent;
exports.ImageUpload = ImageUpload;
exports.InfoArea = InfoArea;
exports.LeftMenuTitle = LeftMenuTitle;
exports.LinkComponent = LinkComponent;
exports.NoteEditorContainer = NoteEditorContainer;
exports.Overlay = Overlay;
exports.RightArea = RightArea;
exports.TableDropDown = TableDropDown;
exports.ToolGroupComponent = ToolGroupComponent;
exports.TrackChangeEnable = TrackChangeEnable;
exports.icons = icons;
//# sourceMappingURL=index.js.map
