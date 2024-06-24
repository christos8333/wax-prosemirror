/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, forwardRef, useMemo } from 'react';
import { DOMSerializer } from 'prosemirror-model';
import CryptoJS from 'crypto-js';
import stringify from 'safe-stable-stringify';
import DefaultSchema from './utilities/schema/DefaultSchema';
import WaxProvider from './WaxContext';
import StateProvider from './StateContext';
import PortalProvider from './PortalContext';
import Application from './Application';
import helpers from './helpers/helpers';

const serializer = schema => {
  const WaxSerializer = DOMSerializer.fromSchema(schema);
  return content => {
    const container = document.createElement('article');
    container.appendChild(WaxSerializer.serializeFragment(content));
    return container.innerHTML;
  };
};

const createApplication = props => {
  const application = Application.create(props);
  return application;
};

const createObjectHash = obj => {
  const str = stringify(obj);
  return CryptoJS.SHA256(str).toString();
};

const createConfigWithHash = config => {
  const configHash = createObjectHash(config);
  return configHash;
};

const Wax = forwardRef((props, innerViewRef) => {
  const {
    autoFocus,
    browserSpellCheck,
    className,
    config,
    customValues,
    fileUpload,
    layout,
    placeholder,
    readonly,
    value,
    user,
    onChange,
    targetFormat,
    scrollMargin,
    scrollThreshold,
  } = props;

  const [application, setApplication] = useState();
  const [WaxLayout, setWaxLayout] = useState(null);
  const configHash = createConfigWithHash(config);

  useEffect(() => {
    const newApplication = createApplication(props);
    setApplication(newApplication);
    const Layout = newApplication.container.get('Layout');
    if (layout) Layout.setLayout(layout);
    setWaxLayout(Layout.layoutComponent);
  }, [configHash]);

  const finalOnChange = content => {
    if (!onChange) return;
    const { schema } = application.schema;
    helpers.saveContent(content, onChange, schema, serializer, targetFormat);
  };

  const WaxLayoutRender = useMemo(() => {
    if (!application || !WaxLayout) return null;
    return (
      <WaxLayout
        autoFocus={autoFocus}
        browserSpellCheck={browserSpellCheck}
        className={className}
        customValues={customValues}
        fileUpload={fileUpload}
        innerViewRef={innerViewRef}
        onChange={finalOnChange || (() => true)}
        placeholder={placeholder}
        readonly={readonly}
        scrollMargin={scrollMargin}
        scrollThreshold={scrollThreshold}
        serializer={serializer}
        targetFormat={targetFormat}
        TrackChange={
          application.config.get('config.EnableTrackChangeService') || undefined
        }
        user={user}
        value={value}
        {...props}
      />
    );
  }, [application?.id, { ...props }]);

  if (!application || !WaxLayout) return null;

  return (
    <WaxProvider app={application}>
      <StateProvider>
        <PortalProvider>{WaxLayoutRender}</PortalProvider>
      </StateProvider>
    </WaxProvider>
  );
});

Wax.defaultProps = {
  config: { SchemaService: DefaultSchema, services: [] },
  customValues: {},
};

export default Wax;
