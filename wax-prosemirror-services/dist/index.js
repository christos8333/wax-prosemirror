'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var waxProsemirrorCore = require('wax-prosemirror-core');
var inversify = require('inversify');
var lodash = require('lodash');
var waxProsemirrorComponents = require('wax-prosemirror-components');
var uuid = require('uuid');
var styled = _interopDefault(require('styled-components'));
var waxProsemirrorSchema = require('wax-prosemirror-schema');
var prosemirrorCommands = require('prosemirror-commands');
var waxProsemirrorUtilities = require('wax-prosemirror-utilities');
var prosemirrorState = require('prosemirror-state');
var prosemirrorView = require('prosemirror-view');
var prosemirrorInputrules = require('prosemirror-inputrules');
var prosemirrorModel = require('prosemirror-model');
var prosemirrorKeymap = require('prosemirror-keymap');
var prosemirrorHistory = require('prosemirror-history');
var prosemirrorSchemaList = require('prosemirror-schema-list');
var prosemirrorTransform = require('prosemirror-transform');
var prosemirrorTables = require('prosemirror-tables');
var waxProsemirrorPlugins = require('wax-prosemirror-plugins');
require('highlight.js/styles/github.css');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Service = /*#__PURE__*/function () {
  function Service() {
    _classCallCheck(this, Service);
  }

  _createClass(Service, [{
    key: "setApp",
    value: function setApp(app) {
      this.app = app;
    }
  }, {
    key: "container",
    get: function get() {
      return this.app.container;
    }
  }, {
    key: "config",
    get: function get() {
      return this.app.config.get("config.".concat(this.name)) || this.app.config;
    }
  }, {
    key: "schema",
    get: function get() {
      return this.app.getSchema();
    }
  }]);

  return Service;
}();

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var ComponentPlugin = function ComponentPlugin(renderArea) {
  return function (layoutProps) {
    var _useInjection = waxProsemirrorCore.useInjection("Layout"),
        instance = _useInjection.instance;

    var components = instance.render(renderArea);
    return components ? components.map(function (_ref, key) {
      var Component = _ref.component,
          componentProps = _ref.componentProps;
      return /*#__PURE__*/React__default.createElement(Component, Object.assign({
        key: "".concat(renderArea, "-").concat(key)
      }, layoutProps, componentProps));
    }) : null;
  };
};

var DefaultLayout = function DefaultLayout(_ref) {
  var editor = _ref.editor;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, editor);
};

var LayoutFactory = (function (Component) {
  return function (props) {
    return /*#__PURE__*/React__default.createElement(Component, props);
  };
});

var _dec, _class, _temp;
var Layout = (_dec = inversify.injectable(), _dec(_class = (_temp = /*#__PURE__*/function () {
  function Layout() {
    _classCallCheck(this, Layout);

    this.components = [];
    this.layoutComponent = LayoutFactory(DefaultLayout);
  }

  _createClass(Layout, [{
    key: "addComponent",
    value: function addComponent(renderArea, component, componentProps) {
      if (!this.components[renderArea]) {
        this.createArea(renderArea);
      }

      var size = this.components[renderArea].size;
      this.components[renderArea].set(size + 1, {
        component: component,
        componentProps: componentProps
      });
      return this;
    }
  }, {
    key: "render",
    value: function render(renderArea) {
      if (!this.components[renderArea]) return null;
      return this.getArray(this.components[renderArea]);
    }
  }, {
    key: "createArea",
    value: function createArea(area) {
      this.components[area] = new Map();
    }
  }, {
    key: "getArray",
    value: function getArray(iterator) {
      var components = [];
      iterator.forEach(function (component) {
        return components.push(component);
      });
      return components;
    }
  }, {
    key: "setLayout",
    value: function setLayout(component) {
      this.layoutComponent = LayoutFactory(component);
    }
  }]);

  return Layout;
}(), _temp)) || _class);

