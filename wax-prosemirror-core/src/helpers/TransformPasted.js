/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { forEach, each } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const transformPasted = (slice, view) => {
  const { content } = slice;
  if (view.state.schema.marks.comment) {
    const commentNodes = DocumentHelpers.findChildrenByMark(
      content,
      view.state.schema.marks.comment,
      true,
    );

    const allComments = [];

    commentNodes.map(node => {
      node.node.marks.map(comment => {
        if (comment.type.name === 'comment') {
          allComments.push(comment);
        }
      });
    });

    const groupedCommentsById = allComments.reduce((obj, mark) => {
      obj[mark.attrs.id] = [...(obj[mark.attrs.id] || []), mark];
      return obj;
    }, {});

    forEach(Object.keys(groupedCommentsById), key => {
      const id = uuidv4();
      forEach(groupedCommentsById[key], comment => {
        comment.attrs.id = id;
      });
    });
  }

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
