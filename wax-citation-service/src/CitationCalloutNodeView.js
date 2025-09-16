import { QuestionsNodeView } from 'wax-prosemirror-core';

export default class CitationCalloutNodeView extends QuestionsNodeView {
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
    return 'citation_callout';
  }

  selectNode() {
    // this.context.pmViews[this.node.attrs.id].focus();
  }

  stopEvent(event) {
    // Allow drag events to pass through
    if (event.type === 'dragstart' || event.type === 'drag' || event.type === 'dragend') {
      return false;
    }

    if (event.target.type === 'textarea' || !event.target.type) {
      return true;
    }

    return (
      this.context.pmViews[this.node.attrs.id] !== undefined &&
      event.target !== undefined &&
      this.context.pmViews[this.node.attrs.id].dom.contains(event.target)
    );
  }

  ignoreMutation() {
    return true;
  }
}
