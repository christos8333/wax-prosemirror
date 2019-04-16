import React, { Component } from "react";
import debounce from "lodash/debounce";

import { DOMParser, DOMSerializer } from "prosemirror-model";

import Editor from "./Editor";
import WaxSchema from "./config/classes/WaxSchema";
import plugins from "./config/plugins";
import placeholder from "./config/plugins/placeholder";

import MainMenuBar from "./components/menu/MainMenuBar";
import defaultMenuItems from "./config/DefaultMenuItems";
import WaxKeys from "./config/classes/WaxKeys";

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
    const { schema } = options;
    const WaxOnchange = onChange ? onChange : value => true;

    const keys =
      options && options.keys
        ? options.keys
        : new WaxKeys({ schema: schema, shortCuts: {} });

    const editorContent = value ? value : "";
    // TO DO Find a way to start plugins with options
    plugins.push(...[placeholder({ content: this.props.placeholder }), keys]);

    this.WaxOptions = options
      ? options
      : {
          plugins,
          schema
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
      renderLayout,
      fileUpload,
      readonly,
      value,
      onBlur,
      layout,
      theme,
      debug
    } = this.props;
    const defaultRender = ({ editor, state, dispatch, fileUpload }) => (
      <React.Fragment>{editor}</React.Fragment>
    );

    const WaxRender = renderLayout ? renderLayout : defaultRender;
    const WaxLayout = layout
      ? `wax-container wax-l-${layout}`
      : "wax-container";
    return (
      <div className={WaxLayout}>
        <Editor
          autoFocus={autoFocus}
          readonly={readonly}
          options={this.WaxOptions}
          placeholder={placeholder}
          fileUpload={fileUpload}
          renderLayout={WaxRender}
          theme={theme}
          onBlur={onBlur || (value => true)}
          onChange={this.onChange || (value => true)}
          debug={debug}
        />
      </div>
    );
  }
}

export default Wax;
