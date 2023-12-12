/* eslint-disable*/

// src/index.ts
import { Plugin as Plugin2 } from 'prosemirror-state';

// src/cellselection.ts
import { Fragment, Slice } from 'prosemirror-model';
import {
  NodeSelection as NodeSelection2,
  Selection,
  SelectionRange,
  TextSelection,
} from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

// src/util.ts
import { PluginKey } from 'prosemirror-state';

// src/schema.ts
function getCellAttrs(dom, extraAttrs) {
  if (typeof dom === 'string') {
    return {};
  }
  const widthAttr = dom.getAttribute('data-colwidth');
  const widths =
    widthAttr && /^\d+(,\d+)*$/.test(widthAttr)
      ? widthAttr.split(',').map(s => Number(s))
      : null;
  const colspan = Number(dom.getAttribute('colspan') || 1);
  const result = {
    colspan,
    rowspan: Number(dom.getAttribute('rowspan') || 1),
    colwidth: widths && widths.length == colspan ? widths : null,
  };
  for (const prop in extraAttrs) {
    const getter = extraAttrs[prop].getFromDOM;
    const value = getter && getter(dom);
    if (value != null) {
      result[prop] = value;
    }
  }
  return result;
}
function setCellAttrs(node, extraAttrs) {
  const attrs = {};
  if (node.attrs.colspan != 1) attrs.colspan = node.attrs.colspan;
  if (node.attrs.rowspan != 1) attrs.rowspan = node.attrs.rowspan;
  if (node.attrs.colwidth)
    attrs['data-colwidth'] = node.attrs.colwidth.join(',');
  for (const prop in extraAttrs) {
    const setter = extraAttrs[prop].setDOMAttr;
    if (setter) setter(node.attrs[prop], attrs);
  }
  return attrs;
}
function tableNodes(options) {
  const extraAttrs = options.cellAttributes || {};
  const cellAttrs = {
    colspan: { default: 1 },
    rowspan: { default: 1 },
    colwidth: { default: null },
  };
  for (const prop in extraAttrs)
    cellAttrs[prop] = { default: extraAttrs[prop].default };
  return {
    table: {
      // content: 'table_caption? table_head? table_body* table_foot?',
      content: 'table_caption? table_body*',
      tableRole: 'table',
      isolating: true,
      group: options.tableGroup,
      parseDOM: [{ tag: 'table' }],
      toDOM() {
        return ['table', 0];
      },
    },
    table_caption: {
      content: 'block+',
      tableRole: 'caption',
      isolating: true,
      parseDOM: [{ tag: 'caption' }],
      toDOM() {
        return ['caption', 0];
      },
    },
    table_head: {
      content: 'table_row+',
      tableRole: 'head',
      isolating: true,
      parseDOM: [{ tag: 'thead' }],
      toDOM() {
        return ['thead', 0];
      },
    },
    table_foot: {
      content: 'table_row+',
      tableRole: 'foot',
      isolating: true,
      parseDOM: [{ tag: 'tfoot' }],
      toDOM() {
        return ['tfoot', 0];
      },
    },
    table_body: {
      content: 'table_row+',
      tableRole: 'body',
      isolating: true,
      parseDOM: [{ tag: 'tbody' }],
      toDOM() {
        return ['tbody', 0];
      },
    },
    table_row: {
      content: '(table_cell | table_header)*',
      tableRole: 'row',
      parseDOM: [{ tag: 'tr' }],
      toDOM() {
        return ['tr', 0];
      },
    },
    table_cell: {
      content: options.cellContent,
      attrs: cellAttrs,
      tableRole: 'cell',
      isolating: true,
      parseDOM: [{ tag: 'td', getAttrs: dom => getCellAttrs(dom, extraAttrs) }],
      toDOM(node) {
        return ['td', setCellAttrs(node, extraAttrs), 0];
      },
    },
    table_header: {
      content: options.cellContent,
      attrs: cellAttrs,
      tableRole: 'header_cell',
      isolating: true,
      parseDOM: [{ tag: 'th', getAttrs: dom => getCellAttrs(dom, extraAttrs) }],
      toDOM(node) {
        return ['th', setCellAttrs(node, extraAttrs), 0];
      },
    },
  };
}
function tableNodeTypes(schema) {
  let result = schema.cached.tableNodeTypes;
  if (!result) {
    result = schema.cached.tableNodeTypes = {};
    for (const name in schema.nodes) {
      const type = schema.nodes[name],
        role = type.spec.tableRole;
      if (role) result[role] = type;
    }
  }
  return result;
}
function isTableSection(node) {
  const role = node.type.spec.tableRole;
  return role === 'body' || role === 'head' || role === 'foot';
}
function isTableSectionRole(role) {
  return role === 'body' || role === 'head' || role === 'foot';
}

// src/tablemap.ts
var readFromCache;
var addToCache;
if (typeof WeakMap != 'undefined') {
  let cache = /* @__PURE__ */ new WeakMap();
  readFromCache = key => cache.get(key);
  addToCache = (key, value) => {
    cache.set(key, value);
    return value;
  };
} else {
  const cache = [];
  const cacheSize = 10;
  let cachePos = 0;
  readFromCache = key => {
    for (let i = 0; i < cache.length; i += 2)
      if (cache[i] == key) return cache[i + 1];
  };
  addToCache = (key, value) => {
    if (cachePos == cacheSize) cachePos = 0;
    cache[cachePos++] = key;
    return (cache[cachePos++] = value);
  };
}
var TableMap = class {
  constructor(width, height, map, sectionRows, problems) {
    this.width = width;
    this.height = height;
    this.map = map;
    this.sectionRows = sectionRows;
    this.problems = problems;
  }
  // Find the dimensions of the cell at the given position.
  findCell(pos) {
    for (let i = 0; i < this.map.length; i++) {
      const curPos = this.map[i];
      if (curPos != pos) continue;
      const left = i % this.width;
      const top = (i / this.width) | 0;
      let right = left + 1;
      let bottom = top + 1;
      for (let j = 1; right < this.width && this.map[i + j] == curPos; j++) {
        right++;
      }
      for (
        let j = 1;
        bottom < this.height && this.map[i + this.width * j] == curPos;
        j++
      ) {
        bottom++;
      }
      return { left, top, right, bottom };
    }
    throw new RangeError(`No cell with offset ${pos} found`);
  }
  // Find the left side of the cell at the given position.
  colCount(pos) {
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i] == pos) {
        return i % this.width;
      }
    }
    throw new RangeError(`No cell with offset ${pos} found`);
  }
  // Find the next cell in the given direction, starting from the cell
  // at `pos`, if any.
  nextCell(pos, axis, dir) {
    const { left, right, top, bottom } = this.findCell(pos);
    if (axis == 'horiz') {
      if (dir < 0 ? left == 0 : right == this.width) return null;
      return this.map[top * this.width + (dir < 0 ? left - 1 : right)];
    } else {
      if (dir < 0 ? top == 0 : bottom == this.height) return null;
      return this.map[left + this.width * (dir < 0 ? top - 1 : bottom)];
    }
  }
  // Get the rectangle spanning the two given cells.
  rectBetween(a, b) {
    const {
      left: leftA,
      right: rightA,
      top: topA,
      bottom: bottomA,
    } = this.findCell(a);
    const {
      left: leftB,
      right: rightB,
      top: topB,
      bottom: bottomB,
    } = this.findCell(b);
    return {
      left: Math.min(leftA, leftB),
      top: Math.min(topA, topB),
      right: Math.max(rightA, rightB),
      bottom: Math.max(bottomA, bottomB),
    };
  }
  // Return the position of all cells that have the top left corner in
  // the given rectangle.
  cellsInRect(rect) {
    const result = [];
    const seen = {};
    for (let row = rect.top; row < rect.bottom; row++) {
      for (let col = rect.left; col < rect.right; col++) {
        const index = row * this.width + col;
        const pos = this.map[index];
        if (seen[pos]) continue;
        seen[pos] = true;
        if (
          (col == rect.left && col && this.map[index - 1] == pos) ||
          (row == rect.top && row && this.map[index - this.width] == pos)
        ) {
          continue;
        }
        result.push(pos);
      }
    }
    return result;
  }
  // Return the indices of all sections that are touched (overlapped, even partially)
  // by the given rectangle.
  // Indices start from 0 and don't consider the caption, so if there's a caption
  // section n is table.child(n+1), otherwise it's table.child(n)
  sectionsInRect(rect) {
    const result = [];
    const sectionRows = this.sectionRows;
    let top = 0,
      bottom = 0;
    for (let i = 0; i < sectionRows.length; i++) {
      bottom += sectionRows[i];
      if (rect.top < bottom && rect.bottom > top) result.push(i);
      top = bottom;
    }
    return result;
  }
  isLastRowInSection(row) {
    const srows = this.sectionRows;
    let lastRow = 0;
    for (let s = 0; s < srows.length; s++) {
      lastRow += srows[s];
      if (lastRow === row) return true;
      if (lastRow > row) return false;
    }
    return false;
  }
  // Return the position at which the cell at the given row and column
  // starts, or would start, if a cell started there.
  positionAt(row, col, table) {
    for (let i = 0; ; i++) {
      const { node, pos: rowStart } = getRow(table, row);
      const rowEnd = rowStart + node.nodeSize;
      if (i == row) {
        let index = col + row * this.width;
        const rowEndIndex = (row + 1) * this.width;
        while (index < rowEndIndex && this.map[index] < rowStart) index++;
        return index == rowEndIndex ? rowEnd - 1 : this.map[index];
      }
    }
  }
  findSection(pos) {
    const { top } = this.findCell(pos);
    let rows = 0,
      nextRows = 0;
    for (let s = 0; s < this.sectionRows.length; s++) {
      const nextRows2 = rows + this.sectionRows[s];
      if (top < rows)
        return {
          left: 0,
          top: rows,
          right: this.width,
          bottom: nextRows2,
        };
      rows = nextRows2;
    }
    return {
      left: 0,
      top: 0,
      right: this.width,
      bottom: this.height,
    };
  }
  sectionOfRow(row) {
    let countRows = 0;
    for (let i = 0; i < this.sectionRows.length; i++) {
      countRows += this.sectionRows[i];
      if (row < countRows) return i;
    }
    return -1;
  }
  rectOverOneSection(rect) {
    const topSection = this.sectionOfRow(rect.top);
    return topSection >= 0 && topSection == this.sectionOfRow(rect.bottom - 1);
  }
  // Find the table map for the given table node.
  static get(table) {
    return readFromCache(table) || addToCache(table, computeMap(table));
  }
};
function computeMap(table) {
  if (table.type.spec.tableRole != 'table')
    throw new RangeError('Not a table node: ' + table.type.name);
  const width = findWidth(table);
  const height = findHeight(table);
  const tmap = new TableMap(width, height, [], [], null);
  let offset = 0;
  let colWidths = [];
  for (let c = 0; c < table.childCount; c++) {
    const section = table.child(c);
    if (isTableSection(section)) {
      tmap.sectionRows.push(section.childCount);
      let smap = computeSectionMap(section, width, offset + 1, colWidths);
      tmap.map = tmap.map.concat(smap.map);
      if (smap.problems) {
        tmap.problems = (tmap.problems || []).concat(smap.problems);
      }
    }
    offset += section.nodeSize;
  }
  let badWidths = false;
  for (let i = 0; !badWidths && i < colWidths.length; i += 2)
    if (colWidths[i] != null && colWidths[i + 1] < height) badWidths = true;
  if (badWidths) findBadColWidths(tmap, colWidths, table);
  return tmap;
}
function computeSectionMap(section, width, offset, colWidths) {
  if (!isTableSection(section))
    throw new RangeError('Not a table section node: ' + section.type.name);
  const height = section.childCount;
  const map = [];
  let mapPos = 0;
  let problems = null;
  for (let i = 0, e = width * height; i < e; i++) map[i] = 0;
  for (let row = 0, pos = offset; row < height; row++) {
    const rowNode = section.child(row);
    pos++;
    for (let i = 0; ; i++) {
      while (mapPos < map.length && map[mapPos] != 0) mapPos++;
      if (i == rowNode.childCount) break;
      const cellNode = rowNode.child(i);
      const { colspan, rowspan, colwidth } = cellNode.attrs;
      for (let h = 0; h < rowspan; h++) {
        if (h + row >= height) {
          (problems || (problems = [])).push({
            type: 'overlong_rowspan',
            pos,
            n: rowspan - h,
          });
          break;
        }
        const start = mapPos + h * width;
        for (let w = 0; w < colspan; w++) {
          if (map[start + w] == 0) map[start + w] = pos;
          else
            (problems || (problems = [])).push({
              type: 'collision',
              row,
              pos,
              n: colspan - w,
            });
          const colW = colwidth && colwidth[w];
          if (colW) {
            const widthIndex = ((start + w) % width) * 2,
              prev = colWidths[widthIndex];
            if (
              prev == null ||
              (prev != colW && colWidths[widthIndex + 1] == 1)
            ) {
              colWidths[widthIndex] = colW;
              colWidths[widthIndex + 1] = 1;
            } else if (prev == colW) {
              colWidths[widthIndex + 1]++;
            }
          }
        }
      }
      mapPos += colspan;
      pos += cellNode.nodeSize;
    }
    const expectedPos = (row + 1) * width;
    let missing = 0;
    while (mapPos < expectedPos) if (map[mapPos++] == 0) missing++;
    if (missing)
      (problems || (problems = [])).push({ type: 'missing', row, n: missing });
    pos++;
  }
  const tableMap = new TableMap(width, height, map, [], problems);
  return tableMap;
}
function findWidth(table) {
  let width = -1;
  let hasRowSpan = false;
  for (let cIndex = 0; cIndex < table.childCount; cIndex++) {
    const sectionNode = table.child(cIndex);
    if (isTableSection(sectionNode)) {
      for (let row = 0; row < sectionNode.childCount; row++) {
        const rowNode = sectionNode.child(row);
        let rowWidth = 0;
        if (hasRowSpan)
          for (let j = 0; j < row; j++) {
            const prevRow = sectionNode.child(j);
            for (let i = 0; i < prevRow.childCount; i++) {
              const cell = prevRow.child(i);
              if (j + cell.attrs.rowspan > row) rowWidth += cell.attrs.colspan;
            }
          }
        for (let i = 0; i < rowNode.childCount; i++) {
          const cell = rowNode.child(i);
          rowWidth += cell.attrs.colspan;
          if (cell.attrs.rowspan > 1) hasRowSpan = true;
        }
        if (width == -1) width = rowWidth;
        else if (width != rowWidth) width = Math.max(width, rowWidth);
      }
    }
  }
  return width;
}
function findHeight(table) {
  let height = 0;
  for (let cIndex = 0; cIndex < table.childCount; cIndex++) {
    const sectionNode = table.child(cIndex);
    if (isTableSection(sectionNode)) {
      height += sectionNode.childCount;
    }
  }
  return height;
}
function findBadColWidths(map, colWidths, table) {
  if (!map.problems) map.problems = [];
  const seen = {};
  for (let i = 0; i < map.map.length; i++) {
    const pos = map.map[i];
    if (seen[pos]) continue;
    seen[pos] = true;
    const node = table.nodeAt(pos);
    if (!node) {
      throw new RangeError(`No cell with offset ${pos} found`);
    }
    let updated = null;
    const attrs = node.attrs;
    for (let j = 0; j < attrs.colspan; j++) {
      const col = (i + j) % map.width;
      const colWidth = colWidths[col * 2];
      if (
        colWidth != null &&
        (!attrs.colwidth || attrs.colwidth[j] != colWidth)
      )
        (updated || (updated = freshColWidth(attrs)))[j] = colWidth;
    }
    if (updated) {
      map.problems.unshift({
        type: 'colwidth mismatch',
        pos,
        colwidth: updated,
      });
    }
  }
}
function freshColWidth(attrs) {
  if (attrs.colwidth) return attrs.colwidth.slice();
  const result = [];
  for (let i = 0; i < attrs.colspan; i++) result.push(0);
  return result;
}

