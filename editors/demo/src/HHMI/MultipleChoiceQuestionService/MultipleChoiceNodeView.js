import { nodes } from 'prosemirror-schema-basic';
import { AbstractNodeView } from 'wax-prosemirror-services';

export default class MultipleChoiceNodeView extends AbstractNodeView {
  constructor(
    node,
    view,
    getPos,
    decorations,
    createPortal,
    Component,
    context,
  ) {
    super(node, view, getPos, decorations, createPortal, Component, context);

    this.node = node;
    this.outerView = view;
    this.getPos = getPos;
    this.context = context;
  }
  static name() {
    return 'multiple_choice';
  }

  update(node) {
    if (
      node.attrs.correct !== this.node.attrs.correct ||
      node.attrs.feedback !== this.node.attrs.feedback
    )
      return true;

    if (!node.sameMarkup(this.node)) return false;
    this.node = node;
    if (this.context.view[node.attrs.id]) {
      const { state } = this.context.view[node.attrs.id];
      const start = node.content.findDiffStart(state.doc.content);
      if (start != null) {
        let { a: endA, b: endB } = node.content.findDiffEnd(state.doc.content);
        const overlap = start - Math.min(endA, endB);
        if (overlap > 0) {
          endA += overlap;
          endB += overlap;
        }
        this.context.view[node.attrs.id].dispatch(
          state.tr
            .replace(start, endB, node.slice(start, endA))
            .setMeta('fromOutside', true),
        );
      }
    }

    return true;
  }
}
