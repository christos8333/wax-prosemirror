/* eslint-disable no-param-reassign */
import { each } from 'lodash';

const alterNotesSchema = schema => {
  const notes = [];
  each(schema.nodes, node => {
    if (node.groups.includes('notes')) notes.push(node);
  });
  if (notes.length > 0) {
    notes.forEach(note => {
      schema.nodes[note.name].spec.toDOM = node => {
        if (node) return [note.name, node.attrs, 0];
        return true;
      };
    });
  }
};

const revertNotesSchema = schema => {
  const notes = [];
  each(schema.nodes, node => {
    if (node.groups.includes('notes')) notes.push(node);
  });
  if (notes.length > 0) {
    notes.forEach(note => {
      schema.nodes[note.name].spec.toDOM = node => {
        if (node) return [note.name, node.attrs];
        return true;
      };
    });
  }
};

const getDocContent = (schema, serializer, targetFormat, context) => {
  let content = '';
  alterNotesSchema(schema);
  if (targetFormat === 'JSON') {
    content = context.app.context.pmViews.main.state.doc.content.toJSON();
  } else {
    const serialize = serializer(schema);
    content = serialize(context.app.context.pmViews.main.state.doc.content);
  }
  revertNotesSchema(schema);

  return content;
};

const saveContent = (content, onChange, schema, serializer, targetFormat) => {
  alterNotesSchema(schema);
  if (targetFormat === 'JSON') {
    onChange(content);
  } else {
    const serialize = serializer(schema);
    onChange(serialize(content));
  }
  revertNotesSchema(schema);
};

export default {
  getDocContent,
  saveContent,
};