var LayoutService = /*#__PURE__*/function (_Service) {
  _inherits(LayoutService, _Service);

  var _super = _createSuper(LayoutService);

  function LayoutService() {
    var _this;

    _classCallCheck(this, LayoutService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = "LayoutService";
    return _this;
  }

  _createClass(LayoutService, [{
    key: "register",
    value: function register() {
      this.container.bind("Layout").to(Layout).inSingletonScope();
    }
  }]);

  return LayoutService;
}(Service);

var _dec$1, _class$1, _temp$1;
var ToolGroup = (_dec$1 = inversify.injectable(), _dec$1(_class$1 = (_temp$1 = /*#__PURE__*/function () {
  function ToolGroup() {
    _classCallCheck(this, ToolGroup);

    this._config = {};
    this.title = "";
    this._tools = [];
  }

  _createClass(ToolGroup, [{
    key: "setGroupConfig",
    value: function setGroupConfig(config) {
      this._config = config;
    }
  }, {
    key: "excludeIncludeTools",
    value: function excludeIncludeTools() {
      var _this$_config = this._config,
          _this$_config$exclude = _this$_config.exclude,
          exclude = _this$_config$exclude === void 0 ? [] : _this$_config$exclude,
          _this$_config$include = _this$_config.include,
          include = _this$_config$include === void 0 ? [] : _this$_config$include;

      if (include.length > 0) {
        this._tools.map(function (tool) {
          if (include.includes(tool.constructor.name)) {
            tool.displayTool();
          } else {
            tool.hideTool();
          }
        });
      } else {
        this._tools.map(function (tool) {
          if (exclude.includes(tool.constructor.name)) {
            tool.hideTool();
          }
        });
      }
    }
  }, {
    key: "addToolIntoMore",
    value: function addToolIntoMore() {
      var _this$_config$more = this._config.more,
          more = _this$_config$more === void 0 ? [] : _this$_config$more;

      if (more.length > 0) {
        this._tools.map(function (tool) {
          if (more.includes(tool.constructor.name)) {
            tool.hideInToolGroup();
          } else {
            tool.displayInToolGroup();
          }
        });
      }
    }
  }, {
    key: "renderTools",
    value: function renderTools(view) {
      var name = this.constructor.name;
      return /*#__PURE__*/React__default.createElement(waxProsemirrorComponents.ToolGroupComponent, {
        key: uuid.v4(),
        view: view,
        tools: this._tools,
        title: this.title,
        name: name
      });
    }
  }, {
    key: "tools",
    set: function set(tools) {
      this._tools = tools;
    }
  }]);

  return ToolGroup;
}(), _temp$1)) || _class$1);

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
  var data = _taggedTemplateLiteral(["\n  background: #fff;\n  padding: 2px 2px 2px 0;\n  position: relative;\n  background: transparent;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var MainMenu = styled.div(_templateObject());

var MainMenuBar = function MainMenuBar(_ref) {
  var _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      view = _ref.view;
  return /*#__PURE__*/React__default.createElement(MainMenu, {
    key: "MainMenu"
  }, lodash.map(items, function (item) {
    return item.renderTools(view);
  }));
};

var _dec$2, _class$2, _temp$2;
var Menu = (_dec$2 = inversify.injectable(), _dec$2(_class$2 = (_temp$2 = /*#__PURE__*/function () {
  function Menu(config, createTools) {
    _classCallCheck(this, Menu);

    this.toolGroups = [];
    this.config = {};
    this.name = '';
    this.name = config.name;
    this.config = config;
    this.toolGroups = createTools(this.config.toolGroups);
    this.excludeIncludeTools();
    this.addToolIntoMore();
  }

  _createClass(Menu, [{
    key: "excludeIncludeTools",
    value: function excludeIncludeTools() {
      this.toolGroups.forEach(function (toolGroup) {
        if (toolGroup instanceof ToolGroup) {
          toolGroup.excludeIncludeTools();
        }
      });
    }
  }, {
    key: "addToolIntoMore",
    value: function addToolIntoMore() {
      this.toolGroups.forEach(function (toolGroup) {
        if (toolGroup instanceof ToolGroup) {
          toolGroup.addToolIntoMore();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return function () {
        var _useContext = React.useContext(waxProsemirrorCore.WaxContext),
            main = _useContext.view.main,
            activeView = _useContext.activeView;

        var Bar = React.useMemo(function () {
          return /*#__PURE__*/React__default.createElement(MainMenuBar, {
            items: _this.toolGroups,
            view: activeView || {}
          });
        });
        return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, Bar);
      };
    }
  }]);

  return Menu;
}(), _temp$2)) || _class$2);

var _dec$3, _class$3, _temp$3;
var MenuCollection = (_dec$3 = inversify.injectable(), _dec$3(_class$3 = (_temp$3 = /*#__PURE__*/function () {
  function MenuCollection(menus) {
    _classCallCheck(this, MenuCollection);

    this.menus = [];
    this.menus = menus;
  }

  MenuCollection = inversify.multiInject('Menu')(MenuCollection, undefined, 0) || MenuCollection;

  _createClass(MenuCollection, [{
    key: "getMenu",
    value: function getMenu(name) {
      return this.menus.find(function (menu) {
        return menu.name === name;
      });
    }
  }]);

  return MenuCollection;
}(), _temp$3)) || _class$3);

var MenuService = /*#__PURE__*/function (_Service) {
  _inherits(MenuService, _Service);

  var _super = _createSuper(MenuService);

  function MenuService() {
    var _this;

    _classCallCheck(this, MenuService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = 'MenuService';
    return _this;
  }

  _createClass(MenuService, [{
    key: "boot",
    value: function boot() {
      var _this$container$get = this.container.get('MenuCollection'),
          menus = _this$container$get.menus;

      var layout = this.container.get('Layout');
      menus.forEach(function (menu) {
        layout.addComponent(menu.config.templateArea, menu.render());
      });
    }
  }, {
    key: "register",
    value: function register() {
      var _this2 = this;

      /* create Menu Factory */
      this.config.map(function (conf) {
        _this2.container.bind('Menu').toFactory(function (context) {
          return new Menu(conf, context.container.get('createTools'));
        });
      });
      /*create MenuCollection of Menus */

      this.container.bind('MenuCollection').to(MenuCollection).inSingletonScope();
      /* create factory of tools */

      this.container.bind('createTools').toFactory(function (context) {
        return function (configTools) {
          var tools = [];
          configTools.forEach(function (tool) {
            try {
              var tl = {};

              if (lodash.isPlainObject(tool)) {
                tl = context.container.get(tool.name);
                tl.setGroupConfig(tool);
              } else if (lodash.isFunction(tool)) {
                tl = context.container.get(tool());
              } else {
                tl = context.container.get(tool);
              }

              tools.push(tl);
            } catch (error) {
              throw Error("Could not load Service ".concat(tool.name, ". Please configure service through config"));
            }
          });
          return tools;
        };
      });
    }
  }]);

  return MenuService;
}(Service);

var _dec$4, _class$4, _temp$4;
var Tools = (_dec$4 = inversify.injectable(), _dec$4(_class$4 = (_temp$4 = /*#__PURE__*/function () {
  function Tools(config, pmplugins) {
    _classCallCheck(this, Tools);

    this.title = 'title';
    this.content = 'content';
    this._isDisplayed = true;
    this._isHiddenInToolGroup = false;
    this.onlyOnMain = false;
    this.config = {};
    this.pmplugins = {};
    this.config = config;
    this.pmplugins = pmplugins;
  }

  Tools = inversify.inject('PmPlugins')(Tools, undefined, 1) || Tools;
  Tools = inversify.inject('Config')(Tools, undefined, 0) || Tools;

  _createClass(Tools, [{
    key: "select",
    value: function select() {
      return function () {
        return true;
      };
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        title: this.title,
        content: this.content,
        active: this.active,
        run: this.run,
        enable: this.enable,
        select: this.select,
        onlyOnMain: this.onlyOnMain
      };
    }
  }, {
    key: "renderTool",
    value: function renderTool(view) {
      if (lodash.isEmpty(view)) return null;
      return this._isDisplayed ? /*#__PURE__*/React__default.createElement(waxProsemirrorComponents.Button, {
        key: uuid.v4(),
        item: this.toJSON(),
        view: view
      }) : null;
    }
  }, {
    key: "displayTool",
    value: function displayTool() {
      this._isDisplayed = true;
    }
  }, {
    key: "hideTool",
    value: function hideTool() {
      this._isDisplayed = false;
    }
  }, {
    key: "isDisplayed",
    value: function isDisplayed() {
      return this._isDisplayed;
    }
  }, {
    key: "displayInToolGroup",
    value: function displayInToolGroup() {
      this._isHiddenInToolGroup = false;
    }
  }, {
    key: "hideInToolGroup",
    value: function hideInToolGroup() {
      this._isHiddenInToolGroup = true;
    }
  }, {
    key: "isIntoMoreSection",
    value: function isIntoMoreSection() {
      return this._isHiddenInToolGroup;
    }
  }, {
    key: "run",
    get: function get() {
      return true;
    }
  }, {
    key: "enable",
    get: function get() {
      return function () {
        return true;
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function () {
        return false;
      };
    }
  }]);

  return Tools;
}(), _temp$4)) || _class$4);

var _dec$5, _class$5, _temp$5;
var LinkTool = (_dec$5 = inversify.injectable(), _dec$5(_class$5 = (_temp$5 = /*#__PURE__*/function (_Tools) {
  _inherits(LinkTool, _Tools);

  var _super = _createSuper(LinkTool);

  function LinkTool() {
    var _this;

    _classCallCheck(this, LinkTool);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = "Add or remove link";
    _this.content = waxProsemirrorComponents.icons.link;
    return _this;
  }

  _createClass(LinkTool, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        if (waxProsemirrorUtilities.Commands.markActive(state.config.schema.marks.link)(state)) {
          prosemirrorCommands.toggleMark(state.config.schema.marks.link)(state, dispatch);
          return true;
        }

        waxProsemirrorUtilities.Commands.createLink(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.isOnSameTextBlock(state);
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.markActive(state.config.schema.marks.link)(state);
      };
    }
  }]);

  return LinkTool;
}(Tools), _temp$5)) || _class$5);

var LinkService = /*#__PURE__*/function (_Service) {
  _inherits(LinkService, _Service);

  var _super = _createSuper(LinkService);

  function LinkService() {
    var _this;

    _classCallCheck(this, LinkService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = 'LinkService';
    return _this;
  }

  _createClass(LinkService, [{
    key: "boot",
    value: function boot() {
      var createOverlay = this.container.get('CreateOverlay');
      createOverlay(waxProsemirrorComponents.LinkComponent, {}, {
        markType: 'link',
        followCursor: false,
        selection: false
      });
    }
  }, {
    key: "register",
    value: function register() {
      this.container.bind('Link').to(LinkTool);
      var createMark = this.container.get('CreateMark');
      createMark({
        link: waxProsemirrorSchema.linkMark
      }, {
        toWaxSchema: true
      });
    } // dependencies = [new OverlayService()];

  }]);

  return LinkService;
}(Service);

var placeholderPlugin = (function (key) {
  return new prosemirrorState.Plugin({
    key: new prosemirrorState.PluginKey(key),
    state: {
      init: function init() {
        return prosemirrorView.DecorationSet.empty;
      },
      apply: function apply(tr, set) {
        // Adjust decoration positions to changes made by the transaction
        set = set.map(tr.mapping, tr.doc); // See if the transaction adds or removes any placeholders

        var action = tr.getMeta(this);

        if (action && action.add) {
          var widget = document.createElement("placeholder");
          var deco = prosemirrorView.Decoration.widget(action.add.pos, widget, {
            id: action.add.id
          });
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(set.find(null, null, function (spec) {
            return spec.id === action.remove.id;
          }));
        }

        return set;
      }
    },
    props: {
      decorations: function decorations(state) {
        return this.getState(state);
      }
    }
  });
});

var PLUGIN_KEY = "imagePlaceHolder";

var PlaceholderService = /*#__PURE__*/function (_Service) {
  _inherits(PlaceholderService, _Service);

  var _super = _createSuper(PlaceholderService);

  function PlaceholderService() {
    var _this;

    _classCallCheck(this, PlaceholderService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = "PlaceholderService";
    return _this;
  }

  _createClass(PlaceholderService, [{
    key: "boot",
    value: function boot() {
      this.app.PmPlugins.add(PLUGIN_KEY, placeholderPlugin(PLUGIN_KEY));
    }
  }]);

  return PlaceholderService;
}(Service);

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

var defaultOverlay = {
  left: null,
  top: null,
  from: null,
  to: null,
  mark: null
};
var usePosition = (function (options) {
  var _useContext = React.useContext(waxProsemirrorCore.WaxContext),
      main = _useContext.view.main,
      activeView = _useContext.activeView;

  var _useState = React.useState(_objectSpread2({
    position: "absolute"
  }, defaultOverlay)),
      _useState2 = _slicedToArray(_useState, 2),
      position = _useState2[0],
      setPosition = _useState2[1];

  var mark = {};
  /* Sets Default position at the end of the annotation. You
  can overwrite the default position in your component.
  Check: wax-prosemirror-components/src/components/comments/CommentBubbleComponent.js
  for reposition the create new comment component.
  */

  var calculatePosition = function calculatePosition(activeView, from, to) {
    var WaxSurface = activeView.dom.getBoundingClientRect();
    var start = activeView.coordsAtPos(from);
    var end = activeView.coordsAtPos(to);
    var left = end.left;
    var top = end.top + 20;
    return {
      top: top,
      left: left
    };
  };

  var displayOnSelection = function displayOnSelection(activeView, options) {
    var selection = activeView.state.selection;
    var from = selection.from,
        to = selection.to;
    if (from === to) return defaultOverlay;

    var _calculatePosition = calculatePosition(activeView, from, to),
        left = _calculatePosition.left,
        top = _calculatePosition.top;

    return {
      left: left,
      top: top,
      from: from,
      to: to,
      selection: selection
    };
  };

  var displayOnMark = function displayOnMark(activeView, options) {
    var markType = options.markType,
        followCursor = options.followCursor;
    var PMmark = activeView.state.schema.marks[markType];
    mark = waxProsemirrorUtilities.DocumentHelpers.getSelectionMark(activeView.state, PMmark);
    if (!lodash.isObject(mark)) return defaultOverlay;

    var _ref = followCursor ? activeView.state.selection : mark,
        from = _ref.from,
        to = _ref.to;

    var _calculatePosition2 = calculatePosition(activeView, from, to),
        left = _calculatePosition2.left,
        top = _calculatePosition2.top;

    return {
      left: left,
      top: top,
      from: from,
      to: to,
      mark: mark
    };
  };

  var updatePosition = React.useCallback(function () {
    if (Object.keys(activeView).length === 0) return defaultOverlay;
    var markType = options.markType,
        selection = options.selection;
    if (selection) return displayOnSelection(activeView);
    return displayOnMark(activeView, options);
  });
  React.useLayoutEffect(function () {
    setPosition(_objectSpread2({
      position: "absolute"
    }, updatePosition(options.followCursor)));
  }, [JSON.stringify(updatePosition(options.followCursor))]);
  return [position, setPosition, mark];
});

var OverlayComponent = (function (Component, markType) {
  return function (props) {
    var _usePosition = usePosition(markType),
        _usePosition2 = _slicedToArray(_usePosition, 3),
        position = _usePosition2[0],
        setPosition = _usePosition2[1],
        mark = _usePosition2[2];

    var component = React.useMemo(function () {
      return /*#__PURE__*/React__default.createElement(Component, Object.assign({
        setPosition: setPosition,
        mark: mark,
        position: position
      }, props));
    }, [JSON.stringify(mark), position]);
    var visible = position.left ? true : false;
    return /*#__PURE__*/React__default.createElement(waxProsemirrorComponents.Overlay, {
      position: position
    }, visible && component);
  };
});

var OverlayService = /*#__PURE__*/function (_Service) {
  _inherits(OverlayService, _Service);

  var _super = _createSuper(OverlayService);

  function OverlayService() {
    _classCallCheck(this, OverlayService);

    return _super.apply(this, arguments);
  }

  _createClass(OverlayService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("CreateOverlay").toFactory(function (context) {
        return function (Component, componentProps, options) {
          var layout = context.container.get("Layout");
          layout.addComponent("waxOverlays", OverlayComponent(Component, options), componentProps);
        };
      });
    }
  }]);

  return OverlayService;
}(Service);

var findPlaceholder = function findPlaceholder(state, id, placeholderPlugin) {
  var decos = placeholderPlugin.getState(state);
  var found = decos.find(null, null, function (spec) {
    return spec.id === id;
  });
  return found.length ? found[0].from : null;
};

var fileUpload = (function (view, fileUpload, placeholderPlugin) {
  return function (file) {
    var state = view.state; // A fresh object to act as the ID for this upload

    var id = {}; // Replace the selection with a placeholder

    var tr = state.tr;
    if (!tr.selection.empty) tr.deleteSelection();
    tr.setMeta(placeholderPlugin, {
      add: {
        id: id,
        pos: tr.selection.from
      }
    });
    view.dispatch(tr);
    fileUpload(file).then(function (url) {
      var pos = findPlaceholder(view.state, id, placeholderPlugin); // If the content around the placeholder has been deleted, drop
      // the image

      if (pos == null) {
        return;
      } // Otherwise, insert it at the placeholder's position, and remove
      // the placeholder


      view.dispatch(state.tr.replaceWith(pos, pos, view.state.schema.nodes.image.create({
        src: url
      })).setMeta(placeholderPlugin, {
        remove: {
          id: id
        }
      }));
    }, function () {
      // On failure, just clean up the placeholder
      view.dispatch(tr.setMeta(placeholderPlugin, {
        remove: {
          id: id
        }
      }));
    });
  };
});

var _dec$6, _class$6, _temp$6;
var Image = (_dec$6 = inversify.injectable(), _dec$6(_class$6 = (_temp$6 = /*#__PURE__*/function (_Tools) {
  _inherits(Image, _Tools);

  var _super = _createSuper(Image);

  function Image() {
    var _this;

    _classCallCheck(this, Image);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Insert image';
    _this.content = waxProsemirrorComponents.icons.image;

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(Image, [{
    key: "renderTool",
    value: function renderTool(view) {
      if (lodash.isEmpty(view)) return null;
      var upload = fileUpload(view, this.config.get('fileUpload'), this.pmplugins.get('imagePlaceHolder'));
      return this._isDisplayed ? /*#__PURE__*/React__default.createElement(waxProsemirrorComponents.ImageUpload, {
        key: uuid.v4(),
        item: this.toJSON(),
        fileUpload: upload,
        view: view
      }) : null;
    }
  }, {
    key: "run",
    get: function get() {
      return function () {
        return true;
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.canInsert(state.config.schema.nodes.image)(state);
      };
    }
  }]);

  return Image;
}(Tools), _temp$6)) || _class$6);

var ImageService = /*#__PURE__*/function (_Service) {
  _inherits(ImageService, _Service);

  var _super = _createSuper(ImageService);

  function ImageService() {
    var _this;

    _classCallCheck(this, ImageService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = 'ImageService';
    return _this;
  }

  _createClass(ImageService, [{
    key: "register",
    value: function register() {
      this.container.bind('Image').to(Image);
      var createNode = this.container.get('CreateNode');
      createNode({
        image: waxProsemirrorSchema.imageNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return ImageService;
}(Service);

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

var _dec$7, _class$7;
var Rules = (_dec$7 = inversify.injectable(), _dec$7(_class$7 = /*#__PURE__*/function () {
  function Rules(plugins, schema) {
    _classCallCheck(this, Rules);

    this.PmPlugins = plugins;
    this.schema = schema;
    this.extendedRules = this.allRules();
  }

  _createClass(Rules, [{
    key: "addRule",
    value: function addRule(rules) {
      var _this$extendedRules;

      (_this$extendedRules = this.extendedRules).push.apply(_this$extendedRules, _toConsumableArray(rules));
    }
  }, {
    key: "createRules",
    value: function createRules() {
      var rulesCreated = prosemirrorInputrules.inputRules({
        rules: this.extendedRules
      });
      this.PmPlugins.add("rules", rulesCreated);
    }
  }, {
    key: "allRules",
    value: function allRules() {
      return [].concat(_toConsumableArray(prosemirrorInputrules.smartQuotes), [// > blockquote
      prosemirrorInputrules.wrappingInputRule(/^\s*>\s$/, this.schema.nodes.blockquote), // 1. ordered list
      prosemirrorInputrules.wrappingInputRule(/^(\d+)\.\s$/, this.schema.nodes.orderedlist, function (match) {
        return {
          order: +match[1]
        };
      }, function (match, node) {
        return node.childCount + node.attrs.order === +match[1];
      }), // * bullet list
      prosemirrorInputrules.wrappingInputRule(/^\s*([-+*])\s$/, this.schema.nodes.bulletlist), // ``` code block
      // textblockTypeInputRule(/^```$/, this.schema.nodes.code_block),
      // # heading
      prosemirrorInputrules.textblockTypeInputRule(new RegExp("^(#{1,6})\\s$"), this.schema.nodes.heading, function (match) {
        return {
          level: match[1].length
        };
      })]);
    }
  }]);

  return Rules;
}()) || _class$7);

var RulesService = /*#__PURE__*/function (_Service) {
  _inherits(RulesService, _Service);

  var _super = _createSuper(RulesService);

  function RulesService() {
    var _this;

    _classCallCheck(this, RulesService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = 'RulesService';
    return _this;
  }

  _createClass(RulesService, [{
    key: "boot",
    value: function boot() {
      var configRules = this.config;
      var rules = this.container.get('Rules');
      rules.addRule(configRules);
      rules.createRules();
    }
  }, {
    key: "register",
    value: function register() {
      var _this2 = this;

      var PmPlugins = this.app.PmPlugins;
      this.container.bind('Rules').toDynamicValue(function () {
        var schema = _this2.app.schema.schema;
        return new Rules(PmPlugins, schema);
      }).inSingletonScope();
    }
  }]);

  return RulesService;
}(Service);

var DefaultSchema = {
  nodes: {
    doc: {
      content: "block+"
    },
    text: {
      group: "inline"
    },
    hard_break: {
      inline: true,
      group: "inline",
      selectable: false,
      parseDOM: [{
        tag: "br"
      }],
      toDOM: function toDOM() {
        return ["br"];
      }
    },
    paragraph: {
      group: "block",
      content: "inline*",
      attrs: {
        id: {
          "default": ""
        },
        "class": {
          "default": "paragraph"
        },
        track: {
          "default": []
        },
        group: {
          "default": ""
        }
      },
      parseDOM: [{
        tag: "p.paragraph",
        getAttrs: function getAttrs(dom) {
          return {
            id: dom.dataset.id,
            "class": dom.getAttribute("class"),
            track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(dom.dataset.track),
            group: dom.dataset.group
          };
        }
      }],
      toDOM: function toDOM(node) {
        var attrs = waxProsemirrorUtilities.SchemaHelpers.blockLevelToDOM(node);
        return ["p", attrs, 0];
      }
    }
  },
  marks: {}
};

var Middleware = /*#__PURE__*/function () {
  function Middleware() {
    _classCallCheck(this, Middleware);

    // Array prototype last
    if (!Array.prototype.last) {
      Array.prototype.last = function () {
        return this[this.length - 1];
      };
    } // Array prototype reduceOneRight


    if (!Array.prototype.reduceOneRight) {
      Array.prototype.reduceOneRight = function () {
        return this.slice(0, -1);
      };
    }
  }

  _createClass(Middleware, [{
    key: "use",
    value: function use(fn) {
      var _this = this;

      this.go = function (stack) {
        return function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return stack.apply(void 0, _toConsumableArray(args.reduceOneRight()).concat([function () {
            var _next = args.last();

            fn.apply(_this, [].concat(_toConsumableArray(args.reduceOneRight()), [_next.bind.apply(_next, [null].concat(_toConsumableArray(args.reduceOneRight())))]));
          }]));
        };
      }(this.go);
    }
  }, {
    key: "go",
    value: function go() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var _next = args.last();

      _next.apply(this, args.reduceOneRight());
    }
  }]);

  return Middleware;
}();

var ParseRule = /*#__PURE__*/function () {
  function ParseRule(_ref) {
    var getAttrs = _ref.getAttrs,
        tag = _ref.tag,
        style = _ref.style;

    _classCallCheck(this, ParseRule);

    this.tag = null;
    this.style = null;
    this.exporter = null;

    this.defaultMiddleware = function (hook, next) {
      next();
    };

    this.tag = tag;
    this.style = style; // if (getAttrs) {

    this.exporter = new Middleware(); // }

    this.addStack(getAttrs);
  }

  _createClass(ParseRule, [{
    key: "addStack",
    value: function addStack(getAttrs) {
      if (getAttrs) {
        this.exporter.use(getAttrs);
      } else {
        this.exporter.use(this.defaultMiddleware);
      }
    }
  }, {
    key: "parseSchema",
    value: function parseSchema(exporter) {
      var rule = {};

      if (this.tag) {
        rule = {
          tag: this.tag
        };
      }

      if (this.style) {
        rule = {
          style: this.style
        };
      }

      if (this.exporter) {
        rule.getAttrs = function (dom) {
          var hooks = {};
          exporter.go({
            dom: dom
          }, function (hook) {
            hooks = hook;
          });
          return lodash.omit(hooks, ["dom"]);
        };
      }

      return rule;
    }
  }, {
    key: "combineRules",
    value: function combineRules() {
      var exporter = this.exporter;
      return this.parseSchema(exporter);
    }
  }]);

  return ParseRule;
}();

var Node = /*#__PURE__*/function () {
  function Node(name) {
    _classCallCheck(this, Node);

    this.name = "";
    this.importer = {};
    this.atom = false;
    this.inline = false;
    this.isolating = false;
    this.draggable = false;
    this.group = "";
    this.content = "";
    this._attrs = {};
    this._parseRules = [];
    this.name = name;
    this.importer = new Middleware();
  }

  _createClass(Node, [{
    key: "fromJSON",
    value: function fromJSON(config) {
      for (var key in config) {
        var value = config[key];
        this[key] = value;
      }
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var importer = this.importer;
      return {
        atom: this.atom,
        inline: this.inline,
        group: this.group,
        content: this.content,
        isolating: this.isolating,
        draggable: this.draggable,
        attrs: this._attrs,
        parseDOM: this._parseRules.map(function (rule) {
          return rule.combineRules();
        }),
        toDOM: function toDOM(node) {
          var hooks = {};
          importer.go({
            node: node
          }, function (hook) {
            hooks = hook;
          });
          return hooks.value;
        }
      };
    }
  }, {
    key: "toDOM",
    set: function set(value) {
      this.importer.use(value);
    }
  }, {
    key: "attrs",
    set: function set(value) {
      Object.assign(this._attrs, value);
    }
  }, {
    key: "parseDOM",
    set: function set(parseDom) {
      var _this = this;

      var values = parseDom;

      if (lodash.isPlainObject(parseDom)) {
        values = [parseDom];
      }

      values.forEach(function (value) {
        var parseRule = _this._parseRules.find(function (parseRule) {
          if (value.tag) return parseRule.tag === value.tag;
          if (value.style) return parseRule.style === value.style;
          return false;
        });

        if (!parseRule) {
          parseRule = new ParseRule(value);

          _this._parseRules.push(parseRule);
        }

        parseRule.addStack(value.getAttrs);
      });
    }
  }]);

  return Node;
}();

var Mark = /*#__PURE__*/function () {
  function Mark(name) {
    _classCallCheck(this, Mark);

    this.name = "";
    this.importer = {};
    this.inline = false;
    this.group = "";
    this.content = "";
    this.draggable = false;
    this.inclusive = true;
    this._attrs = {};
    this._parseRules = [];
    this.name = name;
    this.importer = new Middleware();
  }

  _createClass(Mark, [{
    key: "fromJSON",
    value: function fromJSON(config) {
      for (var key in config) {
        var value = config[key];
        this[key] = value;
      }
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var importer = this.importer;
      return {
        inline: this.inline,
        group: this.group,
        content: this.content,
        draggable: this.draggable,
        inclusive: this.inclusive,
        attrs: this._attrs,
        parseDOM: this._parseRules.map(function (rule) {
          return rule.combineRules();
        }),
        toDOM: function toDOM(node) {
          var hooks = {};
          importer.go({
            node: node
          }, function (hook) {
            hooks = hook;
          });
          return hooks.value;
        }
      };
    }
  }, {
    key: "toDOM",
    set: function set(value) {
      this.importer.use(value);
    }
  }, {
    key: "attrs",
    set: function set(value) {
      Object.assign(this._attrs, value);
    }
  }, {
    key: "parseDOM",
    set: function set(parseDom) {
      var _this = this;

      var values = parseDom;

      if (lodash.isPlainObject(parseDom)) {
        values = [parseDom];
      }

      values.forEach(function (value) {
        var parseRule = _this._parseRules.find(function (parseRule) {
          if (value.tag) return parseRule.tag === value.tag;
          if (value.style) return parseRule.style === value.style;
          return false;
        });

        if (!parseRule) {
          parseRule = new ParseRule(value);

          _this._parseRules.push(parseRule);
        }

        parseRule.addStack(value.getAttrs);
      });
    }
  }]);

  return Mark;
}();

var _dec$8, _class$8, _temp$7;
var Schema = (_dec$8 = inversify.injectable(), _dec$8(_class$8 = (_temp$7 = /*#__PURE__*/function () {
  function Schema() {
    _classCallCheck(this, Schema);

    this._nodes = {};
    this._marks = {};
    this.prosemirrorSchema = {
      nodes: {},
      marks: {}
    };
    this.schema = null;
  }

  _createClass(Schema, [{
    key: "addNode",
    value: function addNode(schemaConfig) {
      var name = Object.keys(schemaConfig)[0];
      var config = schemaConfig[name];
      var node = new Node(name);
      var nd = {};

      if (nd = this.has(node)) {
        nd.fromJSON(config);
        return nd;
      } else {
        node.fromJSON(config);
        this.addSchema(node);
        return _defineProperty({}, name, node);
      }
    }
  }, {
    key: "addMark",
    value: function addMark(schemaConfig) {
      var name = Object.keys(schemaConfig)[0];
      var config = schemaConfig[name];
      var mark = new Mark(name);
      var mr = {};

      if (mr = this.has(mark)) {
        mr.fromJSON(config);
        return mr;
      } else {
        mark.fromJSON(config);
        this.addSchema(mark);
        return _defineProperty({}, name, mark);
      }
    }
  }, {
    key: "has",
    value: function has(instance) {
      if (instance instanceof Node) {
        return this._nodes[instance.name] ? this._nodes[instance.name] : false;
      }

      if (instance instanceof Mark) {
        return this._marks[instance.name] ? this._marks[instance.name] : false;
      }
    }
  }, {
    key: "addSchema",
    value: function addSchema(instance) {
      if (instance instanceof Node) {
        return this._nodes[instance.name] ? this._nodes[instance.name] : Object.assign(this._nodes, _defineProperty({}, instance.name, instance));
      }

      if (instance instanceof Mark) {
        return this._marks[instance.name] ? this._marks[instance.name] : Object.assign(this._marks, _defineProperty({}, instance.name, instance));
      }
    }
  }, {
    key: "addProsemirrorSchema",
    value: function addProsemirrorSchema(nodes, type) {
      this.prosemirrorSchema[type] = Object.assign(this.prosemirrorSchema[type], nodes);
    }
  }, {
    key: "getSchema",
    value: function getSchema() {
      var nodes = DefaultSchema.nodes;
      var marks = {};

      for (var index in this._nodes) {
        nodes[index] = this._nodes[index].toJSON();
      }

      for (var _index in this._marks) {
        marks[_index] = this._marks[_index].toJSON();
      }

      this.schema = new prosemirrorModel.Schema({
        nodes: Object.assign(nodes, this.prosemirrorSchema.nodes),
        marks: Object.assign(marks, this.prosemirrorSchema.marks)
      });
      return this.schema;
    }
  }]);

  return Schema;
}(), _temp$7)) || _class$8);

var SchemaService = /*#__PURE__*/function (_Service) {
  _inherits(SchemaService, _Service);

  var _super = _createSuper(SchemaService);

  function SchemaService() {
    var _this;

    _classCallCheck(this, SchemaService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = "SchemaService";
    return _this;
  }

  _createClass(SchemaService, [{
    key: "register",
    value: function register() {
      this.container.bind("Schema").to(Schema).inSingletonScope();
      this.container.bind("CreateNode").toFactory(function (context) {
        return function (schema) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            toWaxSchema: false
          };
          var schemaInstance = context.container.get("Schema");

          if (options.toWaxSchema) {
            schemaInstance.addNode(schema);
          } else {
            schemaInstance.addProsemirrorSchema(schema, "nodes");
          }
        };
      });
      this.container.bind("CreateMark").toFactory(function (context) {
        return function (schema) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            toWaxSchema: false
          };
          var schemaInstance = context.container.get("Schema");

          if (options.toWaxSchema) {
            schemaInstance.addMark(schema);
          } else {
            schemaInstance.addProsemirrorSchema(schema, "marks");
          }
        };
      });
    }
  }]);

  return SchemaService;
}(Service);

var _dec$9, _class$9;
var backSpace = prosemirrorCommands.chainCommands(prosemirrorCommands.deleteSelection, prosemirrorCommands.joinBackward, prosemirrorCommands.selectNodeBackward);

var backSpaceShortCut = function backSpaceShortCut(state, dispatch, view) {
  return backSpace(state, function (tr) {
    return dispatch(tr.setMeta('inputType', 'deleteContentBackward'));
  }, view);
};

var undoShortCut = function undoShortCut(state, dispatch, view) {
  return prosemirrorHistory.undo(state, function (tr) {
    return dispatch(tr.setMeta('inputType', 'historyUndo'));
  }, view);
};

var redoShortCut = function redoShortCut(state, dispatch, view) {
  return prosemirrorHistory.redo(state, function (tr) {
    return dispatch(tr.setMeta('inputType', 'historyRedo'));
  }, view);
};

var ShortCuts = (_dec$9 = inversify.injectable(), _dec$9(_class$9 = /*#__PURE__*/function () {
  function ShortCuts(plugins, schema) {
    _classCallCheck(this, ShortCuts);

    this.insertBreak = this.insertBreak.bind(this);
    this.insertRule = this.insertRule.bind(this);
    this.PmPlugins = plugins;
    this.schema = schema;
    this.keys = this.getKeys();
  }

  _createClass(ShortCuts, [{
    key: "insertBreak",
    value: function insertBreak(state, dispatch) {
      var br = this.schema.nodes.hard_break.create();
      dispatch(state.tr.replaceSelectionWith(br).scrollIntoView());
      return true;
    }
  }, {
    key: "insertRule",
    value: function insertRule(state, dispatch) {
      var hr = this.schema.nodes.horizontal_rule.create();
      dispatch(state.tr.replaceSelectionWith(hr).scrollIntoView());
      return true;
    }
  }, {
    key: "createShortCuts",
    value: function createShortCuts() {
      var shortCuts = prosemirrorKeymap.keymap(this.createKeyBindings());
      this.PmPlugins.add('shortcuts', shortCuts);
    }
  }, {
    key: "addShortCut",
    value: function addShortCut(shortcut) {
      Object.assign(this.keys, shortcut);
      this.createShortCuts();
    }
  }, {
    key: "createKeyBindings",
    value: function createKeyBindings() {
      var _this = this;

      Object.keys(prosemirrorCommands.baseKeymap).forEach(function (key) {
        if (_this.keys[key]) {
          _this.keys[key] = prosemirrorCommands.chainCommands(_this.keys[key], prosemirrorCommands.baseKeymap[key]);
        } else {
          _this.keys[key] = prosemirrorCommands.baseKeymap[key];
        }
      });
      return this.keys;
    }
  }, {
    key: "getKeys",
    value: function getKeys() {
      return {
        'Mod-z': undoShortCut,
        'Shift-Mod-z': redoShortCut,
        Backspace: backSpaceShortCut,
        'Mod-y': redoShortCut,
        Escape: prosemirrorCommands.selectParentNode,
        'Mod-Enter': prosemirrorCommands.chainCommands(prosemirrorCommands.exitCode, this.insertBreak),
        'Shift-Enter': prosemirrorCommands.chainCommands(prosemirrorCommands.exitCode, this.insertBreak),
        'Ctrl-Enter': prosemirrorCommands.chainCommands(prosemirrorCommands.exitCode, this.insertBreak),
        'Mod-_': this.insertRule,
        'Mod-[': prosemirrorSchemaList.liftListItem(this.schema.nodes.list_item),
        'Mod-]': prosemirrorSchemaList.sinkListItem(this.schema.nodes.list_item),
        Enter: prosemirrorSchemaList.splitListItem(this.schema.nodes.list_item),
        'Shift-Ctrl-8': prosemirrorSchemaList.wrapInList(this.schema.nodes.bulletlist),
        'Shift-Ctrl-9': prosemirrorSchemaList.wrapInList(this.schema.nodes.orderedlist)
      };
    }
  }]);

  return ShortCuts;
}()) || _class$9);

var ShortCutsService = /*#__PURE__*/function (_Service) {
  _inherits(ShortCutsService, _Service);

  var _super = _createSuper(ShortCutsService);

  function ShortCutsService() {
    var _this;

    _classCallCheck(this, ShortCutsService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = "ShortCutsService";
    return _this;
  }

  _createClass(ShortCutsService, [{
    key: "boot",
    value: function boot() {
      var shortCuts = this.container.get("ShortCuts");
      shortCuts.createShortCuts();
    }
  }, {
    key: "register",
    value: function register() {
      var _this2 = this;

      var PmPlugins = this.app.PmPlugins;
      this.container.bind("ShortCuts").toDynamicValue(function () {
        var schema = _this2.app.schema.schema;
        return new ShortCuts(PmPlugins, schema);
      }).inSingletonScope();
    }
  }]);

  return ShortCutsService;
}(Service);

var _dec$a, _class$a, _temp$8;
var EnableTrackChange = (_dec$a = inversify.injectable(), _dec$a(_class$a = (_temp$8 = /*#__PURE__*/function (_Tools) {
  _inherits(EnableTrackChange, _Tools);

  var _super = _createSuper(EnableTrackChange);

  function EnableTrackChange() {
    var _this;

    _classCallCheck(this, EnableTrackChange);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Toggle Track Changes';
    _this.content = 'track changes';
    return _this;
  }

  _createClass(EnableTrackChange, [{
    key: "renderTool",
    value: function renderTool(view) {
      if (lodash.isEmpty(view)) return null;
      return this._isDisplayed ? /*#__PURE__*/React__default.createElement(waxProsemirrorComponents.TrackChangeEnable, {
        key: uuid.v4(),
        view: view,
        item: this.toJSON(),
        enabled: this.config.enabled
      }) : null;
    }
  }, {
    key: "run",
    get: function get() {
      var _this2 = this;

      return function (state) {
        _this2.config.enabled = !_this2.config.enabled;
        return true;
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return true;
      };
    }
  }]);

  return EnableTrackChange;
}(Tools), _temp$8)) || _class$a);

var EnableTrackChangeService = /*#__PURE__*/function (_Service) {
  _inherits(EnableTrackChangeService, _Service);

  var _super = _createSuper(EnableTrackChangeService);

  function EnableTrackChangeService() {
    var _this;

    _classCallCheck(this, EnableTrackChangeService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = 'EnableTrackChangeService';
    return _this;
  }

  _createClass(EnableTrackChangeService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      var _this2 = this;

      this.container.bind('EnableTrackChange').toDynamicValue(function () {
        return new EnableTrackChange(_this2.config);
      });
    }
  }]);

  return EnableTrackChangeService;
}(Service);

var removeNode = function removeNode(tr, node, nodePos, map) {
  var newNodePos = map.map(nodePos);
  var selectionBefore = prosemirrorState.Selection.findFrom(tr.doc.resolve(newNodePos), -1);
  var start = selectionBefore.$anchor.pos;
  var end = newNodePos + 1;
  var delStep = prosemirrorTransform.replaceStep(tr.doc, start, end);
  tr.step(delStep);
  var stepMap = delStep.getMap();
  map.appendMap(stepMap);
};

var _dec$b, _class$b, _temp$9;
var AcceptTrackChange = (_dec$b = inversify.injectable(), _dec$b(_class$b = (_temp$9 = /*#__PURE__*/function (_Tools) {
  _inherits(AcceptTrackChange, _Tools);

  var _super = _createSuper(AcceptTrackChange);

  function AcceptTrackChange() {
    var _this;

    _classCallCheck(this, AcceptTrackChange);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Accept Changes';
    _this.content = 'Accept';

    _this.select = function (state, activeViewId) {
      var _state$selection = state.selection,
          from = _state$selection.from,
          to = _state$selection.to;
      if (from === to && activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(AcceptTrackChange, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        var tr = state.tr,
            _state$selection2 = state.selection,
            from = _state$selection2.from,
            to = _state$selection2.to;
        tr.setMeta('AcceptReject', true);
        var map = new prosemirrorTransform.Mapping();
        state.doc.nodesBetween(from, to, function (node, pos) {
          if (node.attrs.track && node.attrs.track.find(function (track) {
            return track.type === 'deletion';
          })) {
            removeNode(tr, node, pos, map);
          }

          if (node.marks && node.marks.find(function (mark) {
            return mark.type.name === 'deletion';
          })) {
            var deletionStep = new prosemirrorTransform.ReplaceStep(map.map(Math.max(pos, from)), map.map(Math.min(pos + node.nodeSize, to)), prosemirrorModel.Slice.empty);
            tr.step(deletionStep);
            map.appendMap(deletionStep.getMap());
          } else if (node.attrs.track && node.attrs.track.find(function (track) {
            return track.type === 'insertion';
          })) {
            var track = node.attrs.track.filter(function (track) {
              return track.type !== 'insertion';
            });
            tr.setNodeMarkup(map.map(pos), null, Object.assign(node.attrs.track, {
              track: track
            }), node.marks);
          } else if (node.marks && node.marks.find(function (mark) {
            return mark.type.name === 'insertion';
          })) {
            var insertionMark = node.marks.find(function (mark) {
              return mark.type.name === 'insertion';
            });
            tr.step(new prosemirrorTransform.RemoveMarkStep(map.map(Math.max(pos, from)), map.map(Math.min(pos + node.nodeSize, to)), insertionMark));
          } else if (node.marks && node.marks.find(function (mark) {
            return mark.type.name === 'format_change';
          })) {
            var formatChangeMark = node.marks.find(function (mark) {
              return mark.type.name === 'format_change';
            });
            tr.step(new prosemirrorTransform.RemoveMarkStep(map.map(Math.max(pos, from)), map.map(Math.min(pos + node.nodeSize, to)), formatChangeMark));
          } else if (node.attrs.track && node.attrs.track.find(function (track) {
            return track.type === 'block_change';
          })) {
            var blockChangeTrack = node.attrs.track.find(function (track) {
              return track.type === 'block_change';
            });

            var _track = node.attrs.track.filter(function (track) {
              return track !== blockChangeTrack;
            });

            tr.setNodeMarkup(map.map(pos), null, Object.assign(node.attrs.track, {
              track: _track
            }), node.marks);
          }
        });
        if (tr.steps.length) dispatch(tr);
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function (state) {};
    }
  }]);

  return AcceptTrackChange;
}(Tools), _temp$9)) || _class$b);

var AcceptTrackChangeService = /*#__PURE__*/function (_Service) {
  _inherits(AcceptTrackChangeService, _Service);

  var _super = _createSuper(AcceptTrackChangeService);

  function AcceptTrackChangeService() {
    var _this;

    _classCallCheck(this, AcceptTrackChangeService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = 'AcceptTrackChangeService';
    return _this;
  }

  _createClass(AcceptTrackChangeService, [{
    key: "register",
    // boot() {}
    value: function register() {
      this.container.bind('AcceptTrackChange').to(AcceptTrackChange);
    }
  }]);

  return AcceptTrackChangeService;
}(Service);

var _dec$c, _class$c, _temp$a;
var RejectTrackChange = (_dec$c = inversify.injectable(), _dec$c(_class$c = (_temp$a = /*#__PURE__*/function (_Tools) {
  _inherits(RejectTrackChange, _Tools);

  var _super = _createSuper(RejectTrackChange);

  function RejectTrackChange() {
    var _this;

    _classCallCheck(this, RejectTrackChange);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Reject Changes';
    _this.content = 'Reject';

    _this.select = function (state, activeViewId) {
      var _state$selection = state.selection,
          from = _state$selection.from,
          to = _state$selection.to;
      if (from === to && activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(RejectTrackChange, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        var tr = state.tr,
            _state$selection2 = state.selection,
            from = _state$selection2.from,
            to = _state$selection2.to;
        tr.setMeta('AcceptReject', true);
        var map = new prosemirrorTransform.Mapping();
        state.doc.nodesBetween(from, to, function (node, pos) {
          if (node.marks && node.marks.find(function (mark) {
            return mark.type.name === 'deletion';
          })) {
            var deletionMark = node.marks.find(function (mark) {
              return mark.type.name === 'deletion';
            });
            tr.step(new prosemirrorTransform.RemoveMarkStep(map.map(Math.max(pos, from)), map.map(Math.min(pos + node.nodeSize, to)), deletionMark));
          } else if (node.attrs.track && node.attrs.track.find(function (track) {
            return track.type === 'insertion';
          })) {
            removeNode(tr, node, pos, map);
          } else if (node.marks && node.marks.find(function (mark) {
            return mark.type.name === 'insertion';
          })) {
            var deletionStep = new prosemirrorTransform.ReplaceStep(map.map(Math.max(pos, from)), map.map(Math.min(pos + node.nodeSize, to)), prosemirrorModel.Slice.empty);
            tr.step(deletionStep);
            map.appendMap(deletionStep.getMap());
          } else if (node.marks && node.marks.find(function (mark) {
            return mark.type.name === 'format_change';
          })) {
            var formatChangeMark = node.marks.find(function (mark) {
              return mark.type.name === 'format_change';
            });
            formatChangeMark.attrs.before.forEach(function (oldMark) {
              tr.step(new prosemirrorTransform.AddMarkStep(map.map(Math.max(pos, from)), map.map(Math.min(pos + node.nodeSize, to)), state.schema.marks[oldMark].create()));
            });
            formatChangeMark.attrs.after.forEach(function (newMark) {
              tr.step(new prosemirrorTransform.RemoveMarkStep(map.map(Math.max(pos, from)), map.map(Math.min(pos + node.nodeSize, to)), node.marks.find(function (mark) {
                return mark.type.name === newMark;
              })));
            });
            tr.step(new prosemirrorTransform.RemoveMarkStep(map.map(Math.max(pos, from)), map.map(Math.min(pos + node.nodeSize, to)), formatChangeMark));
          }
        });
        if (tr.steps.length) dispatch(tr);
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function (state) {};
    }
  }]);

  return RejectTrackChange;
}(Tools), _temp$a)) || _class$c);

var RejectTrackChangeService = /*#__PURE__*/function (_Service) {
  _inherits(RejectTrackChangeService, _Service);

  var _super = _createSuper(RejectTrackChangeService);

  function RejectTrackChangeService() {
    var _this;

    _classCallCheck(this, RejectTrackChangeService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = 'RejectTrackChangeService';
    return _this;
  }

  _createClass(RejectTrackChangeService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind('RejectTrackChange').to(RejectTrackChange);
    }
  }]);

  return RejectTrackChangeService;
}(Service);

var TrackChangeServices = [new EnableTrackChangeService(), new AcceptTrackChangeService(), new RejectTrackChangeService()];

var TrackChangeService = /*#__PURE__*/function (_Service) {
  _inherits(TrackChangeService, _Service);

  var _super = _createSuper(TrackChangeService);

  function TrackChangeService() {
    var _this;

    _classCallCheck(this, TrackChangeService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.dependencies = TrackChangeServices;
    return _this;
  }

  _createClass(TrackChangeService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      var createMark = this.container.get('CreateMark');
      var createNode = this.container.get('CreateNode');
      Object.keys(waxProsemirrorSchema.trackChangesMarks).forEach(function (mark) {
        createMark(_defineProperty({}, mark, waxProsemirrorSchema.trackChangesMarks[mark]), {
          toWaxSchema: true
        });
      });
      Object.keys(waxProsemirrorSchema.trackChangesNodes).forEach(function (node) {
        createNode(_defineProperty({}, node, waxProsemirrorSchema.trackChangesNodes[node]), {
          toWaxSchema: true
        });
      });
    }
  }]);

  return TrackChangeService;
}(Service);

var markDeletion = function markDeletion(tr, from, to, user, date, group) {
  var deletionMark = tr.doc.type.schema.marks.deletion.create({
    user: user.userId,
    username: user.username // date

  });
  var deletionMap = new prosemirrorTransform.Mapping();
  tr.doc.nodesBetween(from, to, function (node, pos) {
    if (node.type.name.includes('table')) {
      return;
    }

    if (node.isInline && node.marks.find(function (mark) {
      return mark.type.name === 'insertion' && mark.attrs.user === user.userId;
    })) {
      var removeStep = new prosemirrorTransform.ReplaceStep(deletionMap.map(Math.max(from, pos)), deletionMap.map(Math.min(to, pos + node.nodeSize)), prosemirrorModel.Slice.empty);

      if (!tr.maybeStep(removeStep).failed) {
        deletionMap.appendMap(removeStep.getMap());
      }
    } else if (node.isInline && !node.marks.find(function (mark) {
      return mark.type.name === 'deletion';
    })) {
      tr.addMark(deletionMap.map(Math.max(from, pos)), deletionMap.map(Math.min(to, pos + node.nodeSize)), deletionMark);
    } else if (node.attrs.track && !node.attrs.track.find(function (trackAttr) {
      return trackAttr.type === 'deletion';
    }) && !['bullet_list', 'ordered_list'].includes(node.type.name)) {
      if (node.attrs.track.find(function (trackAttr) {
        return trackAttr.type === 'insertion' && trackAttr.user === user.userId;
      })) {
        var _removeStep;

        if (node.isTextblock && to < pos + node.nodeSize) {
          var selectionBefore = prosemirrorState.Selection.findFrom(tr.doc.resolve(pos), -1);

          if (selectionBefore instanceof prosemirrorState.TextSelection) {
            _removeStep = new prosemirrorTransform.ReplaceStep(deletionMap.map(selectionBefore.$anchor.pos), deletionMap.map(to), prosemirrorModel.Slice.empty);
          }
        } else {
          _removeStep = new prosemirrorTransform.ReplaceStep(deletionMap.map(Math.max(from, pos)), deletionMap.map(Math.min(to, pos + node.nodeSize)), prosemirrorModel.Slice.empty);
        }

        if (!tr.maybeStep(_removeStep).failed) {
          deletionMap.appendMap(_removeStep.getMap());
        }
      }

      var counter = 2;
      node.content.forEach(function (item, i) {
        item.marks.forEach(function (mark) {
          if (mark.type.name === 'deletion') {
            counter += item.nodeSize;
          }
        });
      });

      if (node.content.size === 0 || counter === node.nodeSize) {
        var track = node.attrs.track.slice();
        track.push({
          type: 'deletion',
          user: user.userId,
          username: user.username // date

        });
        tr.setNodeMarkup(deletionMap.map(pos), null, Object.assign(node.attrs.track, {
          track: track
        }), node.marks);
      }
    }
  });
  return deletionMap;
};

var markInsertion = function markInsertion(tr, from, to, user, date, group) {
  tr.removeMark(from, to, tr.doc.type.schema.marks.deletion);
  tr.removeMark(from, to, tr.doc.type.schema.marks.insertion);
  var insertionMark = tr.doc.type.schema.marks.insertion.create({
    user: user.userId,
    username: user.username // date

  });
  tr.addMark(from, to, insertionMark); // Add insertion mark also to block nodes (figures, text blocks) but not table cells/rows and lists.

  tr.doc.nodesBetween(from, to, function (node, pos) {
    if (pos < from || ["bullet_list", "ordered_list"].includes(node.type.name)) {
      return true;
    } else if (node.isInline || ["table_row", "table_cell"].includes(node.type.name)) {
      return false;
    }

    if (node.attrs.track) {
      var track = [];
      track.push({
        type: "insertion",
        user: user.userId,
        username: user.username,
        date: date,
        group: group
      });
      tr.setNodeMarkup(pos, null, Object.assign({}, node.attrs, {
        track: track,
        group: group,
        id: uuid.v4()
      }), node.marks);
    }

    if (node.type.name === "table") {
      // A table was inserted. We don't add track marks to elements inside of it.
      return false;
    }
  });
};

var replaceStep = function replaceStep(state, tr, step, newTr, map, doc, user, date, group) {
  var cellDeleteTr = ["deleteContentBackward", "deleteContentForward"].includes(tr.getMeta("inputType")) && state.selection instanceof prosemirrorTables.CellSelection; // if deletion mark move to the end of deletion

  var deletionMarkSchema = state.schema.marks.deletion;
  var deletionMark = waxProsemirrorUtilities.DocumentHelpers.findMark(state, deletionMarkSchema, false);
  var positionTo = deletionMark ? deletionMark.to : step.to;
  var newStep = !cellDeleteTr ? new prosemirrorTransform.ReplaceStep(positionTo, // We insert all the same steps, but with "from"/"to" both set to "to" in order not to delete content. Mapped as needed.
  positionTo, step.slice, step.structure) : false; // We didn't apply the original step in its original place. We adjust the map accordingly.

  map.appendMap(step.invert(doc).getMap());

  if (newStep) {
    var trTemp = state.apply(newTr).tr;

    if (trTemp.maybeStep(newStep).failed) {
      return;
    }

    var mappedNewStepTo = newStep.getMap().map(newStep.to);
    markInsertion(trTemp, newStep.from, mappedNewStepTo, user, date, group); // We condense it down to a single replace step.

    var condensedStep = new prosemirrorTransform.ReplaceStep(newStep.from, newStep.to, trTemp.doc.slice(newStep.from, mappedNewStepTo));
    newTr.step(condensedStep);
    var mirrorIndex = map.maps.length - 1;
    map.appendMap(condensedStep.getMap(), mirrorIndex);

    if (!newTr.selection.eq(trTemp.selection)) {
      newTr.setSelection(trTemp.selection);
    }
  }

  if (step.from !== step.to) {
    map.appendMap(markDeletion(newTr, step.from, step.to, user));
  }
};

var markWrapping = function markWrapping(tr, pos, oldNode, newNode, user, date, group) {
  var track = oldNode.attrs.track.slice();
  var blockTrack = track.find(function (track) {
    return track.type === 'block_change';
  });

  if (blockTrack) {
    track = track.filter(function (track) {
      return track !== blockTrack;
    });

    if (blockTrack.before.type !== newNode.type.name || blockTrack.before.attrs.level !== newNode.attrs.level) {
      blockTrack = {
        type: 'block_change',
        user: user.userId,
        username: user.username,
        date: date,
        before: blockTrack.before
      };
      track.push(blockTrack);
    }
  } else {
    blockTrack = {
      type: 'block_change',
      user: user.userId,
      username: user.username,
      date: date,
      before: {
        type: oldNode.type.name,
        attrs: oldNode.attrs
      }
    };

    if (blockTrack.before.attrs.id) {
      delete blockTrack.before.attrs.id;
    }

    if (blockTrack.before.attrs.track) {
      delete blockTrack.before.attrs.track;
    }

    track.push(blockTrack);
  }

  tr.setNodeMarkup(pos, null, Object.assign({}, newNode.attrs, {
    track: track,
    group: group,
    id: uuid.v4()
  }));
};

var replaceAroundStep = function replaceAroundStep(state, tr, step, newTr, map, doc, user, date, group) {
  if (step.from === step.gapFrom && step.to === step.gapTo) {
    // wrapped in something
    newTr.step(step);
    var from = step.getMap().map(step.from, -1);
    var to = step.getMap().map(step.gapFrom);
    markInsertion(newTr, from, to, user, date, group);
  } else if (!step.slice.size) {
    // unwrapped from something
    map.appendMap(step.invert(doc).getMap());
    map.appendMap(markDeletion(newTr, step.from, step.gapFrom, user));
  } else if (step.slice.size === 2 && step.gapFrom - step.from === 1 && step.to - step.gapTo === 1) {
    // Replaced one wrapping with another
    newTr.step(step);
    var oldNode = doc.nodeAt(step.from);

    if (oldNode.attrs.track) {
      markWrapping(newTr, step.from, oldNode, step.slice.content.firstChild, user, date, group);
    }
  } else {
    console.log("to fix"); // newTr.step(step);
    // const ranges = [
    //   {
    //     from: step.getMap().map(step.from, -1),
    //     to: step.getMap().map(step.gapFrom)
    //   },
    //   {
    //     from: step.getMap().map(step.gapTo, -1),
    //     to: step.getMap().map(step.to)
    //   }
    // ];
    // ranges.forEach(range =>
    //   doc.nodesBetween(range.from, range.to, (node, pos) => {
    //     if (pos < range.from) {
    //       return true;
    //     }
    //     markInsertion(newTr, range.from, range.to, user, date);
    //   })
    // );
  }
};

var addMarkStep = function addMarkStep(state, tr, step, newTr, map, doc, user, date, group) {
  doc.nodesBetween(step.from, step.to, function (node, pos) {
    if (!node.isInline) {
      return true;
    }

    if (node.marks.find(function (mark) {
      return mark.type.name === 'deletion';
    })) {
      return false;
    }

    newTr.addMark(Math.max(step.from, pos), Math.min(step.to, pos + node.nodeSize), step.mark);

    if (!['comment'].includes(step.mark.type.name) && !node.marks.find(function (mark) {
      return mark.type === step.mark.type;
    })) {
      var formatChangeMark = node.marks.find(function (mark) {
        return mark.type.name === 'format_change';
      });
      var after, before;

      if (formatChangeMark) {
        if (formatChangeMark.attrs.before.includes(step.mark.type.name)) {
          before = formatChangeMark.attrs.before.filter(function (markName) {
            return markName !== step.mark.type.name;
          });
          after = formatChangeMark.attrs.after;
        } else {
          before = formatChangeMark.attrs.before;
          after = formatChangeMark.attrs.after.concat(step.mark.type.name);
        }
      } else {
        before = [];
        after = [step.mark.type.name];
      }

      if (after.length || before.length) {
        // Math.max(step.from, pos),
        // Math.min(step.to, pos + node.nodeSize),
        newTr.addMark(step.from, step.to, state.schema.marks.format_change.create({
          user: user.userId,
          username: user.username,
          date: date,
          before: before,
          after: after,
          group: group,
          id: uuid.v4()
        }));
      } else if (formatChangeMark) {
        newTr.removeMark(Math.max(step.from, pos), Math.min(step.to, pos + node.nodeSize), formatChangeMark);
      }
    }
  });
};

var removeMarkStep = function removeMarkStep(state, tr, step, newTr, map, doc, user, date) {
  doc.nodesBetween(step.from, step.to, function (node, pos) {
    if (!node.isInline) {
      return true;
    }

    if (node.marks.find(function (mark) {
      return mark.type.name === 'deletion';
    })) {
      return false;
    }

    newTr.removeMark(Math.max(step.from, pos), Math.min(step.to, pos + node.nodeSize), step.mark);

    if (['em', 'strong', 'underline'].includes(step.mark.type.name) && node.marks.find(function (mark) {
      return mark.type === step.mark.type;
    })) {
      var formatChangeMark = node.marks.find(function (mark) {
        return mark.type.name === 'format_change';
      });
      var after, before;

      if (formatChangeMark) {
        if (formatChangeMark.attrs.after.includes(step.mark.type.name)) {
          after = formatChangeMark.attrs.after.filter(function (markName) {
            return markName !== step.mark.type.name;
          });
          before = formatChangeMark.attrs.before;
        } else {
          after = formatChangeMark.attrs.after;
          before = formatChangeMark.attrs.before.concat(step.mark.type.name);
        }
      } else {
        after = [];
        before = [step.mark.type.name];
      }

      if (after.length || before.length) {
        newTr.addMark(Math.max(step.from, pos), Math.min(step.to, pos + node.nodeSize), state.schema.marks.format_change.create({
          user: user.userId,
          username: user.username,
          date: date,
          before: before,
          after: after
        }));
      } else if (formatChangeMark) {
        newTr.removeMark(Math.max(step.from, pos), Math.min(step.to, pos + node.nodeSize), formatChangeMark);
      }
    }
  });
};

/*
This belongs to https://github.com/fiduswriter/fiduswriter
check: https://github.com/fiduswriter/fiduswriter/blob/develop/fiduswriter/document/static/js/modules/editor/track/amend_transaction.js
License included in folder.
*/

var trackedTransaction = function trackedTransaction(tr, state, user) {
  if (!tr.steps.length || tr.meta && !Object.keys(tr.meta).every(function (metadata) {
    return ['inputType', 'uiEvent', 'paste', 'outsideView'].includes(metadata);
  }) || ['historyUndo', 'historyRedo', 'AcceptReject'].includes(tr.getMeta('inputType'))) {
    return tr;
  }

  var group = tr.getMeta('outsideView') ? tr.getMeta('outsideView') : 'main';
  var newTr = state.tr;
  var map = new prosemirrorTransform.Mapping();
  var date = Math.floor(Date.now() / 300000);
  tr.steps.forEach(function (originalStep) {
    var step = originalStep.map(map);
    var doc = newTr.doc;

    if (!step) {
      return;
    }

    switch (step.constructor) {
      case prosemirrorTransform.ReplaceStep:
        replaceStep(state, tr, step, newTr, map, doc, user, date, group);
        break;

      case prosemirrorTransform.ReplaceAroundStep:
        replaceAroundStep(state, tr, step, newTr, map, doc, user, date, group);
        break;

      case prosemirrorTransform.AddMarkStep:
        addMarkStep(state, tr, step, newTr, map, doc, user, date, group);
        break;

      case prosemirrorTransform.RemoveMarkStep:
        removeMarkStep(state, tr, step, newTr, map, doc, user, date);
        break;
    }
  });
  if (tr.getMeta('inputType')) newTr.setMeta(tr.getMeta('inputType'));
  if (tr.getMeta('uiEvent')) newTr.setMeta(tr.getMeta('uiEvent'));

  if (tr.selectionSet) {
    var deletionMarkSchema = state.schema.marks.deletion;
    var deletionMark = waxProsemirrorUtilities.DocumentHelpers.findMark(state, deletionMarkSchema, false);

    if (tr.selection instanceof prosemirrorState.TextSelection && (tr.selection.from < state.selection.from || tr.getMeta('inputType') === 'deleteContentBackward')) {
      var caretPos = map.map(tr.selection.from, -1);
      newTr.setSelection(new prosemirrorState.TextSelection(newTr.doc.resolve(caretPos)));
    } else if (tr.selection.from > state.selection.from && deletionMark) {
      var _caretPos = map.map(deletionMark.to + 1, 1);

      newTr.setSelection(new prosemirrorState.TextSelection(newTr.doc.resolve(_caretPos)));
    } else {
      newTr.setSelection(tr.selection.map(newTr.doc, map));
    }
  }

  if (state.selection.from - tr.selection.from > 1 && tr.selection.$head.depth > 1) {
    var _caretPos2 = map.map(tr.selection.from - 2, -1);

    newTr.setSelection(new prosemirrorState.TextSelection(newTr.doc.resolve(_caretPos2)));
  } else {
    var _caretPos3 = map.map(tr.selection.from, -1);

    newTr.setSelection(new prosemirrorState.TextSelection(newTr.doc.resolve(_caretPos3))); // const slice = map.slice(newTr.selection.from, newTr.selection.to);
    // map.appendMap(slice);
  }

  if (tr.storedMarksSet) newTr.setStoredMarks(tr.storedMarks);
  if (tr.scrolledIntoView) newTr.scrollIntoView();
  return newTr;
};

var _dec$d, _class$d, _temp$b;
var Undo = (_dec$d = inversify.injectable(), _dec$d(_class$d = (_temp$b = /*#__PURE__*/function (_Tools) {
  _inherits(Undo, _Tools);

  var _super = _createSuper(Undo);

  function Undo() {
    var _this;

    _classCallCheck(this, Undo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Undo last change';
    _this.content = waxProsemirrorComponents.icons.undo;
    _this.onlyOnMain = true;
    return _this;
  }

  _createClass(Undo, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        prosemirrorHistory.undo(state, function (tr) {
          return dispatch(tr.setMeta('inputType', 'historyUndo'));
        });
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return prosemirrorHistory.undo;
    }
  }]);

  return Undo;
}(Tools), _temp$b)) || _class$d);

