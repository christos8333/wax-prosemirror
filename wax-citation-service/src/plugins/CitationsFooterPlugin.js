/* eslint-disable camelcase */
import { Plugin, PluginKey } from 'prosemirror-state';

const citationsFooterPlugin = new PluginKey('citationsFooterPlugin');

export default (key, app) => {
  return new Plugin({
    key: citationsFooterPlugin,
    appendTransaction(transactions, oldState, newState) {
      const { tr } = newState;
      const lastNode = newState.doc.lastChild;
      const { citations_data_node } = newState.schema.nodes;

      if (!lastNode || lastNode.type !== citations_data_node) {
        const newFooter = citations_data_node.create({
          text: 'This content is uneditable.',
        });
        tr.insert(newState.doc.content.size, newFooter);
      }

      if (tr.docChanged) {
        return tr;
      }
    },
  });
};
