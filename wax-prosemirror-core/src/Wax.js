import React, { Component } from "react";
import WaxProvider from "./ioc-react";
import Application from "./Application";

import debounce from "lodash/debounce";
import styled from "styled-components";

import { DOMParser, DOMSerializer } from "prosemirror-model";

import WaxView from "./WaxView";
import defaultPlugins from "./plugins/defaultPlugins";
import placeholder from "./plugins/placeholder";

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
  application = {};
  constructor(props) {
    super(props);
    this.application = Application.create(props);
    this.application.bootServices();

    const { value, onChange, options } = this.props;
    const { schema } = options;
    const WaxOnchange = onChange ? onChange : value => true;

    const editorContent = value ? value : "";

    const finalPlugins = defaultPlugins.concat([
      placeholder({ content: this.props.placeholder }),
      ...this.application.getPlugins()
    ]);

    this.WaxOptions = {
      schema,
      plugins: finalPlugins
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
      placeholder,
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

    const Layout = this.application.container.get("Layout");
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
            <WaxProvider view={view} app={this.application}>
              <WaxRender editor={editor} />
            </WaxProvider>
          )}
        </WaxView>
      </LayoutWrapper>
    );
  }
}

export default Wax;