var UndoService = /*#__PURE__*/function (_Service) {
  _inherits(UndoService, _Service);

  var _super = _createSuper(UndoService);

  function UndoService() {
    _classCallCheck(this, UndoService);

    return _super.apply(this, arguments);
  }

  _createClass(UndoService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("Undo").to(Undo);
    }
  }]);

  return UndoService;
}(Service);

var _dec$e, _class$e, _temp$c;
var Redo = (_dec$e = inversify.injectable(), _dec$e(_class$e = (_temp$c = /*#__PURE__*/function (_Tools) {
  _inherits(Redo, _Tools);

  var _super = _createSuper(Redo);

  function Redo() {
    var _this;

    _classCallCheck(this, Redo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Redo last undone change';
    _this.content = waxProsemirrorComponents.icons.redo;
    _this.onlyOnMain = true;
    return _this;
  }

  _createClass(Redo, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        prosemirrorHistory.redo(state, function (tr) {
          return dispatch(tr.setMeta('inputType', 'historyRedo'));
        });
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return prosemirrorHistory.redo;
    }
  }]);

  return Redo;
}(Tools), _temp$c)) || _class$e);

var RedoService = /*#__PURE__*/function (_Service) {
  _inherits(RedoService, _Service);

  var _super = _createSuper(RedoService);

  function RedoService() {
    _classCallCheck(this, RedoService);

    return _super.apply(this, arguments);
  }

  _createClass(RedoService, [{
    key: "register",
    // boot() {}
    value: function register() {
      this.container.bind('Redo').to(Redo);
    }
  }]);

  return RedoService;
}(Service);

