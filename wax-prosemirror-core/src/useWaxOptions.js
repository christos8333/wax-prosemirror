import { useContext } from 'react';
import { DOMParser } from 'prosemirror-model';
import { WaxContext } from './WaxContext';
import { PortalContext } from './PortalContext';
import Placeholder from './plugins/placeholder';
import PortalPlugin from './plugins/portalPlugin';
import defaultPlugins from './plugins/defaultPlugins';

const parser = schema => {
  const WaxParser = DOMParser.fromSchema(schema);

  return content => {
    const container = document.createElement('article');

    container.innerHTML = content;
    return WaxParser.parse(container);
  };
};

export default ({ placeholder, targetFormat, value }) => {
  const context = useContext(WaxContext);
  const { createPortal } = useContext(PortalContext);

  let finalPlugins = [];

  // eslint-disable-next-line no-shadow
  const createPlaceholder = placeholder => {
    return Placeholder({ content: placeholder });
  };

  context.app.PmPlugins.add('portalPlugin', PortalPlugin({ createPortal }));

  finalPlugins = defaultPlugins.concat([
    createPlaceholder(placeholder),
    ...context.app.getPlugins(),
  ]);

  const schema = context.app.getSchema();

  const WaxOptions = {
    schema,
    plugins: finalPlugins,
  };

  if (targetFormat === 'JSON') {
    const editorContent = value || {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: ' ',
            },
          ],
        },
      ],
    };
    WaxOptions.doc = schema.nodeFromJSON(editorContent);
  } else {
    const editorContent = value || '';
    const parse = parser(schema);
    WaxOptions.doc = parse(editorContent);
  }

  return WaxOptions;
};
