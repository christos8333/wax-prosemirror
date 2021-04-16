/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import { DOMSerializer } from 'prosemirror-model';

import WaxProvider from './WaxContext';
import PortalProvider from './PortalContext';
import Application from './Application';

import WaxView from './WaxView';

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

const Wax = props => {
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
    targetFormat,
  } = props;

  if (!application) return null;
  const WaxOnchange = onChange || (v => true);

  const finalOnChange = schema =>
    debounce(
      // eslint-disable-next-line no-shadow
      value => {
        /* HACK  alter toDOM of footnote, because of how PM treats inline nodes
      with content */
        if (schema.nodes.footnote) {
          const old = schema.nodes.footnote.spec.toDOM;
          schema.nodes.footnote.spec.toDOM = node => {
            // eslint-disable-next-line prefer-rest-params
            old.apply(this);
            return ['footnote', node.attrs, 0];
          };
        }

        if (targetFormat === 'JSON') {
          WaxOnchange(value);
        } else {
          const serialize = serializer(schema);
          WaxOnchange(serialize(value));
        }

        if (schema.nodes.footnote) {
          const old = schema.nodes.footnote.spec.toDOM;
          schema.nodes.footnote.spec.toDOM = node => {
            // eslint-disable-next-line prefer-rest-params
            old.apply(this);
            return ['footnote', node.attrs];
          };
        }
      },
      1000,
      { maxWait: 5000 },
    );
  const TrackChange = application.config.get('config.EnableTrackChangeService');

  const Layout = application.container.get('Layout');
  if (layout) Layout.setLayout(layout);
  const WaxRender = Layout.layoutComponent;
  return (
    <WaxProvider app={application}>
      <PortalProvider>
        <WaxView
          autoFocus={autoFocus}
          debug={debug}
          fileUpload={fileUpload}
          onBlur={onBlur || (v => true)}
          onChange={finalOnChange || (v => true)}
          placeholder={placeholder}
          readonly={readonly}
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
};

Wax.defaultProps = {
  config: { services: [] },
};

export default Wax;
