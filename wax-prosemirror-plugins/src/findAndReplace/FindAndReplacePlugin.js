/* eslint-disable */
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const findAndReplacePlugin = new PluginKey('findAndReplacePlugin');

let allResults = [];
export default props => {
  return new Plugin({
    key: findAndReplacePlugin,
    state: {
      init: (_, state) => {
        return DecorationSet.empty;
      },
      apply(tr, prev, _, newState) {
        console.log('again in apply', allResults);
        let createDecoration;
        let decorations;
        let createdDecorations;
        DecorationSet.empty;
        if (allResults.length > 0) {
          decorations = allResults.map((result, index) => {
            return Decoration.inline(result.from, result.to, {
              class: 'search-result',
            });
          });
          createdDecorations = DecorationSet.create(newState.doc, decorations);
        }
        return {
          createdDecorations,
        };
      },
    },
    props: {
      decorations: state => {
        const findAndReplacePluginState =
          state && findAndReplacePlugin.getState(state);
        return findAndReplacePluginState.createdDecorations;
      },
      setResults: results => {
        allResults = results;
      },
    },
    view(editorState) {
      return {
        update: (view, prevState) => {},
      };
    },
  });
};
