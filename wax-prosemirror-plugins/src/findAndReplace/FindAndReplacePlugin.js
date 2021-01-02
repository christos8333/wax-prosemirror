import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { eachRight } from 'lodash';

const findAndReplacePlugin = new PluginKey('findAndReplacePlugin');

let searchText = '';
let matchCase = false;

const findMatches = (doc, searchValue) => {
  const allNodes = [];

  doc.descendants((node, pos) => {
    allNodes.push({ node, pos });
  });

  eachRight(allNodes, (node, index) => {
    if (node.node.type.name === 'footnote') {
      allNodes.splice(index + 1, node.node.childCount);
    }
  });

  const results = [];
  const mergedTextNodes = [];
  let index = 0;

  allNodes.forEach((node, i) => {
    if (node.node.isText) {
      if (mergedTextNodes[index]) {
        mergedTextNodes[index] = {
          text: mergedTextNodes[index].text + node.node.text,
          pos: mergedTextNodes[index].pos,
        };
      } else {
        mergedTextNodes[index] = {
          text: node.node.text,
          pos: node.pos,
        };
      }
    } else {
      index += 1;
    }
  });
  mergedTextNodes.forEach(({ text, pos }) => {
    const search = RegExp(searchValue, matchCase ? 'gu' : 'gui');
    let m;
    // eslint-disable-next-line no-cond-assign
    while ((m = search.exec(text))) {
      if (m[0] === '') {
        break;
      }

      results.push({
        from: pos + m.index,
        to: pos + m.index + m[0].length,
      });
    }
  });
  return results;
};

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
        const allMatches = findMatches(newState.doc, searchText);
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