// src/util.ts
var tableEditingKey = new PluginKey('selectingCells');
function cellAround($pos) {
  for (let d = $pos.depth - 1; d > 0; d--)
    if ($pos.node(d).type.spec.tableRole == 'row')
      return $pos.node(0).resolve($pos.before(d + 1));
  return null;
}
function cellWrapping($pos) {
  for (let d = $pos.depth; d > 0; d--) {
    const role = $pos.node(d).type.spec.tableRole;
    if (role === 'cell' || role === 'header_cell') return $pos.node(d);
  }
  return null;
}
function isInTable(state) {
  const $head = state.selection.$head;
  for (let d = $head.depth; d > 0; d--)
    if ($head.node(d).type.spec.tableRole == 'row') return true;
  return false;
}
function tableDepth($pos) {
  for (let d = $pos.depth; d >= 0; d--)
    if ($pos.node(d).type.spec.tableRole == 'table') return d;
  return -1;
}
function selectionCell(state) {
  const sel = state.selection;
  if ('$anchorCell' in sel && sel.$anchorCell) {
    return sel.$anchorCell.pos > sel.$headCell.pos
      ? sel.$anchorCell
      : sel.$headCell;
  } else if (
    'node' in sel &&
    sel.node &&
    sel.node.type.spec.tableRole == 'cell'
  ) {
    return sel.$anchor;
  }
  const $cell = cellAround(sel.$head) || cellNear(sel.$head);
  if ($cell) {
    return $cell;
  }
  throw new RangeError(`No cell found around position ${sel.head}`);
}
function cellNear($pos) {
  for (
    let after = $pos.nodeAfter, pos = $pos.pos;
    after;
    after = after.firstChild, pos++
  ) {
    const role = after.type.spec.tableRole;
    if (role == 'cell' || role == 'header_cell') return $pos.doc.resolve(pos);
  }
  for (
    let before = $pos.nodeBefore, pos = $pos.pos;
    before;
    before = before.lastChild, pos--
  ) {
    const role = before.type.spec.tableRole;
    if (role == 'cell' || role == 'header_cell')
      return $pos.doc.resolve(pos - before.nodeSize);
  }
}
function pointsAtCell($pos) {
  return $pos.parent.type.spec.tableRole == 'row' && !!$pos.nodeAfter;
}
function moveCellForward($pos) {
  return $pos.node(0).resolve($pos.pos + $pos.nodeAfter.nodeSize);
}
function inSameTable($cellA, $cellB) {
  return (
    $cellA.depth == $cellB.depth &&
    $cellA.pos >= $cellB.start(-2) &&
    $cellA.pos <= $cellB.end(-2)
  );
}
function findCell($pos) {
  return TableMap.get($pos.node(-2)).findCell($pos.pos - $pos.start(-2));
}
function colCount($pos) {
  return TableMap.get($pos.node(-2)).colCount($pos.pos - $pos.start(-2));
}
function nextCell($pos, axis, dir) {
  const table = $pos.node(-2);
  const map = TableMap.get(table);
  const tableStart = $pos.start(-2);
  const moved = map.nextCell($pos.pos - tableStart, axis, dir);
  return moved == null ? null : $pos.node(0).resolve(tableStart + moved);
}
function removeColSpan(attrs, pos, n = 1) {
  const result = { ...attrs, colspan: attrs.colspan - n };
  if (result.colwidth) {
    result.colwidth = result.colwidth.slice();
    result.colwidth.splice(pos, n);
    if (!result.colwidth.some(w => w > 0)) result.colwidth = null;
  }
  return result;
}
function addColSpan(attrs, pos, n = 1) {
  const result = { ...attrs, colspan: attrs.colspan + n };
  if (result.colwidth) {
    result.colwidth = result.colwidth.slice();
    for (let i = 0; i < n; i++) result.colwidth.splice(pos, 0, 0);
  }
  return result;
}
function columnIsHeader(map, table, col) {
  const headerCell = tableNodeTypes(table.type.schema).header_cell;
  for (let row = 0; row < map.height; row++)
    if (table.nodeAt(map.map[col + row * map.width]).type != headerCell)
      return false;
  return true;
}
function rowsCount(table) {
  let count = 0;
  for (let c = 0; c < table.childCount; c++) {
    const section = table.child(c);
    if (isTableSection(section)) count += section.childCount;
  }
  return count;
}
function getRow(table, row) {
  let rPos = 0;
  let prevSectionsRows = 0;
  let sectionIndex = -1;
  for (let tc = 0; tc < table.childCount; tc++) {
    const section = table.child(tc);
    if (isTableSection(section)) {
      sectionIndex++;
      const sectionRows = section.childCount;
      if (sectionRows > 0) {
        if (prevSectionsRows + sectionRows <= row) {
          if (tc === table.childCount - 1) {
            return {
              node: null,
              pos: rPos + section.nodeSize - 1,
              section: sectionIndex,
            };
          }
          rPos += section.nodeSize;
          prevSectionsRows += sectionRows;
        } else {
          rPos++;
          let r = 0;
          while (r < sectionRows) {
            if (prevSectionsRows + r === row) break;
            rPos += section.child(r).nodeSize;
            r++;
          }
          if (r === sectionRows) rPos++;
          return {
            node: r >= sectionRows ? null : section.child(r),
            pos: rPos,
            section: sectionIndex,
          };
        }
      }
    } else {
      rPos += section.nodeSize;
    }
  }
  return { node: null, pos: rPos, section: sectionIndex };
}
function rowPos(table, row) {
  return getRow(
    table,
    row,
    /* debug */
  ).pos;
}
function rowAtPos(table, pos) {
  let rpos = 0;
  let row = 0;
  for (let c = 0; c < table.childCount; c++) {
    const section = table.child(c);
    if (isTableSection(section)) {
      rpos++;
      for (let r = 0; r < section.childCount; r++) {
        rpos += section.child(r).nodeSize;
        if (pos < rpos) return row;
        row++;
      }
      rpos++;
    } else {
      rpos += section.nodeSize;
    }
  }
  return row;
}
function tableHasCaption(table) {
  if (table && table.type.spec.tableRole === 'table') {
    return table.child(0).type.spec.tableRole === 'caption';
  }
  return false;
}
function tableHasHead(table) {
  if (table && table.type.spec.tableRole === 'table') {
    for (let i = 0; i < table.childCount; i++)
      if (table.child(i).type.spec.tableRole === 'head') return true;
  }
  return false;
}
function tableHasFoot(table) {
  if (table && table.type.spec.tableRole === 'table') {
    for (let i = table.childCount - 1; i > 0; i--)
      if (table.child(i).type.spec.tableRole === 'foot') return true;
  }
  return false;
}
function tableBodiesCount(table) {
  let count = 0;
  if (table && table.type.spec.tableRole === 'table') {
    for (let i = 0; i < table.childCount; i++)
      if (table.child(i).type.spec.tableRole === 'body') count++;
  }
  return count;
}
function tableSectionsCount(table) {
  let count = 0;
  if (table && table.type.spec.tableRole === 'table') {
    for (let i = 0; i < table.childCount; i++)
      if (isTableSection(table.child(i))) count++;
  }
  return count;
}
function isRowLastInSection(table, row) {
  const { height, sectionRows } = TableMap.get(table);
  if (row >= height || row < 0) return false;
  let rowsMinusOne = -1;
  for (let i = 0; i < sectionRows.length; i++) {
    rowsMinusOne += sectionRows[i];
    if (row === rowsMinusOne) return true;
    if (row < rowsMinusOne) return false;
  }
  return false;
}

