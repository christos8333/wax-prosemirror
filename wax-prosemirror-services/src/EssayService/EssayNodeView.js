import AbstractNodeView from '../PortalService/AbstractNodeView';

export default class EssayNodeView extends AbstractNodeView {
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
    return 'essay';
  }

  update(node) {
    return true;
  }

  stopEvent(event) {
    if (event.target.type === 'text') {
      return true;
    }
    const innerView = this.context.view[this.node.attrs.id];
    return innerView && innerView.dom.contains(event.target);
  }
}
