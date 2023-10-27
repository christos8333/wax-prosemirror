import { DOMParser } from 'prosemirror-model';
import Placeholder from './config/plugins/placeholder';
import defaultPlugins from './config/plugins/defaultPlugins';

const parser = schema => {
  const WaxParser = DOMParser.fromSchema(schema);

  return content => {
    const container = document.createElement('article');

    container.innerHTML = content;
    return WaxParser.parse(container, {
      preserveWhitespace: true,
    });
  };
};

export default ({ placeholder, targetFormat, value, schema, plugins }) => {
  let finalPlugins = [];

  const createPlaceholder = () => {
    return Placeholder({ content: placeholder });
  };

  finalPlugins = defaultPlugins.concat([
    createPlaceholder(placeholder),
    ...plugins,
  ]);

  const WaxOptions = {
    doc: {},
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