// src/cellselection.ts
var CellSelection = class extends Selection {
  // A table selection is identified by its anchor and head cells. The
  // positions given to this constructor should point _before_ two
  // cells in the same table. They may be the same, to select a single
  // cell.
  constructor($anchorCell, $headCell = $anchorCell) {
    const table = $anchorCell.node(-2);
    const map = TableMap.get(table);
    const tableStart = $anchorCell.start(-2);
    const rect = map.rectBetween(
      $anchorCell.pos - tableStart,
      $headCell.pos - tableStart,
    );
    const doc = $anchorCell.node(0);
    const cells = map
      .cellsInRect(rect)
      .filter(p => p != $headCell.pos - tableStart);
    cells.unshift($headCell.pos - tableStart);
    const ranges = cells.map(pos => {
      const cell = table.nodeAt(pos);
      if (!cell) {
        throw RangeError(`No cell with offset ${pos} found`);
      }
      const from = tableStart + pos + 1;
      return new SelectionRange(
        doc.resolve(from),
        doc.resolve(from + cell.content.size),
      );
    });
    super(ranges[0].$from, ranges[0].$to, ranges);
    this.$anchorCell = $anchorCell;
    this.$headCell = $headCell;
  }
  map(doc, mapping) {
    const $anchorCell = doc.resolve(mapping.map(this.$anchorCell.pos));
    const $headCell = doc.resolve(mapping.map(this.$headCell.pos));
    if (
      pointsAtCell($anchorCell) &&
      pointsAtCell($headCell) &&
      inSameTable($anchorCell, $headCell)
    ) {
      const tableChanged = this.$anchorCell.node(-2) != $anchorCell.node(-2);
      if (tableChanged && this.isRowSelection())
        return CellSelection.rowSelection($anchorCell, $headCell);
      else if (tableChanged && this.isColSelection())
        return CellSelection.colSelection($anchorCell, $headCell);
      else return new CellSelection($anchorCell, $headCell);
    }
    return TextSelection.between($anchorCell, $headCell);
  }
  // Returns a rectangular slice of table rows containing the selected
  // cells.
  content() {
    const table = this.$anchorCell.node(-2);
    const map = TableMap.get(table);
    const tableStart = this.$anchorCell.start(-2);
    const rect = map.rectBetween(
      this.$anchorCell.pos - tableStart,
      this.$headCell.pos - tableStart,
    );
    const seen = {};
    const rows = [];
    for (let row = rect.top; row < rect.bottom; row++) {
      const rowContent = [];
      for (
        let index = row * map.width + rect.left, col = rect.left;
        col < rect.right;
        col++, index++
      ) {
        const pos = map.map[index];
        if (seen[pos]) continue;
        seen[pos] = true;
        const cellRect = map.findCell(pos);
        let cell = table.nodeAt(pos);
        if (!cell) {
          throw RangeError(`No cell with offset ${pos} found`);
        }
        const extraLeft = rect.left - cellRect.left;
        const extraRight = cellRect.right - rect.right;
        if (extraLeft > 0 || extraRight > 0) {
          let attrs = cell.attrs;
          if (extraLeft > 0) {
            attrs = removeColSpan(attrs, 0, extraLeft);
          }
          if (extraRight > 0) {
            attrs = removeColSpan(
              attrs,
              attrs.colspan - extraRight,
              extraRight,
            );
          }
          if (cellRect.left < rect.left) {
            cell = cell.type.createAndFill(attrs);
            if (!cell) {
              throw RangeError(
                `Could not create cell with attrs ${JSON.stringify(attrs)}`,
              );
            }
          } else {
            cell = cell.type.create(attrs, cell.content);
          }
        }
        if (cellRect.top < rect.top || cellRect.bottom > rect.bottom) {
          const attrs = {
            ...cell.attrs,
            rowspan:
              Math.min(cellRect.bottom, rect.bottom) -
              Math.max(cellRect.top, rect.top),
          };
          if (cellRect.top < rect.top) {
            cell = cell.type.createAndFill(attrs);
          } else {
            cell = cell.type.create(attrs, cell.content);
          }
        }
        rowContent.push(cell);
      }
      const rowNode = getRow(table, row).node;
      rows.push(rowNode.copy(Fragment.from(rowContent)));
    }
    const fragment =
      this.isColSelection(map) && this.isRowSelection() ? table : rows;
    return new Slice(Fragment.from(fragment), 1, 1);
  }
  replace(tr, content = Slice.empty) {
    const mapFrom = tr.steps.length,
      ranges = this.ranges;
    for (let i = 0; i < ranges.length; i++) {
      const { $from, $to } = ranges[i],
        mapping = tr.mapping.slice(mapFrom);
      tr.replace(
        mapping.map($from.pos),
        mapping.map($to.pos),
        i ? Slice.empty : content,
      );
    }
    const sel = Selection.findFrom(
      tr.doc.resolve(tr.mapping.slice(mapFrom).map(this.to)),
      -1,
    );
    if (sel) tr.setSelection(sel);
  }
  replaceWith(tr, node) {
    this.replace(tr, new Slice(Fragment.from(node), 0, 0));
  }
  forEachCell(f) {
    const table = this.$anchorCell.node(-2);
    const map = TableMap.get(table);
    const tableStart = this.$anchorCell.start(-2);
    const cells = map.cellsInRect(
      map.rectBetween(
        this.$anchorCell.pos - tableStart,
        this.$headCell.pos - tableStart,
      ),
    );
    for (let i = 0; i < cells.length; i++) {
      f(table.nodeAt(cells[i]), tableStart + cells[i]);
    }
  }
  // True if this selection goes all the way from the top to the
  // bottom of the table.
  isColSelection(tableMap) {
    const table = this.$anchorCell.node(-2);
    const tableStart = this.$anchorCell.start(-2);
    const anchorTop = rowAtPos(table, this.$anchorCell.pos - tableStart);
    const headTop = rowAtPos(table, this.$headCell.pos - tableStart);
    if (Math.min(anchorTop, headTop) > 0) return false;
    const anchorBottom = anchorTop + this.$anchorCell.nodeAfter.attrs.rowspan;
    const headBottom = headTop + this.$headCell.nodeAfter.attrs.rowspan;
    return Math.max(anchorBottom, headBottom) == rowsCount(table);
  }
  // Returns the smallest column selection that covers the given anchor
  // and head cell.
  static colSelection($anchorCell, $headCell = $anchorCell) {
    const table = $anchorCell.node(-2);
    const map = TableMap.get(table);
    const tableStart = $anchorCell.start(-2);
    const anchorRect = map.findCell($anchorCell.pos - tableStart);
    const headRect = map.findCell($headCell.pos - tableStart);
    const doc = $anchorCell.node(0);
    if (anchorRect.top <= headRect.top) {
      if (anchorRect.top > 0)
        $anchorCell = doc.resolve(tableStart + map.map[anchorRect.left]);
      if (headRect.bottom < map.height)
        $headCell = doc.resolve(
          tableStart +
            map.map[map.width * (map.height - 1) + headRect.right - 1],
        );
    } else {
      if (headRect.top > 0)
        $headCell = doc.resolve(tableStart + map.map[headRect.left]);
      if (anchorRect.bottom < map.height)
        $anchorCell = doc.resolve(
          tableStart +
            map.map[map.width * (map.height - 1) + anchorRect.right - 1],
        );
    }
    return new CellSelection($anchorCell, $headCell);
  }
  // True if this selection goes all the way from the left to the
  // right of the table.
  isRowSelection() {
    const table = this.$anchorCell.node(-2);
    const map = TableMap.get(table);
    const tableStart = this.$anchorCell.start(-2);
    const anchorLeft = map.colCount(this.$anchorCell.pos - tableStart);
    const headLeft = map.colCount(this.$headCell.pos - tableStart);
    if (Math.min(anchorLeft, headLeft) > 0) return false;
    const anchorRight = anchorLeft + this.$anchorCell.nodeAfter.attrs.colspan;
    const headRight = headLeft + this.$headCell.nodeAfter.attrs.colspan;
    return Math.max(anchorRight, headRight) == map.width;
  }
  eq(other) {
    return (
      other instanceof CellSelection &&
      other.$anchorCell.pos == this.$anchorCell.pos &&
      other.$headCell.pos == this.$headCell.pos
    );
  }
  // Returns the smallest row selection that covers the given anchor
  // and head cell.
  static rowSelection($anchorCell, $headCell = $anchorCell) {
    const table = $anchorCell.node(-2);
    const map = TableMap.get(table);
    const tableStart = $anchorCell.start(-2);
    const anchorRect = map.findCell($anchorCell.pos - tableStart);
    const headRect = map.findCell($headCell.pos - tableStart);
    const doc = $anchorCell.node(0);
    if (anchorRect.left <= headRect.left) {
      if (anchorRect.left > 0)
        $anchorCell = doc.resolve(
          tableStart + map.map[anchorRect.top * map.width],
        );
      if (headRect.right < map.width)
        $headCell = doc.resolve(
          tableStart + map.map[map.width * (headRect.top + 1) - 1],
        );
    } else {
      if (headRect.left > 0)
        $headCell = doc.resolve(tableStart + map.map[headRect.top * map.width]);
      if (anchorRect.right < map.width)
        $anchorCell = doc.resolve(
          tableStart + map.map[map.width * (anchorRect.top + 1) - 1],
        );
    }
    return new CellSelection($anchorCell, $headCell);
  }
  // Returns the smallest section selection that covers the given anchor
  // and head cell.
  static sectionSelection($anchorCell, $headCell = $anchorCell) {
    const table = $anchorCell.node(-2);
    const map = TableMap.get(table);
    const tableStart = $anchorCell.start(-2);
    const sectionStart = $anchorCell.start(-1);
    const anchorSection = map.findSection($anchorCell.pos - sectionStart + 1);
    const headSection = map.findSection($headCell.pos - sectionStart + 1);
    const doc = $anchorCell.node(0);
    if (anchorSection.top <= headSection.top) {
      $anchorCell = doc.resolve(
        tableStart + map.map[map.width * anchorSection.top],
      );
      $headCell = doc.resolve(
        tableStart + map.map[map.width * headSection.bottom - 1],
      );
    } else {
      $anchorCell = doc.resolve(
        tableStart + map.map[map.width * headSection.top],
      );
      $headCell = doc.resolve(
        tableStart + map.map[map.width * anchorSection.bottom - 1],
      );
    }
    return new CellSelection($anchorCell, $headCell);
  }
  toJSON() {
    return {
      type: 'cell',
      anchor: this.$anchorCell.pos,
      head: this.$headCell.pos,
    };
  }
  static fromJSON(doc, json) {
    return new CellSelection(doc.resolve(json.anchor), doc.resolve(json.head));
  }
  static create(doc, anchorCell, headCell = anchorCell) {
    return new CellSelection(doc.resolve(anchorCell), doc.resolve(headCell));
  }
  getBookmark() {
    return new CellBookmark(this.$anchorCell.pos, this.$headCell.pos);
  }
};
CellSelection.prototype.visible = false;
Selection.jsonID('cell', CellSelection);
var CellBookmark = class {
  constructor(anchor, head) {
    this.anchor = anchor;
    this.head = head;
  }
  map(mapping) {
    return new CellBookmark(mapping.map(this.anchor), mapping.map(this.head));
  }
  resolve(doc) {
    const $anchorCell = doc.resolve(this.anchor),
      $headCell = doc.resolve(this.head);
    if (
      $anchorCell.parent.type.spec.tableRole == 'row' &&
      $headCell.parent.type.spec.tableRole == 'row' &&
      $anchorCell.index() < $anchorCell.parent.childCount &&
      $headCell.index() < $headCell.parent.childCount &&
      inSameTable($anchorCell, $headCell)
    )
      return new CellSelection($anchorCell, $headCell);
    else return Selection.near($headCell, 1);
  }
};
function drawCellSelection(state) {
  if (!(state.selection instanceof CellSelection)) return null;
  const cells = [];
  state.selection.forEachCell((node, pos) => {
    cells.push(
      Decoration.node(pos, pos + node.nodeSize, { class: 'selectedCell' }),
    );
  });
  return DecorationSet.create(state.doc, cells);
}
function isCellBoundarySelection({ $from, $to }) {
  if ($from.pos == $to.pos || $from.pos < $from.pos - 6) return false;
  let afterFrom = $from.pos;
  let beforeTo = $to.pos;
  let depth = $from.depth;
  for (; depth >= 0; depth--, afterFrom++)
    if ($from.after(depth + 1) < $from.end(depth)) break;
  for (let d = $to.depth; d >= 0; d--, beforeTo--)
    if ($to.before(d + 1) > $to.start(d)) break;
  return (
    afterFrom == beforeTo &&
    /^(row|body|table|head|foot)$/.test($from.node(depth).type.spec.tableRole)
  );
}
function isTextSelectionAcrossCells({ $from, $to }) {
  let fromCellBoundaryNode;
  let toCellBoundaryNode;
  for (let i = $from.depth; i > 0; i--) {
    const node = $from.node(i);
    if (
      node.type.spec.tableRole === 'cell' ||
      node.type.spec.tableRole === 'header_cell'
    ) {
      fromCellBoundaryNode = node;
      break;
    }
  }
  for (let i = $to.depth; i > 0; i--) {
    const node = $to.node(i);
    if (
      node.type.spec.tableRole === 'cell' ||
      node.type.spec.tableRole === 'header_cell'
    ) {
      toCellBoundaryNode = node;
      break;
    }
  }
  return fromCellBoundaryNode !== toCellBoundaryNode && $to.parentOffset === 0;
}
function normalizeSelection(state, tr, allowTableNodeSelection) {
  const sel = (tr || state).selection;
  const doc = (tr || state).doc;
  let normalize;
  let role;
  if (sel instanceof NodeSelection2 && (role = sel.node.type.spec.tableRole)) {
    if (role == 'cell' || role == 'header_cell') {
      normalize = CellSelection.create(doc, sel.from);
    } else if (role == 'row') {
      const $cell = doc.resolve(sel.from + 1);
      normalize = CellSelection.rowSelection($cell, $cell);
    } else if (isTableSectionRole(role)) {
      const $cell = doc.resolve(sel.from + 2);
      normalize = CellSelection.sectionSelection($cell, $cell);
    } else if (!allowTableNodeSelection) {
      const map = TableMap.get(sel.node);
      const start = sel.from + 1;
      const lastCell = start + map.map[map.width * map.height - 1];
      normalize = CellSelection.create(doc, start + 2, lastCell);
    }
  } else if (sel instanceof TextSelection && isCellBoundarySelection(sel)) {
    normalize = TextSelection.create(doc, sel.from);
  } else if (sel instanceof TextSelection && isTextSelectionAcrossCells(sel)) {
    normalize = TextSelection.create(doc, sel.$from.start(), sel.$from.end());
  }
  if (normalize) (tr || (tr = state.tr)).setSelection(normalize);
  return tr;
}

// src/fixtables.ts
import { PluginKey as PluginKey2 } from 'prosemirror-state';
var fixTablesKey = new PluginKey2('fix-tables');
function changedDescendants(old, cur, offset, f) {
  const oldSize = old.childCount,
    curSize = cur.childCount;
  outer: for (let i = 0, j = 0; i < curSize; i++) {
    const child = cur.child(i);
    for (let scan = j, e = Math.min(oldSize, i + 3); scan < e; scan++) {
      if (old.child(scan) == child) {
        j = scan + 1;
        offset += child.nodeSize;
        continue outer;
      }
    }
    f(child, offset);
    if (j < oldSize && old.child(j).sameMarkup(child))
      changedDescendants(old.child(j), child, offset + 1, f);
    else child.nodesBetween(0, child.content.size, f, offset + 1);
    offset += child.nodeSize;
  }
}
function fixTables(state, oldState) {
  let tr;
  const check = (node, pos) => {
    if (node.type.spec.tableRole == 'table')
      tr = fixTable(state, node, pos, tr);
  };
  if (!oldState) state.doc.descendants(check);
  else if (oldState.doc != state.doc)
    changedDescendants(oldState.doc, state.doc, 0, check);
  return tr;
}
function fixTable(state, table, tablePos, tr) {
  if (hasFreeRows(table)) tr = fixFreeRows(state, table, tablePos, tr);
  const map = TableMap.get(table);
  if (!map.problems) return tr;
  if (!tr) tr = state.tr;
  const mustAdd = [];
  for (let i = 0; i < map.height; i++) mustAdd.push(0);
  for (let i = 0; i < map.problems.length; i++) {
    const prob = map.problems[i];
    if (prob.type == 'collision') {
      const cell = table.nodeAt(prob.pos);
      if (!cell) continue;
      const attrs = cell.attrs;
      for (let j = 0; j < attrs.rowspan; j++) mustAdd[prob.row + j] += prob.n;
      tr.setNodeMarkup(
        tr.mapping.map(tablePos + 1 + prob.pos),
        null,
        removeColSpan(attrs, attrs.colspan - prob.n, prob.n),
      );
    } else if (prob.type == 'missing') {
      mustAdd[prob.row] += prob.n;
    } else if (prob.type == 'overlong_rowspan') {
      const cell = table.nodeAt(prob.pos);
      if (!cell) continue;
      tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), null, {
        ...cell.attrs,
        rowspan: cell.attrs.rowspan - prob.n,
      });
    } else if (prob.type == 'colwidth mismatch') {
      const cell = table.nodeAt(prob.pos);
      if (!cell) continue;
      tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), null, {
        ...cell.attrs,
        colwidth: prob.colwidth,
      });
    }
  }
  let first, last;
  for (let i = 0; i < mustAdd.length; i++)
    if (mustAdd[i]) {
      if (first == null) first = i;
      last = i;
    }
  for (let i = 0; i < map.height; i++) {
    const { node: row, pos } = getRow(table, i);
    const end = pos + row.nodeSize;
    const add = mustAdd[i];
    if (add > 0) {
      let role = 'cell';
      if (row.firstChild) {
        role = row.firstChild.type.spec.tableRole;
      }
      const nodes = [];
      for (let j = 0; j < add; j++) {
        const node = tableNodeTypes(state.schema)[role].createAndFill();
        if (node) nodes.push(node);
      }
      const side = (i == 0 || first == i - 1) && last == i ? pos + 1 : end - 1;
      tr.insert(tr.mapping.map(side + 1), nodes);
    }
  }
  return tr.setMeta(fixTablesKey, { fixTables: true });
}
function hasFreeRows(table) {
  for (let i = 0; i < table.childCount; i++)
    if (table.child(i).type.spec.tableRole === 'row') return true;
  return false;
}
function fixFreeRows(state, table, tablePos, tr) {
  let freeRows = [];
  let freeRowsFound = false;
  const sections = [];
  const types = tableNodeTypes(state.schema);
  for (let i = 0; i < table.childCount; i++) {
    const child = table.child(i);
    if (child.type.spec.tableRole === 'row') {
      freeRowsFound = true;
      freeRows.push(child);
    } else {
      if (freeRows.length > 0) {
        sections.push(types.body.createAndFill(null, freeRows));
        freeRows = [];
      }
      sections.push(child);
    }
  }
  if (freeRows.length > 0) {
    sections.push(types.body.createAndFill(null, freeRows));
    freeRows = [];
  }
  if (!freeRowsFound) return tr;
  return (tr || state.tr).replaceWith(
    tablePos,
    tablePos + table.nodeSize,
    types.table.createAndFill(table.attrs, sections),
  );
}

