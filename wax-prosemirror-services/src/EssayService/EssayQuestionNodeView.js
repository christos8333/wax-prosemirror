import QuestionsNodeView from '../lib/helpers/QuestionsNodeView';

export default class EssayQuestionNodeView extends QuestionsNodeView {
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
    return 'essay_question';
  }

  stopEvent(event) {
    const innerView = this.context.pmViews[this.node.attrs.id];
    return innerView && innerView.dom.contains(event.target);
  }
}
