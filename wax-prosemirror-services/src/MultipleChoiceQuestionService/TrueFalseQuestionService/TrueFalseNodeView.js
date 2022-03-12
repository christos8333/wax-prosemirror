import AbstractNodeView from '../../PortalService/AbstractNodeView';

export default class TrueFalseNodeView extends AbstractNodeView {
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
    return 'true_false';
  }

  update(node) {
    this.node = node;
    if (this.context.pmViews[node.attrs.id]) {
      const { state } = this.context.pmViews[node.attrs.id];
      const start = node.content.findDiffStart(state.doc.content);
      if (start != null) {
        let { a: endA, b: endB } = node.content.findDiffEnd(state.doc.content);
        const overlap = start - Math.min(endA, endB);
        if (overlap > 0) {
          endA += overlap;
          endB += overlap;
        }
        this.context.pmViews[node.attrs.id].dispatch(
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
    const innerView = this.context.pmViews[this.node.attrs.id];
    return innerView && innerView.dom.contains(event.target);
  }
}
