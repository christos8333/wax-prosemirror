import { QuestionsNodeView } from 'wax-prosemirror-core';

export default class MultipleDropDownContainerNodeView extends QuestionsNodeView {
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
    return 'multiple_drop_down_container';
  }

  stopEvent(event) {
    if (
      event.target.type === 'textarea' ||
      event.target.type === 'text' ||
      !event.target.type
    ) {
      return true;
    }
    const innerView = this.context.pmViews[this.node.attrs.id];
    return innerView && innerView.dom.contains(event.target);
  }
}