// src/input.ts
import { Fragment as Fragment3, Slice as Slice3 } from 'prosemirror-model';
import {
  Selection as Selection2,
  TextSelection as TextSelection2,
} from 'prosemirror-state';
import { keydownHandler } from 'prosemirror-keymap';

// src/copypaste.ts
import { Fragment as Fragment2, Slice as Slice2 } from 'prosemirror-model';
import { Transform } from 'prosemirror-transform';
function pastedCells(slice) {
  if (!slice.size) return null;
  let { content, openStart, openEnd } = slice;
  while (
    content.childCount == 1 &&
    ((openStart > 0 && openEnd > 0) ||
      content.child(0).type.spec.tableRole == 'table')
  ) {
    openStart--;
    openEnd--;
    content = content.child(0).content;
  }
  const first = content.child(0);
  const role = first.type.spec.tableRole;
  const schema = first.type.schema;
  const rows = [];
  if (isTableSectionRole(role)) {
    for (let s = 0; s < content.childCount; s++) {
      const section = content.child(s);
      if (isTableSection(section)) {
        for (let i = 0; i < section.childCount; i++) {
          let cells = section.child(i).content;
          const left = i != 0 ? 0 : Math.max(0, openStart - 1);
          const right =
            i < section.childCount - 1 ? 0 : Math.max(0, openEnd - 1);
          if (left || right)
            cells = fitSlice(
              tableNodeTypes(schema).row,
              new Slice2(cells, left, right),
            ).content;
          rows.push(cells);
        }
      }
    }
  } else if (role == 'row') {
    for (let i = 0; i < content.childCount; i++) {
      let cells = content.child(i).content;
      const left = i ? 0 : Math.max(0, openStart - 1);
      const right = i < content.childCount - 1 ? 0 : Math.max(0, openEnd - 1);
      if (left || right)
        cells = fitSlice(
          tableNodeTypes(schema).row,
          new Slice2(cells, left, right),
        ).content;
      rows.push(cells);
    }
  } else if (role == 'cell' || role == 'header_cell') {
    rows.push(
      openStart || openEnd
        ? fitSlice(
            tableNodeTypes(schema).row,
            new Slice2(content, openStart, openEnd),
          ).content
        : content,
    );
  } else {
    return null;
  }
  return ensureRectangular(schema, rows);
}
function ensureRectangular(schema, rows) {
  const widths = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = row.childCount - 1; j >= 0; j--) {
      const { rowspan, colspan } = row.child(j).attrs;
      for (let r = i; r < i + rowspan; r++)
        widths[r] = (widths[r] || 0) + colspan;
    }
  }
  let width = 0;
  for (let r = 0; r < widths.length; r++) width = Math.max(width, widths[r]);
  for (let r = 0; r < widths.length; r++) {
    if (r >= rows.length) rows.push(Fragment2.empty);
    if (widths[r] < width) {
      const empty = tableNodeTypes(schema).cell.createAndFill();
      const cells = [];
      for (let i = widths[r]; i < width; i++) {
        cells.push(empty);
      }
      rows[r] = rows[r].append(Fragment2.from(cells));
    }
  }
  return { height: rows.length, width, rows };
}
function fitSlice(nodeType, slice) {
  const node = nodeType.createAndFill();
  const tr = new Transform(node).replace(0, node.content.size, slice);
  return tr.doc;
}
function clipCells({ width, height, rows }, newWidth, newHeight) {
  if (width != newWidth) {
    const added = [];
    const newRows = [];
    for (let row = 0; row < rows.length; row++) {
      const frag = rows[row],
        cells = [];
      for (let col = added[row] || 0, i = 0; col < newWidth; i++) {
        let cell = frag.child(i % frag.childCount);
        if (col + cell.attrs.colspan > newWidth)
          cell = cell.type.createChecked(
            removeColSpan(
              cell.attrs,
              cell.attrs.colspan,
              col + cell.attrs.colspan - newWidth,
            ),
            cell.content,
          );
        cells.push(cell);
        col += cell.attrs.colspan;
        for (let j = 1; j < cell.attrs.rowspan; j++)
          added[row + j] = (added[row + j] || 0) + cell.attrs.colspan;
      }
      newRows.push(Fragment2.from(cells));
    }
    rows = newRows;
    width = newWidth;
  }
  if (height != newHeight) {
    const newRows = [];
    for (let row = 0, i = 0; row < newHeight; row++, i++) {
      const cells = [],
        source = rows[i % height];
      for (let j = 0; j < source.childCount; j++) {
        let cell = source.child(j);
        if (row + cell.attrs.rowspan > newHeight)
          cell = cell.type.create(
            {
              ...cell.attrs,
              rowspan: Math.max(1, newHeight - cell.attrs.rowspan),
            },
            cell.content,
          );
        cells.push(cell);
      }
      newRows.push(Fragment2.from(cells));
    }
    rows = newRows;
    height = newHeight;
  }
  return { width, height, rows };
}
function growTable(tr, map, table, start, width, height, mapFrom) {
  const schema = tr.doc.type.schema;
  const types = tableNodeTypes(schema);
  let empty;
  let emptyHead;
  if (width > map.width) {
    const lastCellOfRow = [];
    for (let row = 0; row < map.height; row++) {
      const lastCell = table.nodeAt(map.map[(row + 1) * map.width - 1]);
      if (lastCell == null || lastCell.type == types.cell) {
        lastCellOfRow.push(empty || (empty = types.cell.createAndFill()));
      } else {
        lastCellOfRow.push(
          emptyHead || (emptyHead = types.header_cell.createAndFill()),
        );
      }
    }
    for (let row = 0; row < map.height; row++) {
      const { node: rowNode, pos: rowPos2 } = getRow(table, row);
      const rowEnd = rowPos2 + rowNode.nodeSize - 1;
      const cells = [];
      for (let i = map.width; i < width; i++) cells.push(lastCellOfRow[row]);
      tr.insert(tr.mapping.slice(mapFrom).map(rowEnd + start), cells);
    }
  }
  if (height > map.height) {
    const cells = [];
    for (
      let i = 0, start2 = (map.height - 1) * map.width;
      i < Math.max(map.width, width);
      i++
    ) {
      const header =
        i >= map.width
          ? false
          : table.nodeAt(map.map[start2 + i]).type == types.header_cell;
      cells.push(
        header
          ? emptyHead || (emptyHead = types.header_cell.createAndFill())
          : empty || (empty = types.cell.createAndFill()),
      );
    }
    const emptyRow = types.row.create(null, Fragment2.from(cells)),
      rows = [];
    for (let i = map.height; i < height; i++) rows.push(emptyRow);
    tr.insert(tr.mapping.slice(mapFrom).map(start + table.nodeSize - 3), rows);
  }
  return !!(empty || emptyHead);
}
function isolateHorizontal(tr, map, table, start, left, right, top, mapFrom) {
  if (top == 0 || top == map.height) return false;
  let found = false;
  for (let col = left; col < right; col++) {
    const index = top * map.width + col,
      pos = map.map[index];
    if (map.map[index - map.width] == pos) {
      found = true;
      const cell = table.nodeAt(pos);
      const { top: cellTop, left: cellLeft } = map.findCell(pos);
      tr.setNodeMarkup(tr.mapping.slice(mapFrom).map(pos + start), null, {
        ...cell.attrs,
        rowspan: top - cellTop,
      });
      tr.insert(
        tr.mapping.slice(mapFrom).map(map.positionAt(top, cellLeft, table)),
        cell.type.createAndFill({
          ...cell.attrs,
          rowspan: cellTop + cell.attrs.rowspan - top,
        }),
      );
      col += cell.attrs.colspan - 1;
    }
  }
  return found;
}
function isolateVertical(tr, map, table, start, top, bottom, left, mapFrom) {
  if (left == 0 || left == map.width) return false;
  let found = false;
  for (let row = top; row < bottom; row++) {
    const index = row * map.width + left,
      pos = map.map[index];
    if (map.map[index - 1] == pos) {
      found = true;
      const cell = table.nodeAt(pos);
      const cellLeft = map.colCount(pos);
      const updatePos = tr.mapping.slice(mapFrom).map(pos + start);
      tr.setNodeMarkup(
        updatePos,
        null,
        removeColSpan(
          cell.attrs,
          left - cellLeft,
          cell.attrs.colspan - (left - cellLeft),
        ),
      );
      tr.insert(
        updatePos + cell.nodeSize,
        cell.type.createAndFill(removeColSpan(cell.attrs, 0, left - cellLeft)),
      );
      row += cell.attrs.rowspan - 1;
    }
  }
  return found;
}
function insertCells(state, dispatch, tableStart, rect, cells) {
  let table = tableStart ? state.doc.nodeAt(tableStart - 1) : state.doc;
  if (!table) {
    throw new Error('No table found');
  }
  let map = TableMap.get(table);
  const { top, left } = rect;
  const right = left + cells.width,
    bottom = top + cells.height;
  const tr = state.tr;
  let mapFrom = 0;
  function recomp() {
    table = tableStart ? tr.doc.nodeAt(tableStart - 1) : tr.doc;
    if (!table) {
      throw new Error('No table found');
    }
    map = TableMap.get(table);
    mapFrom = tr.mapping.maps.length;
  }
  if (growTable(tr, map, table, tableStart, right, bottom, mapFrom)) recomp();
  if (isolateHorizontal(tr, map, table, tableStart, left, right, top, mapFrom))
    recomp();
  if (
    isolateHorizontal(tr, map, table, tableStart, left, right, bottom, mapFrom)
  )
    recomp();
  if (isolateVertical(tr, map, table, tableStart, top, bottom, left, mapFrom))
    recomp();
  if (isolateVertical(tr, map, table, tableStart, top, bottom, right, mapFrom))
    recomp();
  for (let row = top; row < bottom; row++) {
    const from = map.positionAt(row, left, table),
      to = map.positionAt(row, right, table);
    tr.replace(
      tr.mapping.slice(mapFrom).map(from + tableStart),
      tr.mapping.slice(mapFrom).map(to + tableStart),
      new Slice2(cells.rows[row - top], 0, 0),
    );
  }
  recomp();
  tr.setSelection(
    new CellSelection(
      tr.doc.resolve(tableStart + map.positionAt(top, left, table)),
      tr.doc.resolve(tableStart + map.positionAt(bottom - 1, right - 1, table)),
    ),
  );
  dispatch(tr);
}

