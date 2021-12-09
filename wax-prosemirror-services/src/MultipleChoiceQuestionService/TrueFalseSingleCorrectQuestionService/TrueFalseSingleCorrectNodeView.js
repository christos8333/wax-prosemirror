import AbstractNodeView from '../../PortalService/AbstractNodeView';

export default class TrueFalseSingleCorrectNodeView extends AbstractNodeView {
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
    return 'true_false_single_correct';
  }

  update(node) {
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

  stopEvent(event) {
    if (event.target.type === 'text') {
      return true;
    }
    const innerView = this.context.view[this.node.attrs.id];
    return innerView && innerView.dom.contains(event.target);
  }
}