var _dec$f, _class$f, _temp$d;
var Save = (_dec$f = inversify.injectable(), _dec$f(_class$f = (_temp$d = /*#__PURE__*/function (_Tools) {
  _inherits(Save, _Tools);

  var _super = _createSuper(Save);

  function Save() {
    var _this;

    _classCallCheck(this, Save);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = "Save changes";
    _this.content = waxProsemirrorComponents.icons.save;
    return _this;
  }

  _createClass(Save, [{
    key: "run",
    get: function get() {}
  }, {
    key: "enable",
    get: function get() {}
  }]);

  return Save;
}(Tools), _temp$d)) || _class$f);

var BaseServices = [new UndoService(), new RedoService()];

var BaseService = /*#__PURE__*/function (_Service) {
  _inherits(BaseService, _Service);

  var _super = _createSuper(BaseService);

  function BaseService() {
    var _this;

    _classCallCheck(this, BaseService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.dependencies = BaseServices;
    return _this;
  }

  return BaseService;
}(Service);

var _dec$g, _class$g, _temp$e;
var Code = (_dec$g = inversify.injectable(), _dec$g(_class$g = (_temp$e = /*#__PURE__*/function (_Tools) {
  _inherits(Code, _Tools);

  var _super = _createSuper(Code);

  function Code() {
    var _this;

    _classCallCheck(this, Code);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Toggle code';
    _this.content = waxProsemirrorComponents.icons.code;
    return _this;
  }

  _createClass(Code, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        prosemirrorCommands.toggleMark(state.config.schema.marks.code)(state, dispatch);
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.markActive(state.config.schema.marks.code)(state);
      };
    }
  }]);

  return Code;
}(Tools), _temp$e)) || _class$g);

