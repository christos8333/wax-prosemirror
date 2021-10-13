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

  selectNode() {
    this.context.view[this.node.attrs.id].focus();
  }

  stopEvent(event) {
    console.log(
      this.context.view[this.node.attrs.id] !== undefined &&
        event.target !== undefined &&
        this.context.view[this.node.attrs.id].dom.contains(event.target),
    );

    return (
      this.context.view[this.node.attrs.id] !== undefined &&
      event.target !== undefined &&
      this.context.view[this.node.attrs.id].dom.contains(event.target)
    );
  }

  ignoreMutation() {
    return true;
  }
}
