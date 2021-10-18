/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-param-reassign */
import { each } from 'lodash';

const getDocContent = (schema, serializer, targetFormat, context) => {
  /* HACK  alter toDOM of footnote, because of how PM treats inline nodes
      with content */
  let content = '';
  const notes = [];
  each(schema.nodes, node => {
    if (node.groups.includes('notes')) notes.push(node);
  });

  if (notes.length > 0) {
    notes.forEach(note => {
      schema.nodes[note.name].spec.toDOM = singleNode => {
        if (singleNode) return [note.name, singleNode.attrs, 0];
      };
    });
  }

  if (targetFormat === 'JSON') {
    content = context.app.context.view.main.state.doc.content;
  } else {
    const serialize = serializer(schema);
    content = serialize(context.app.context.view.main.state.doc.content);
  }

  if (notes.length > 0) {
    notes.forEach(note => {
      schema.nodes[note.name].spec.toDOM = sinlgeNode => {
        if (sinlgeNode) return [note.name, sinlgeNode.attrs];
      };
    });
  }
  return content;
};

export default getDocContent;
