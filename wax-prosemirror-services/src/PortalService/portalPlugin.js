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
  props.portals.forEach(p => {
    const name = p.nodeView ? p.nodeView.name() : p.name;
    console.log('ppp', p);
    nodeViews[name] = CreateNodeView(
      props.createPortal,
      p.component,
      p.nodeView || AbstractNodeView,
      p.context.context,
    );
  });

  return new Plugin({
    key: portalPlugin,
    props: {
      nodeViews,
    },
  });
};
