/* eslint-disable class-methods-use-this */
import { QuestionsNodeView } from 'wax-prosemirror-core';

export default class CitationFooterContainerNodeView extends QuestionsNodeView {
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
    return 'citations_data_node';
  }

  selectNode() {
    this.context.pmViews[this.node.attrs.id].focus();
  }

  stopEvent(event) {
    if (event.target.type === 'textarea' || !event.target.type) {
      return true;
    }

    if (event.type === 'keydown') {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        return true;
      }
    }

    return (
      this.context.pmViews[this.node.attrs.id] !== undefined &&
      event.target !== undefined &&
      this.context.pmViews[this.node.attrs.id].dom.contains(event.target)
    );
  }

  handleKeyDown(view, event) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      const { state } = view;
      const { selection } = state;
      const { from } = selection;

      if (from === state.doc.content.size) {
        event.preventDefault();
        return true;
      }
    }
    return false;
  }
}
