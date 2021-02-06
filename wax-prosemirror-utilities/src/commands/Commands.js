import { v4 as uuidv4 } from 'uuid';
import { toggleMark } from 'prosemirror-commands';
import { AddMarkStep } from 'prosemirror-transform';

const setBlockType = (nodeType, attrs = {}) => {
  return (state, dispatch) => {
    const { tr } = state;
    const { from, to } = state.selection;
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (!node.isTextblock || node.hasMarkup(nodeType, attrs)) return;
      let applicable = false;
      if (node.type === nodeType) {
        applicable = true;
      } else {
        const $pos = state.doc.resolve(pos);
        const index = $pos.index();
        applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType);
      }
      if (applicable) {
        tr.setBlockType(
          from,
          to,
          nodeType,
          Object.assign({}, node.attrs, attrs),
        );
      }
    });
    if (!tr.steps.length) return false;
    if (dispatch) dispatch(tr.scrollIntoView());
    return true;
  };
};

const markActive = type => state => {
  const { from, $from, to, empty } = state.selection;

  const mark = empty
    ? type.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, type);
  if (mark) return true;
  return false;
};

const blockActive = (nodeType, attrs = {}) => {
  return (state, dispatch) => {
    const { from, to } = state.selection;
    let isActive = false;
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (!node.isTextblock || node.hasMarkup(nodeType, attrs)) return;
      if (node.type === nodeType) {
        isActive = true;
      }
    });
    return isActive;
  };
};

const customTagBlockActive = (type, attrs = {}) => state => {};

// const blockActive = (type, attrs = {}) => state => {
//   const { $from, to, node } = state.selection;
//
//   if (node) {
//     return node.hasMarkup(type, attrs);
//   }
//
//   return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
// };

const canInsert = type => state => {
  const { $from } = state.selection;

  for (let d = $from.depth; d >= 0; d--) {
    const index = $from.index(d);

    if ($from.node(d).canReplaceWith(index, index, type)) {
      return true;
    }
  }

  return false;
};

const createTable = (colsRows, state, dispatch) => {
  const cells = [];
  while (colsRows.cols--) {
    cells.push(state.config.schema.nodes.table_cell.createAndFill());
  }

  const rows = [];
  while (colsRows.rows--) {
    rows.push(state.config.schema.nodes.table_row.createAndFill(null, cells));
  }

  const table = state.config.schema.nodes.table.createAndFill(null, rows);
  dispatch(state.tr.replaceSelectionWith(table));
};

const createLink = (state, dispatch) => {
  const {
    selection: { $from, $to },
  } = state;
  dispatch(
    state.tr
      .setMeta('addToHistory', false)
      .addMark(
        $from.pos,
        $to.pos,
        state.schema.marks.link.create({ href: '' }),
      ),
  );
};

const isOnSameTextBlock = state => {
  const {
    selection: { $from, $to, from, to },
  } = state;
  if (from !== to && $from.parent === $to.parent && $from.parent.isTextblock) {
    return true;
  }
  return false;
};

const createComment = (state, dispatch, group, viewid) => {
  const {
    selection: { $from, $to },
  } = state;
  let footnote = false;
  state.doc.nodesBetween($from.pos, $to.pos, (node, from) => {
    if (node.type.name === 'footnote') {
      footnote = true;
    }
  });

  if (footnote) return createCommentOnFootnote(state, dispatch, group, viewid);

  toggleMark(state.config.schema.marks.comment, {
    id: uuidv4(),
    group,
    conversation: [],
    viewid,
  })(state, dispatch);
};

const createCommentOnFootnote = (state, dispatch, group, viewid) => {
  const {
    selection: { $from },
    selection,
    tr,
  } = state;

  const { content } = $from.parent;
  const $pos = state.doc.resolve($from.pos);
  const commentStart = $from.pos - $pos.textOffset;
  const commentEnd = commentStart + $pos.parent.child($pos.index()).nodeSize;

  let start = $from.pos;
  let end = commentEnd;
  const ranges = [];

  const allFragments = [];

  selection.content().content.content.forEach(node => {
    node.content.content.forEach(fragment => {
      allFragments.push(fragment);
    });
  });

  allFragments.forEach((contentNode, index) => {
    start = index === 0 ? start : end;
    end = index === 0 ? end : end + contentNode.nodeSize;
    ranges.push({
      start,
      end,
      footnote: contentNode.type.name === 'footnote',
    });
  });

  const mergedRanges = [];
  ranges.forEach((item, i) => {
    if (item.footnote) {
      mergedRanges[mergedRanges.length - 1].end =
        mergedRanges[mergedRanges.length - 1].end + 1;
    } else {
      mergedRanges.push(item);
    }
  });

  const id = uuidv4();

  mergedRanges.forEach(range => {
    tr.step(
      new AddMarkStep(
        range.start,
        range.end,
        state.config.schema.marks.comment.create({
          id,
          group,
          conversation: [],
          viewid,
        }),
      ),
    );
  });

  dispatch(tr);
};

export default {
  setBlockType,
  blockActive,
  customTagBlockActive,
  canInsert,
  createComment,
  createLink,
  createTable,
  markActive,
  isOnSameTextBlock,
};
