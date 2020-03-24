const markActive = type => state => {
  const { from, $from, to, empty } = state.selection;

  return empty
    ? type.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, type);
};

const blockActive = (type, attrs = {}) => state => {
  const { $from, to, node } = state.selection;

  if (node) {
    return node.hasMarkup(type, attrs);
  }

  return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
};

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

const createTable = (state, dispatch) => {
  let rowCount = window && window.prompt("How many rows?", 2);
  let colCount = window && window.prompt("How many columns?", 2);

  const cells = [];
  while (colCount--) {
    cells.push(state.config.schema.nodes.table_cell.createAndFill());
  }

  const rows = [];
  while (rowCount--) {
    rows.push(state.config.schema.nodes.table_row.createAndFill(null, cells));
  }

  const table = state.config.schema.nodes.table.createAndFill(null, rows);
  dispatch(state.tr.replaceSelectionWith(table));
};

const createLink = (state, dispatch) => {
  const { selection: { $from, $to } } = state;
  dispatch(
    state.tr
      .setMeta("addToHistory", false)
      .addMark($from.pos, $to.pos, state.schema.marks.link.create({ href: "" }))
  );
};

const createComment = (state, dispatch, user) => {
  const { selection: { $from, $to } } = state;
  dispatch(
    state.tr.setMeta("addToHistory", false).addMark(
      $from.pos,
      $to.pos,
      state.schema.marks.comment.create({
        userId: user.userId,
        conversation: {}
      })
    )
  );
};

export default {
  markActive,
  blockActive,
  canInsert,
  createTable,
  createLink,
  createComment
};
