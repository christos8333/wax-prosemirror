import { AbstractNodeView } from 'wax-prosemirror-services';

export default class MultipleChoiceNodeView extends AbstractNodeView {
  // constructor(
  //   node,
  //   view,
  //   getPos,
  //   decorations,
  //   createPortal,
  //   Component,
  //   context,
  // ) {
  //   super(node, view, getPos, decorations, createPortal, Component, context);
  // }
  static name() {
    return 'multiple_choice';
  }
}