var CodeService = /*#__PURE__*/function (_Service) {
  _inherits(CodeService, _Service);

  var _super = _createSuper(CodeService);

  function CodeService() {
    _classCallCheck(this, CodeService);

    return _super.apply(this, arguments);
  }

  _createClass(CodeService, [{
    key: "boot",
    value: function boot() {
      var shortCuts = this.container.get('ShortCuts');
      shortCuts.addShortCut({
        'Mod-`': prosemirrorCommands.toggleMark(this.schema.marks.code)
      });
    }
  }, {
    key: "register",
    value: function register() {
      this.container.bind('Code').to(Code);
      var createMark = this.container.get('CreateMark');
      createMark({
        code: waxProsemirrorSchema.codeMark
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return CodeService;
}(Service);

var _dec$h, _class$h, _temp$f;
var Strong = (_dec$h = inversify.injectable(), _dec$h(_class$h = (_temp$f = /*#__PURE__*/function (_Tools) {
  _inherits(Strong, _Tools);

  var _super = _createSuper(Strong);

  function Strong() {
    var _this;

    _classCallCheck(this, Strong);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = "Toggle strong";
    _this.content = waxProsemirrorComponents.icons.strong;
    return _this;
  }

  _createClass(Strong, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        prosemirrorCommands.toggleMark(state.config.schema.marks.strong)(state, dispatch);
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.markActive(state.config.schema.marks.strong)(state);
      };
    }
  }]);

  return Strong;
}(Tools), _temp$f)) || _class$h);

var StrongService = /*#__PURE__*/function (_Service) {
  _inherits(StrongService, _Service);

  var _super = _createSuper(StrongService);

  function StrongService() {
    _classCallCheck(this, StrongService);

    return _super.apply(this, arguments);
  }

  _createClass(StrongService, [{
    key: "boot",
    value: function boot() {
      var shortCuts = this.container.get("ShortCuts");
      shortCuts.addShortCut({
        "Mod-b": prosemirrorCommands.toggleMark(this.schema.marks.strong)
      });
    }
  }, {
    key: "register",
    value: function register() {
      this.container.bind("Strong").to(Strong);
      var createMark = this.container.get("CreateMark");
      createMark({
        strong: waxProsemirrorSchema.strongMark
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return StrongService;
}(Service);

var _dec$i, _class$i, _temp$g;
var Emphasis = (_dec$i = inversify.injectable(), _dec$i(_class$i = (_temp$g = /*#__PURE__*/function (_Tools) {
  _inherits(Emphasis, _Tools);

  var _super = _createSuper(Emphasis);

  function Emphasis() {
    var _this;

    _classCallCheck(this, Emphasis);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Toggle emphasis';
    _this.content = waxProsemirrorComponents.icons.em;
    return _this;
  }

  _createClass(Emphasis, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        prosemirrorCommands.toggleMark(state.config.schema.marks.em)(state, dispatch);
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.markActive(state.config.schema.marks.em)(state);
      };
    }
  }]);

  return Emphasis;
}(Tools), _temp$g)) || _class$i);

var EmphasisService = /*#__PURE__*/function (_Service) {
  _inherits(EmphasisService, _Service);

  var _super = _createSuper(EmphasisService);

  function EmphasisService() {
    _classCallCheck(this, EmphasisService);

    return _super.apply(this, arguments);
  }

  _createClass(EmphasisService, [{
    key: "boot",
    value: function boot() {
      var shortCuts = this.container.get('ShortCuts');
      shortCuts.addShortCut({
        'Mod-i': prosemirrorCommands.toggleMark(this.schema.marks.em)
      });
    }
  }, {
    key: "register",
    value: function register() {
      this.container.bind('Emphasis').to(Emphasis);
      var createMark = this.container.get('CreateMark');
      createMark({
        em: waxProsemirrorSchema.emphasisMark
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return EmphasisService;
}(Service);

var _dec$j, _class$j, _temp$h;
var Subscript = (_dec$j = inversify.injectable(), _dec$j(_class$j = (_temp$h = /*#__PURE__*/function (_Tools) {
  _inherits(Subscript, _Tools);

  var _super = _createSuper(Subscript);

  function Subscript() {
    var _this;

    _classCallCheck(this, Subscript);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = "Toggle subscript";
    _this.content = waxProsemirrorComponents.icons.subscript;
    return _this;
  }

  _createClass(Subscript, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        prosemirrorCommands.toggleMark(state.config.schema.marks.subscript)(state, dispatch);
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.markActive(state.config.schema.marks.subscript)(state);
      };
    }
  }]);

  return Subscript;
}(Tools), _temp$h)) || _class$j);

var SubscriptService = /*#__PURE__*/function (_Service) {
  _inherits(SubscriptService, _Service);

  var _super = _createSuper(SubscriptService);

  function SubscriptService() {
    _classCallCheck(this, SubscriptService);

    return _super.apply(this, arguments);
  }

  _createClass(SubscriptService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("Subscript").to(Subscript);
      var createMark = this.container.get("CreateMark");
      createMark({
        subscript: waxProsemirrorSchema.subscriptMark
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return SubscriptService;
}(Service);

var _dec$k, _class$k, _temp$i;
var Superscript = (_dec$k = inversify.injectable(), _dec$k(_class$k = (_temp$i = /*#__PURE__*/function (_Tools) {
  _inherits(Superscript, _Tools);

  var _super = _createSuper(Superscript);

  function Superscript() {
    var _this;

    _classCallCheck(this, Superscript);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = "Toggle superscript";
    _this.content = waxProsemirrorComponents.icons.superscript;
    return _this;
  }

  _createClass(Superscript, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        prosemirrorCommands.toggleMark(state.config.schema.marks.superscript)(state, dispatch);
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.markActive(state.config.schema.marks.superscript)(state);
      };
    }
  }]);

  return Superscript;
}(Tools), _temp$i)) || _class$k);

var SuperscriptService = /*#__PURE__*/function (_Service) {
  _inherits(SuperscriptService, _Service);

  var _super = _createSuper(SuperscriptService);

  function SuperscriptService() {
    _classCallCheck(this, SuperscriptService);

    return _super.apply(this, arguments);
  }

  _createClass(SuperscriptService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("Superscript").to(Superscript);
      var createMark = this.container.get("CreateMark");
      createMark({
        superscript: waxProsemirrorSchema.superscriptMark
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return SuperscriptService;
}(Service);

var _dec$l, _class$l, _temp$j;
var StrikeThrough = (_dec$l = inversify.injectable(), _dec$l(_class$l = (_temp$j = /*#__PURE__*/function (_Tools) {
  _inherits(StrikeThrough, _Tools);

  var _super = _createSuper(StrikeThrough);

  function StrikeThrough() {
    var _this;

    _classCallCheck(this, StrikeThrough);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = "Toggle strikethrough";
    _this.content = waxProsemirrorComponents.icons.strikethrough;
    return _this;
  }

  _createClass(StrikeThrough, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        prosemirrorCommands.toggleMark(state.config.schema.marks.strikethrough)(state, dispatch);
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.markActive(state.config.schema.marks.strikethrough)(state);
      };
    }
  }]);

  return StrikeThrough;
}(Tools), _temp$j)) || _class$l);

var StrikeThroughService = /*#__PURE__*/function (_Service) {
  _inherits(StrikeThroughService, _Service);

  var _super = _createSuper(StrikeThroughService);

  function StrikeThroughService() {
    _classCallCheck(this, StrikeThroughService);

    return _super.apply(this, arguments);
  }

  _createClass(StrikeThroughService, [{
    key: "register",
    value: function register() {
      this.container.bind("StrikeThrough").to(StrikeThrough);
      var createMark = this.container.get("CreateMark");
      createMark({
        strikethrough: waxProsemirrorSchema.strikethroughMark
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return StrikeThroughService;
}(Service);

var _dec$m, _class$m, _temp$k;
var Underline = (_dec$m = inversify.injectable(), _dec$m(_class$m = (_temp$k = /*#__PURE__*/function (_Tools) {
  _inherits(Underline, _Tools);

  var _super = _createSuper(Underline);

  function Underline() {
    var _this;

    _classCallCheck(this, Underline);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = "Toggle underline";
    _this.content = waxProsemirrorComponents.icons.underline;
    return _this;
  }

  _createClass(Underline, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        prosemirrorCommands.toggleMark(state.config.schema.marks.underline)(state, dispatch);
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.markActive(state.config.schema.marks.underline)(state);
      };
    }
  }]);

  return Underline;
}(Tools), _temp$k)) || _class$m);

var UnderlineService = /*#__PURE__*/function (_Service) {
  _inherits(UnderlineService, _Service);

  var _super = _createSuper(UnderlineService);

  function UnderlineService() {
    _classCallCheck(this, UnderlineService);

    return _super.apply(this, arguments);
  }

  _createClass(UnderlineService, [{
    key: "boot",
    value: function boot() {
      var shortCuts = this.container.get("ShortCuts");
      shortCuts.addShortCut({
        "Mod-u": prosemirrorCommands.toggleMark(this.schema.marks.underline)
      });
    }
  }, {
    key: "register",
    value: function register() {
      this.container.bind("Underline").to(Underline);
      var createMark = this.container.get("CreateMark");
      createMark({
        underline: waxProsemirrorSchema.underlineMark
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return UnderlineService;
}(Service);

var _dec$n, _class$n, _temp$l;
var SmallCaps = (_dec$n = inversify.injectable(), _dec$n(_class$n = (_temp$l = /*#__PURE__*/function (_Tools) {
  _inherits(SmallCaps, _Tools);

  var _super = _createSuper(SmallCaps);

  function SmallCaps() {
    var _this;

    _classCallCheck(this, SmallCaps);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = "Toggle Small Caps";
    _this.content = waxProsemirrorComponents.icons.small_caps;
    return _this;
  }

  _createClass(SmallCaps, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        prosemirrorCommands.toggleMark(state.config.schema.marks.smallcaps)(state, dispatch);
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.markActive(state.config.schema.marks.smallcaps)(state);
      };
    }
  }]);

  return SmallCaps;
}(Tools), _temp$l)) || _class$n);

var SmallCapsService = /*#__PURE__*/function (_Service) {
  _inherits(SmallCapsService, _Service);

  var _super = _createSuper(SmallCapsService);

  function SmallCapsService() {
    _classCallCheck(this, SmallCapsService);

    return _super.apply(this, arguments);
  }

  _createClass(SmallCapsService, [{
    key: "register",
    value: function register() {
      this.container.bind("SmallCaps").to(SmallCaps);
      var createMark = this.container.get("CreateMark");
      createMark({
        smallcaps: waxProsemirrorSchema.smallcapsMark
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return SmallCapsService;
}(Service);

var InlineServices = [new CodeService(), new StrongService(), new EmphasisService(), new SubscriptService(), new SuperscriptService(), new StrikeThroughService(), new UnderlineService(), new SmallCapsService()];

var InlineAnnotationsService = /*#__PURE__*/function (_Service) {
  _inherits(InlineAnnotationsService, _Service);

  var _super = _createSuper(InlineAnnotationsService);

  function InlineAnnotationsService() {
    var _this;

    _classCallCheck(this, InlineAnnotationsService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.dependencies = InlineServices;
    return _this;
  }

  return InlineAnnotationsService;
}(Service);

var _dec$o, _class$o, _temp$m;
var BulletList = (_dec$o = inversify.injectable(), _dec$o(_class$o = (_temp$m = /*#__PURE__*/function (_Tools) {
  _inherits(BulletList, _Tools);

  var _super = _createSuper(BulletList);

  function BulletList() {
    var _this;

    _classCallCheck(this, BulletList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Wrap in bullet list';
    _this.content = waxProsemirrorComponents.icons.bullet_list;

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(BulletList, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        return prosemirrorSchemaList.wrapInList(state.config.schema.nodes.bulletlist)(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return prosemirrorSchemaList.wrapInList(state.config.schema.nodes.bulletlist)(state);
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.blockActive(state.config.schema.nodes.bulletlist)(state);
      };
    }
  }]);

  return BulletList;
}(Tools), _temp$m)) || _class$o);

var BulletListService = /*#__PURE__*/function (_Service) {
  _inherits(BulletListService, _Service);

  var _super = _createSuper(BulletListService);

  function BulletListService() {
    _classCallCheck(this, BulletListService);

    return _super.apply(this, arguments);
  }

  _createClass(BulletListService, [{
    key: "boot",
    value: function boot() {
      var shortCuts = this.container.get('ShortCuts'); // shortCuts.addShortCut({
      //   "Shift-Ctrl-8": wrapInList(this.schema.nodes.bulletlist)
      // });
    }
  }, {
    key: "register",
    value: function register() {
      this.container.bind('BulletList').to(BulletList);
      var createNode = this.container.get('CreateNode');
      createNode({
        bulletlist: waxProsemirrorSchema.bulletListNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return BulletListService;
}(Service);

var _dec$p, _class$p, _temp$n;
var OrderedList = (_dec$p = inversify.injectable(), _dec$p(_class$p = (_temp$n = /*#__PURE__*/function (_Tools) {
  _inherits(OrderedList, _Tools);

  var _super = _createSuper(OrderedList);

  function OrderedList() {
    var _this;

    _classCallCheck(this, OrderedList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Wrap in ordered list';
    _this.content = waxProsemirrorComponents.icons.ordered_list;

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(OrderedList, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        prosemirrorSchemaList.wrapInList(state.config.schema.nodes.orderedlist)(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return prosemirrorSchemaList.wrapInList(state.config.schema.nodes.orderedlist)(state);
      };
    }
  }, {
    key: "active",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.blockActive(state.config.schema.nodes.orderedlist)(state);
      };
    }
  }]);

  return OrderedList;
}(Tools), _temp$n)) || _class$p);

var OrderedListService = /*#__PURE__*/function (_Service) {
  _inherits(OrderedListService, _Service);

  var _super = _createSuper(OrderedListService);

  function OrderedListService() {
    _classCallCheck(this, OrderedListService);

    return _super.apply(this, arguments);
  }

  _createClass(OrderedListService, [{
    key: "boot",
    value: function boot() {
      var shortCuts = this.container.get("ShortCuts"); // shortCuts.addShortCut({
      //   "Shift-Ctrl-9": wrapInList(this.schema.nodes.orderedlist)
      // });
    }
  }, {
    key: "register",
    value: function register() {
      this.container.bind("OrderedList").to(OrderedList);
      var createNode = this.container.get("CreateNode");
      createNode({
        orderedlist: waxProsemirrorSchema.orderedListNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return OrderedListService;
}(Service);

var _dec$q, _class$q, _temp$o;
var JoinUp = (_dec$q = inversify.injectable(), _dec$q(_class$q = (_temp$o = /*#__PURE__*/function (_Tools) {
  _inherits(JoinUp, _Tools);

  var _super = _createSuper(JoinUp);

  function JoinUp() {
    var _this;

    _classCallCheck(this, JoinUp);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = "Join with above block";
    _this.content = waxProsemirrorComponents.icons.join_up;
    return _this;
  }

  _createClass(JoinUp, [{
    key: "select",
    value: function select(state) {
      return prosemirrorCommands.joinUp(state);
    }
  }, {
    key: "run",
    get: function get() {
      return prosemirrorCommands.joinUp;
    }
  }, {
    key: "enable",
    get: function get() {
      return prosemirrorCommands.joinUp;
    }
  }]);

  return JoinUp;
}(Tools), _temp$o)) || _class$q);

var JoinUpService = /*#__PURE__*/function (_Service) {
  _inherits(JoinUpService, _Service);

  var _super = _createSuper(JoinUpService);

  function JoinUpService() {
    _classCallCheck(this, JoinUpService);

    return _super.apply(this, arguments);
  }

  _createClass(JoinUpService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("JoinUp").to(JoinUp);
    }
  }]);

  return JoinUpService;
}(Service);

var _dec$r, _class$r, _temp$p;
var Lift = (_dec$r = inversify.injectable(), _dec$r(_class$r = (_temp$p = /*#__PURE__*/function (_Tools) {
  _inherits(Lift, _Tools);

  var _super = _createSuper(Lift);

  function Lift() {
    var _this;

    _classCallCheck(this, Lift);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = "Lift out of enclosing block";
    _this.content = waxProsemirrorComponents.icons.lift;
    return _this;
  }

  _createClass(Lift, [{
    key: "run",
    get: function get() {
      return prosemirrorCommands.lift;
    }
  }, {
    key: "enable",
    get: function get() {
      return prosemirrorCommands.lift;
    }
  }]);

  return Lift;
}(Tools), _temp$p)) || _class$r);

var LiftService = /*#__PURE__*/function (_Service) {
  _inherits(LiftService, _Service);

  var _super = _createSuper(LiftService);

  function LiftService() {
    _classCallCheck(this, LiftService);

    return _super.apply(this, arguments);
  }

  _createClass(LiftService, [{
    key: "boot",
    value: function boot() {
      var shortCuts = this.container.get("ShortCuts"); // shortCuts.addShortCut({
      //   "Mod-[": liftListItem(this.schema.nodes.list_item),
      //   "Mod-]": sinkListItem(this.schema.nodes.list_item)
      // });
    }
  }, {
    key: "register",
    value: function register() {
      this.container.bind("Lift").to(Lift);
    }
  }]);

  return LiftService;
}(Service);

var ListItemService = /*#__PURE__*/function (_Service) {
  _inherits(ListItemService, _Service);

  var _super = _createSuper(ListItemService);

  function ListItemService() {
    _classCallCheck(this, ListItemService);

    return _super.apply(this, arguments);
  }

  _createClass(ListItemService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      var createNode = this.container.get("CreateNode");
      createNode({
        list_item: waxProsemirrorSchema.listItemNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return ListItemService;
}(Service);

var ListsServices = [new BulletListService(), new OrderedListService(), new JoinUpService(), new LiftService(), new ListItemService()];

var ListsService = /*#__PURE__*/function (_Service) {
  _inherits(ListsService, _Service);

  var _super = _createSuper(ListsService);

  function ListsService() {
    var _this;

    _classCallCheck(this, ListsService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.dependencies = ListsServices;
    return _this;
  }

  return ListsService;
}(Service);

var _dec$s, _class$s, _temp$q;
var Table = (_dec$s = inversify.injectable(), _dec$s(_class$s = (_temp$q = /*#__PURE__*/function (_Tools) {
  _inherits(Table, _Tools);

  var _super = _createSuper(Table);

  function Table() {
    var _this;

    _classCallCheck(this, Table);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Insert table';
    _this.content = waxProsemirrorComponents.icons.table;

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(Table, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        return waxProsemirrorUtilities.Commands.createTable(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.canInsert(state.config.schema.nodes.table)(state);
      };
    }
  }]);

  return Table;
}(Tools), _temp$q)) || _class$s);

var InsertTableService = /*#__PURE__*/function (_Service) {
  _inherits(InsertTableService, _Service);

  var _super = _createSuper(InsertTableService);

  function InsertTableService() {
    _classCallCheck(this, InsertTableService);

    return _super.apply(this, arguments);
  }

  _createClass(InsertTableService, [{
    key: "boot",
    value: function boot() {
      var shortCuts = this.container.get("ShortCuts");
      shortCuts.addShortCut({
        Tab: prosemirrorTables.goToNextCell(1),
        "Shift-Tab": prosemirrorTables.goToNextCell(-1)
      });
    }
  }, {
    key: "register",
    value: function register() {
      this.container.bind("Table").to(Table);

      var _tableNodes = prosemirrorTables.tableNodes({
        tableGroup: "block",
        cellContent: "block+"
      }),
          table = _tableNodes.table,
          table_row = _tableNodes.table_row,
          table_cell = _tableNodes.table_cell,
          table_header = _tableNodes.table_header;

      var createNode = this.container.get("CreateNode");
      createNode({
        table: table
      });
      createNode({
        table_row: table_row
      });
      createNode({
        table_cell: table_cell
      });
      createNode({
        table_header: table_header
      });
    }
  }]);

  return InsertTableService;
}(Service);

var _dec$t, _class$t, _temp$r;
var TableDropDownOptions = (_dec$t = inversify.injectable(), _dec$t(_class$t = (_temp$r = /*#__PURE__*/function (_Tools) {
  _inherits(TableDropDownOptions, _Tools);

  var _super = _createSuper(TableDropDownOptions);

  function TableDropDownOptions() {
    var _this;

    _classCallCheck(this, TableDropDownOptions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = "Select Options";
    _this.content = "table";
    return _this;
  }

  _createClass(TableDropDownOptions, [{
    key: "select",
    value: function select(state) {
      return prosemirrorTables.addColumnBefore(state);
    }
  }, {
    key: "renderTool",
    value: function renderTool(view) {
      if (lodash.isEmpty(view)) return null;
      return this._isDisplayed ? /*#__PURE__*/React__default.createElement(waxProsemirrorComponents.TableDropDown, {
        key: uuid.v4(),
        item: this.toJSON(),
        view: view
      }) : null;
    }
  }, {
    key: "run",
    get: function get() {
      return function () {
        return true;
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.canInsert(state.config.schema.nodes.table)(state);
      };
    }
  }]);

  return TableDropDownOptions;
}(Tools), _temp$r)) || _class$t);

var EditTableService = /*#__PURE__*/function (_Service) {
  _inherits(EditTableService, _Service);

  var _super = _createSuper(EditTableService);

  function EditTableService() {
    _classCallCheck(this, EditTableService);

    return _super.apply(this, arguments);
  }

  _createClass(EditTableService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("TableDropDownOptions").to(TableDropDownOptions);
    }
  }]);

  return EditTableService;
}(Service);

var TablesServices = [new InsertTableService(), new EditTableService()];

var TablesService = /*#__PURE__*/function (_Service) {
  _inherits(TablesService, _Service);

  var _super = _createSuper(TablesService);

  function TablesService() {
    var _this;

    _classCallCheck(this, TablesService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.dependencies = TablesServices;
    return _this;
  }

  return TablesService;
}(Service);

var _dec$u, _class$u, _temp$s;
var ExtractPoetry = (_dec$u = inversify.injectable(), _dec$u(_class$u = (_temp$s = /*#__PURE__*/function (_Tools) {
  _inherits(ExtractPoetry, _Tools);

  var _super = _createSuper(ExtractPoetry);

  function ExtractPoetry() {
    var _this;

    _classCallCheck(this, ExtractPoetry);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to Extract Poetry';
    _this.content = 'Extract Poetry';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(ExtractPoetry, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.extractPoetry, {
          "class": 'extract-poetry'
        })(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.extractPoetry)(state);
      };
    }
  }]);

  return ExtractPoetry;
}(Tools), _temp$s)) || _class$u);

var ExtractPoetryService = /*#__PURE__*/function (_Service) {
  _inherits(ExtractPoetryService, _Service);

  var _super = _createSuper(ExtractPoetryService);

  function ExtractPoetryService() {
    _classCallCheck(this, ExtractPoetryService);

    return _super.apply(this, arguments);
  }

  _createClass(ExtractPoetryService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("ExtractPoetry").to(ExtractPoetry);
      var createNode = this.container.get("CreateNode");
      createNode({
        extractPoetry: waxProsemirrorSchema.extractPoetryNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return ExtractPoetryService;
}(Service);

var _dec$v, _class$v, _temp$t;
var ExtractProse = (_dec$v = inversify.injectable(), _dec$v(_class$v = (_temp$t = /*#__PURE__*/function (_Tools) {
  _inherits(ExtractProse, _Tools);

  var _super = _createSuper(ExtractProse);

  function ExtractProse() {
    var _this;

    _classCallCheck(this, ExtractProse);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to Extract Prose';
    _this.content = 'Extract Prose';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(ExtractProse, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.extractProse, {
          "class": 'extract-prose'
        })(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.extractProse)(state);
      };
    }
  }]);

  return ExtractProse;
}(Tools), _temp$t)) || _class$v);

var ExtractProseService = /*#__PURE__*/function (_Service) {
  _inherits(ExtractProseService, _Service);

  var _super = _createSuper(ExtractProseService);

  function ExtractProseService() {
    _classCallCheck(this, ExtractProseService);

    return _super.apply(this, arguments);
  }

  _createClass(ExtractProseService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("ExtractProse").to(ExtractProse);
      var createNode = this.container.get("CreateNode");
      createNode({
        extractProse: waxProsemirrorSchema.extractProseNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return ExtractProseService;
}(Service);

var _dec$w, _class$w, _temp$u;
var ParagraphContinued = (_dec$w = inversify.injectable(), _dec$w(_class$w = (_temp$u = /*#__PURE__*/function (_Tools) {
  _inherits(ParagraphContinued, _Tools);

  var _super = _createSuper(ParagraphContinued);

  function ParagraphContinued() {
    var _this;

    _classCallCheck(this, ParagraphContinued);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to Paragraph Continued';
    _this.content = 'Paragraph Continued';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(ParagraphContinued, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.paragraphCont, {
          "class": 'paragraph-cont'
        })(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.paragraphCont)(state);
      };
    }
  }]);

  return ParagraphContinued;
}(Tools), _temp$u)) || _class$w);

var ParagraphContinuedService = /*#__PURE__*/function (_Service) {
  _inherits(ParagraphContinuedService, _Service);

  var _super = _createSuper(ParagraphContinuedService);

  function ParagraphContinuedService() {
    _classCallCheck(this, ParagraphContinuedService);

    return _super.apply(this, arguments);
  }

  _createClass(ParagraphContinuedService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("ParagraphContinued").to(ParagraphContinued);
      var createNode = this.container.get("CreateNode");
      createNode({
        paragraphCont: waxProsemirrorSchema.paragraphContNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return ParagraphContinuedService;
}(Service);

var _dec$x, _class$x, _temp$v;
var Paragraph = (_dec$x = inversify.injectable(), _dec$x(_class$x = (_temp$v = /*#__PURE__*/function (_Tools) {
  _inherits(Paragraph, _Tools);

  var _super = _createSuper(Paragraph);

  function Paragraph() {
    var _this;

    _classCallCheck(this, Paragraph);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to Paragraph';
    _this.content = 'Paragraph';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(Paragraph, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.paragraph, {
          "class": 'paragraph'
        })(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.paragraph)(state);
      };
    }
  }]);

  return Paragraph;
}(Tools), _temp$v)) || _class$x);

var ParagraphService = /*#__PURE__*/function (_Service) {
  _inherits(ParagraphService, _Service);

  var _super = _createSuper(ParagraphService);

  function ParagraphService() {
    _classCallCheck(this, ParagraphService);

    return _super.apply(this, arguments);
  }

  _createClass(ParagraphService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("Paragraph").to(Paragraph);
    }
  }]);

  return ParagraphService;
}(Service);

var _dec$y, _class$y, _temp$w;
var SourceNote = (_dec$y = inversify.injectable(), _dec$y(_class$y = (_temp$w = /*#__PURE__*/function (_Tools) {
  _inherits(SourceNote, _Tools);

  var _super = _createSuper(SourceNote);

  function SourceNote() {
    var _this;

    _classCallCheck(this, SourceNote);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to Source Note';
    _this.content = 'Source Note';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(SourceNote, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.sourceNote, {
          "class": 'source-note'
        })(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.sourceNote)(state);
      };
    }
  }]);

  return SourceNote;
}(Tools), _temp$w)) || _class$y);

var SourceNoteService = /*#__PURE__*/function (_Service) {
  _inherits(SourceNoteService, _Service);

  var _super = _createSuper(SourceNoteService);

  function SourceNoteService() {
    _classCallCheck(this, SourceNoteService);

    return _super.apply(this, arguments);
  }

  _createClass(SourceNoteService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("SourceNote").to(SourceNote);
      var createNode = this.container.get("CreateNode");
      createNode({
        sourceNote: waxProsemirrorSchema.sourceNoteNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return SourceNoteService;
}(Service);

var _dec$z, _class$z, _temp$x;
var BlockQuote = (_dec$z = inversify.injectable(), _dec$z(_class$z = (_temp$x = /*#__PURE__*/function (_Tools) {
  _inherits(BlockQuote, _Tools);

  var _super = _createSuper(BlockQuote);

  function BlockQuote() {
    var _this;

    _classCallCheck(this, BlockQuote);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to Block Quote';
    _this.content = 'Block Quote';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(BlockQuote, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        prosemirrorCommands.wrapIn(state.config.schema.nodes.blockquote)(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return prosemirrorCommands.wrapIn(state.config.schema.nodes.blockquote)(state);
      };
    }
  }]);

  return BlockQuote;
}(Tools), _temp$x)) || _class$z);

var BlockQuoteService = /*#__PURE__*/function (_Service) {
  _inherits(BlockQuoteService, _Service);

  var _super = _createSuper(BlockQuoteService);

  function BlockQuoteService() {
    _classCallCheck(this, BlockQuoteService);

    return _super.apply(this, arguments);
  }

  _createClass(BlockQuoteService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("BlockQuote").to(BlockQuote);
      var createNode = this.container.get("CreateNode");
      createNode({
        blockquote: waxProsemirrorSchema.blockQuoteNode
      });
    }
  }]);

  return BlockQuoteService;
}(Service);

var TextServices = [new ExtractPoetryService(), new ExtractProseService(), new ParagraphContinuedService(), new ParagraphService(), new SourceNoteService(), new BlockQuoteService()];

var TextBlockLevelService = /*#__PURE__*/function (_Service) {
  _inherits(TextBlockLevelService, _Service);

  var _super = _createSuper(TextBlockLevelService);

  function TextBlockLevelService() {
    var _this;

    _classCallCheck(this, TextBlockLevelService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.dependencies = TextServices;
    return _this;
  }

  return TextBlockLevelService;
}(Service);

var _dec$A, _class$A, _temp$y;
var Author = (_dec$A = inversify.injectable(), _dec$A(_class$A = (_temp$y = /*#__PURE__*/function (_Tools) {
  _inherits(Author, _Tools);

  var _super = _createSuper(Author);

  function Author() {
    var _this;

    _classCallCheck(this, Author);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to Author';
    _this.content = 'Author';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(Author, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.author, {
          "class": 'author'
        })(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.author)(state);
      };
    }
  }]);

  return Author;
}(Tools), _temp$y)) || _class$A);

var AuthorService = /*#__PURE__*/function (_Service) {
  _inherits(AuthorService, _Service);

  var _super = _createSuper(AuthorService);

  function AuthorService() {
    _classCallCheck(this, AuthorService);

    return _super.apply(this, arguments);
  }

  _createClass(AuthorService, [{
    key: "register",
    // boot() {}
    value: function register() {
      this.container.bind('Author').to(Author);
      var createNode = this.container.get('CreateNode');
      createNode({
        author: waxProsemirrorSchema.authorNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return AuthorService;
}(Service);

var _dec$B, _class$B, _temp$z;
var EpigraphPoetry = (_dec$B = inversify.injectable(), _dec$B(_class$B = (_temp$z = /*#__PURE__*/function (_Tools) {
  _inherits(EpigraphPoetry, _Tools);

  var _super = _createSuper(EpigraphPoetry);

  function EpigraphPoetry() {
    var _this;

    _classCallCheck(this, EpigraphPoetry);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to Epigraph Poetry';
    _this.content = 'Epigraph Poetry';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(EpigraphPoetry, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.epigraphPoetry, {
          "class": 'epigraph-poetry'
        })(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.epigraphPoetry)(state);
      };
    }
  }]);

  return EpigraphPoetry;
}(Tools), _temp$z)) || _class$B);

var EpigraphPoetryService = /*#__PURE__*/function (_Service) {
  _inherits(EpigraphPoetryService, _Service);

  var _super = _createSuper(EpigraphPoetryService);

  function EpigraphPoetryService() {
    _classCallCheck(this, EpigraphPoetryService);

    return _super.apply(this, arguments);
  }

  _createClass(EpigraphPoetryService, [{
    key: "register",
    // boot() {}
    value: function register() {
      this.container.bind('EpigraphPoetry').to(EpigraphPoetry);
      var createNode = this.container.get('CreateNode');
      createNode({
        epigraphPoetry: waxProsemirrorSchema.epigraphPoetryNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return EpigraphPoetryService;
}(Service);

var _dec$C, _class$C, _temp$A;
var EpigraphProse = (_dec$C = inversify.injectable(), _dec$C(_class$C = (_temp$A = /*#__PURE__*/function (_Tools) {
  _inherits(EpigraphProse, _Tools);

  var _super = _createSuper(EpigraphProse);

  function EpigraphProse() {
    var _this;

    _classCallCheck(this, EpigraphProse);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to Epigraph Prose';
    _this.content = 'Epigraph Prose';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(EpigraphProse, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.epigraphProse, {
          "class": 'epigraph-prose'
        })(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.epigraphProse)(state);
      };
    }
  }]);

  return EpigraphProse;
}(Tools), _temp$A)) || _class$C);

var EpigraphProseService = /*#__PURE__*/function (_Service) {
  _inherits(EpigraphProseService, _Service);

  var _super = _createSuper(EpigraphProseService);

  function EpigraphProseService() {
    _classCallCheck(this, EpigraphProseService);

    return _super.apply(this, arguments);
  }

  _createClass(EpigraphProseService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind('EpigraphProse').to(EpigraphProse);
      var createNode = this.container.get('CreateNode');
      createNode({
        epigraphProse: waxProsemirrorSchema.epigraphProseNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return EpigraphProseService;
}(Service);

var _dec$D, _class$D, _temp$B;
var Heading1 = (_dec$D = inversify.injectable(), _dec$D(_class$D = (_temp$B = /*#__PURE__*/function (_Tools) {
  _inherits(Heading1, _Tools);

  var _super = _createSuper(Heading1);

  function Heading1() {
    var _this;

    _classCallCheck(this, Heading1);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to heading level 1';
    _this.content = 'Heading 1';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(Heading1, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.heading, {
          level: 1
        })(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.heading, {
          level: 1
        })(state);
      };
    }
  }]);

  return Heading1;
}(Tools), _temp$B)) || _class$D);

var _dec$E, _class$E, _temp$C;
var Heading2 = (_dec$E = inversify.injectable(), _dec$E(_class$E = (_temp$C = /*#__PURE__*/function (_Tools) {
  _inherits(Heading2, _Tools);

  var _super = _createSuper(Heading2);

  function Heading2() {
    var _this;

    _classCallCheck(this, Heading2);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to heading level 2';
    _this.content = 'Heading 2';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(Heading2, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.heading, {
          level: 2
        })(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.heading, {
          level: 2
        })(state);
      };
    }
  }]);

  return Heading2;
}(Tools), _temp$C)) || _class$E);

var _dec$F, _class$F, _temp$D;
var Heading3 = (_dec$F = inversify.injectable(), _dec$F(_class$F = (_temp$D = /*#__PURE__*/function (_Tools) {
  _inherits(Heading3, _Tools);

  var _super = _createSuper(Heading3);

  function Heading3() {
    var _this;

    _classCallCheck(this, Heading3);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to heading level 3';
    _this.content = 'Heading 3';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(Heading3, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.heading, {
          level: 3
        })(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.heading, {
          level: 3
        })(state);
      };
    }
  }]);

  return Heading3;
}(Tools), _temp$D)) || _class$F);

