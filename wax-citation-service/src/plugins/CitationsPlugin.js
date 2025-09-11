/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { Plugin, PluginKey } from 'prosemirror-state';
import { Slice, Fragment } from 'prosemirror-model';

const citationsPluginKey = new PluginKey('citationsPlugin');

const findCitations = doc => {
  const citations = [];
  doc.descendants(node => {
    if (node.type.name === 'citationCallout') {
      citations.push(node.attrs.citationId);
    }
  });
  return citations;
};

const createCitationContent = (citations, schema) => {
  const citationNodes = citations.map(citationId => {
    // You'd have a mapping from citationId to actual citation text
    const citationText = `[${citationId}] The corresponding citation text.`;
    return schema.nodes.paragraph.create(
      {},
      schema.nodes.text.create({ text: citationText }),
    );
  });
  return Slice.from(Fragment.fromArray(citationNodes));
};

export default (key, app) => {
  return new Plugin({
    key: citationsPluginKey,
    state: {
      init(_, state) {
        return findCitations(state.doc);
      },
      apply(tr, value, oldState, newState) {
        if (tr.docChanged) {
          return findCitations(newState.doc);
        }
        return value;
      },
    },
    appendTransaction(transactions, oldState, newState) {
      const citations = citationsPluginKey.getState(newState);
      const { citations_data_node } = newState.schema.nodes;
      let { tr } = newState;
      const lastNode = newState.doc.lastChild;

      const newCitationsContent = createCitationContent(
        citations,
        newState.schema,
      );

      if (lastNode && lastNode.type === citations_data_node) {
        // Replace the content of the existing footer
        const from = newState.doc.content.size - lastNode.content.size;
        const to = newState.doc.content.size;
        tr = tr.replaceWith(from, to, newCitationsContent);
      } else {
        // Add a new footer if it's missing
        const newCitations = citations_data_node.create(
          {},
          newCitationsContent,
        );
        tr = tr.insert(newState.doc.content.size, newCitations);
      }

      if (tr.docChanged) {
        return tr;
      }
    },
  });
};
