import { DocumentHelpers } from 'wax-prosemirror-core';

const findSelectedChanges = state => {
  const { selection } = state;
  const selectedChanges = {
    insertion: false,
    deletion: false,
    formatChange: false,
  };

  let insertionPos = false;
  let deletionPos = false;
  let formatChangePos = false;
  let insertionMark;
  let deletionMark;
  let formatChangeMark;
  let insertionSize;
  let deletionSize;
  let formatChangeSize;

  if (selection.empty) {
    const resolvedPos = state.doc.resolve(selection.from);
    const marks = resolvedPos.marks();

    if (marks) {
      insertionMark = marks.find(
        mark => mark.type.name === 'insertion' && !mark.attrs.approved,
      );

      if (insertionMark) {
        insertionPos = selection.from;
      }
      deletionMark = marks.find(mark => mark.type.name === 'deletion');

      if (deletionMark) {
        deletionPos = selection.from;
      }
      formatChangeMark = marks.find(mark => mark.type.name === 'format_change');

      if (formatChangeMark) {
        formatChangePos = selection.from;
      }
    }
  } else {
    state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
      if (pos < selection.from) {
        return true;
      }
      if (!insertionMark) {
        insertionMark = node.attrs.track
          ? node.attrs.track.find(trackAttr => trackAttr.type === 'insertion')
          : node.marks.find(
              mark => mark.type.name === 'insertion' && !mark.attrs.approved,
            );
        if (insertionMark) {
          insertionPos = pos;
          if (!node.isInline) {
            insertionSize = node.nodeSize;
          }
        }
      }
      if (!deletionMark) {
        deletionMark = node.attrs.track
          ? node.attrs.track.find(trackAttr => trackAttr.type === 'deletion')
          : node.marks.find(mark => mark.type.name === 'deletion');
        if (deletionMark) {
          deletionPos = pos;
          if (!node.isInline) {
            deletionSize = node.nodeSize;
          }
        }
      }
      if (!formatChangeMark) {
        formatChangeMark = node.marks.find(
          mark => mark.type.name === 'format_change',
        );
        if (formatChangeMark) {
          formatChangePos = pos;
          if (!node.isInline) {
            formatChangeSize = node.nodeSize;
          }
        }
      }
      return false;
    });
  }
  if (insertionMark) {
    selectedChanges.insertion = insertionSize
      ? { from: insertionPos, to: insertionPos + insertionSize }
      : DocumentHelpers.findMarkPosition(state, insertionPos, 'insertion');
  }

  if (deletionMark) {
    selectedChanges.deletion = deletionSize
      ? { from: deletionPos, to: deletionPos + deletionSize }
      : DocumentHelpers.findMarkPosition(state, deletionPos, 'deletion');
  }

  if (formatChangeMark) {
    selectedChanges.formatChange = formatChangeSize
      ? { from: formatChangePos, to: formatChangePos + formatChangeSize }
      : DocumentHelpers.findMarkPosition(
          state,
          formatChangePos,
          'format_change',
        );
  }
  return selectedChanges;
};

export default findSelectedChanges;
