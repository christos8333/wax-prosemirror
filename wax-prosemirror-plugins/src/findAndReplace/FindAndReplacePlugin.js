import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const findAndReplacePlugin = new PluginKey('findAndReplacePlugin');

let searchText = '';
let matchCase = false;

export default props => {
  return new Plugin({
    key: findAndReplacePlugin,
    state: {
      init: (_, state) => {
        return DecorationSet.empty;
      },
      apply(tr, prev, _, newState) {
        let decorations;
        let createdDecorations = DecorationSet.empty;
        const allMatches = DocumentHelpers.findMatches(
          newState.doc,
          searchText,
          matchCase,
        );
        if (allMatches.length > 0) {
          decorations = allMatches.map((result, index) => {
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
    view(editorState) {
      return {
        update: (view, previousState) => {},
      };
    },
  });
};
