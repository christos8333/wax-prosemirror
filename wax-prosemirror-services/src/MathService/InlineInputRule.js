import { InputRule } from 'prosemirror-inputrules';

const inlineInputRule = (pattern, nodeType, getAttrs) => {
  return new InputRule(pattern, (state, match, start, end) => {
    const $start = state.doc.resolve(start);
    const index = $start.index();
    const $end = state.doc.resolve(end);
    // get attrs
    const attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
    // check if replacement valid
    if (!$start.parent.canReplaceWith(index, $end.index(), nodeType)) {
      return null;
    }
    // perform replacement
    return state.tr.replaceRangeWith(
      start,
      end,
      nodeType.create(attrs, nodeType.schema.text(match[1])),
    );
  });
};

export default inlineInputRule;
