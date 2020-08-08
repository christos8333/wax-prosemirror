'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var uuid = require('uuid');
var prosemirrorCommands = require('prosemirror-commands');

const parseFormatList = str => {
  if (!str) {
    return [];
  }

  let formatList;

  try {
    formatList = JSON.parse(str);
  } catch (error) {
    return [];
  }

  if (!Array.isArray(formatList)) {
    return [];
  }

  return formatList.filter(format => typeof format === "string");
};

const parseTracks = str => {
  if (!str) {
    return [];
  }

  let tracks;

  try {
    tracks = JSON.parse(str);
  } catch (error) {
    return [];
  }

  if (!Array.isArray(tracks)) {
    return [];
  }

  return tracks.filter((track // ensure required fields are present
  ) => track.hasOwnProperty("user") && track.hasOwnProperty("username") && track.hasOwnProperty("date"));
};

const blockLevelToDOM = node => {
  const attrs = node.attrs.track && node.attrs.track.length ? {
    "data-id": node.attrs.id,
    class: node.attrs.class,
    "data-track": JSON.stringify(node.attrs.track),
    "data-group": node.attrs.group
  } : {
    class: node.attrs.class
  };
  return attrs;
};

var SchemaHelpers = {
  parseFormatList,
  parseTracks,
  blockLevelToDOM
};

const findMark = (state, PMmark, toArr = false) => {
  const {
    selection: {
      $from,
      $to
    },
    doc
  } = state;
  const fromMark = $from.marks().find(mark => mark.type === PMmark);
  const toMark = $to.marks().find(mark => mark.type === PMmark);
  let markFound;
  const marksFound = [];
  doc.nodesBetween($from.pos, $to.pos, (node, from) => {
    if (node.marks) {
      const actualMark = node.marks.find(mark => mark.type === PMmark);

      if (actualMark) {
        markFound = {
          from,
          to: from + node.nodeSize,
          attrs: actualMark.attrs,
          contained: !fromMark || !toMark || fromMark === toMark
        };
        marksFound.push(markFound);
      }
    }
  });
  if (toArr) return marksFound;
  return markFound;
};

const getSelectionMark = (state, PMmark) => {
  const {
    selection: {
      $from,
      $to
    },
    doc
  } = state;
  let markFound;
  doc.nodesBetween($from.pos, $to.pos, (node, from) => {
    if (node.marks) {
      const actualMark = node.marks.find(mark => mark.type === PMmark);

      if (actualMark) {
        markFound = {
          from: $from.pos,
          to: $to.pos,
          attrs: actualMark.attrs
        };
      }
    }
  });
  return markFound;
};
/* this is a workaround for now to find marks
  that are pm will break them.
*/


const findFragmentedMark = (state, PMmark) => {
  const {
    selection: {
      $from,
      $to
    },
    doc
  } = state;
  const fromPos = [$from.pos - 1, $from.pos];
  const toPos = [$to.pos - 1, $to.pos];
  let markFound;

  for (let i = 0; i < fromPos.length; i++) {
    doc.nodesBetween(fromPos[i], toPos[i], (node, from) => {
      if (node.marks) {
        const actualMark = node.marks.find(mark => mark.type === PMmark);

        if (actualMark) {
          markFound = {
            from,
            to: from + node.nodeSize,
            attrs: actualMark.attrs
          };
        }
      }
    });

    if (markFound) {
      return markFound;
    }
  }

  return markFound;
};

const findAllMarksWithSameId = (state, mark) => {
  const type = mark.type.name;
  const markType = state.schema.marks[type];
  const allNodes = findChildrenByMark(state.doc, markType, true);
  const allMarksWithSameId = [];
  allNodes.map(node => {
    node.node.marks.filter(value => {
      if (mark.type.name === type && mark.attrs.id === value.attrs.id) {
        allMarksWithSameId.push(node);
      }
    });
  });
  return allMarksWithSameId;
};

