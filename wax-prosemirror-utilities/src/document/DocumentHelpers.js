import { eachRight } from 'lodash';

const findMark = (state, PMmark, toArr = false) => {
  const {
    selection: { $from, $to },
    doc,
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
          contained: !fromMark || !toMark || fromMark === toMark,
        };
        marksFound.push(markFound);
      }
    }
  });
  if (toArr) return marksFound;
  return markFound;
};

const findNode = (state, PMnode, findInParent) => {
  let nodeFound;
  if (findInParent) {
    state.doc.nodesBetween(
      state.selection.from,
      state.selection.to,
      (node, pos) => {
        if (
          node.type.name === 'oen_container' &&
          node.attrs.class === 'outline'
        ) {
          nodeFound = {
            from: state.selection.from,
            to: state.selection.to,
            node,
          };
        }
      },
    );
  } else if (
    state.selection.node &&
    state.selection.node.type.name === PMnode.name
  ) {
    nodeFound = {
      from: state.selection.from,
      to: state.selection.to,
      node: state.selection.node,
    };
  }
  return nodeFound;
};

const getCommentsTracksCount = main => {
  const marks = findInlineNodes(main.state.doc);
  const commentsTracksFormat = [];
  const insertionsDeletions = [];
  marks.map(node => {
    if (node.node.marks.length > 0) {
      node.node.marks.filter(mark => {
        if (
          mark.type.name === 'comment' ||
          mark.type.name === 'format_change'
        ) {
          commentsTracksFormat.push(mark);
        } else if (
          mark.type.name === 'insertion' ||
          mark.type.name === 'deletion'
        ) {
          insertionsDeletions.push(mark);
        }
      });
    }
  });
  const unique = [...new Set(commentsTracksFormat.map(item => item.attrs.id))];
  const total = unique.length + insertionsDeletions.length;
  return total;
};

const getTrackBlockNodesCount = main => {
  const allBlockNodes = findBlockNodes(main.state.doc);
  const trackBlockNodes = [];
  allBlockNodes.map(node => {
    if (node.node.attrs.track && node.node.attrs.track.length > 0) {
      trackBlockNodes.push(node);
    }
  });
  return trackBlockNodes.length;
};

/* TODO */
/* this is a hacky workaround for now to find marks
  that are pm will break them. Correct way is to be done
  by the code that is comment out, but sometimes it doesn't return
  the mark altouhgh it works for any other mark. Find out y?
*/
const findFragmentedMark = (state, PMmark) => {
  const {
    selection: { $from, $to },
    doc,
  } = state;

  // const type = state.config.schema.marks.comment;
  // const mark = empty
  //   ? type.isInSet(state.storedMarks || $from.marks())
  //   : state.doc.rangeHasMark(from, to, type);
  //

  // if (isObject(mark))
  //   return {
  //     from,
  //     to,
  //     attrs: mark.attrs,
  //   };
  //
  // // return undefined;

  let markFound;

  doc.nodesBetween($from.pos - 1, $to.pos, (node, from) => {
    if (node.marks) {
      const actualMark = node.marks.find(mark => mark.type === PMmark);
      if (actualMark) {
        markFound = {
          from,
          to: from + node.nodeSize,
          attrs: actualMark.attrs,
        };
      }
    }
  });

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

// From https://discuss.prosemirror.net/t/expanding-the-selection-to-the-active-mark/

const findMarkPosition = (state, initialPos, markType) => {
  const $pos = state.tr.doc.resolve(initialPos);
  const { parent } = $pos;
  const start = parent.childAfter($pos.parentOffset);
  if (!start.node) return null;
  const actualMark = start.node.marks.find(mark => mark.type.name === markType);

  let startIndex = $pos.index();
  let startPos = $pos.start() + start.offset;
  while (
    startIndex > 0 &&
    actualMark.isInSet(parent.child(startIndex - 1).marks)
  ) {
    startPos -= parent.child(--startIndex).nodeSize;
  }
  let endIndex = $pos.index() + 1;
  let endPos = $pos.start() + start.offset + start.node.nodeSize;

  while (
    endIndex < parent.childCount &&
    actualMark.isInSet(parent.child(endIndex).marks)
  ) {
    endPos += parent.child(endIndex++).nodeSize;
  }

  return { from: startPos, to: endPos, attrs: actualMark.attrs };
};

export const flatten = (node, descend = true) => {
  if (!node) {
    throw new Error('Invalid "node" parameter');
  }
  const result = [];
  node.descendants((child, pos) => {
    result.push({ node: child, pos });
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

export const findChildrenByAttr = (node, predicate, descend) => {
  return findChildren(node, child => !!predicate(child.attrs), descend);
};

/* Find and Replace Matches */
export const findMatches = (doc, searchValue, matchCase) => {
  const allNodes = [];

  doc.descendants((node, pos) => {
    allNodes.push({ node, pos });
  });

  eachRight(allNodes, (node, index) => {
    if (node.node.type.groups.includes('notes')) {
      allNodes.splice(index + 1, node.node.childCount);
    }
  });

  const results = [];
  const mergedTextNodes = [];
  let index = 0;

  allNodes.forEach((node, i) => {
    if (node.node.isText) {
      if (mergedTextNodes[index]) {
        mergedTextNodes[index] = {
          text: mergedTextNodes[index].text + node.node.text,
          pos: mergedTextNodes[index].pos,
        };
      } else {
        mergedTextNodes[index] = {
          text: node.node.text,
          pos: node.pos,
        };
      }
    } else {
      index += 1;
    }
  });
  mergedTextNodes.forEach(({ text, pos }) => {
    const search = RegExp(escapeRegExp(searchValue), matchCase ? 'gu' : 'gui');
    let m;
    // eslint-disable-next-line no-cond-assign
    while ((m = search.exec(text))) {
      if (m[0] === '') {
        break;
      }

      results.push({
        from: pos + m.index,
        to: pos + m.index + m[0].length,
      });
    }
  });
  return results;
};

const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const findParentOfType = (state, nodeType) => {
  let nodeFound = '';
  const predicate = node => node.type === nodeType;
  for (let i = state.selection.$from.depth; i > 0; i -= 1) {
    const node = state.selection.$from.node(i);
    if (predicate(node)) {
      nodeFound = node;
    }
  }
  return nodeFound;
};

export default {
  findMark,
  findNode,
  findBlockNodes,
  findChildrenByType,
  findInlineNodes,
  findChildrenByMark,
  findChildrenByAttr,
  findFragmentedMark,
  findAllMarksWithSameId,
  findMarkPosition,
  getCommentsTracksCount,
  getTrackBlockNodesCount,
  findMatches,
  findParentOfType,
};
