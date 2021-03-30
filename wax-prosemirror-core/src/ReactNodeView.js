/* eslint-disable no-void */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-cond-assign */
/* eslint-disable lines-between-class-members */
import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

let nodeViewTemp = null;
const ReactNodeViewContext = React.createContext({
  node: undefined,
  view: undefined,
  getPos: undefined,
  decorations: undefined,
});
class ReactNodeView {
  constructor(node, view, getPos, decorations, component) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    this.decorations = decorations;
    this.component = component;
    this.componentRef = React.createRef();
  }
  init() {
    this.dom = document.createElement('div');
    this.dom.classList.add('ProseMirror__dom');
    if (!this.node.isLeaf) {
      this.contentDOM = document.createElement('div');
      this.contentDOM.classList.add('ProseMirror__contentDOM');
      this.dom.appendChild(this.contentDOM);
    }

    return {
      nodeView: this,
      portal: this.renderPortal(this.dom),
    };
  }

  renderPortal(container) {
    const Component = props => {
      return React.createElement(this.component, { ...props });
    };

    return ReactDOM.createPortal(<Component />, container, uuidv4());
  }

  update(node) {
    return true;
  }

  destroy() {
    this.dom = undefined;
    this.contentDOM = undefined;
  }
}
export const createReactNodeView = ({
  node,
  view,
  getPos,
  decorations,
  component,
  onCreatePortal,
}) => {
  const reactNodeView = new ReactNodeView(
    node,
    view,
    getPos,
    decorations,
    component,
  );
  const { nodeView, portal } = reactNodeView.init();
  onCreatePortal(portal);
  nodeViewTemp = nodeView;

  return nodeViewTemp;
};
export const useReactNodeView = () => useContext(ReactNodeViewContext);
export default ReactNodeView;
