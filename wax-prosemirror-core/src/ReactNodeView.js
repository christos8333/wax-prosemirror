/* eslint-disable no-void */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-cond-assign */
/* eslint-disable lines-between-class-members */
import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid';

let keyShort = null;
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
      const { component: Components } = this;
      //   const componentRef = useRef(null);
      console.log(222222);
      //   useEffect(() => {
      //     let _a;
      //     const componentDOM = componentRef.current;
      //     if (componentDOM != null && this.contentDOM != null) {
      //       if (!this.node.isLeaf) {
      //         (_a = componentDOM.firstChild) === null || _a === void 0
      //           ? void 0
      //           : _a.appendChild(this.contentDOM);
      //       }
      //     }
      //   }, [componentRef]);

      return React.createElement(this.component, { ...props });
      //   return React.createElement(this.component, { ...props });
      //   return React.createElement(
      //     'div',
      //     { ref: componentRef, className: 'ProseMirror__reactComponent' },
      //     React.createElement(
      //       ReactNodeViewContext.Provider,
      //       {
      //         value: {
      //           node: this.node,
      //           view: this.view,
      //           getPos: this.getPos,
      //           decorations: this.decorations,
      //         },
      //       },
      //       React.createElement(this.component, { ...props }),
      //     ),
      //   );
    };

    keyShort = keyShort === null ? shortid.generate() : keyShort;

    console.log(Component, container, 111111111111);
    return ReactDOM.createPortal(<Component />, container, shortid.generate());
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
  //   if (!nodeViewTemp) {
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
  //   }

  return nodeViewTemp;
};
export const useReactNodeView = () => useContext(ReactNodeViewContext);
export default ReactNodeView;
