/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, forwardRef } from 'react';
import { DOMSerializer } from 'prosemirror-model';
import CryptoJS from 'crypto-js';
import stringify from 'safe-stable-stringify';
import DefaultSchema from './utilities/schema/DefaultSchema';
import WaxProvider from './WaxContext';
import PortalProvider from './PortalContext';
import ApplicationProvider from './ApplicationContext';
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
  const { config, layout, onChange, targetFormat } = props;

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

  if (!application || !WaxLayout) return null;

  return (
    <ApplicationProvider app={application}>
      <WaxProvider>
        <PortalProvider>
          <WaxLayout
            {...props}
            app={application}
            innerViewRef={innerViewRef}
            onChange={finalOnChange || (() => true)}
            serializer={serializer}
            TrackChange={
              application.config.get('config.EnableTrackChangeService') ||
              undefined
            }
          />
        </PortalProvider>
      </WaxProvider>
    </ApplicationProvider>
  );
});

Wax.defaultProps = {
  config: { SchemaService: DefaultSchema, services: [] },
  customValues: {},
};

export default Wax;
