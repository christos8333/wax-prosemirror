import { QuestionsNodeView } from 'wax-prosemirror-core';

export default class FillTheGapContainerNodeView extends QuestionsNodeView {
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

  selectNode() {
    this.context.pmViews[this.node.attrs.id].focus();
  }

  stopEvent(event) {
    if (event.target.type === 'textarea') {
      return true;
    }

    return (
      this.context.pmViews[this.node.attrs.id] !== undefined &&
      event.target !== undefined &&
      this.context.pmViews[this.node.attrs.id].dom.contains(event.target)
    );
  }
}
