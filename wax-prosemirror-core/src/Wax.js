/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import styled from 'styled-components';

import { DOMSerializer, DOMParser } from 'prosemirror-model';

import WaxProvider from './WaxContext';
import Application from './Application';

import WaxView from './WaxView';
import defaultPlugins from './plugins/defaultPlugins';
import Placeholder from './plugins/placeholder';

const parser = schema => {
  const WaxParser = DOMParser.fromSchema(schema);

  return content => {
    const container = document.createElement('article');
    container.innerHTML = content;
    return WaxParser.parse(container);
  };
};

const serializer = schema => {
  const WaxSerializer = DOMSerializer.fromSchema(schema);
  return content => {
    const container = document.createElement('article');
    container.appendChild(WaxSerializer.serializeFragment(content));
    return container.innerHTML;
  };
};

let schema;
const createApplication = props => {
  const application = Application.create(props);
  schema = application.getSchema();
  application.bootServices();
  return application;
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
  let finalPlugins = [];
  const [application, setApplication] = useState();

  useEffect(() => {
    const newApplication = createApplication(props);
    setApplication(newApplication);
    return () => newApplication.resetApp();
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
    value,
    user,
    onChange,
  } = props;

  if (!application) return null;

  const WaxOnchange = onChange ? onChange : value => true;

  const editorContent = value || '';

  finalPlugins = defaultPlugins.concat([
    createPlaceholder(placeholder),
    ...application.getPlugins(),
  ]);

  const WaxOptions = {
    schema,
    plugins: finalPlugins,
  };

  const parse = parser(schema);
  WaxOptions.doc = parse(editorContent);

  const finalOnChange = debounce(
    value => {
      /* HACK alter toDOM of footnote, because of how PM treats inline nodes
      with content */
      if (schema.nodes.footnote) {
        const old = schema.nodes.footnote.spec.toDOM;
        schema.nodes.footnote.spec.toDOM = function (node) {
          old.apply(this, arguments);
          return ['footnote', node.attrs, 0];
        };
      }

      const serialize = serializer(schema);
      WaxOnchange(serialize(value));
    },
    1000,
    { maxWait: 5000 },
  );
  const TrackChange = application.config.get('config.EnableTrackChangeService');

  const Layout = application.container.get('Layout');
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
          onBlur={onBlur || (v => true)}
          onChange={finalOnChange || (v => true)}
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
