import { v4 as uuidv4 } from 'uuid';

export default class AbstractNodeView {
  constructor(node, view, getPos, decorations, createPortal, Component) {
    this.dom = document.createElement('div');
    this.dom.setAttribute('contenteditable', true);
    const testDiv = document.createElement('div');

    testDiv.setAttribute('id', 'test');
    this.dom.append(testDiv);
    this.dom.id = uuidv4();
    this.dom.classList.add('portal');

    createPortal(this.dom, Component, node, view, getPos, decorations);
  }

  update(node) {
    console.log('d;dld;ddld');
    return false;
  }

  destroy() {
    this.dom = undefined;
    this.contentDOM = undefined;
  }
}
