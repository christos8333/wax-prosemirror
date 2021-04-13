import { Plugin, PluginKey } from 'prosemirror-state';

const portalPlugin = new PluginKey('portalPlugin');

class ReactNodeView {
  constructor(node, view, getPos, decorations, createPortal) {
    this.dom = document.createElement('div');
    this.dom.id = 'portalId';
    this.dom.classList.add('portal');

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

const multipleChoice = ({ createPortal }) => {
  return (theNode, view, getPos, decorations) =>
    new ReactNodeView(theNode, view, getPos, decorations, createPortal);
};

export default props => {
  return new Plugin({
    key: portalPlugin,
    state: {
      init: (_, state) => {
        return props;
      },
    },
  });
};
