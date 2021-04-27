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
    if (!node.sameMarkup(this.node)) return false;
    this.node = node;
    if (this.context.view[node.attrs.id]) {
      let state = this.context.view[node.attrs.id].state;
      let start = node.content.findDiffStart(state.doc.content);
      if (start != null) {
        let { a: endA, b: endB } = node.content.findDiffEnd(state.doc.content);
        let overlap = start - Math.min(endA, endB);
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
