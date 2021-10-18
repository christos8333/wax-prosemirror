/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { each } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const transformPasted = (slice, view) => {
  const { content } = slice;

  const schemaNotes = [];
  each(view.state.schema.nodes, node => {
    if (node.groups.includes('notes')) schemaNotes.push(node);
  });

  if (schemaNotes.length > 0) {
    schemaNotes.forEach(schemaNote => {
      const notes = DocumentHelpers.findChildrenByType(
        content,
        view.state.schema.nodes[schemaNote.name],
        true,
      );

      notes.forEach(note => {
        note.node.attrs.id = uuidv4();
      });
    });
  }

  return slice;
};

export default transformPasted;
