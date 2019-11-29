import React, { Component } from "react";
import WaxProvider from "./ioc-react";
import container from "./ioc";
import LayoutService from "./services/LayoutService/LayoutService";

import debounce from "lodash/debounce";
import styled from "styled-components";

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

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 99%;
`;

class Wax extends Component {
  constructor(props) {
    super(props);
    const { options } = props;
    const { services } = options;

    services.push(new LayoutService());
    services.map(plugin => {
      if (plugin.register) {
        plugin.register();
      }
    });
  }
  componentWillMount() {
    const { value, onChange, options } = this.props;
    const { schema, plugins, keys, rules, services } = options;
    const WaxOnchange = onChange ? onChange : value => true;

    const WaxShortCuts = keys
      ? keys
      : new CreateShortCuts({ schema: schema, shortCuts: {} });

    const WaxRules = new CreateRules({ schema: schema, rules: rules });

    const editorContent = value ? value : "";

    if (plugins) defaultPlugins.push(...plugins);

    const finalPlugins = defaultPlugins.concat([
      placeholder({ content: this.props.placeholder }),
      WaxShortCuts,
      WaxRules
    ]);

    this.WaxOptions = {
      schema,
      plugins: finalPlugins
    };

    const parse = parser(schema);
    const serialize = serializer(schema);
    this.WaxOptions.doc = parse(editorContent);

    services.map(plugin => {
      if (plugin.register) {
        plugin.boot();
      }
    });

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
      debug,
      TrackChange,
      user,
      layout
    } = this.props;

    const Layout = container.get("Layout");
    if (layout) {
      Layout.setLayout(layout);
    }
    const WaxRender = Layout.layoutComponent;

    return (
      <LayoutWrapper className={`${className}`}>
        <WaxView
          autoFocus={autoFocus}
          readonly={readonly}
          options={this.WaxOptions}
          placeholder={placeholder}
          fileUpload={fileUpload}
          onBlur={onBlur || (value => true)}
          onChange={this.onChange || (value => true)}
          debug={debug}
          TrackChange={TrackChange}
          user={user}
        >
          {({ view, editor }) => (
            <WaxProvider view={view} container={container}>
              <WaxRender editor={editor} />
            </WaxProvider>
          )}
        </WaxView>
      </LayoutWrapper>
    );
  }
}

export default Wax;
