const blockActive = (type, attrs = {}) => state => {
  const { $from, to, node } = state.selection;

  if (node) {
    return node.hasMarkup(type, attrs);
  }
  return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
};

export { blockActive };
