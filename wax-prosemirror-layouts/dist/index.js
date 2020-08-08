'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styled = require('styled-components');
var styled__default = _interopDefault(styled);
var PanelGroup = _interopDefault(require('react-panelgroup'));
var waxProsemirrorComponents = require('wax-prosemirror-components');
var waxProsemirrorServices = require('wax-prosemirror-services');
var waxProsemirrorThemes = require('wax-prosemirror-themes');
var waxProsemirrorUtilities = require('wax-prosemirror-utilities');
var waxProsemirrorCore = require('wax-prosemirror-core');

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
  var data = _taggedTemplateLiteral(["\n  .ProseMirror {\n    counter-reset: footnote;\n    font-family: ", ";\n    &:focus {\n      outline: none;\n    }\n  }\n\n  .ProseMirror .wax-selection-marker {\n    background: #0a78ff;\n    color: white;\n  }\n\n  .ProseMirror footnote {\n    font-size: 0;\n    display: inline-block;\n    text-align: center;\n    width: 17px;\n    height: 17px;\n    background: black;\n    color: white;\n    cursor: pointer;\n  }\n\n  .ProseMirror footnote::after {\n    content: counter(footnote);\n    position: relative;\n    bottom: 2px;\n    font-size: 16px;\n    counter-increment: footnote;\n  }\n\n  hr {\n    padding: 2px 10px;\n    border: none;\n    margin: 1em 0;\n  }\n\n  hr:after {\n    content: '';\n    display: block;\n    height: 1px;\n    background-color: silver;\n    line-height: 2px;\n  }\n\n  ul,\n  ol {\n    padding-left: 30px;\n  }\n\n  blockquote {\n    padding-left: 1em;\n    border-left: 3px solid #eee;\n    margin-left: 0;\n    margin-right: 0;\n  }\n\n  img {\n    cursor: default;\n  }\n\n  sup,\n  sub {\n    line-height: 0;\n  }\n\n  /* Tables */\n\n  table {\n    border-collapse: initial;\n    border-spacing: 0;\n    border-width: 0 thin thin 0;\n    border: 1px solid #eee;\n    table-layout: fixed;\n    width: 100%;\n    margin: 0;\n    overflow: hidden;\n    page-break-inside: avoid;\n  }\n\n  th,\n  td {\n    border: 1px solid #eee;\n    /*width: 200px;*/\n    padding: 2px 5px;\n    vertical-align: top;\n    box-sizing: border-box;\n    position: relative;\n  }\n\n  .tableWrapper {\n    overflow-x: auto;\n  }\n\n  .column-resize-handle {\n    position: absolute;\n    right: -2px;\n    top: 0;\n    bottom: 0;\n    width: 4px;\n    z-index: 20;\n    background-color: #adf;\n    pointer-events: none;\n  }\n\n  .ProseMirror.resize-cursor {\n    cursor: ew-resize;\n    cursor: col-resize;\n  }\n  /* Give selected cells a blue overlay */\n  .selectedCell:after {\n    z-index: 2;\n    position: absolute;\n    content: '';\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    background: rgba(200, 200, 255, 0.4);\n    pointer-events: none;\n  }\n\n  /* placeholder */\n  .empty-node::before {\n    color: #aaa;\n    float: left;\n    font-style: italic;\n    pointer-events: none;\n    height: 0;\n  }\n\n  p.empty-node:first-child::before {\n    content: attr(data-content);\n  }\n\n  /* invisible characters */\n  .invisible {\n    pointer-events: none;\n    user-select: none;\n  }\n\n  .invisible:before {\n    caret-color: inherit;\n    color: gray;\n    display: inline-block;\n    font-weight: 400;\n    font-style: normal;\n    line-height: 1em;\n    width: 0;\n  }\n\n  .invisible--space:before {\n    content: '\xB7';\n  }\n\n  .invisible--break:before {\n    content: '\xAC';\n  }\n\n  .invisible--par:after {\n    content: '\xB6';\n  }\n\n  span.deletion {\n    text-decoration: line-through;\n    color: red;\n    footnote {\n      background: red;\n    }\n  }\n\n  span.insertion {\n    color: blue;\n  }\n\n  .selected-insertion,\n  .selected-deletion,\n  .selected-format-change,\n  .selected-block-change {\n    background-color: #fffacf;\n  }\n\n  .format-change {\n    border-bottom: 2px solid blue;\n  }\n\n  [data-track] {\n    position: relative;\n  }\n\n  [data-track]::before {\n    content: '';\n    position: absolute;\n    border-left: 2px solid blue;\n    left: -10px;\n    height: 100%;\n  }\n\n  li[data-track]::before,\n  li [data-track]::before {\n    left: -5px;\n  }\n\n  span.comment {\n    border-bottom: 2px solid #ffab20;\n    border-radius: 3px 3px 0 0;\n\n    .active-comment {\n      background-color: #ffab20;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
/* All styles regarding ProseMirror surface and elements */

var EditorElements = styled.css(_templateObject(), function (props) {
  return props.theme.fontReading;
});

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  width: 35%;\n  height: 100%;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  counter-reset: footnote-view;\n  display: flex;\n  flex-direction: column;\n  padding: 0 0 10px 5px;\n  height: 100%;\n  width: 65%;\n  position: relative;\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  height: 100%;\n  overflow-y: scroll;\n  position: absolute;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n  > div {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-start;\n    margin-top: 15px;\n    button {\n      display: flex;\n      flex-direction: column;\n      font-family: ", ";\n      margin-left: 5%;\n      width: 90%;\n    }\n    [data-name='Display'] {\n      border-right: none;\n    }\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  width: 14%;\n  height: 98%;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  background: transparent;\n  z-index: 9999;\n  div {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  background: #fff;\n  height: 52px;\n  line-height: 32px;\n  position: relative;\n  user-select: none;\n  border-bottom: 2px solid #ecedf1;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  bottom: 0;\n  left: 0;\n  overflow: auto;\n  position: absolute;\n  display: flex;\n  right: 0;\n  top: 0;\n  box-sizing: border-box;\n  padding: 0 2px 2px 2px;\n  height: 100%;\n  ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  width: 65%;\n  height: 100%;\n  .ProseMirror {\n    -moz-box-shadow: 0 0 8px #ecedf1;\n    -webkit-box-shadow: 0 0 8px #ecedf1;\n    box-shadow: 0 0 8px #ecedf1;\n    min-height: 90%;\n    padding: 40px;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  flex: 1;\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n  width: 100%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  .divider {\n    &:before {\n      content: 'Notes';\n      position: relative;\n      bottom: 14px;\n      background: white;\n      color: #a3a3a3;\n      font-weight: 600;\n      letter-spacing: 0.15em;\n    }\n    &:after {\n      color: #a3a3a3;\n      content: '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . '\n        '. . . . . . . . . . . . . . . . . . . . ';\n      float: left;\n      font-weight: 400;\n      white-space: nowrap;\n      width: 0;\n      position: relative;\n      bottom: 14px;\n    }\n  }\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var LayoutWrapper = styled__default.div(_templateObject$1());
var LeftMenuSurfaceContainer = styled__default.div(_templateObject2());
var WaxSurfaceContainer = styled__default.div(_templateObject3());
var EditorContainer = styled__default.div(_templateObject4());
var WaxSurfaceScroll = styled__default.div(_templateObject5(), EditorElements);
var MainMenuContainer = styled__default.div(_templateObject6());
var MainMenuInner = styled__default.div(_templateObject7());
var SideMenuContainer = styled__default.div(_templateObject8());
var SideMenuInner = styled__default.div(_templateObject9(), function (props) {
  return props.theme.fontInterface;
});
var NotesAreaContainer = styled__default.div(_templateObject10());
var NotesContainer = styled__default.div(_templateObject11());
var CommentsContainer = styled__default.div(_templateObject12());
var surfaceHeight = 700;
var notesHeight = 50;

var onResizeEnd = function onResizeEnd(arr) {
  surfaceHeight = arr[0].size;
  notesHeight = arr[1].size;
};

var hasNotes = function hasNotes(main) {
  var notes = waxProsemirrorUtilities.DocumentHelpers.findChildrenByType(main.state.doc, main.state.schema.nodes.footnote, true);
  return notes;
};

var LeftSideBar = waxProsemirrorServices.componentPlugin('leftSideBar');
var RightSideBar = waxProsemirrorServices.componentPlugin('rightSideBar');
var TopBar = waxProsemirrorServices.componentPlugin('topBar');
var NotesArea = waxProsemirrorServices.componentPlugin('notesArea');
var RightArea = waxProsemirrorServices.componentPlugin('rightArea');
var WaxOverlays = waxProsemirrorServices.componentPlugin('waxOverlays');

var withNotes = function withNotes() {
  return /*#__PURE__*/React__default.createElement(NotesAreaContainer, null, /*#__PURE__*/React__default.createElement(NotesContainer, {
    id: "notes-container"
  }, /*#__PURE__*/React__default.createElement(NotesArea, null)), /*#__PURE__*/React__default.createElement(CommentsContainer, null, /*#__PURE__*/React__default.createElement(RightArea, {
    area: "notes"
  })));
};

var EditoriaLayout = function EditoriaLayout(_ref) {
  var editor = _ref.editor;

  var _useContext = React.useContext(waxProsemirrorCore.WaxContext),
      main = _useContext.view.main;

  var AreasWithNotes = null;

  if (main) {
    var notes = hasNotes(main);
    if (notes.length) AreasWithNotes = withNotes();
  }

  return /*#__PURE__*/React__default.createElement(styled.ThemeProvider, {
    theme: waxProsemirrorThemes.cokoTheme
  }, /*#__PURE__*/React__default.createElement(LayoutWrapper, null, /*#__PURE__*/React__default.createElement(MainMenuContainer, null, /*#__PURE__*/React__default.createElement(MainMenuInner, null, /*#__PURE__*/React__default.createElement(TopBar, null))), /*#__PURE__*/React__default.createElement(LeftMenuSurfaceContainer, null, /*#__PURE__*/React__default.createElement(SideMenuContainer, null, /*#__PURE__*/React__default.createElement(SideMenuInner, null, /*#__PURE__*/React__default.createElement(LeftSideBar, null))), /*#__PURE__*/React__default.createElement(PanelGroup, {
    direction: "column",
    panelWidths: [{
      size: surfaceHeight,
      resize: 'dynamic'
    }, {
      size: notesHeight,
      resize: 'stretch'
    }],
    onResizeEnd: onResizeEnd
  }, /*#__PURE__*/React__default.createElement(WaxSurfaceContainer, null, /*#__PURE__*/React__default.createElement(WaxSurfaceScroll, {
    className: "wax-surface-scroll"
  }, /*#__PURE__*/React__default.createElement(EditorContainer, null, editor), /*#__PURE__*/React__default.createElement(CommentsContainer, null, /*#__PURE__*/React__default.createElement(RightArea, {
    area: "main"
  }))), /*#__PURE__*/React__default.createElement(RightSideBar, null)), AreasWithNotes)), /*#__PURE__*/React__default.createElement(waxProsemirrorComponents.InfoArea, null), /*#__PURE__*/React__default.createElement(WaxOverlays, null)));
};

exports.EditoriaLayout = EditoriaLayout;
//# sourceMappingURL=index.js.map
