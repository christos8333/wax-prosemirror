import { Plugin, PluginKey } from 'prosemirror-state';
import AbstractNodeView from './AbstractNodeView';

const portalPlugin = new PluginKey('portalPlugin');

const CreateNodeView = (createPortal, Component, NodeView) => {
  return (theNode, view, getPos, decorations) =>
    new NodeView(theNode, view, getPos, decorations, createPortal, Component);
};

export default props => {
  const nodeViews = {};
  props.portals.forEach(p => {
    const name = p.nodeView ? p.nodeView.name() : p.name;

    nodeViews[name] = CreateNodeView(
      props.createPortal,
      p.component,
      p.nodeView || AbstractNodeView,
    );
  });

  return new Plugin({
    key: portalPlugin,
    props: {
      nodeViews,
    },
  });
};