const findMarkPosition = (activeView, initialPos, markType) => {
  const $pos = activeView.state.tr.doc.resolve(initialPos);
  const {
    parent
  } = $pos;
  const start = parent.childAfter($pos.parentOffset);
  if (!start.node) return null;
  const actualMark = start.node.marks.find(mark => mark.type.name === markType);
  let startIndex = $pos.index();
  let startPos = $pos.start() + start.offset;

  while (startIndex > 0 && actualMark.isInSet(parent.child(startIndex - 1).marks)) startPos -= parent.child(--startIndex).nodeSize;

  let endIndex = $pos.indexAfter();
  let endPos = startPos + start.node.nodeSize;

  while (endPos < parent.childCount && actualMark.isInSet(parent.child(endIndex).marks)) endPos += parent.child(endIndex++).nodeSize;

  return {
    from: startPos,
    to: endPos
  };
};

const flatten = (node, descend = true) => {
  if (!node) {
    throw new Error('Invalid "node" parameter');
  }

  const result = [];
  node.descendants((child, pos) => {
    result.push({
      node: child,
      pos
    });

    if (!descend) {
      return false;
    }
  });
  return result;
};

const findBlockNodes = (node, descend) => {
  return findChildren(node, child => child.isBlock, descend);
};

const findChildrenByType = (node, nodeType, descend) => {
  return findChildren(node, child => child.type === nodeType, descend);
};

const findChildren = (node, predicate, descend) => {
  if (!node) {
    throw new Error('Invalid "node" parameter');
  } else if (!predicate) {
    throw new Error('Invalid "predicate" parameter');
  }

  return flatten(node, descend).filter(child => predicate(child.node));
};

const findInlineNodes = (node, descend) => {
  return findChildren(node, child => child.isInline, descend);
};

const findChildrenByMark = (node, markType, descend) => {
  return findChildren(node, child => markType.isInSet(child.marks), descend);
};

const findChildrenByAttr = (node, predicate, descend) => {
  return findChildren(node, child => !!predicate(child.attrs), descend);
};
var DocumentHelpers = {
  findMark,
  findBlockNodes,
  findChildrenByType,
  findInlineNodes,
  findChildrenByMark,
  findChildrenByAttr,
  getSelectionMark,
  findFragmentedMark,
  findAllMarksWithSameId,
  findMarkPosition
};

const setBlockType = (nodeType, attrs = {}) => {
  return (state, dispatch) => {
    const {
      tr
    } = state;
    const {
      from,
      to
    } = state.selection;
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
        tr.setBlockType(from, to, nodeType, Object.assign({}, node.attrs, attrs));
      }
    });
    if (!tr.steps.length) return false;
    if (dispatch) dispatch(tr.scrollIntoView());
    return true;
  };
};

const markActive = type => state => {
  const {
    from,
    $from,
    to,
    empty
  } = state.selection;
  return empty ? type.isInSet(state.storedMarks || $from.marks()) : state.doc.rangeHasMark(from, to, type);
};

const blockActive = (type, attrs = {}) => state => {
  const {
    $from,
    to,
    node
  } = state.selection;

  if (node) {
    return node.hasMarkup(type, attrs);
  }

  return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
};

const canInsert = type => state => {
  const {
    $from
  } = state.selection;

  for (let d = $from.depth; d >= 0; d--) {
    const index = $from.index(d);

    if ($from.node(d).canReplaceWith(index, index, type)) {
      return true;
    }
  }

  return false;
};

const createTable = (state, dispatch) => {
  let rowCount = window && window.prompt('How many rows?', 2);
  let colCount = window && window.prompt('How many columns?', 2);
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
  const {
    selection: {
      $from,
      $to
    }
  } = state;
  dispatch(state.tr.setMeta('addToHistory', false).addMark($from.pos, $to.pos, state.schema.marks.link.create({
    href: ''
  })));
};

const isOnSameTextBlock = state => {
  const {
    selection: {
      $from,
      $to,
      from,
      to
    }
  } = state;

  if (from !== to && $from.parent === $to.parent && $from.parent.isTextblock) {
    return true;
  }

  return false;
};

const createComment = (state, dispatch, group, viewid) => {
  prosemirrorCommands.toggleMark(state.config.schema.marks.comment, {
    id: uuid.v4(),
    group,
    conversation: [],
    viewid
  })(state, dispatch);
};

var Commands = {
  setBlockType,
  blockActive,
  canInsert,
  createComment,
  createLink,
  createTable,
  markActive,
  isOnSameTextBlock
};

exports.Commands = Commands;
exports.DocumentHelpers = DocumentHelpers;
exports.SchemaHelpers = SchemaHelpers;
//# sourceMappingURL=index.js.map
