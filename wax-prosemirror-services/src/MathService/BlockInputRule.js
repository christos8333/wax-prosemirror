/* eslint-disable */
import { InputRule } from 'prosemirror-inputrules';
import { NodeSelection } from 'prosemirror-state';

const blockInputRule = (pattern, nodeType, getAttrs) => {
  return new InputRule(pattern, (state, match, start, end) => {
    let $start = state.doc.resolve(start);
    let attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
    if (
      !$start
        .node(-1)
        .canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)
    )
      return null;
    let tr = state.tr
      .delete(start, end)
      .setBlockType(start, start, nodeType, attrs);
    return tr.setSelection(
      NodeSelection.create(tr.doc, tr.mapping.map($start.pos - 1)),
    );
  });
};
export default blockInputRule;
