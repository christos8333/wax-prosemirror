'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var debounce = _interopDefault(require('lodash/debounce'));
var styled = _interopDefault(require('styled-components'));
var inversify = require('inversify');
require('reflect-metadata');
var deepmerge = _interopDefault(require('deepmerge'));
var lodash = require('lodash');
var waxProsemirrorServices = require('wax-prosemirror-services');
var prosemirrorModel = require('prosemirror-model');
var applyDevTools = _interopDefault(require('prosemirror-dev-tools'));
var prosemirrorState = require('prosemirror-state');
var prosemirrorView = require('prosemirror-view');
require('prosemirror-view/style/prosemirror.css');
var uuid = require('uuid');
var waxProsemirrorUtilities = require('wax-prosemirror-utilities');
var prosemirrorHistory = require('prosemirror-history');
var prosemirrorDropcursor = require('prosemirror-dropcursor');
var prosemirrorGapcursor = require('prosemirror-gapcursor');
require('prosemirror-gapcursor/style/gapcursor.css');

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

var WaxContext = React__default.createContext({
  view: {},
  activeView: {},
  activeViewId: null,
  app: null,
  updateView: null,
  updateActiveView: null
});
var WaxProvider = (function (props) {
  var _useState = React.useState({
    app: props.app,
    view: props.view || {},
    activeView: props.activeView || {},
    activeViewId: props.activeViewId || {},
    updateView: function updateView(newView, activeViewId) {
      var view = Object.assign(context.view, newView);
      var activeView = view[activeViewId || context.activeViewId];
      setContext(_objectSpread2({}, context, {
        view: view,
        activeView: activeView,
        activeViewId: activeViewId || context.activeViewId
      }));
    }
  }),
      _useState2 = _slicedToArray(_useState, 2),
      context = _useState2[0],
      setContext = _useState2[1];

  return /*#__PURE__*/React__default.createElement(WaxContext.Provider, {
    value: _objectSpread2({}, context)
  }, props.children);
});
var useInjection = function useInjection(identifier) {
  var _useContext = React.useContext(WaxContext),
      container = _useContext.app.container;

  if (!container) {
    throw new Error();
  }

  return container.isBound(identifier) ? {
    instance: container.get(identifier)
  } : null;
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

var _dec, _class, _temp;
var Config = (_dec = inversify.injectable(), _dec(_class = (_temp = /*#__PURE__*/function () {
  function Config(config) {
    _classCallCheck(this, Config);

    this._config = {};
    this._config = config;
  }

  Config = inversify.inject('config')(Config, undefined, 0) || Config;

  _createClass(Config, [{
    key: "set",
    value: function set(key, value) {
      lodash.set(this._config, key, value);

      return this._config;
    }
  }, {
    key: "get",
    value: function get(key) {
      return lodash.get(this._config, key);
    }
  }, {
    key: "pushToArray",
    value: function pushToArray(key, value) {
      var oldValue = this.get(key);

      if (oldValue) {
        if (lodash.isArrayLikeObject(value)) {
          value.forEach(function (v) {
            oldValue.push(v);
          });
        } else {
          oldValue.push(value);
        }
      } else {
        oldValue = value;
      }

      this.set(key, oldValue);
      return this;
    }
  }]);

  return Config;
}(), _temp)) || _class);

var defaultConfig = {
  services: [new waxProsemirrorServices.SchemaService(), new waxProsemirrorServices.RulesService(), new waxProsemirrorServices.ShortCutsService(), new waxProsemirrorServices.LayoutService(), new waxProsemirrorServices.MenuService(), new waxProsemirrorServices.OverlayService()]
};

var _dec$1, _class$1, _temp$1;
var PmPlugins = (_dec$1 = inversify.injectable(), _dec$1(_class$1 = (_temp$1 = /*#__PURE__*/function () {
  function PmPlugins() {
    _classCallCheck(this, PmPlugins);

    this._plugins = new Map();
  }

  _createClass(PmPlugins, [{
    key: "add",
    value: function add(key, plugin) {
      this._plugins.set(key, plugin);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return _toConsumableArray(this._plugins.values());
    }
  }, {
    key: "get",
    value: function get(key) {
      return this._plugins.get(key);
    }
  }]);

  return PmPlugins;
}(), _temp$1)) || _class$1);

var Application = /*#__PURE__*/function () {
  function Application(container) {
    _classCallCheck(this, Application);

    this.container = container;
    this.PmPlugins = container.get('PmPlugins');
  }

  _createClass(Application, [{
    key: "registerServices",
    value: function registerServices() {
      var count = 0;

      while (count < this.config.get('config.services').length) {
        var allServices = this.config.get('config.services');
        var service = this.config.get('config.services')[count];
        /*
          set App to every service
          so services can have access to containers and config
          */

        service.setApp(this);

        if (service.dependencies) {
          var servicePos = count;
          allServices.splice.apply(allServices, [servicePos + 1, 0].concat(_toConsumableArray(service.dependencies)));
        }

        if (service.register) {
          service.register();
        }

        count += 1;
      }
    }
  }, {
    key: "setConfig",
    value: function setConfig() {
      this.config = this.container.get('Config');
    }
  }, {
    key: "bootServices",
    value: function bootServices() {
      var services = this.config.get('config.services');
      services.forEach(function (plugin) {
        if (plugin.boot) {
          plugin.boot();
        }
      });
    }
  }, {
    key: "getPlugins",
    value: function getPlugins() {
      return this.PmPlugins.getAll();
    }
  }, {
    key: "getSchema",
    value: function getSchema() {
      this.schema = this.container.get('Schema');
      return this.schema.getSchema();
    }
  }, {
    key: "resetApp",
    value: function resetApp() {
      this.container = {};
      this.config = {};
      this.PmPlugins = {};
      this.schema = {};
    }
  }], [{
    key: "create",
    value: function create(config) {
      /* Merge Core Config with User Config */
      var appConfig = deepmerge({
        config: defaultConfig
      }, config, {
        customMerge: function customMerge(key) {
          if (key === 'services') {
            return function (coreService, configService) {
              return coreService.concat(configService);
            };
          }
        }
      });
      /*
      Create Container
      */

      var container = new inversify.Container();
      /*
       Set base bindings for the App to work
      */

      container.bind('PmPlugins').to(PmPlugins).inSingletonScope();
      container.bind('Wax').toFactory(function () {
        return new Application(container);
      });
      container.bind('config').toConstantValue(appConfig);
      container.bind('Config').to(Config).inSingletonScope();
      /*
      Start the App
      */

      var app = container.get('Wax');
      app.setConfig();
      appConfig.config.PmPlugins.forEach(function (configPlugin) {
        app.PmPlugins.add(configPlugin.key, configPlugin);
      });
      app.registerServices();
      return app;
    }
  }]);

  return Application;
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

var WaxDOMSerializer = /*#__PURE__*/function (_DOMSerializer) {
  _inherits(WaxDOMSerializer, _DOMSerializer);

  var _super = _createSuper(WaxDOMSerializer);

  function WaxDOMSerializer() {
    _classCallCheck(this, WaxDOMSerializer);

    return _super.apply(this, arguments);
  }

  return WaxDOMSerializer;
}(prosemirrorModel.DOMSerializer);

var WaxDOMParser = /*#__PURE__*/function (_DOMParser) {
  _inherits(WaxDOMParser, _DOMParser);

  var _super = _createSuper(WaxDOMParser);

  function WaxDOMParser() {
    _classCallCheck(this, WaxDOMParser);

    return _super.apply(this, arguments);
  }

  return WaxDOMParser;
}(prosemirrorModel.DOMParser);

var transformPasted = function transformPasted(slice, view) {
  var content = slice.content;
  var commentNodes = waxProsemirrorUtilities.DocumentHelpers.findChildrenByMark(content, view.state.schema.marks.comment, true);
  var notes = waxProsemirrorUtilities.DocumentHelpers.findChildrenByType(content, view.state.schema.nodes.footnote, true);
  var allComments = [];
  commentNodes.map(function (node) {
    node.node.marks.map(function (comment) {
      if (comment.type.name === 'comment') {
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
  notes.forEach(function (note) {
    note.node.attrs.id = uuid.v4();
  });
  return slice;
};

var WaxView = (function (props) {
  var readonly = props.readonly,
      onBlur = props.onBlur,
      options = props.options,
      debug = props.debug,
      autoFocus = props.autoFocus,
      user = props.user;
  var editorRef = React.useRef();
  var view;
  var context = React.useContext(WaxContext);
  var setEditorRef = React.useCallback(function (node) {
    if (editorRef.current) ;

    if (node) {
      view = new prosemirrorView.EditorView({
        mount: node
      }, {
        editable: function editable() {
          return !readonly;
        },
        state: prosemirrorState.EditorState.create(options),
        dispatchTransaction: dispatchTransaction,
        user: user,
        handleDOMEvents: {
          blur: onBlur ? function (view) {
            onBlur(view.state.doc.content);
          } : null
        },
        transformPasted: function transformPasted$1(slice) {
          return transformPasted(slice, view);
        }
      });
      context.updateView({
        main: view
      }, 'main');
      if (debug) applyDevTools(view);
      if (autoFocus) view.focus();
      return function () {
        return view.destroy();
      };
    }

    editorRef.current = node;
  }, []);

  var dispatchTransaction = function dispatchTransaction(transaction) {
    var TrackChange = props.TrackChange;
    var tr = TrackChange.enabled ? waxProsemirrorServices.trackedTransaction(transaction, view.state, user) : transaction;
    var state = view.state.apply(tr);
    view.updateState(state);
    /* when a transaction comes from a view other than
      main don't keep updating the view ,as this is
      the central point of each transaction
      */

    if (!transaction.getMeta('outsideView')) {
      context.updateView({
        main: view
      }, 'main');
    }

    props.onChange(state.doc.content);
  };

  var editor = /*#__PURE__*/React__default.createElement("div", {
    ref: setEditorRef
  });
  return props.children({
    editor: editor
  });
});

var defaultPlugins = [prosemirrorDropcursor.dropCursor(), prosemirrorGapcursor.gapCursor(), prosemirrorHistory.history()];

var placeHolderText = new prosemirrorState.PluginKey("placeHolderText");
var Placeholder = (function (props) {
  return new prosemirrorState.Plugin({
    key: placeHolderText,
    props: {
      decorations: function decorations(state) {
        var decorations = [];

        var decorate = function decorate(node, pos) {
          if (node.type.isBlock && node.childCount === 0 && state.doc.content.childCount === 1) {
            decorations.push(prosemirrorView.Decoration.node(pos, pos + node.nodeSize, {
              "class": "empty-node",
              "data-content": props.content
            }));
          }
        };

        state.doc.descendants(decorate);
        return prosemirrorView.DecorationSet.create(state.doc, decorations);
      }
    }
  });
});

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  height: 99%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var parser = function parser(schema) {
  var WaxParser = WaxDOMParser.fromSchema(schema);
  return function (content) {
    var container = document.createElement('article');
    container.innerHTML = content;
    return WaxParser.parse(container);
  };
};

var serializer = function serializer(schema) {
  var WaxSerializer = WaxDOMSerializer.fromSchema(schema);
  return function (content) {
    var container = document.createElement('article');
    container.appendChild(WaxSerializer.serializeFragment(content));
    return container.innerHTML;
  };
};

var schema;

var createApplication = function createApplication(props) {
  var application = Application.create(props);
  schema = application.getSchema();
  application.bootServices();
  return application;
};

var createPlaceholder = function createPlaceholder(placeholder) {
  return Placeholder({
    content: placeholder
  });
};

var LayoutWrapper = styled.div(_templateObject());

var Wax = function Wax(props) {
  var finalPlugins = [];

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      application = _useState2[0],
      setApplication = _useState2[1];

  React.useEffect(function () {
    var newApplication = createApplication(props);
    setApplication(newApplication);
    return function () {
      return newApplication.resetApp();
    };
  }, []);
  var autoFocus = props.autoFocus,
      className = props.className,
      debug = props.debug,
      fileUpload = props.fileUpload,
      layout = props.layout,
      onBlur = props.onBlur,
      placeholder = props.placeholder,
      readonly = props.readonly,
      value = props.value,
      user = props.user,
      onChange = props.onChange;
  if (!application) return null;
  var WaxOnchange = onChange ? onChange : function (value) {
    return true;
  };
  var editorContent = value ? value : '';
  finalPlugins = defaultPlugins.concat([createPlaceholder(placeholder)].concat(_toConsumableArray(application.getPlugins())));
  var WaxOptions = {
    schema: schema,
    plugins: finalPlugins
  };
  var parse = parser(schema);
  var serialize = serializer(schema);
  WaxOptions.doc = parse(editorContent);
  var finalOnChange = debounce(function (value) {
    WaxOnchange(serialize(value));
  }, 1000, {
    maxWait: 5000
  });
  var TrackChange = application.config.get('config.EnableTrackChangeService');
  var Layout = application.container.get('Layout');
  if (layout) Layout.setLayout(layout);
  var WaxRender = Layout.layoutComponent;
  return /*#__PURE__*/React__default.createElement(LayoutWrapper, {
    className: "".concat(className)
  }, /*#__PURE__*/React__default.createElement(WaxProvider, {
    app: application
  }, /*#__PURE__*/React__default.createElement(WaxView, {
    autoFocus: autoFocus,
    readonly: readonly,
    options: WaxOptions,
    placeholder: placeholder,
    fileUpload: fileUpload,
    onBlur: onBlur || function (v) {
      return true;
    },
    onChange: finalOnChange || function (v) {
      return true;
    },
    debug: debug,
    TrackChange: TrackChange,
    user: user
  }, function (_ref) {
    var editor = _ref.editor;
    return /*#__PURE__*/React__default.createElement(WaxRender, {
      editor: editor
    });
  })));
};

exports.Wax = Wax;
exports.WaxContext = WaxContext;
exports.useInjection = useInjection;
//# sourceMappingURL=index.js.map