var HeadingService = /*#__PURE__*/function (_Service) {
  _inherits(HeadingService, _Service);

  var _super = _createSuper(HeadingService);

  function HeadingService() {
    _classCallCheck(this, HeadingService);

    return _super.apply(this, arguments);
  }

  _createClass(HeadingService, [{
    key: "register",
    // boot() {}
    value: function register() {
      this.container.bind('Heading1').to(Heading1);
      this.container.bind('Heading2').to(Heading2);
      this.container.bind('Heading3').to(Heading3);
      var createNode = this.container.get('CreateNode');
      createNode({
        heading: waxProsemirrorSchema.headingNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return HeadingService;
}(Service);

var _dec$G, _class$G, _temp$E;
var SubTitle = (_dec$G = inversify.injectable(), _dec$G(_class$G = (_temp$E = /*#__PURE__*/function (_Tools) {
  _inherits(SubTitle, _Tools);

  var _super = _createSuper(SubTitle);

  function SubTitle() {
    var _this;

    _classCallCheck(this, SubTitle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to Subtitle';
    _this.content = 'Subtitle';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(SubTitle, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.subtitle, {
          "class": 'cst'
        })(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.subtitle)(state);
      };
    }
  }]);

  return SubTitle;
}(Tools), _temp$E)) || _class$G);

var SubTitleService = /*#__PURE__*/function (_Service) {
  _inherits(SubTitleService, _Service);

  var _super = _createSuper(SubTitleService);

  function SubTitleService() {
    _classCallCheck(this, SubTitleService);

    return _super.apply(this, arguments);
  }

  _createClass(SubTitleService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("SubTitle").to(SubTitle);
      var createNode = this.container.get("CreateNode");
      createNode({
        subtitle: waxProsemirrorSchema.subTitleNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return SubTitleService;
}(Service);

var _dec$H, _class$H, _temp$F;
var Title = (_dec$H = inversify.injectable(), _dec$H(_class$H = (_temp$F = /*#__PURE__*/function (_Tools) {
  _inherits(Title, _Tools);

  var _super = _createSuper(Title);

  function Title() {
    var _this;

    _classCallCheck(this, Title);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Change to Title';
    _this.content = 'Title';

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(Title, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.title, {
          "class": 'title'
        })(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return waxProsemirrorUtilities.Commands.setBlockType(state.config.schema.nodes.title)(state);
      };
    }
  }]);

  return Title;
}(Tools), _temp$F)) || _class$H);

var TitleService = /*#__PURE__*/function (_Service) {
  _inherits(TitleService, _Service);

  var _super = _createSuper(TitleService);

  function TitleService() {
    _classCallCheck(this, TitleService);

    return _super.apply(this, arguments);
  }

  _createClass(TitleService, [{
    key: "boot",
    value: function boot() {}
  }, {
    key: "register",
    value: function register() {
      this.container.bind("Title").to(Title);
      var createNode = this.container.get("CreateNode");
      createNode({
        title: waxProsemirrorSchema.titleNode
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return TitleService;
}(Service);

var DisplayServices = [new AuthorService(), new EpigraphProseService(), new EpigraphPoetryService(), new HeadingService(), new SubTitleService(), new TitleService()];

var DisplayBlockLevelService = /*#__PURE__*/function (_Service) {
  _inherits(DisplayBlockLevelService, _Service);

  var _super = _createSuper(DisplayBlockLevelService);

  function DisplayBlockLevelService() {
    var _this;

    _classCallCheck(this, DisplayBlockLevelService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.dependencies = DisplayServices;
    return _this;
  }

  return DisplayBlockLevelService;
}(Service);

var _dec$I, _class$I, _temp$G;
var Note = (_dec$I = inversify.injectable(), _dec$I(_class$I = (_temp$G = /*#__PURE__*/function (_Tools) {
  _inherits(Note, _Tools);

  var _super = _createSuper(Note);

  function Note() {
    var _this;

    _classCallCheck(this, Note);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Insert Note';
    _this.content = waxProsemirrorComponents.icons.footnote;

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(Note, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        var _state$selection = state.selection,
            empty = _state$selection.empty,
            $from = _state$selection.$from,
            $to = _state$selection.$to,
            content = prosemirrorModel.Fragment.empty;
        if (!empty && $from.sameParent($to) && $from.parent.inlineContent) content = $from.parent.content.cut($from.parentOffset, $to.parentOffset);
        var footnote = state.config.schema.nodes.footnote.create({
          id: uuid.v4()
        }, content);
        dispatch(state.tr.replaceSelectionWith(footnote));
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return true;
      };
    }
  }]);

  return Note;
}(Tools), _temp$G)) || _class$I);

var transformPasted = function transformPasted(slice, view) {
  var content = slice.content;
  var commentNodes = waxProsemirrorUtilities.DocumentHelpers.findChildrenByMark(content, view.state.schema.marks.comment, true);
  var allComments = [];
  commentNodes.map(function (node) {
    node.node.marks.map(function (comment) {
      if (comment.type.name === "comment") {
        allComments.push(comment);
      }
    });
  });
  var groupedCommentsById = allComments.reduce(function (obj, mark) {
    obj[mark.attrs.id] = [].concat(_toConsumableArray(obj[mark.attrs.id] || []), [mark]);
    return obj;
  }, {});
  lodash.forEach(Object.keys(groupedCommentsById), function (key) {
    var id = uuid.v4();
    lodash.forEach(groupedCommentsById[key], function (comment) {
      comment.attrs.id = id;
    });
  });
  return slice;
};

var Editor = (function (_ref) {
  var node = _ref.node,
      view = _ref.view;
  var editorRef = React.useRef();
  var context = React.useContext(waxProsemirrorCore.WaxContext);
  var noteId = node.attrs.id;
  var noteView;
  React.useEffect(function () {
    noteView = new prosemirrorView.EditorView({
      mount: editorRef.current
    }, {
      state: prosemirrorState.EditorState.create({
        doc: node,
        plugins: [prosemirrorKeymap.keymap(createKeyBindings())].concat(_toConsumableArray(context.app.getPlugins()))
      }),
      // This is the magic part
      dispatchTransaction: dispatchTransaction,
      handleDOMEvents: {
        mousedown: function mousedown() {
          context.updateView({}, noteId); // Kludge to prevent issues due to the fact that the whole
          // footnote is node-selected (and thus DOM-selected) when
          // the parent editor is focused.

          if (noteView.hasFocus()) noteView.focus();
        }
      },
      transformPasted: function transformPasted$1(slice) {
        return transformPasted(slice, noteView);
      }
    }); // Set Each note into Wax's Context

    context.updateView(_defineProperty({}, noteId, noteView), noteId);

    if (context.view[noteId]) {
      context.view[noteId].focus();
    }
  }, []);

  var dispatchTransaction = function dispatchTransaction(transaction) {
    // const tr = TrackChange.enabled
    //   ? trackedTransaction(transaction, view.state, user)
    //   : transaction;
    var _noteView$state$apply = noteView.state.applyTransaction(transaction),
        state = _noteView$state$apply.state,
        transactions = _noteView$state$apply.transactions;

    noteView.updateState(state);
    var allNotes = waxProsemirrorUtilities.DocumentHelpers.findChildrenByType(view.state.doc, view.state.schema.nodes.footnote, true);
    var noteFound = lodash.filter(allNotes, {
      node: {
        attrs: {
          id: noteId
        }
      }
    }); // TODO Remove timeout and use state to check if noteView has changed

    setTimeout(function () {
      context.updateView({}, noteId);
    }, 20);

    if (!transaction.getMeta('fromOutside')) {
      var outerTr = view.state.tr;
      var offsetMap = prosemirrorTransform.StepMap.offset(noteFound[0].pos + 1);

      for (var i = 0; i < transactions.length; i + 1) {
        var steps = transactions[i].steps;

        for (var j = 0; j < steps.length; j + 1) {
          outerTr.step(steps[j].map(offsetMap));
        }
      }

      if (outerTr.docChanged) view.dispatch(outerTr.setMeta('outsideView', 'notes'));
    }
  };

  var createKeyBindings = function createKeyBindings() {
    var keys = getKeys();
    Object.keys(prosemirrorCommands.baseKeymap).forEach(function (key) {
      keys[key] = prosemirrorCommands.baseKeymap[key];
    });
    return keys;
  };

  var getKeys = function getKeys() {
    return {
      'Mod-z': function ModZ() {
        return prosemirrorHistory.undo(view.state, view.dispatch);
      },
      'Mod-y': function ModY() {
        return prosemirrorHistory.redo(view.state, view.dispatch);
      } // 'Mod-u': () => Commands.markActive(noteView.state.config.schema.marks.underline)(noteView.state),

    };
  };

  if (context.view[noteId]) {
    var state = context.view[noteId].state;
    var start = node.content.findDiffStart(state.doc.content);

    if (start != null) {
      var _node$content$findDif = node.content.findDiffEnd(state.doc.content),
          endA = _node$content$findDif.a,
          endB = _node$content$findDif.b;

      var overlap = start - Math.min(endA, endB);

      if (overlap > 0) {
        endA += overlap;
        endB += overlap;
      }

      context.view[noteId].dispatch(state.tr.replace(start, endB, node.slice(start, endA)).setMeta('fromOutside', true));
    }
  }

  return /*#__PURE__*/React__default.createElement(waxProsemirrorComponents.NoteEditorContainer, {
    ref: editorRef
  });
});

var NoteEditor = (function (_ref) {
  var notes = _ref.notes,
      view = _ref.view;
  return /*#__PURE__*/React__default.createElement(React.Fragment, null, notes.map(function (note) {
    return /*#__PURE__*/React__default.createElement(Editor, {
      key: note.node.attrs.id,
      node: note.node,
      view: view
    });
  }));
});

var NoteComponent = (function () {
  var _useContext = React.useContext(waxProsemirrorCore.WaxContext),
      main = _useContext.view.main;

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      notes = _useState2[0],
      setNotes = _useState2[1];

  React.useEffect(function () {
    setNotes(updateNotes(main));
  }, [JSON.stringify(updateNotes(main))]);
  var noteComponent = React.useMemo(function () {
    return /*#__PURE__*/React__default.createElement(NoteEditor, {
      notes: notes,
      view: main
    });
  }, [notes]);
  return /*#__PURE__*/React__default.createElement(React.Fragment, null, noteComponent);
});

var updateNotes = function updateNotes(view) {
  if (view) {
    return waxProsemirrorUtilities.DocumentHelpers.findChildrenByType(view.state.doc, view.state.schema.nodes.footnote, true);
  }

  return [];
};

var NoteService = /*#__PURE__*/function (_Service) {
  _inherits(NoteService, _Service);

  var _super = _createSuper(NoteService);

  function NoteService() {
    var _this;

    _classCallCheck(this, NoteService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = "NoteService";
    return _this;
  }

  _createClass(NoteService, [{
    key: "boot",
    value: function boot() {
      var layout = this.container.get("Layout");
      var createOverlay = this.container.get("CreateOverlay");
      layout.addComponent("notesArea", NoteComponent);
      createOverlay(waxProsemirrorComponents.CommentBubbleComponent, {
        showComment: function showComment(activeViewId) {
          return activeViewId !== "main";
        },
        group: "notes"
      }, {
        markType: "",
        followCursor: false,
        selection: true
      });
    }
  }, {
    key: "register",
    value: function register() {
      var createNode = this.container.get("CreateNode");
      this.container.bind("Note").to(Note);
      createNode({
        footnote: waxProsemirrorSchema.footNoteNode
      });
    }
  }]);

  return NoteService;
}(Service);

var PLUGIN_KEY$1 = 'commentPlugin';

var CommentsService = /*#__PURE__*/function (_Service) {
  _inherits(CommentsService, _Service);

  var _super = _createSuper(CommentsService);

  function CommentsService() {
    _classCallCheck(this, CommentsService);

    return _super.apply(this, arguments);
  }

  _createClass(CommentsService, [{
    key: "boot",
    value: function boot() {
      this.app.PmPlugins.add(PLUGIN_KEY$1, waxProsemirrorPlugins.CommentPlugin(PLUGIN_KEY$1));
      var createOverlay = this.container.get('CreateOverlay');
      var layout = this.container.get('Layout');
      createOverlay(waxProsemirrorComponents.CommentBubbleComponent, {
        showComment: function showComment(activeViewId) {
          return activeViewId === 'main';
        },
        group: 'main'
      }, {
        markType: '',
        followCursor: false,
        selection: true
      });
      layout.addComponent('rightArea', waxProsemirrorComponents.RightArea);
    }
  }, {
    key: "register",
    value: function register() {
      var createMark = this.container.get('CreateMark');
      createMark({
        comment: waxProsemirrorSchema.commentMark
      }, {
        toWaxSchema: true
      });
    }
  }]);

  return CommentsService;
}(Service);

var _dec$J, _class$J, _temp$H;
var CodeBlockTool = (_dec$J = inversify.injectable(), _dec$J(_class$J = (_temp$H = /*#__PURE__*/function (_Tools) {
  _inherits(CodeBlockTool, _Tools);

  var _super = _createSuper(CodeBlockTool);

  function CodeBlockTool() {
    var _this;

    _classCallCheck(this, CodeBlockTool);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.title = 'Insert Code Block';
    _this.content = waxProsemirrorComponents.icons.code_block;

    _this.select = function (state, activeViewId) {
      if (activeViewId !== 'main') return false;
      return true;
    };

    return _this;
  }

  _createClass(CodeBlockTool, [{
    key: "run",
    get: function get() {
      return function (state, dispatch) {
        prosemirrorCommands.setBlockType(state.config.schema.nodes.code_block)(state, dispatch);
      };
    }
  }, {
    key: "enable",
    get: function get() {
      return function (state) {
        return prosemirrorCommands.setBlockType(state.config.schema.nodes.code_block)(state);
      };
    }
  }]);

  return CodeBlockTool;
}(Tools), _temp$H)) || _class$J);

var CodeBlockService = /*#__PURE__*/function (_Service) {
  _inherits(CodeBlockService, _Service);

  var _super = _createSuper(CodeBlockService);

  function CodeBlockService() {
    _classCallCheck(this, CodeBlockService);

    return _super.apply(this, arguments);
  }

  _createClass(CodeBlockService, [{
    key: "boot",
    value: function boot() {
      this.app.PmPlugins.add('highlightPlugin', waxProsemirrorPlugins.highlightPlugin());
    }
  }, {
    key: "register",
    value: function register() {
      this.container.bind('CodeBlockTool').to(CodeBlockTool);
      var createNode = this.container.get('CreateNode');
      createNode({
        code_block: waxProsemirrorSchema.codeBlockNode
      });
    }
  }]);

  return CodeBlockService;
}(Service);

var _dec$K, _class$K, _temp$I;
var Base = (_dec$K = inversify.injectable(), _dec$K(_class$K = (_temp$I = /*#__PURE__*/function (_ToolGroup) {
  _inherits(Base, _ToolGroup);

  var _super = _createSuper(Base);

  function Base(undo, redo) {
    var _this;

    _classCallCheck(this, Base);

    _this = _super.call(this);
    _this.tools = [];
    _this.tools = [undo, redo];
    return _this;
  }

  Base = inversify.inject('Redo')(Base, undefined, 1) || Base;
  Base = inversify.inject('Undo')(Base, undefined, 0) || Base;
  return Base;
}(ToolGroup), _temp$I)) || _class$K);

var BaseToolGroupService = /*#__PURE__*/function (_Service) {
  _inherits(BaseToolGroupService, _Service);

  var _super = _createSuper(BaseToolGroupService);

  function BaseToolGroupService() {
    _classCallCheck(this, BaseToolGroupService);

    return _super.apply(this, arguments);
  }

  _createClass(BaseToolGroupService, [{
    key: "register",
    value: function register() {
      this.container.bind('Base').to(Base);
    }
  }]);

  return BaseToolGroupService;
}(Service);

var _dec$L, _class$L, _temp$J;
var Annotations = (_dec$L = inversify.injectable(), _dec$L(_class$L = (_temp$J = /*#__PURE__*/function (_ToolGroup) {
  _inherits(Annotations, _ToolGroup);

  var _super = _createSuper(Annotations);

  function Annotations(code, emphasis, link, strikethrough, strong, subscript, superscript, underline, smallcaps) {
    var _this;

    _classCallCheck(this, Annotations);

    _this = _super.call(this);
    _this.tools = [];
    _this.tools = [strong, emphasis, code, link, strikethrough, underline, subscript, superscript, smallcaps];
    return _this;
  }

  Annotations = inversify.inject("SmallCaps")(Annotations, undefined, 8) || Annotations;
  Annotations = inversify.inject("Underline")(Annotations, undefined, 7) || Annotations;
  Annotations = inversify.inject("Superscript")(Annotations, undefined, 6) || Annotations;
  Annotations = inversify.inject("Subscript")(Annotations, undefined, 5) || Annotations;
  Annotations = inversify.inject("Strong")(Annotations, undefined, 4) || Annotations;
  Annotations = inversify.inject("StrikeThrough")(Annotations, undefined, 3) || Annotations;
  Annotations = inversify.inject("Link")(Annotations, undefined, 2) || Annotations;
  Annotations = inversify.inject("Emphasis")(Annotations, undefined, 1) || Annotations;
  Annotations = inversify.inject("Code")(Annotations, undefined, 0) || Annotations;
  return Annotations;
}(ToolGroup), _temp$J)) || _class$L);

var AnnotationToolGroupService = /*#__PURE__*/function (_Service) {
  _inherits(AnnotationToolGroupService, _Service);

  var _super = _createSuper(AnnotationToolGroupService);

  function AnnotationToolGroupService() {
    var _this;

    _classCallCheck(this, AnnotationToolGroupService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = "AnnotationToolGroupService";
    return _this;
  }

  _createClass(AnnotationToolGroupService, [{
    key: "register",
    value: function register() {
      this.container.bind("Annotations").to(Annotations);
    }
  }]);

  return AnnotationToolGroupService;
}(Service);

var _dec$M, _class$M, _temp$K;
var Lists = (_dec$M = inversify.injectable(), _dec$M(_class$M = (_temp$K = /*#__PURE__*/function (_ToolGroup) {
  _inherits(Lists, _ToolGroup);

  var _super = _createSuper(Lists);

  function Lists(orderedlist, bulletlist, joinup, lift) {
    var _this;

    _classCallCheck(this, Lists);

    _this = _super.call(this);
    _this.tools = [];
    _this.tools = [orderedlist, bulletlist, joinup, lift];
    return _this;
  }

  Lists = inversify.inject("Lift")(Lists, undefined, 3) || Lists;
  Lists = inversify.inject("JoinUp")(Lists, undefined, 2) || Lists;
  Lists = inversify.inject("BulletList")(Lists, undefined, 1) || Lists;
  Lists = inversify.inject("OrderedList")(Lists, undefined, 0) || Lists;
  return Lists;
}(ToolGroup), _temp$K)) || _class$M);

var ListToolGroupService = /*#__PURE__*/function (_Service) {
  _inherits(ListToolGroupService, _Service);

  var _super = _createSuper(ListToolGroupService);

  function ListToolGroupService() {
    _classCallCheck(this, ListToolGroupService);

    return _super.apply(this, arguments);
  }

  _createClass(ListToolGroupService, [{
    key: "register",
    value: function register() {
      this.container.bind('Lists').to(Lists);
    }
  }]);

  return ListToolGroupService;
}(Service);

var _dec$N, _class$N, _temp$L;
var Images = (_dec$N = inversify.injectable(), _dec$N(_class$N = (_temp$L = /*#__PURE__*/function (_ToolGroup) {
  _inherits(Images, _ToolGroup);

  var _super = _createSuper(Images);

  function Images(image) {
    var _this;

    _classCallCheck(this, Images);

    _this = _super.call(this);
    _this.tools = [];
    _this.tools = [image];
    return _this;
  }

  Images = inversify.inject("Image")(Images, undefined, 0) || Images;
  return Images;
}(ToolGroup), _temp$L)) || _class$N);

var ImageToolGroupService = /*#__PURE__*/function (_Service) {
  _inherits(ImageToolGroupService, _Service);

  var _super = _createSuper(ImageToolGroupService);

  function ImageToolGroupService() {
    _classCallCheck(this, ImageToolGroupService);

    return _super.apply(this, arguments);
  }

  _createClass(ImageToolGroupService, [{
    key: "register",
    value: function register() {
      this.container.bind('Images').to(Images);
    }
  }]);

  return ImageToolGroupService;
}(Service);

var _dec$O, _class$O, _temp$M;
var Tables = (_dec$O = inversify.injectable(), _dec$O(_class$O = (_temp$M = /*#__PURE__*/function (_ToolGroup) {
  _inherits(Tables, _ToolGroup);

  var _super = _createSuper(Tables);

  function Tables(table, tableDropDownOptions) {
    var _this;

    _classCallCheck(this, Tables);

    _this = _super.call(this);
    _this.tools = [];
    _this.tools = [table, tableDropDownOptions];
    return _this;
  }

  Tables = inversify.inject("TableDropDownOptions")(Tables, undefined, 1) || Tables;
  Tables = inversify.inject("Table")(Tables, undefined, 0) || Tables;
  return Tables;
}(ToolGroup), _temp$M)) || _class$O);

var TableToolGroupService = /*#__PURE__*/function (_Service) {
  _inherits(TableToolGroupService, _Service);

  var _super = _createSuper(TableToolGroupService);

  function TableToolGroupService() {
    _classCallCheck(this, TableToolGroupService);

    return _super.apply(this, arguments);
  }

  _createClass(TableToolGroupService, [{
    key: "register",
    value: function register() {
      this.container.bind('Tables').to(Tables);
    }
  }]);

  return TableToolGroupService;
}(Service);

var _dec$P, _class$P, _temp$N;
var Display = (_dec$P = inversify.injectable(), _dec$P(_class$P = (_temp$N = /*#__PURE__*/function (_ToolGroup) {
  _inherits(Display, _ToolGroup);

  var _super = _createSuper(Display);

  function Display(author, title, subtitle, epigraphprose, epigraphpoetry, heading1, heading2, heading3) {
    var _this;

    _classCallCheck(this, Display);

    _this = _super.call(this);
    _this.tools = [];
    _this.title = /*#__PURE__*/React__default.createElement(waxProsemirrorComponents.LeftMenuTitle, {
      title: "Display"
    });
    _this.tools = [title, author, subtitle, epigraphprose, epigraphpoetry, heading1, heading2, heading3];
    return _this;
  }

  Display = inversify.inject("Heading3")(Display, undefined, 7) || Display;
  Display = inversify.inject("Heading2")(Display, undefined, 6) || Display;
  Display = inversify.inject("Heading1")(Display, undefined, 5) || Display;
  Display = inversify.inject("EpigraphPoetry")(Display, undefined, 4) || Display;
  Display = inversify.inject("EpigraphProse")(Display, undefined, 3) || Display;
  Display = inversify.inject("SubTitle")(Display, undefined, 2) || Display;
  Display = inversify.inject("Title")(Display, undefined, 1) || Display;
  Display = inversify.inject("Author")(Display, undefined, 0) || Display;
  return Display;
}(ToolGroup), _temp$N)) || _class$P);

var DisplayToolGroupService = /*#__PURE__*/function (_Service) {
  _inherits(DisplayToolGroupService, _Service);

  var _super = _createSuper(DisplayToolGroupService);

  function DisplayToolGroupService() {
    _classCallCheck(this, DisplayToolGroupService);

    return _super.apply(this, arguments);
  }

  _createClass(DisplayToolGroupService, [{
    key: "register",
    value: function register() {
      this.container.bind('Display').to(Display);
    }
  }]);

  return DisplayToolGroupService;
}(Service);

var _dec$Q, _class$Q, _temp$O;
var Text = (_dec$Q = inversify.injectable(), _dec$Q(_class$Q = (_temp$O = /*#__PURE__*/function (_ToolGroup) {
  _inherits(Text, _ToolGroup);

  var _super = _createSuper(Text);

  function Text(paragraph, paragraphContinued, extractProse, extractPoetry, sourceNote, blockQuote) {
    var _this;

    _classCallCheck(this, Text);

    _this = _super.call(this);
    _this.tools = [];
    _this.title = /*#__PURE__*/React__default.createElement(waxProsemirrorComponents.LeftMenuTitle, {
      title: "Text"
    });
    _this.tools = [paragraph, paragraphContinued, extractProse, extractPoetry, sourceNote, blockQuote];
    return _this;
  }

  Text = inversify.inject("BlockQuote")(Text, undefined, 5) || Text;
  Text = inversify.inject("SourceNote")(Text, undefined, 4) || Text;
  Text = inversify.inject("ExtractPoetry")(Text, undefined, 3) || Text;
  Text = inversify.inject("ExtractProse")(Text, undefined, 2) || Text;
  Text = inversify.inject("ParagraphContinued")(Text, undefined, 1) || Text;
  Text = inversify.inject("Paragraph")(Text, undefined, 0) || Text;
  return Text;
}(ToolGroup), _temp$O)) || _class$Q);

var TextToolGroupService = /*#__PURE__*/function (_Service) {
  _inherits(TextToolGroupService, _Service);

  var _super = _createSuper(TextToolGroupService);

  function TextToolGroupService() {
    _classCallCheck(this, TextToolGroupService);

    return _super.apply(this, arguments);
  }

  _createClass(TextToolGroupService, [{
    key: "register",
    value: function register() {
      this.container.bind('Text').to(Text);
    }
  }]);

  return TextToolGroupService;
}(Service);

var _dec$R, _class$R, _temp$P;
var Notes = (_dec$R = inversify.injectable(), _dec$R(_class$R = (_temp$P = /*#__PURE__*/function (_ToolGroup) {
  _inherits(Notes, _ToolGroup);

  var _super = _createSuper(Notes);

  function Notes(note) {
    var _this;

    _classCallCheck(this, Notes);

    _this = _super.call(this);
    _this.tools = [];
    _this.tools = [note];
    return _this;
  }

  Notes = inversify.inject("Note")(Notes, undefined, 0) || Notes;
  return Notes;
}(ToolGroup), _temp$P)) || _class$R);

var NoteToolGroupService = /*#__PURE__*/function (_Service) {
  _inherits(NoteToolGroupService, _Service);

  var _super = _createSuper(NoteToolGroupService);

  function NoteToolGroupService() {
    _classCallCheck(this, NoteToolGroupService);

    return _super.apply(this, arguments);
  }

  _createClass(NoteToolGroupService, [{
    key: "register",
    value: function register() {
      this.container.bind('Notes').to(Notes);
    }
  }]);

  return NoteToolGroupService;
}(Service);

var _dec$S, _class$S, _temp$Q;
var CodeBlock = (_dec$S = inversify.injectable(), _dec$S(_class$S = (_temp$Q = /*#__PURE__*/function (_ToolGroup) {
  _inherits(CodeBlock, _ToolGroup);

  var _super = _createSuper(CodeBlock);

  function CodeBlock(codeblock) {
    var _this;

    _classCallCheck(this, CodeBlock);

    _this = _super.call(this);
    _this.tools = [];
    _this.tools = [codeblock];
    return _this;
  }

  CodeBlock = inversify.inject('CodeBlockTool')(CodeBlock, undefined, 0) || CodeBlock;
  return CodeBlock;
}(ToolGroup), _temp$Q)) || _class$S);

var CodeBlockToolGroupService = /*#__PURE__*/function (_Service) {
  _inherits(CodeBlockToolGroupService, _Service);

  var _super = _createSuper(CodeBlockToolGroupService);

  function CodeBlockToolGroupService() {
    _classCallCheck(this, CodeBlockToolGroupService);

    return _super.apply(this, arguments);
  }

  _createClass(CodeBlockToolGroupService, [{
    key: "register",
    value: function register() {
      this.container.bind('CodeBlock').to(CodeBlock);
    }
  }]);

  return CodeBlockToolGroupService;
}(Service);

var _dec$T, _class$T, _temp$R;
var TrackChange = (_dec$T = inversify.injectable(), _dec$T(_class$T = (_temp$R = /*#__PURE__*/function (_ToolGroup) {
  _inherits(TrackChange, _ToolGroup);

  var _super = _createSuper(TrackChange);

  function TrackChange(enableTrackChange, acceptTrackChange, rejectTrackChange) {
    var _this;

    _classCallCheck(this, TrackChange);

    _this = _super.call(this);
    _this.tools = [];
    _this.tools = [enableTrackChange, acceptTrackChange, rejectTrackChange];
    return _this;
  }

  TrackChange = inversify.inject('RejectTrackChange')(TrackChange, undefined, 2) || TrackChange;
  TrackChange = inversify.inject('AcceptTrackChange')(TrackChange, undefined, 1) || TrackChange;
  TrackChange = inversify.inject('EnableTrackChange')(TrackChange, undefined, 0) || TrackChange;
  return TrackChange;
}(ToolGroup), _temp$R)) || _class$T);

var TrackChangeToolGroupService = /*#__PURE__*/function (_Service) {
  _inherits(TrackChangeToolGroupService, _Service);

  var _super = _createSuper(TrackChangeToolGroupService);

  function TrackChangeToolGroupService() {
    _classCallCheck(this, TrackChangeToolGroupService);

    return _super.apply(this, arguments);
  }

  _createClass(TrackChangeToolGroupService, [{
    key: "register",
    value: function register() {
      this.container.bind('TrackChange').to(TrackChange);
    }
  }]);

  return TrackChangeToolGroupService;
}(Service);

exports.AnnotationToolGroupService = AnnotationToolGroupService;
exports.BaseService = BaseService;
exports.BaseToolGroupService = BaseToolGroupService;
exports.CodeBlockService = CodeBlockService;
exports.CodeBlockToolGroupService = CodeBlockToolGroupService;
exports.CommentsService = CommentsService;
exports.DisplayBlockLevelService = DisplayBlockLevelService;
exports.DisplayToolGroupService = DisplayToolGroupService;
exports.ImageService = ImageService;
exports.ImageToolGroupService = ImageToolGroupService;
exports.InlineAnnotationsService = InlineAnnotationsService;
exports.LayoutService = LayoutService;
exports.LinkService = LinkService;
exports.ListToolGroupService = ListToolGroupService;
exports.ListsService = ListsService;
exports.MenuService = MenuService;
exports.NoteService = NoteService;
exports.NoteToolGroupService = NoteToolGroupService;
exports.OverlayService = OverlayService;
exports.PlaceholderService = PlaceholderService;
exports.RulesService = RulesService;
exports.SchemaService = SchemaService;
exports.Service = Service;
exports.ShortCutsService = ShortCutsService;
exports.TableToolGroupService = TableToolGroupService;
exports.TablesService = TablesService;
exports.TextBlockLevelService = TextBlockLevelService;
exports.TextToolGroupService = TextToolGroupService;
exports.Tool = Tools;
exports.TrackChangeService = TrackChangeService;
exports.TrackChangeToolGroupService = TrackChangeToolGroupService;
exports.componentPlugin = ComponentPlugin;
exports.trackedTransaction = trackedTransaction;
//# sourceMappingURL=index.js.map