// src/input.ts
var handleKeyDown = keydownHandler({
  ArrowLeft: arrow('horiz', -1),
  ArrowRight: arrow('horiz', 1),
  ArrowUp: arrow('vert', -1),
  ArrowDown: arrow('vert', 1),
  Tab: tabulation(1),
  'Shift-Tab': tabulation(-1),
  'Shift-ArrowLeft': shiftArrow('horiz', -1),
  'Shift-ArrowRight': shiftArrow('horiz', 1),
  'Shift-ArrowUp': shiftArrow('vert', -1),
  'Shift-ArrowDown': shiftArrow('vert', 1),
  Backspace: deleteCellSelection,
  'Mod-Backspace': deleteCellSelection,
  Delete: deleteCellSelection,
  'Mod-Delete': deleteCellSelection,
});
function maybeSetSelection(state, dispatch, selection) {
  if (selection.eq(state.selection)) return false;
  if (dispatch) dispatch(state.tr.setSelection(selection).scrollIntoView());
  return true;
}
function tabulation(dir) {
  return (state, dispatch, view) => {
    if (!view) return false;
    const sel = state.selection;
    const r = state.doc.resolve(sel.head);
    let d = r.depth;
    let inCaption = false;
    for (; d > 0; d--) {
      const role = r.node(d).type.spec.tableRole;
      if (role === 'row') break;
      if (role === 'caption' && dir > 0) {
        inCaption = true;
        break;
      }
    }
    const tableDepth2 = d - (inCaption ? 1 : 2);
    const table = r.node(tableDepth2);
    if (!table || table.type.spec.tableRole != 'table') return false;
    const tableStart = r.start(tableDepth2);
    const tmap = TableMap.get(table);
    let nextCellPos;
    if (inCaption) {
      nextCellPos = tmap.map[0];
    } else {
      const map = tmap.map;
      const cellStart = inCaption
        ? tmap.positionAt(0, 0, table)
        : r.start(d + 1);
      const cellPos = cellStart - tableStart - 1;
      let i;
      for (
        i = dir < 0 ? 0 : map.length - 1;
        i >= 0 && i < map.length;
        i -= dir
      ) {
        if (cellPos == map[i]) break;
      }
      if (i < 0 || i >= map.length) return false;
      i += dir;
      if (i < 0 || i >= map.length) return false;
      nextCellPos = map[i];
    }
    if (nextCellPos) {
      const cell = table.nodeAt(nextCellPos);
      if (!cell) return false;
      if (dispatch) {
        const from = tableStart + nextCellPos;
        const to = from + cell.nodeSize - 1;
        dispatch(
          state.tr.setSelection(TextSelection2.create(state.doc, from, to)),
        );
      }
      return true;
    }
    return false;
  };
}
function arrow(axis, dir) {
  return (state, dispatch, view) => {
    if (!view) return false;
    const sel = state.selection;
    if (sel instanceof CellSelection) {
      return maybeSetSelection(
        state,
        dispatch,
        Selection2.near(sel.$headCell, dir),
      );
    }
    if (axis != 'horiz' && !sel.empty) return false;
    const end = atEndOfCell(view, axis, dir, true);
    if (axis == 'horiz') {
      return maybeSetSelection(
        state,
        dispatch,
        Selection2.near(state.doc.resolve(sel.head + dir), dir),
      );
    } else {
      let newSel;
      if (end) {
        const $cell = state.doc.resolve(end);
        if ($cell.node().type.spec.tableRole === 'row') {
          const $next = nextCell($cell, axis, dir);
          if ($next) newSel = Selection2.near($next, 1);
          else if (dir < 0) {
            const table = $cell.node(-2);
            if (tableHasCaption(table))
              newSel = Selection2.near(state.doc.resolve($cell.start(-2)), 1);
            else
              newSel = Selection2.near(state.doc.resolve($cell.before(-2)), -1);
          } else
            newSel = Selection2.near(state.doc.resolve($cell.after(-2)), 1);
        } else {
          if (dir < 0) {
            newSel = Selection2.near(state.doc.resolve($cell.before()), -1);
          } else {
            const table = $cell.node();
            const map = TableMap.get(table);
            const pos = $cell.start() + map.positionAt(0, 0, table);
            newSel = Selection2.near(state.doc.resolve(pos), 1);
          }
        }
      } else {
        if (dir > 0) {
          const pos = sel.$anchor.after();
          const table = state.doc.nodeAt(pos);
          if (table && table.type.spec.tableRole === 'table')
            newSel = Selection2.near(state.doc.resolve(pos), 1);
        } else {
          newSel = Selection2.near(state.doc.resolve(sel.$anchor.before()), -1);
          const d = tableDepth(newSel.$anchor);
          if (d >= 0) {
            const table = newSel.$anchor.node(d);
            const map = TableMap.get(table);
            const pos =
              newSel.$anchor.start(d) +
              map.positionAt(map.height - 1, 0, table);
            newSel = Selection2.near(state.doc.resolve(pos), 1);
          }
        }
      }
      return newSel ? maybeSetSelection(state, dispatch, newSel) : false;
    }
  };
}
function shiftArrow(axis, dir) {
  return (state, dispatch, view) => {
    if (!view) return false;
    const sel = state.selection;
    let cellSel;
    if (sel instanceof CellSelection) {
      cellSel = sel;
    } else {
      const end = atEndOfCell(view, axis, dir);
      if (end == null) return false;
      cellSel = new CellSelection(state.doc.resolve(end));
    }
    const $head = nextCell(cellSel.$headCell, axis, dir);
    if (!$head) return false;
    return maybeSetSelection(
      state,
      dispatch,
      new CellSelection(cellSel.$anchorCell, $head),
    );
  };
}
function deleteCellSelection(state, dispatch) {
  const sel = state.selection;
  if (!(sel instanceof CellSelection)) return false;
  if (dispatch) {
    const tr = state.tr;
    const baseContent = tableNodeTypes(state.schema).cell.createAndFill()
      .content;
    sel.forEachCell((cell, pos) => {
      if (!cell.content.eq(baseContent))
        tr.replace(
          tr.mapping.map(pos + 1),
          tr.mapping.map(pos + cell.nodeSize - 1),
          new Slice3(baseContent, 0, 0),
        );
    });
    if (tr.docChanged) dispatch(tr);
  }
  return true;
}
function handleTripleClick(view, pos) {
  const doc = view.state.doc,
    $cell = cellAround(doc.resolve(pos));
  if (!$cell) return false;
  view.dispatch(view.state.tr.setSelection(new CellSelection($cell)));
  return true;
}
function handlePaste(view, _, slice) {
  if (!isInTable(view.state)) return false;
  let cells = pastedCells(slice);
  const sel = view.state.selection;
  if (sel instanceof CellSelection) {
    if (!cells)
      cells = {
        width: 1,
        height: 1,
        rows: [
          Fragment3.from(
            fitSlice(tableNodeTypes(view.state.schema).cell, slice),
          ),
        ],
      };
    const table = sel.$anchorCell.node(-2);
    const start = sel.$anchorCell.start(-2);
    const rect = TableMap.get(table).rectBetween(
      sel.$anchorCell.pos - start,
      sel.$headCell.pos - start,
    );
    cells = clipCells(cells, rect.right - rect.left, rect.bottom - rect.top);
    insertCells(view.state, view.dispatch, start, rect, cells);
    return true;
  } else if (cells) {
    const $cell = selectionCell(view.state);
    const start = $cell.start(-2);
    insertCells(
      view.state,
      view.dispatch,
      start,
      TableMap.get($cell.node(-2)).findCell($cell.pos - start),
      cells,
    );
    return true;
  } else {
    return false;
  }
}
function handleMouseDown(view, startEvent) {
  var _a;
  if (startEvent.ctrlKey || startEvent.metaKey) return;
  const startDOMCell = domInCell(view, startEvent.target);
  let $anchor;
  if (startEvent.shiftKey && view.state.selection instanceof CellSelection) {
    setCellSelection(view.state.selection.$anchorCell, startEvent);
    startEvent.preventDefault();
  } else if (
    startEvent.shiftKey &&
    startDOMCell &&
    ($anchor = cellAround(view.state.selection.$anchor)) != null &&
    ((_a = cellUnderMouse(view, startEvent)) == null ? void 0 : _a.pos) !=
      $anchor.pos
  ) {
    setCellSelection($anchor, startEvent);
    startEvent.preventDefault();
  } else if (!startDOMCell) {
    return;
  }
  function setCellSelection($anchor2, event) {
    let $head = cellUnderMouse(view, event);
    const starting = tableEditingKey.getState(view.state) == null;
    if (!$head || !inSameTable($anchor2, $head)) {
      if (starting) $head = $anchor2;
      else return;
    }
    const selection = new CellSelection($anchor2, $head);
    if (starting || !view.state.selection.eq(selection)) {
      const tr = view.state.tr.setSelection(selection);
      if (starting) tr.setMeta(tableEditingKey, $anchor2.pos);
      view.dispatch(tr);
    }
  }
  function stop() {
    view.root.removeEventListener('mouseup', stop);
    view.root.removeEventListener('dragstart', stop);
    view.root.removeEventListener('mousemove', move);
    if (tableEditingKey.getState(view.state) != null)
      view.dispatch(view.state.tr.setMeta(tableEditingKey, -1));
  }
  function move(_event) {
    const event = _event;
    const anchor = tableEditingKey.getState(view.state);
    let $anchor2;
    if (anchor != null) {
      $anchor2 = view.state.doc.resolve(anchor);
    } else if (domInCell(view, event.target) != startDOMCell) {
      $anchor2 = cellUnderMouse(view, startEvent);
      if (!$anchor2) return stop();
    }
    if ($anchor2) setCellSelection($anchor2, event);
  }
  view.root.addEventListener('mouseup', stop);
  view.root.addEventListener('dragstart', stop);
  view.root.addEventListener('mousemove', move);
}
function atEndOfCell(view, axis, dir, checkCaption = false) {
  if (!(view.state.selection instanceof TextSelection2)) return null;
  const { $head } = view.state.selection;
  for (let d = $head.depth - 1; d >= 0; d--) {
    const parent = $head.node(d),
      index = dir < 0 ? $head.index(d) : $head.indexAfter(d);
    if (index != (dir < 0 ? 0 : parent.childCount)) return null;
    const alsoInCaption =
      checkCaption && parent.type.spec.tableRole == 'caption';
    if (
      parent.type.spec.tableRole == 'cell' ||
      parent.type.spec.tableRole == 'header_cell' ||
      alsoInCaption
    ) {
      const cellPos = $head.before(d);
      const dirStr =
        axis == 'vert' ? (dir > 0 ? 'down' : 'up') : dir > 0 ? 'right' : 'left';
      return view.endOfTextblock(dirStr) ? cellPos : null;
    }
  }
  return null;
}
function domInCell(view, dom) {
  for (; dom && dom != view.dom; dom = dom.parentNode) {
    if (dom.nodeName == 'TD' || dom.nodeName == 'TH') {
      return dom;
    }
  }
  return null;
}
function cellUnderMouse(view, event) {
  const mousePos = view.posAtCoords({
    left: event.clientX,
    top: event.clientY,
  });
  if (!mousePos) return null;
  return mousePos ? cellAround(view.state.doc.resolve(mousePos.pos)) : null;
}

