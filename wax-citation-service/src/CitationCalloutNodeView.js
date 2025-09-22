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

  stopEvent(event) {
    return super.stopEvent(event);
  }
}
