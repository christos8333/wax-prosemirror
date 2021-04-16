import { DOMParser } from 'prosemirror-model';
import Placeholder from './plugins/placeholder';
import defaultPlugins from './plugins/defaultPlugins';

const parser = schema => {
  const WaxParser = DOMParser.fromSchema(schema);

  return content => {
    const container = document.createElement('article');

    container.innerHTML = content;
    return WaxParser.parse(container);
  };
};

export default ({ placeholder, targetFormat, value, schema, plugins }) => {
  let finalPlugins = [];

  // eslint-disable-next-line no-shadow
  const createPlaceholder = placeholder => {
    return Placeholder({ content: placeholder });
  };

  finalPlugins = defaultPlugins.concat([
    createPlaceholder(placeholder),
    ...plugins,
  ]);

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