// src/columnresizing.ts
import { Plugin, PluginKey as PluginKey3 } from 'prosemirror-state';
import {
  Decoration as Decoration2,
  DecorationSet as DecorationSet2,
} from 'prosemirror-view';
var columnResizingPluginKey = new PluginKey3('tableColumnResizing');
var SPEC_COL_WIDTHS = 'colgroup';
var SPEC_TABLE_WIDTH = 'tablewidth';
var DEFAULT_HANDLE_WIDTH = 5;
var DEFAULT_CELL_MIN_WIDTH = 25;
var DEFAULT_LAST_COLUMN_RESIZABLE = true;
function columnResizing({
  handleWidth = DEFAULT_HANDLE_WIDTH,
  cellMinWidth = DEFAULT_CELL_MIN_WIDTH,
  lastColumnResizable = DEFAULT_LAST_COLUMN_RESIZABLE,
} = {}) {
  const plugin = new Plugin({
    options: {
      handleWidth,
      cellMinWidth,
      lastColumnResizable,
    },
    key: columnResizingPluginKey,
    state: {
      init(_, state) {
        return new ResizeState(
          -1,
          false,
          DecorationSet2.create(
            state.doc,
            createTableDecorations(state.doc, cellMinWidth),
          ),
        );
      },
      apply(tr, prev) {
        return prev.apply(tr);
      },
    },
    props: {
      attributes: state => {
        const pluginState = columnResizingPluginKey.getState(state);
        return pluginState && pluginState.activeHandle > -1
          ? { class: 'resize-cursor' }
          : {};
      },
      handleDOMEvents: {
        mousemove: (view, event) => {
          handleMouseMove(
            view,
            event,
            handleWidth,
            cellMinWidth,
            lastColumnResizable,
          );
        },
        mouseleave: view => {
          handleMouseLeave(view);
        },
        mousedown: (view, event) => {
          handleMouseDown2(view, event, cellMinWidth);
        },
      },
      decorations: state => {
        const pluginState = columnResizingPluginKey.getState(state);
        let decos = DecorationSet2.empty;
        if (pluginState) {
          decos = decos.add(
            state.doc,
            pluginState.tableDecos.find(void 0, void 0, () => true),
          );
          if (pluginState.activeHandle > -1) {
            decos = decos.add(
              state.doc,
              handleDecorations(state, pluginState.activeHandle),
            );
          }
        }
        return decos;
      },
      // nodeViews: {},
    },
  });
  return plugin;
}
var ResizeState = class {
  constructor(activeHandle, dragging, tableDecos) {
    this.activeHandle = activeHandle;
    this.dragging = dragging;
    this.tableDecos = tableDecos;
  }
  apply(tr) {
    const state = this;
    if (tr.docChanged) {
      state.tableDecos = state.tableDecos.map(tr.mapping, tr.doc);
    }
    const action = tr.getMeta(columnResizingPluginKey);
    if (action) {
      if (action.setHandle != null)
        return new ResizeState(action.setHandle, false, state.tableDecos);
      if (action.setDragging !== void 0)
        return new ResizeState(
          state.activeHandle,
          action.setDragging,
          state.tableDecos,
        );
      let decos = state.tableDecos;
      if (action.setColWidths) {
        const scws = action.setColWidths;
        scws.forEach(scw => {
          const removed = decos.find(
            scw.tableStart - 1,
            scw.tableStart,
            spec => spec.type === SPEC_COL_WIDTHS,
          );
          if (removed) decos = decos.remove(removed);
          const deco = colgroupDecoration(scw.tableStart, scw.colWidths);
          decos = decos.add(tr.doc, [deco]);
        });
      }
      if (action.setTableWidth) {
        let decos2 = state.tableDecos;
        const stws = action.setTableWidth;
        stws.forEach(stw => {
          const removed = decos2.find(
            stw.pos,
            stw.pos + 1,
            spec => spec.type === SPEC_TABLE_WIDTH,
          );
          if (removed) {
            const newDecos = [];
            removed.forEach(r => {
              const pos = tr.mapping.map(stw.pos);
              const table = tr.doc.nodeAt(pos);
              if (
                (table == null ? void 0 : table.type.spec.tableRole) === 'table'
              ) {
                newDecos.push(
                  tableWidthDecoration(pos, pos + table.nodeSize, stw.css),
                );
              }
            });
            if (newDecos) decos2 = decos2.remove(removed).add(tr.doc, newDecos);
          }
        });
      }
      if (decos !== state.tableDecos)
        return new ResizeState(state.activeHandle, state.dragging, decos);
    }
    if (tr.docChanged && state.activeHandle > -1) {
      let handle = tr.mapping.map(state.activeHandle, -1);
      if (!pointsAtCell(tr.doc.resolve(handle))) {
        handle = -1;
      }
      return new ResizeState(handle, state.dragging, state.tableDecos);
    }
    return state;
  }
};
function handleMouseMove(
  view,
  event,
  handleWidth,
  cellMinWidth,
  lastColumnResizable,
) {
  const pluginState = columnResizingPluginKey.getState(view.state);
  if (!pluginState) return;
  if (!pluginState.dragging) {
    const target = domCellAround(event.target);
    let cell = -1;
    if (target) {
      const { left, right } = target.getBoundingClientRect();
      if (event.clientX - left <= handleWidth)
        cell = edgeCell(view, event, 'left');
      else if (right - event.clientX <= handleWidth)
        cell = edgeCell(view, event, 'right');
    }
    if (cell != pluginState.activeHandle) {
      if (!lastColumnResizable && cell !== -1) {
        const $cell = view.state.doc.resolve(cell);
        const table = $cell.node(-2);
        const map = TableMap.get(table);
        const tableStart = $cell.start(-2);
        const col =
          map.colCount($cell.pos - tableStart) +
          $cell.nodeAfter.attrs.colspan -
          1;
        if (col == map.width - 1) {
          return;
        }
      }
      updateHandle(view, cell);
    }
  }
}
function handleMouseLeave(view) {
  const pluginState = columnResizingPluginKey.getState(view.state);
  if (pluginState && pluginState.activeHandle > -1 && !pluginState.dragging)
    updateHandle(view, -1);
}
function handleMouseDown2(view, event, cellMinWidth) {
  const pluginState = columnResizingPluginKey.getState(view.state);
  if (!pluginState || pluginState.activeHandle == -1 || pluginState.dragging)
    return false;
  const cell = view.state.doc.nodeAt(pluginState.activeHandle);
  const width = currentColWidth(view, pluginState.activeHandle, cell.attrs);
  view.dispatch(
    view.state.tr.setMeta(columnResizingPluginKey, {
      setDragging: { startX: event.clientX, startWidth: width },
    }),
  );
  function finish(event2) {
    window.removeEventListener('mouseup', finish);
    window.removeEventListener('mousemove', move);
    const pluginState2 = columnResizingPluginKey.getState(view.state);
    if (pluginState2 == null ? void 0 : pluginState2.dragging) {
      updateColumnWidth(
        view,
        pluginState2.activeHandle,
        draggedWidth(pluginState2.dragging, event2, cellMinWidth),
      );
      view.dispatch(
        view.state.tr.setMeta(columnResizingPluginKey, { setDragging: null }),
      );
    }
  }
  function move(event2) {
    if (!event2.which) return finish(event2);
    const pluginState2 = columnResizingPluginKey.getState(view.state);
    if (!pluginState2) return;
    if (pluginState2.dragging) {
      const dragged = draggedWidth(pluginState2.dragging, event2, cellMinWidth);
      displayColumnWidth(
        view,
        pluginState2.activeHandle,
        dragged,
        cellMinWidth,
      );
    }
  }
  window.addEventListener('mouseup', finish);
  window.addEventListener('mousemove', move);
  event.preventDefault();
  return true;
}
function currentColWidth(view, cellPos, { colspan, colwidth }) {
  const width = colwidth && colwidth[colwidth.length - 1];
  if (width) return width;
  const dom = view.domAtPos(cellPos);
  const node = dom.node.childNodes[dom.offset];
  let domWidth = node.offsetWidth,
    parts = colspan;
  if (colwidth) {
    for (let i = 0; i < colspan; i++)
      if (colwidth[i]) {
        domWidth -= colwidth[i];
        parts--;
      }
  }
  return domWidth / parts;
}
function domCellAround(target) {
  while (target && target.nodeName != 'TD' && target.nodeName != 'TH')
    target =
      target.classList && target.classList.contains('ProseMirror')
        ? null
        : target.parentNode;
  return target;
}
function edgeCell(view, event, side) {
  const found = view.posAtCoords({ left: event.clientX, top: event.clientY });
  if (!found) return -1;
  const { pos } = found;
  const $cell = cellAround(view.state.doc.resolve(pos));
  if (!$cell) return -1;
  if (side == 'right') return $cell.pos;
  const map = TableMap.get($cell.node(-2)),
    start = $cell.start(-2);
  const index = map.map.indexOf($cell.pos - start);
  return index % map.width == 0 ? -1 : start + map.map[index - 1];
}
function draggedWidth(dragging, event, cellMinWidth) {
  const offset = event.clientX - dragging.startX;
  return Math.max(cellMinWidth, dragging.startWidth + offset);
}
function updateHandle(view, value) {
  view.dispatch(
    view.state.tr.setMeta(columnResizingPluginKey, { setHandle: value }),
  );
}
function updateColumnWidth(view, cell, width) {
  const $cell = view.state.doc.resolve(cell);
  const table = $cell.node(-2),
    map = TableMap.get(table),
    start = $cell.start(-2);
  const col =
    map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
  const tr = view.state.tr;
  for (let row = 0; row < map.height; row++) {
    const mapIndex = row * map.width + col;
    if (row && map.map[mapIndex] == map.map[mapIndex - map.width]) continue;
    const pos = map.map[mapIndex];
    const attrs = table.nodeAt(pos).attrs;
    const index = attrs.colspan == 1 ? 0 : col - map.colCount(pos);
    if (attrs.colwidth && attrs.colwidth[index] == width) continue;
    const colwidth = attrs.colwidth
      ? attrs.colwidth.slice()
      : zeroes(attrs.colspan);
    colwidth[index] = width;
    tr.setNodeMarkup(start + pos, null, { ...attrs, colwidth });
  }
  if (tr.docChanged) view.dispatch(tr);
}
function displayColumnWidth(view, cell, width, cellMinWidth) {
  const $cell = view.state.doc.resolve(cell);
  const table = $cell.node(-2),
    tableStart = $cell.start(-2);
  const col =
    TableMap.get(table).colCount($cell.pos - tableStart) +
    $cell.nodeAfter.attrs.colspan -
    1;
  let dom = view.domAtPos($cell.start(-2)).node;
  while (dom && dom.nodeName != 'TABLE') {
    dom = dom.parentNode;
  }
  if (!dom) return;
  updateColumnsOnResize(view, table, tableStart, cellMinWidth, col, width);
}
function zeroes(n) {
  return Array(n).fill(0);
}
function handleDecorations(state, cell) {
  const decorations = [];
  const $cell = state.doc.resolve(cell);
  const table = $cell.node(-2);
  if (!table) {
    return [];
  }
  const map = TableMap.get(table);
  const start = $cell.start(-2);
  const col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan;
  for (let row = 0; row < map.height; row++) {
    const index = col + row * map.width - 1;
    if (
      (col == map.width || map.map[index] != map.map[index + 1]) &&
      (row == 0 || map.map[index - 1] != map.map[index - 1 - map.width])
    ) {
      const cellPos = map.map[index];
      const pos = start + cellPos + table.nodeAt(cellPos).nodeSize - 1;
      const dom = document.createElement('div');
      dom.className = 'column-resize-handle';
      decorations.push(Decoration2.widget(pos, dom));
    }
  }
  return decorations;
}
function colgroupDecoration(tableStart, colWidths) {
  return Decoration2.widget(
    tableStart,
    (view, getPos) => {
      const colgroup = document.createElement('colgroup');
      for (let c = 0; c < colWidths.length; c++) {
        const colElement = document.createElement('col');
        colElement.style.width = colWidths[c];
        colgroup.appendChild(colElement);
      }
      return colgroup;
    },
    {
      type: SPEC_COL_WIDTHS,
      colWidths,
    },
  );
}
function tableWidthDecoration(from, to, css) {
  const style = Object.entries(css)
    .map(([prop, value]) => `${prop}: ${value}`)
    .join('; ');
  return Decoration2.node(from, to, { style }, { type: SPEC_TABLE_WIDTH });
}
function tableDecorationsCallback(doc, decos, cellMinWidth) {
  return (node, pos) => {
    if (node.type.spec.tableRole === 'table') {
      const tableStart = pos + 1;
      const resolved = doc.resolve(tableStart);
      decos.push(tableWidthDecoration(resolved.before(), resolved.after(), {}));
      const { colWidths } = updateColumnsOnResize(
        null,
        node,
        tableStart,
        cellMinWidth,
      );
      decos.push(colgroupDecoration(tableStart, colWidths));
      return false;
    }
    return true;
  };
}
function createTableDecorations(doc, cellMinWidth = 0, from, to) {
  let decos = [];
  if (from && to)
    doc.nodesBetween(
      from,
      to,
      tableDecorationsCallback(doc, decos, cellMinWidth),
    );
  else doc.descendants(tableDecorationsCallback(doc, decos, cellMinWidth));
  return decos;
}
function updateColumnsOnResize(
  view,
  table,
  tableStart,
  cellMinWidth,
  overrideCol,
  overrideValue,
) {
  const { setColWidths, setTableWidth } = getTableWidths(
    table,
    tableStart,
    cellMinWidth,
    overrideCol,
    overrideValue,
  );
  const colWidths = setColWidths[0].colWidths;
  const tableWidth = setTableWidth[0].width + 'px';
  if (view) {
    view.dispatch(
      view.state.tr.setMeta(columnResizingPluginKey, {
        setColWidths,
        setTableWidth,
      }),
    );
  }
  return { colWidths, tableWidth };
}
function getCellMinWidth(state) {
  const plugin = columnResizingPluginKey.get(state);
  return (plugin && plugin.spec.options.cellMinWidth) || 25;
}
function getTableWidths(
  table,
  tableStart,
  cellMinWidth,
  overrideCol,
  overrideValue,
) {
  let totalWidth = 0;
  let fixedWidth = true;
  const row = getRow(table, 0).node;
  if (!row) return;
  const colWidths = [];
  for (let i = 0, col = 0; i < row.childCount; i++) {
    const { colspan, colwidth } = row.child(i).attrs;
    for (let j = 0; j < colspan; j++, col++) {
      const hasWidth =
        overrideCol == col ? overrideValue : colwidth && colwidth[j];
      colWidths.push(hasWidth ? hasWidth + 'px' : '');
      totalWidth += hasWidth || cellMinWidth;
      if (!hasWidth) fixedWidth = false;
    }
  }
  const setColWidths = [{ tableStart, colWidths }];
  const pos = tableStart - 1;
  const tableWidth = totalWidth + 'px';
  const setTableWidth = [
    fixedWidth
      ? { pos, width: totalWidth, css: { 'min-width': '', width: tableWidth } }
      : { pos, width: totalWidth, css: { 'min-width': tableWidth, width: '' } },
  ];
  return { setColWidths, setTableWidth };
}

