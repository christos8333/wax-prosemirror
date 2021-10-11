import { AbstractNodeView } from 'wax-prosemirror-services';

export default class MultipleChoiceNodeView extends AbstractNodeView {
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
    return 'fill_the_gap';
  }

  update(node) {
    return true;
  }
}
