/* eslint react/prop-types: 0 */
import React, { useEffect, useState, forwardRef } from 'react';
import { DOMSerializer } from 'prosemirror-model';
import DefaultSchema from './utilities/schema/DefaultSchema';
import WaxProvider from './WaxContext';
import PortalProvider from './PortalContext';
import Application from './Application';
import WaxView from './WaxView';
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

const Wax = forwardRef((props, ref) => {
  const [application, setApplication] = useState();

  useEffect(() => {
    const newApplication = createApplication(props);
    setApplication(newApplication);
    return () => newApplication.resetApp();
  }, []);

  const {
    autoFocus,
    browserSpellCheck,
    className,
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

  if (!application) return null;

  const finalOnChange = content => {
    if (!onChange) return;
    const { schema } = application.schema;
    helpers.saveContent(content, onChange, schema, serializer, targetFormat);
  };

  const Layout = application.container.get('Layout');
  if (layout) Layout.setLayout(layout);
  const WaxRender = Layout.layoutComponent;
  return (
    <WaxProvider app={application}>
      <PortalProvider>
        <WaxView
          autoFocus={autoFocus}
          browserSpellCheck={browserSpellCheck}
          customValues={customValues}
          fileUpload={fileUpload}
          onChange={finalOnChange || (() => true)}
          placeholder={placeholder}
          readonly={readonly}
          ref={ref}
          scrollMargin={scrollMargin}
          scrollThreshold={scrollThreshold}
          serializer={serializer}
          targetFormat={targetFormat}
          TrackChange={
            application.config.get('config.EnableTrackChangeService') ||
            undefined
          }
          user={user}
          value={value}
        >
          {({ editor }) => <WaxRender className={className} editor={editor} />}
        </WaxView>
      </PortalProvider>
    </WaxProvider>
  );
});

Wax.defaultProps = {
  config: { SchemaService: DefaultSchema, services: [] },
  customValues: {},
};

export default Wax;
