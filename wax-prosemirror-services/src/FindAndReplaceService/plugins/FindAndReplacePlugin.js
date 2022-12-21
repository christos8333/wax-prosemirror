import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { DocumentHelpers } from 'wax-prosemirror-core';

const findAndReplacePlugin = new PluginKey('findAndReplacePlugin');

let searchText = '';
let matchCase = false;

export default () => {
  return new Plugin({
    key: findAndReplacePlugin,
    state: {
      init: () => {
        return DecorationSet.empty;
      },
      apply(tr, prev, _, newState) {
        let decorations;
        let createdDecorations = DecorationSet.empty;
        let allMatches = [];
        if (searchText !== '') {
          allMatches = DocumentHelpers.findMatches(
            newState.doc,
            searchText,
            matchCase,
          );
        }
        if (allMatches.length > 0) {
          decorations = allMatches.map(result => {
            return Decoration.inline(result.from, result.to, {
              class: 'search-result',
            });
          });
          createdDecorations = DecorationSet.create(newState.doc, decorations);
        }
        return {
          createdDecorations,
          allMatches,
        };
      },
    },
    props: {
      decorations: state => {
        const findAndReplacePluginState =
          state && findAndReplacePlugin.getState(state);
        return findAndReplacePluginState.createdDecorations;
      },
      setSearchText: text => {
        searchText = text;
      },
      setSearchMatchCase: searchCase => {
        matchCase = searchCase;
      },
    },
    view() {
      return {
        update: () => {},
      };
    },
  });
};
