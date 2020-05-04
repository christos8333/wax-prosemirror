import React, { useEffect, useState } from "react";
import WaxProvider from "./ioc-react";
import Application from "./Application";

import debounce from "lodash/debounce";
import styled from "styled-components";

import WaxDOMSerializer from "./WaxDOMSerializer";
import WaxDOMParser from "./WaxDOMParser";

import WaxView from "./WaxView";
import defaultPlugins from "./plugins/defaultPlugins";
import Placeholder from "./plugins/placeholder";

const parser = schema => {
  const parser = WaxDOMParser.fromSchema(schema);

  return content => {
    const container = document.createElement("article");
    container.innerHTML = content;
    return parser.parse(container);
  };
};

const serializer = schema => {
  const serializer = WaxDOMSerializer.fromSchema(schema);
  return content => {
    const container = document.createElement("article");
    container.appendChild(serializer.serializeFragment(content));
    return container.innerHTML;
  };
};

const createPlaceholder = placeholder => {
  return Placeholder({ content: placeholder });
};

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 99%;
`;

const Wax = props => {
  let finalPlugins;
  let schema;
  const [application, setApplication] = useState();

  useEffect(() => {
    setApplication(Application.create(props));
  }, []);

  const {
    autoFocus,
    className,
    debug,
    fileUpload,
    layout,
    onBlur,
    placeholder,
    readonly,
    TrackChange,
    value,
    user,
    onChange
  } = props;

  if (!application) return null;

  schema = application.getSchema();
  application.bootServices();

  const WaxOnchange = onChange ? onChange : value => true;

  const editorContent = value ? value : "";

  finalPlugins = defaultPlugins.concat([
    createPlaceholder(placeholder),
    ...application.getPlugins()
  ]);

  const WaxOptions = {
    schema,
    plugins: finalPlugins
  };

  const parse = parser(schema);
  const serialize = serializer(schema);
  WaxOptions.doc = parse(editorContent);

  const finalOnChange = debounce(
    value => {
      WaxOnchange(serialize(value));
    },
    1000,
    { maxWait: 5000 }
  );

  const Layout = application.container.get("Layout");
  if (layout) Layout.setLayout(layout);
  const WaxRender = Layout.layoutComponent;

  return (
    <LayoutWrapper className={`${className}`}>
      <WaxProvider app={application}>
        <WaxView
          autoFocus={autoFocus}
          readonly={readonly}
          options={WaxOptions}
          placeholder={placeholder}
          fileUpload={fileUpload}
          onBlur={onBlur || (value => true)}
          onChange={finalOnChange || (value => true)}
          debug={debug}
          TrackChange={TrackChange}
          user={user}
        >
          {({ editor }) => <WaxRender editor={editor} />}
        </WaxView>
      </WaxProvider>
    </LayoutWrapper>
  );
};
export default Wax;
