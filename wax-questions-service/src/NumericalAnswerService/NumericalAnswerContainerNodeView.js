import { QuestionsNodeView } from 'wax-prosemirror-core';

export default class NumericalAnswerContainerNodeView extends QuestionsNodeView {
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
    return 'numerical_answer_container';
  }

  selectNode() {
    this.context.pmViews[this.node.attrs.id].focus();
  }

  stopEvent(event) {
    return true;
  }
}
