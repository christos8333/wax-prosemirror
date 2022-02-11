/* eslint react/prop-types: 0 */
import React, { useEffect, useState, forwardRef } from 'react';
import { each } from 'lodash';
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
    /* HACK  alter toDOM of footnote, because of how PM treats inline nodes
      with content */
    const { schema } = application.schema;
    const notes = [];
    each(schema.nodes, node => {
      if (node.groups.includes('notes')) notes.push(node);
    });

    if (notes.length > 0) {
      notes.forEach(note => {
        schema.nodes[note.name].spec.toDOM = node => {
          // eslint-disable-next-line prefer-rest-params
          if (node) return [note.name, node.attrs, 0];
        };
      });
    }

    if (targetFormat === 'JSON') {
      WaxOnchange(content);
    } else {
      const serialize = serializer(schema);
      WaxOnchange(serialize(content));
    }

    if (notes.length > 0) {
      notes.forEach(note => {
        schema.nodes[note.name].spec.toDOM = node => {
          // eslint-disable-next-line prefer-rest-params
          if (node) return [note.name, node.attrs];
        };
      });
    }
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
  config: { services: [] },
};

export default Wax;
