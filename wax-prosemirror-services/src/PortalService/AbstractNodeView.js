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
    if (!node.sameMarkup(this.node)) return false;
    this.node = node;
    if (this.context.view[node.attrs.id]) {
      const { state } = this.context.view[node.attrs.id];
      const start = node.content.findDiffStart(state.doc.content);
      if (start != null) {
        let { a: endA, b: endB } = node.content.findDiffEnd(state.doc.content);
        const overlap = start - Math.min(endA, endB);
        if (overlap > 0) {
          endA += overlap;
          endB += overlap;
        }
        this.context.view[node.attrs.id].dispatch(
          state.tr
            .replace(start, endB, node.slice(start, endA))
            .setMeta('fromOutside', true),
        );
      }
    }

    return true;
  }

  destroy() {
    this.dom = undefined;
    this.contentDOM = undefined;
  }

  stopEvent(event) {
    const innerView = this.context.view[this.node.attrs.id];
    return innerView && innerView.dom.contains(event.target);
  }

  ignoreMutation() {
    return true;
  }

  selectNode() {}

  deselectNode() {}
}
