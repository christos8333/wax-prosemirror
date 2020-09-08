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

// const getSelectionMark = (state, PMmark) => {
//   const {
//     selection: { $from, $to },
//     doc,
//   } = state;
//   let markFound;
//   doc.nodesBetween($from.pos, $to.pos, (node, from) => {
//     if (node.marks) {
//       const actualMark = node.marks.find(mark => mark.type === PMmark);
//       if (actualMark) {
//         markFound = {
//           from,
//           to: from + node.nodeSize,
//           attrs: actualMark.attrs,
//         };
//       }
//     }
//   });
//
//   return markFound;
// };

/* this is a workaround for now to find marks
  that are pm will break them.
*/
const findFragmentedMark = (state, PMmark) => {
  const {
    selection: { $from, $to },
    doc,
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
            attrs: actualMark.attrs,
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
  const { parent } = $pos;
  const start = parent.childAfter($pos.parentOffset);
  if (!start.node) return null;
  const actualMark = start.node.marks.find(mark => mark.type.name === markType);
  let startIndex = $pos.index();
  let startPos = $pos.start() + start.offset;
  while (
    startIndex > 0 &&
    actualMark.isInSet(parent.child(startIndex - 1).marks)
  )
    startPos -= parent.child(--startIndex).nodeSize;
  let endIndex = $pos.indexAfter();
  let endPos = startPos + start.node.nodeSize;
  while (
    endPos < parent.childCount &&
    actualMark.isInSet(parent.child(endIndex).marks)
  )
    endPos += parent.child(endIndex++).nodeSize;
  return { from: startPos, to: endPos };
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

export default {
  findMark,
  findBlockNodes,
  findChildrenByType,
  findInlineNodes,
  findChildrenByMark,
  findChildrenByAttr,
  findFragmentedMark,
  findAllMarksWithSameId,
  findMarkPosition,
};
