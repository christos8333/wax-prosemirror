const findMark = (state, PMmark) => {
  const { selection: { $from, $to }, doc } = state;

  const fromMark = $from.marks().find(mark => mark.type === PMmark);
  const toMark = $to.marks().find(mark => mark.type === PMmark);
  let markFound;
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
      }
    }
  });
  return markFound;
};

const updateNotes = view => {
  if (view) {
    return findBlockNodes(
      view.state.doc,
      view.state.schema.nodes.footnote,
      true
    );
  }
  return [];
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

export const findChildren = (node, predicate, descend) => {
  if (!node) {
    throw new Error('Invalid "node" parameter');
  } else if (!predicate) {
    throw new Error('Invalid "predicate" parameter');
  }
  return flatten(node, descend).filter(child => {
    // predicate(child.node)console.log(child.node);
    // return predicate(child.node);
    // console.log(child.node.type.name === "footnote", predicate(child.node));
    return child.node.type.name === "footnote" ? child.node : false;
  });
};

export const findBlockNodes = (node, descend) => {
  return findChildren(node, child => child.isBlock, descend);
};
export default { findMark };
