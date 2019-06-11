import React, { Component } from "react";
import debounce from "lodash/debounce";

import { DOMParser, DOMSerializer } from "prosemirror-model";

import WaxView from "./WaxView";
import defaultPlugins from "./config/defaultPlugins";
import placeholder from "./config/plugins/placeholder";

import CreateShortCuts from "./config/classes/CreateShortCuts";
import CreateRules from "./config/classes/CreateRules";

const parser = schema => {
  const parser = DOMParser.fromSchema(schema);

  return content => {
    const container = document.createElement("article");
    container.innerHTML = content;
    return parser.parse(container);
  };
};

const serializer = schema => {
  const serializer = DOMSerializer.fromSchema(schema);

  return content => {
    const container = document.createElement("article");
    container.appendChild(serializer.serializeFragment(content));
    return container.innerHTML;
  };
};

class Wax extends Component {
  componentWillMount() {
    const { value, onChange, options } = this.props;
    const { schema, plugins, keys, rules } = options;
    const WaxOnchange = onChange ? onChange : value => true;

    const WaxKeys =
      options && options.keys
        ? options.keys
        : new CreateShortCuts({ schema: schema, shortCuts: {} });

    const WaxRules = new CreateRules({ schema: schema, rules: rules });

    const editorContent = value ? value : "";

    defaultPlugins.push(
      ...[placeholder({ content: this.props.placeholder }), WaxKeys, WaxRules]
    );

    if (plugins) defaultPlugins.push(...plugins);

    this.WaxOptions = {
      schema,
      plugins: defaultPlugins
    };

    const parse = parser(schema);
    const serialize = serializer(schema);
    this.WaxOptions.doc = parse(editorContent);

    this.onChange = debounce(
      value => {
        WaxOnchange(serialize(value));
      },
      1000,
      { maxWait: 5000 }
    );
  }

  render() {
    const {
      autoFocus,
      children,
      placeholder,
      renderLayout,
      fileUpload,
      readonly,
      className,
      value,
      onBlur,
      layout,
      theme,
      debug
    } = this.props;

    const defaultRender = ({ editor, state, dispatch, fileUpload }) => (
      <React.Fragment>{editor}</React.Fragment>
    );

    const WaxRender = children.length ? children : defaultRender;
    const WaxLayout = layout
      ? `wax-container wax-l-${layout}`
      : "wax-container";
    return (
      <div className={`${WaxLayout} ${className}`}>
        <WaxView
          autoFocus={autoFocus}
          readonly={readonly}
          options={this.WaxOptions}
          placeholder={placeholder}
          fileUpload={fileUpload}
          // renderLayout={WaxRender}
          theme={theme}
          onBlur={onBlur || (value => true)}
          onChange={this.onChange || (value => true)}
          debug={debug}
        >
          {WaxRender}
        </WaxView>
      </div>
    );
  }
}

export default Wax;
