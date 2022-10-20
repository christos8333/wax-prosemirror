/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from 'uuid';

export default class AbstractNodeView {
  constructor(
    node,
    view,
    getPos,
    decorations,
    createPortal,
    Component,
    context,
  ) {
    this.dom = node.type.spec.inline
      ? document.createElement('span')
      : document.createElement('div');
    this.dom.id = uuidv4();
    this.dom.classList.add('portal');
    this.node = node;
    this.outerView = view;
    this.getPos = getPos;
    this.context = context;

    createPortal(this.dom, Component, node, view, getPos, decorations, context);
  }

  update(node) {
    if (node.type !== this.node.type) return false;

    return true;
  }

  destroy() {
    this.dom = undefined;
    this.contentDOM = undefined;
  }

  stopEvent(event) {
    const innerView = this.context.pmViews[this.node.attrs.id];
    return innerView && innerView.dom.contains(event.target);
  }

  ignoreMutation() {
    return true;
  }

  selectNode() {
    this.dom.classList.add('ProseMirror-selectednode');
  }

  deselectNode() {
    this.dom.classList.remove('ProseMirror-selectednode');
  }
}
