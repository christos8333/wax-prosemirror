import { QuestionsNodeView } from 'wax-prosemirror-core';

export default class TrueFalseContainerNodeView extends QuestionsNodeView {
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
    return 'true_false_container';
  }

  stopEvent(event) {
    if (
      !event.target.type ||
      event.target.type === 'button' ||
      event.target.type === 'text' ||
      event.target.type === 'textarea'
    ) {
      return true;
    }
    const innerView = this.context.pmViews[this.node.attrs.id];
    return innerView && innerView.dom.contains(event.target);
  }
}
