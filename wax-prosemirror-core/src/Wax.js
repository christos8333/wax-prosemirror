/* eslint react/prop-types: 0 */
import React, { useEffect, useState, forwardRef } from 'react';
import { DOMSerializer } from 'prosemirror-model';
import { DefaultSchema } from 'wax-prosemirror-utilities';
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
    debug,
    fileUpload,
    layout,
    placeholder,
    readonly,
    value,
    user,
    onChange,
    targetFormat,
  } = props;

  if (!application) return null;
  const WaxOnchange = onChange || (v => true);

  const finalOnChange = content => {
    const { schema } = application.schema;
    helpers.alterNotesSchema(schema);
    if (targetFormat === 'JSON') {
      WaxOnchange(content);
    } else {
      const serialize = serializer(schema);
      WaxOnchange(serialize(content));
    }
    helpers.revertNotesSchema(schema);
  };

  const TrackChange = application.config.get('config.EnableTrackChangeService');

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
          debug={debug}
          fileUpload={fileUpload}
          onChange={finalOnChange || (v => true)}
          placeholder={placeholder}
          readonly={readonly}
          ref={ref}
          serializer={serializer}
          targetFormat={targetFormat}
          TrackChange={TrackChange}
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
};

export default Wax;
