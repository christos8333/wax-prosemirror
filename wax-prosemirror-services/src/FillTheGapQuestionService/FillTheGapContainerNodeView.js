import AbstractNodeView from '../PortalService/AbstractNodeView';

export default class FillTheGapContainerNodeView extends AbstractNodeView {
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
    return 'fill_the_gap_container';
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

  selectNode() {
    this.context.view[this.node.attrs.id].focus();
  }

  stopEvent(event) {
    return (
      this.context.view[this.node.attrs.id] !== undefined &&
      event.target !== undefined &&
      this.context.view[this.node.attrs.id].dom.contains(event.target)
    );
  }

  ignoreMutation() {
    return true;
  }
}
