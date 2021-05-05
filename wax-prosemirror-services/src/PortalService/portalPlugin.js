import { Plugin, PluginKey } from 'prosemirror-state';
import AbstractNodeView from './AbstractNodeView';

const portalPlugin = new PluginKey('portalPlugin');

const CreateNodeView = (createPortal, Component, NodeView, context) => {
  return (theNode, view, getPos, decorations) =>
    new NodeView(
      theNode,
      view,
      getPos,
      decorations,
      createPortal,
      Component,
      context,
    );
};

export default props => {
  const nodeViews = {};
  props.portals.forEach(portal => {
    const name = portal.nodeView ? portal.nodeView.name() : portal.name;
    nodeViews[name] = CreateNodeView(
      props.createPortal,
      portal.component,
      portal.nodeView || AbstractNodeView,
      portal.context.context,
    );
  });

  return new Plugin({
    key: portalPlugin,
    props: {
      nodeViews,
    },
  });
};
