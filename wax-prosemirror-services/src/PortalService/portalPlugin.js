import { Plugin, PluginKey } from 'prosemirror-state';

const portalPlugin = new PluginKey('portalPlugin');

class ReactNodeView {
  constructor(node, view, getPos, decorations, createPortal, Component) {
    this.dom = document.createElement('div');
    this.dom.id = 'portalId';
    this.dom.classList.add('portal');

    console.log('dddd');
    createPortal(this.dom, Component);
  }

  update(node) {
    return true;
  }

  destroy() {
    this.dom = undefined;
    this.contentDOM = undefined;
  }
}

const PortalWithNodeView = (createPortal, Component) => {
  return (theNode, view, getPos, decorations) =>
    new ReactNodeView(
      theNode,
      view,
      getPos,
      decorations,
      createPortal,
      Component,
    );
};

export default props => {
  const nodeViews = {};
  props.portals.forEach(p => {
    nodeViews[p.name] = PortalWithNodeView(props.createPortal, p.component);
  });

  return new Plugin({
    key: portalPlugin,
    props: {
      nodeViews,
    },
  });
};
