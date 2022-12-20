import { QuestionsNodeView } from 'wax-prosemirror-core';

export default class MatchingContainerNodeView extends QuestionsNodeView {
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
    return 'matching_container';
  }

  update(node) {
    if (node.type.name === 'paragraph') {
      if (!node.sameMarkup(this.node)) return false;
    }
    return super.update(node);
  }

  stopEvent(event) {
    if (event.target.type === 'textarea') {
      return true;
    }
    const innerView = this.context.pmViews[this.node.attrs.id];
    return innerView && innerView.dom.contains(event.target);
  }
}
