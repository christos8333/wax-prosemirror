import { QuestionsNodeView } from 'wax-prosemirror-core';

export default class QuestionTrueFalseNodeView extends QuestionsNodeView {
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
    return 'question_node_true_false';
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
