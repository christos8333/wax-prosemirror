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
        let createDecoration;
        DecorationSet.empty;
        console.log(allResults);
        if (allResults.length > 0) {
          createDecoration = DecorationSet.create(newState.doc, [
            Decoration.inline(allResults[0].from, allResults[0].to, {
              class: 'search-result',
            }),
          ]);
        }
        console.log(createDecoration);
        return {
          createDecoration,
          DecorationSet,
        };
      },
    },
    props: {
      decorations: state => {
        const findAndReplacePluginState =
          state && findAndReplacePlugin.getState(state);
        return findAndReplacePluginState.createDecoration;
      },
      setResults: results => {
        allResults = results;
      },
    },
    view(editorState) {
      return {
        update: (view, _prevState) => {
          console.log('in update');
        },
      };
    },
  });
};
