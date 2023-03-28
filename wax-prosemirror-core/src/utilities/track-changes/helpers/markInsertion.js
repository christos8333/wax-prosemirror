/* eslint-disable no-else-return */
import { v4 as uuidv4 } from 'uuid';

const markInsertion = (tr, from, to, user, date, group, viewId) => {
  tr.removeMark(from, to, tr.doc.type.schema.marks.deletion);
  tr.removeMark(from, to, tr.doc.type.schema.marks.insertion);

  const insertionMark = tr.doc.type.schema.marks.insertion.create({
    user: user.userId,
    username: user.username,
    style: `color: ${user.userColor.addition};`,
    // date
  });

  tr.addMark(from, to, insertionMark);
  // Add insertion mark also to block nodes (figures, text blocks) but not table cells/rows and lists.
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (
      pos < from ||
      ['bullet_list', 'ordered_list'].includes(node.type.name)
    ) {
      return true;
    } else if (
      node.isInline ||
      ['table_row', 'table_cell'].includes(node.type.name)
    ) {
      return false;
    }
    if (node.attrs.track) {
      const track = [];

      track.push({
        type: 'insertion',
        user: user.userId,
        username: user.username,
        date,
        group,
        viewid: viewId,
      });
      tr.setNodeMarkup(
        pos,
        null,
        // eslint-disable-next-line prefer-object-spread
        Object.assign({}, node.attrs, {
          track,
          group,
          id: uuidv4(),
        }),
        node.marks,
      );
    }
    if (node.type.name === 'table') {
      // A table was inserted. We don't add track marks to elements inside of it.
      return false;
    }
  });
};

export default markInsertion;
