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

const getMarkPosition = ($start, mark) => {
  let startIndex = $start.index(),
    endIndex = $start.indexAfter();
  while (
    startIndex > 0 &&
    mark.isInSet($start.parent.child(startIndex - 1).marks)
  )
    startIndex--;
  while (
    endIndex < $start.parent.childCount &&
    mark.isInSet($start.parent.child(endIndex).marks)
  )
    endIndex++;
  let startPos = $start.start(),
    endPos = startPos;
  for (let i = 0; i < endIndex; i++) {
    let size = $start.parent.child(i).nodeSize;
    if (i < startIndex) startPos += size;
    endPos += size;
  }
  return { from: startPos, to: endPos };
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

export { markActive, blockActive, canInsert, createTable, getMarkPosition };