// src/commands.ts
import { Fragment as Fragment4 } from 'prosemirror-model';
import {
  NodeSelection as NodeSelection4,
  TextSelection as TextSelection3,
} from 'prosemirror-state';
function selectedRect(state) {
  const sel = state.selection;
  const $pos = selectionCell(state);
  const table = $pos.node(-2);
  const tableStart = $pos.start(-2);
  const map = TableMap.get(table);
  const rect =
    sel instanceof CellSelection
      ? map.rectBetween(
          sel.$anchorCell.pos - tableStart,
          sel.$headCell.pos - tableStart,
        )
      : map.findCell($pos.pos - tableStart);
  return { ...rect, tableStart, map, table };
}
function addColumn(tr, { map, tableStart, table }, col) {
  let refColumn = col > 0 ? -1 : 0;
  if (columnIsHeader(map, table, col + refColumn)) {
    refColumn = col == 0 || col == map.width ? null : 0;
  }
  for (let row = 0; row < map.height; row++) {
    const index = row * map.width + col;
    if (col > 0 && col < map.width && map.map[index - 1] == map.map[index]) {
      const pos = map.map[index];
      const cell = table.nodeAt(pos);
      tr.setNodeMarkup(
        tr.mapping.map(tableStart + pos),
        null,
        addColSpan(cell.attrs, col - map.colCount(pos)),
      );
      row += cell.attrs.rowspan - 1;
    } else {
      const type =
        refColumn == null
          ? tableNodeTypes(table.type.schema).cell
          : table.nodeAt(map.map[index + refColumn]).type;
      const pos = map.positionAt(row, col, table);
      tr.insert(tr.mapping.map(tableStart + pos), type.createAndFill());
    }
  }
  return tr;
}
function addColumnBefore(state, dispatch, view) {
  if (!isInTable(state)) return false;
  if (dispatch) {
    const rect = selectedRect(state);
    dispatch(addColumn(state.tr, rect, rect.left));
  }
  return true;
}
function addColumnAfter(state, dispatch, view) {
  if (!isInTable(state)) return false;
  if (dispatch) {
    const rect = selectedRect(state);
    dispatch(addColumn(state.tr, rect, rect.right));
  }
  return true;
}
function removeColumn(tr, { map, table, tableStart }, col) {
  const mapStart = tr.mapping.maps.length;
  for (let row = 0; row < map.height; ) {
    const index = row * map.width + col;
    const pos = map.map[index];
    const cell = table.nodeAt(pos);
    const attrs = cell.attrs;
    if (
      (col > 0 && map.map[index - 1] == pos) ||
      (col < map.width - 1 && map.map[index + 1] == pos)
    ) {
      tr.setNodeMarkup(
        tr.mapping.slice(mapStart).map(tableStart + pos),
        null,
        removeColSpan(attrs, col - map.colCount(pos)),
      );
    } else {
      const start = tr.mapping.slice(mapStart).map(tableStart + pos);
      tr.delete(start, start + cell.nodeSize);
    }
    row += attrs.rowspan;
  }
}
function deleteColumn(state, dispatch, view) {
  if (!isInTable(state)) return false;
  if (dispatch) {
    const rect = selectedRect(state);
    const tr = state.tr;
    if (rect.left == 0 && rect.right == rect.map.width) return false;
    for (let i = rect.right - 1; ; i--) {
      removeColumn(tr, rect, i);
      if (i == rect.left) break;
      const table = rect.tableStart
        ? tr.doc.nodeAt(rect.tableStart - 1)
        : tr.doc;
      if (!table) {
        throw RangeError('No table found');
      }
      rect.table = table;
      rect.map = TableMap.get(table);
    }
    dispatch(tr);
  }
  return true;
}
function rowIsHeader(map, table, row) {
  var _a;
  const headerCell = tableNodeTypes(table.type.schema).header_cell;
  for (let col = 0; col < map.width; col++)
    if (
      ((_a = table.nodeAt(map.map[col + row * map.width])) == null
        ? void 0
        : _a.type) != headerCell
    )
      return false;
  return true;
}
function addRow(tr, { bottom, map, tableStart, table }, row) {
  var _a;
  let rPos = rowPos(table, row) + tableStart;
  if (bottom === row && isRowLastInSection(table, row - 1)) rPos -= 2;
  const cells = [];
  let refRow = row > 0 ? -1 : 0;
  if (rowIsHeader(map, table, row + refRow))
    refRow = row == 0 || row == map.height ? null : 0;
  const srows = map.sectionRows;
  for (let s = 0, acc = 0; s < srows.length; s++) {
    acc += srows[s];
    if (row < acc || s === srows.length - 1) {
      srows[s]++;
      break;
    }
  }
  for (let col = 0, index = map.width * row; col < map.width; col++, index++) {
    if (
      row > 0 &&
      row < map.height &&
      map.map[index] == map.map[index - map.width]
    ) {
      const pos = map.map[index];
      const attrs = table.nodeAt(pos).attrs;
      tr.setNodeMarkup(tableStart + pos, null, {
        ...attrs,
        rowspan: attrs.rowspan + 1,
      });
      col += attrs.colspan - 1;
    } else {
      const type =
        refRow == null
          ? tableNodeTypes(table.type.schema).cell
          : (_a = table.nodeAt(map.map[index + refRow * map.width])) == null
          ? void 0
          : _a.type;
      const node = type == null ? void 0 : type.createAndFill();
      if (node) cells.push(node);
    }
  }
  tr.insert(rPos, tableNodeTypes(table.type.schema).row.create(null, cells));
  return tr;
}
function addRowBefore(state, dispatch) {
  if (!isInTable(state)) return false;
  if (dispatch) {
    const rect = selectedRect(state);
    dispatch(addRow(state.tr, rect, rect.top));
  }
  return true;
}
function addRowAfter(state, dispatch) {
  if (!isInTable(state)) return false;
  if (dispatch) {
    const rect = selectedRect(state);
    dispatch(addRow(state.tr, rect, rect.bottom));
  }
  return true;
}
function removeRow(tr, { map, table, tableStart }, row) {
  const { node: rNode, pos: rPos } = getRow(table, row);
  const mapFrom = tr.mapping.maps.length;
  const from = rPos + tableStart;
  const to = from + rNode.nodeSize - 1;
  tr.delete(from, to);
  for (let col = 0, index = row * map.width; col < map.width; col++, index++) {
    const pos = map.map[index];
    if (row > 0 && pos == map.map[index - map.width]) {
      const attrs = table.nodeAt(pos).attrs;
      tr.setNodeMarkup(tr.mapping.slice(mapFrom).map(pos + tableStart), null, {
        ...attrs,
        rowspan: attrs.rowspan - 1,
      });
      col += attrs.colspan - 1;
    } else if (row < map.height && pos == map.map[index + map.width]) {
      const cell = table.nodeAt(pos);
      const attrs = cell.attrs;
      const copy = cell.type.create(
        { ...attrs, rowspan: cell.attrs.rowspan - 1 },
        cell.content,
      );
      const newPos = map.positionAt(row + 1, col, table);
      tr.insert(tr.mapping.slice(mapFrom).map(tableStart + newPos), copy);
      col += attrs.colspan - 1;
    }
  }
}
function removeSection(tr, { map, table, tableStart }, section) {
  let pos = 0;
  let s = -1;
  for (let i = 0; i < table.childCount; i++) {
    const child = table.child(i);
    if (isTableSection(child)) {
      s++;
      if (s == section) {
        tr.delete(tableStart + pos, tableStart + pos + child.nodeSize);
        return;
      }
    }
    pos += child.nodeSize;
  }
}
function deleteRow(state, dispatch) {
  if (!isInTable(state)) return false;
  if (dispatch) {
    const rect = selectedRect(state),
      tr = state.tr;
    if (rect.top == 0 && rect.bottom == rect.map.height) return false;
    const sectionRows = rect.map.sectionRows;
    const sectionBottom = [sectionRows[0] || 0];
    for (let s2 = 1; s2 < sectionRows.length; s2++)
      sectionBottom[s2] = sectionBottom[s2 - 1] + sectionRows[s2];
    let s = sectionRows.length - 1;
    while (s > 0 && sectionBottom[s] > rect.bottom) s--;
    for (let i = rect.bottom - 1; ; i--) {
      const firstRowOfSection = sectionBottom[s] - sectionRows[s];
      if (i + 1 === sectionBottom[s] && rect.top <= firstRowOfSection) {
        removeSection(tr, rect, s);
        i = firstRowOfSection;
        s--;
      } else {
        removeRow(tr, rect, i);
      }
      if (i <= rect.top) break;
      const table = rect.tableStart
        ? tr.doc.nodeAt(rect.tableStart - 1)
        : tr.doc;
      if (!table) {
        throw RangeError('No table found');
      }
      rect.table = table;
      rect.map = TableMap.get(rect.table);
    }
    dispatch(tr);
  }
  return true;
}
function addCaption(state, dispatch) {
  const $anchor = state.selection.$anchor;
  const d = tableDepth($anchor);
  if (d < 0) return false;
  const table = $anchor.node(d);
  if (tableHasCaption(table)) return false;
  if (dispatch) {
    let pos = $anchor.start(d);
    const types = tableNodeTypes(state.schema);
    const caption = types.caption.createAndFill();
    dispatch(state.tr.insert(pos, caption));
  }
  return true;
}
function deleteCaption(state, dispatch) {
  const $anchor = state.selection.$anchor;
  const d = tableDepth($anchor);
  if (d < 0) return false;
  const table = $anchor.node(d);
  if (!tableHasCaption(table)) return false;
  if (dispatch) {
    let pos = $anchor.start(d);
    const size = table.firstChild.nodeSize;
    dispatch(state.tr.delete(pos, pos + size));
  }
  return true;
}
function createSection(schema, role, width, cellRole) {
  const types = tableNodeTypes(schema);
  const cells = [];
  const cellType =
    (cellRole && types[cellRole]) || types.cell || types.header_cell;
  for (let i = 0; i < width; i++) cells.push(cellType.createAndFill());
  return types[role].createAndFill(null, types.row.createAndFill(null, cells));
}
function addTableHead(state, dispatch) {
  const $anchor = state.selection.$anchor;
  const d = tableDepth($anchor);
  if (d < 0) return false;
  const table = $anchor.node(d);
  if (tableHasHead(table)) return false;
  if (dispatch) {
    let pos = $anchor.start(d);
    const firstChild = table.child(0);
    if (firstChild && firstChild.type.spec.tableRole === 'caption')
      pos += firstChild.nodeSize;
    const map = TableMap.get(table);
    const head = createSection(state.schema, 'head', map.width, 'header_cell');
    dispatch(state.tr.insert(pos, head));
  }
  return true;
}
function addTableFoot(state, dispatch) {
  const $anchor = state.selection.$anchor;
  const d = tableDepth($anchor);
  if (d < 0) return false;
  const table = $anchor.node(d);
  if (tableHasFoot(table)) return false;
  if (dispatch) {
    const pos = $anchor.end(d);
    const map = TableMap.get(table);
    const foot = createSection(state.schema, 'foot', map.width, 'header_cell');
    dispatch(state.tr.insert(pos, foot));
  }
  return true;
}
function addBodyBefore(state, dispatch) {
  if (!isInTable(state)) return false;
  const rect = selectedRect(state);
  const { map, table, tableStart } = rect;
  const firstSection = map.sectionsInRect(rect)[0];
  if (firstSection === void 0 || (firstSection === 0 && tableHasHead(table)))
    return false;
  if (dispatch) {
    let pos = tableStart,
      s = -1;
    for (let i = 0; i < table.childCount; i++) {
      const child = table.child(i);
      if (child.type.spec.tableRole != 'caption') s++;
      if (s === firstSection) break;
      pos += child.nodeSize;
    }
    const map2 = TableMap.get(table);
    const body = createSection(state.schema, 'body', map2.width);
    dispatch(state.tr.insert(pos, body));
  }
  return true;
}
function addBodyAfter(state, dispatch) {
  if (!isInTable(state)) return false;
  const rect = selectedRect(state);
  const { map, table, tableStart } = rect;
  const sections = map.sectionsInRect(rect);
  const lastSection = sections[sections.length - 1];
  if (lastSection === map.sectionRows.length - 1 && tableHasFoot(table))
    return false;
  if (dispatch) {
    let pos = tableStart - 1,
      s = -1;
    for (let i = 0; i < table.childCount; i++) {
      const child = table.child(i);
      pos += child.nodeSize;
      if (child.type.spec.tableRole != 'caption') s++;
      if (s === lastSection) break;
    }
    const map2 = TableMap.get(table);
    const body = createSection(state.schema, 'body', map2.width);
    dispatch(state.tr.insert(pos, body));
  }
  return true;
}
function fixRowCells(row, headerCellType) {
  const newCells = [];
  for (let i = 0; i < row.childCount; i++) {
    const cell = row.child(i);
    newCells.push(
      cell.type.spec.tableRole === 'header_cell'
        ? cell
        : headerCellType.create(cell.attrs, cell.content),
    );
  }
  return row.copy(Fragment4.from(newCells));
}
function makeSection(role, state, dispatch) {
  if (!isInTable(state)) return false;
  const rect = selectedRect(state);
  const { map, table, tableStart, top, bottom } = rect;
  if (role === 'head' && top > 0) return false;
  if (role === 'foot' && bottom < map.height) return false;
  const tableTypes = tableNodeTypes(state.schema);
  const newSectionType = tableTypes[role];
  if (!newSectionType) return false;
  const fixCellsType =
    (role === 'head' || role === 'foot') &&
    tableTypes.cell &&
    tableTypes.header_cell;
  if (dispatch) {
    let newTableContents = Fragment4.empty;
    let refSection = null;
    let rowIndex = 0;
    let inSelection = false;
    let accSectionRows = Fragment4.empty;
    for (let i = 0; i < table.childCount; i++) {
      const section = table.child(i);
      const sectionRole = section.type.spec.tableRole;
      if (isTableSection(section)) {
        const sectionRowsCount = section.childCount;
        const lastRow = rowIndex + sectionRowsCount - 1;
        if (
          rowIndex === top &&
          lastRow + 1 === bottom &&
          sectionRole === role
        ) {
          return false;
        }
        if (rowIndex >= bottom || lastRow < top) {
          newTableContents = newTableContents.addToEnd(section);
        } else {
          if (!refSection) refSection = section;
          for (let j = 0; j < section.childCount; j++) {
            if (rowIndex + j === top) {
              if (accSectionRows.childCount > 0) {
                newTableContents = newTableContents.addToEnd(
                  refSection.copy(accSectionRows),
                );
                accSectionRows = Fragment4.empty;
              }
              inSelection = true;
            }
            const row =
              inSelection && fixCellsType
                ? fixRowCells(section.child(j), tableTypes.header_cell)
                : section.child(j);
            accSectionRows = accSectionRows.addToEnd(row);
            if (rowIndex + j === bottom - 1) {
              if (refSection.type.spec.tableRole !== role) refSection = section;
              const newSection =
                refSection.type.spec.tableRole !== role
                  ? newSectionType.create(null, accSectionRows)
                  : refSection.copy(accSectionRows);
              newTableContents = newTableContents.addToEnd(newSection);
              accSectionRows = Fragment4.empty;
              refSection = section;
              inSelection = false;
            }
          }
          if (!inSelection && accSectionRows.childCount > 0) {
            newTableContents = newTableContents.addToEnd(
              refSection.copy(accSectionRows),
            );
            accSectionRows = Fragment4.empty;
          }
        }
        rowIndex = lastRow + 1;
      } else {
        newTableContents = newTableContents.addToEnd(section);
      }
    }
    const { doc, tr } = state;
    tr.setSelection(new NodeSelection4(doc.resolve(tableStart - 1)));
    const newTable = table.copy(newTableContents);
    tr.replaceSelectionWith(newTable);
    const cellsPositions = TableMap.get(newTable).cellsInRect(rect);
    const $anchorCell = tr.doc.resolve(tableStart + cellsPositions[0]);
    const $headCell = tr.doc.resolve(
      tableStart + cellsPositions[cellsPositions.length - 1],
    );
    tr.setSelection(new CellSelection($anchorCell, $headCell));
    tr.setMeta(
      columnResizingPluginKey,
      getTableWidths(table, tableStart, getCellMinWidth(state)),
    );
    dispatch(tr);
  }
  return true;
}
function makeBody(state, dispatch) {
  return makeSection('body', state, dispatch);
}
function makeHead(state, dispatch) {
  return makeSection('head', state, dispatch);
}
function makeFoot(state, dispatch) {
  return makeSection('foot', state, dispatch);
}
function deleteSection(state, dispatch) {
  if (!isInTable(state)) return false;
  const rect = selectedRect(state),
    tr = state.tr;
  if (rect.top == 0 && rect.bottom == rect.map.height) return false;
  if (dispatch) {
    const { map, table, tableStart } = rect;
    const sections = map.sectionsInRect(rect);
    if (sections.length >= tableSectionsCount(table) || sections.length == 0)
      return false;
    const firstSectionIndex = tableHasCaption(table) ? 1 : 0;
    const sectionPosAndSize = [];
    let pos = tableStart;
    for (let i = 0; i < table.childCount; i++) {
      const size = table.child(i).nodeSize;
      if (i >= firstSectionIndex) sectionPosAndSize.push([pos, size]);
      pos += size;
    }
    for (let i = sections.length - 1; i >= 0; i--) {
      const [pos2, size] = sectionPosAndSize[sections[i]];
      tr.delete(pos2, pos2 + size);
    }
    dispatch(tr);
  }
  return true;
}
function isEmpty(cell) {
  const c = cell.content;
  return (
    c.childCount == 1 && c.child(0).isTextblock && c.child(0).childCount == 0
  );
}
function cellsOverlapRectangle({ width, height, map }, rect) {
  let indexTop = rect.top * width + rect.left,
    indexLeft = indexTop;
  let indexBottom = (rect.bottom - 1) * width + rect.left,
    indexRight = indexTop + (rect.right - rect.left - 1);
  for (let i = rect.top; i < rect.bottom; i++) {
    if (
      (rect.left > 0 && map[indexLeft] == map[indexLeft - 1]) ||
      (rect.right < width && map[indexRight] == map[indexRight + 1])
    )
      return true;
    indexLeft += width;
    indexRight += width;
  }
  for (let i = rect.left; i < rect.right; i++) {
    if (
      (rect.top > 0 && map[indexTop] == map[indexTop - width]) ||
      (rect.bottom < height && map[indexBottom] == map[indexBottom + width])
    )
      return true;
    indexTop++;
    indexBottom++;
  }
  return false;
}
function mergeCells(state, dispatch) {
  const sel = state.selection;
  if (
    !(sel instanceof CellSelection) ||
    sel.$anchorCell.pos == sel.$headCell.pos
  )
    return false;
  const rect = selectedRect(state),
    { map } = rect;
  if (!map.rectOverOneSection(rect)) return false;
  if (cellsOverlapRectangle(map, rect)) return false;
  if (dispatch) {
    const tr = state.tr;
    const seen = {};
    let content = Fragment4.empty;
    let mergedPos;
    let mergedCell;
    for (let row = rect.top; row < rect.bottom; row++) {
      for (let col = rect.left; col < rect.right; col++) {
        const cellPos = map.map[row * map.width + col];
        const cell = rect.table.nodeAt(cellPos);
        if (seen[cellPos] || !cell) continue;
        seen[cellPos] = true;
        if (mergedPos == null) {
          mergedPos = cellPos;
          mergedCell = cell;
        } else {
          if (!isEmpty(cell)) content = content.append(cell.content);
          const mapped = tr.mapping.map(cellPos + rect.tableStart);
          tr.delete(mapped, mapped + cell.nodeSize);
        }
      }
    }
    if (mergedPos == null || mergedCell == null) {
      return true;
    }
    tr.setNodeMarkup(mergedPos + rect.tableStart, null, {
      ...addColSpan(
        mergedCell.attrs,
        mergedCell.attrs.colspan,
        rect.right - rect.left - mergedCell.attrs.colspan,
      ),
      rowspan: rect.bottom - rect.top,
    });
    if (content.size) {
      const end = mergedPos + 1 + mergedCell.content.size;
      const start = isEmpty(mergedCell) ? mergedPos + 1 : end;
      tr.replaceWith(start + rect.tableStart, end + rect.tableStart, content);
    }
    tr.setSelection(
      new CellSelection(tr.doc.resolve(mergedPos + rect.tableStart)),
    );
    dispatch(tr);
  }
  return true;
}
function splitCell(state, dispatch) {
  const nodeTypes = tableNodeTypes(state.schema);
  return splitCellWithType(({ node }) => {
    return nodeTypes[node.type.spec.tableRole];
  })(state, dispatch);
}
function splitCellWithType(getCellType) {
  return (state, dispatch) => {
    var _a;
    const sel = state.selection;
    let cellNode;
    let cellPos;
    if (!(sel instanceof CellSelection)) {
      cellNode = cellWrapping(sel.$from);
      if (!cellNode) return false;
      cellPos = (_a = cellAround(sel.$from)) == null ? void 0 : _a.pos;
    } else {
      if (sel.$anchorCell.pos != sel.$headCell.pos) return false;
      cellNode = sel.$anchorCell.nodeAfter;
      cellPos = sel.$anchorCell.pos;
    }
    if (cellNode == null || cellPos == null) {
      return false;
    }
    if (cellNode.attrs.colspan == 1 && cellNode.attrs.rowspan == 1) {
      return false;
    }
    if (dispatch) {
      let baseAttrs = cellNode.attrs;
      const attrs = [];
      const colwidth = baseAttrs.colwidth;
      if (baseAttrs.rowspan > 1) baseAttrs = { ...baseAttrs, rowspan: 1 };
      if (baseAttrs.colspan > 1) baseAttrs = { ...baseAttrs, colspan: 1 };
      const rect = selectedRect(state),
        tr = state.tr;
      for (let i = 0; i < rect.right - rect.left; i++)
        attrs.push(
          colwidth
            ? {
                ...baseAttrs,
                colwidth: colwidth && colwidth[i] ? [colwidth[i]] : null,
              }
            : baseAttrs,
        );
      let lastCell;
      for (let row = rect.top; row < rect.bottom; row++) {
        let pos = rect.map.positionAt(row, rect.left, rect.table);
        if (row == rect.top) pos += cellNode.nodeSize;
        for (let col = rect.left, i = 0; col < rect.right; col++, i++) {
          if (col == rect.left && row == rect.top) continue;
          tr.insert(
            (lastCell = tr.mapping.map(pos + rect.tableStart, 1)),
            getCellType({ node: cellNode, row, col }).createAndFill(attrs[i]),
          );
        }
      }
      tr.setNodeMarkup(
        cellPos,
        getCellType({ node: cellNode, row: rect.top, col: rect.left }),
        attrs[0],
      );
      if (sel instanceof CellSelection)
        tr.setSelection(
          new CellSelection(
            tr.doc.resolve(sel.$anchorCell.pos),
            lastCell ? tr.doc.resolve(lastCell) : void 0,
          ),
        );
      dispatch(tr);
    }
    return true;
  };
}
function setCellAttr(name, value) {
  return function (state, dispatch) {
    if (!isInTable(state)) return false;
    const $cell = selectionCell(state);
    if ($cell.nodeAfter.attrs[name] === value) return false;
    if (dispatch) {
      const tr = state.tr;
      if (state.selection instanceof CellSelection)
        state.selection.forEachCell((node, pos) => {
          if (node.attrs[name] !== value)
            tr.setNodeMarkup(pos, null, {
              ...node.attrs,
              [name]: value,
            });
        });
      else
        tr.setNodeMarkup($cell.pos, null, {
          ...$cell.nodeAfter.attrs,
          [name]: value,
        });
      dispatch(tr);
    }
    return true;
  };
}
function deprecated_toggleHeader(type) {
  return function (state, dispatch) {
    if (!isInTable(state)) return false;
    if (dispatch) {
      const types = tableNodeTypes(state.schema);
      const rect = selectedRect(state),
        tr = state.tr;
      const cells = rect.map.cellsInRect(
        type == 'column'
          ? {
              left: rect.left,
              top: 0,
              right: rect.right,
              bottom: rect.map.height,
            }
          : type == 'row'
          ? {
              left: 0,
              top: rect.top,
              right: rect.map.width,
              bottom: rect.bottom,
            }
          : rect,
      );
      const nodes = cells.map(pos => rect.table.nodeAt(pos));
      for (let i = 0; i < cells.length; i++)
        if (nodes[i].type == types.header_cell)
          tr.setNodeMarkup(
            rect.tableStart + cells[i],
            types.cell,
            nodes[i].attrs,
          );
      if (tr.steps.length == 0)
        for (let i = 0; i < cells.length; i++)
          tr.setNodeMarkup(
            rect.tableStart + cells[i],
            types.header_cell,
            nodes[i].attrs,
          );
      dispatch(tr);
    }
    return true;
  };
}
function isHeaderEnabledByType(type, rect, types) {
  const cellPositions = rect.map.cellsInRect({
    left: 0,
    top: 0,
    right: type == 'row' ? rect.map.width : 1,
    bottom: type == 'column' ? rect.map.height : 1,
  });
  for (let i = 0; i < cellPositions.length; i++) {
    const cell = rect.table.nodeAt(cellPositions[i]);
    if (cell && cell.type !== types.header_cell) {
      return false;
    }
  }
  return true;
}
function toggleHeader(type, options) {
  options = options || { useDeprecatedLogic: false };
  if (options.useDeprecatedLogic) return deprecated_toggleHeader(type);
  return function (state, dispatch) {
    if (!isInTable(state)) return false;
    if (dispatch) {
      const types = tableNodeTypes(state.schema);
      const rect = selectedRect(state),
        tr = state.tr;
      const isHeaderRowEnabled = isHeaderEnabledByType('row', rect, types);
      const isHeaderColumnEnabled = isHeaderEnabledByType(
        'column',
        rect,
        types,
      );
      const isHeaderEnabled =
        type === 'column'
          ? isHeaderRowEnabled
          : type === 'row'
          ? isHeaderColumnEnabled
          : false;
      const selectionStartsAt = isHeaderEnabled ? 1 : 0;
      const cellsRect =
        type == 'column'
          ? {
              left: 0,
              top: selectionStartsAt,
              right: 1,
              bottom: rect.map.height,
            }
          : type == 'row'
          ? {
              left: selectionStartsAt,
              top: 0,
              right: rect.map.width,
              bottom: 1,
            }
          : rect;
      const newType =
        type == 'column'
          ? isHeaderColumnEnabled
            ? types.cell
            : types.header_cell
          : type == 'row'
          ? isHeaderRowEnabled
            ? types.cell
            : types.header_cell
          : types.cell;
      rect.map.cellsInRect(cellsRect).forEach(relativeCellPos => {
        const cellPos = relativeCellPos + rect.tableStart;
        const cell = tr.doc.nodeAt(cellPos);
        if (cell) {
          tr.setNodeMarkup(cellPos, newType, cell.attrs);
        }
      });
      dispatch(tr);
    }
    return true;
  };
}
var toggleHeaderRow = toggleHeader('row', {
  useDeprecatedLogic: true,
});
var toggleHeaderColumn = toggleHeader('column', {
  useDeprecatedLogic: true,
});
var toggleHeaderCell = toggleHeader('cell', {
  useDeprecatedLogic: true,
});
function findNextCell($cell, dir) {
  const table = $cell.node(-2);
  const tableStart = $cell.start(-2);
  if (dir < 0) {
    const before = $cell.nodeBefore;
    if (before) {
      return $cell.pos - before.nodeSize;
    }
    for (
      let row = $cell.index(-2) - 1, rowEnd = $cell.before();
      row >= 0;
      row--
    ) {
      const rowNode = $cell.node(-2).child(row);
      const lastChild = rowNode.lastChild;
      if (lastChild) {
        return rowEnd - 1 - lastChild.nodeSize;
      }
      rowEnd -= rowNode.nodeSize;
    }
  } else {
    if ($cell.index() < $cell.parent.childCount - 1) {
      return $cell.pos + $cell.nodeAfter.nodeSize;
    }
    for (
      let row = $cell.indexAfter(-2), rowStart = $cell.after();
      row < table.childCount;
      row++
    ) {
      const rowNode = table.child(row);
      if (rowNode.childCount) return rowStart + 1;
      rowStart += rowNode.nodeSize;
    }
  }
  return null;
}
function goToNextCell(direction) {
  return function (state, dispatch) {
    if (!isInTable(state)) return false;
    const cell = findNextCell(selectionCell(state), direction);
    if (cell == null) return false;
    if (dispatch) {
      const $cell = state.doc.resolve(cell);
      dispatch(
        state.tr
          .setSelection(TextSelection3.between($cell, moveCellForward($cell)))
          .scrollIntoView(),
      );
    }
    return true;
  };
}
function deleteTable(state, dispatch) {
  const $pos = state.selection.$anchor;
  for (let d = $pos.depth; d > 0; d--) {
    const node = $pos.node(d);
    if (node.type.spec.tableRole == 'table') {
      if (dispatch)
        dispatch(
          state.tr.delete($pos.before(d), $pos.after(d)).scrollIntoView(),
        );
      return true;
    }
  }
  return false;
}

