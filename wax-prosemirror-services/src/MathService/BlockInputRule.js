import { InputRule } from 'prosemirror-inputrules';
import { NodeSelection } from 'prosemirror-state';

const blockInputRule = (pattern, nodeType, getAttrs) => {
  return new InputRule(pattern, (state, match, start, end) => {
    const $start = state.doc.resolve(start);
    const attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;

    if (
      !$start
        .node(-1)
        .canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)
    )
      return null;

    const tr = state.tr
      .delete(start, end)
      .setBlockType(start, start, nodeType, attrs);
    return tr.setSelection(
      NodeSelection.create(tr.doc, tr.mapping.map($start.pos - 1)),
    );
  });
};
export default blockInputRule;