// src/index.ts
function tableEditing({ allowTableNodeSelection = false } = {}) {
  return new Plugin2({
    key: tableEditingKey,
    // This piece of state is used to remember when a mouse-drag
    // cell-selection is happening, so that it can continue even as
    // transactions (which might move its anchor cell) come in.
    state: {
      init() {
        return null;
      },
      apply(tr, cur) {
        const set = tr.getMeta(tableEditingKey);
        if (set != null) return set == -1 ? null : set;
        if (cur == null || !tr.docChanged) return cur;
        const { deleted, pos } = tr.mapping.mapResult(cur);
        return deleted ? null : pos;
      },
    },
    props: {
      decorations: drawCellSelection,
      handleDOMEvents: {
        mousedown: handleMouseDown,
      },
      createSelectionBetween(view) {
        return tableEditingKey.getState(view.state) != null
          ? view.state.selection
          : null;
      },
      handleTripleClick,
      handleKeyDown,
      handlePaste,
    },
    appendTransaction(_, oldState, state) {
      return normalizeSelection(
        state,
        fixTables(state, oldState),
        allowTableNodeSelection,
      );
    },
  });
}
export {
  CellBookmark,
  CellSelection,
  ResizeState,
  TableMap,
  clipCells as __clipCells,
  insertCells as __insertCells,
  pastedCells as __pastedCells,
  addBodyAfter,
  addBodyBefore,
  addCaption,
  addColSpan,
  addColumn,
  addColumnAfter,
  addColumnBefore,
  addRow,
  addRowAfter,
  addRowBefore,
  addTableFoot,
  addTableHead,
  cellAround,
  colCount,
  columnIsHeader,
  columnResizing,
  columnResizingPluginKey,
  deleteCaption,
  deleteColumn,
  deleteRow,
  deleteSection,
  deleteTable,
  findCell,
  fixTables,
  fixTablesKey,
  getRow,
  goToNextCell,
  handlePaste,
  inSameTable,
  isInTable,
  isRowLastInSection,
  makeBody,
  makeFoot,
  makeHead,
  mergeCells,
  moveCellForward,
  nextCell,
  pointsAtCell,
  removeColSpan,
  removeColumn,
  removeRow,
  removeSection,
  rowAtPos,
  rowIsHeader,
  rowPos,
  rowsCount,
  selectedRect,
  selectionCell,
  setCellAttr,
  splitCell,
  splitCellWithType,
  tableBodiesCount,
  tableEditing,
  tableEditingKey,
  tableHasCaption,
  tableHasFoot,
  tableHasHead,
  tableNodeTypes,
  tableNodes,
  tableSectionsCount,
  toggleHeader,
  toggleHeaderCell,
  toggleHeaderColumn,
  toggleHeaderRow,
};
