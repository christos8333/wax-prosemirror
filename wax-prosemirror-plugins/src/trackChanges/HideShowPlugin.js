/* eslint-disable */

import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const hideShowPlugin = new PluginKey('hideShowPlugin');

const getTrackChanges = state => {
  const finalTracks = [];
  const allInlineNodes = DocumentHelpers.findInlineNodes(state.doc);
  allInlineNodes.map(node => {
    if (node.node.marks.length > 0) {
      node.node.marks.filter(mark => {
        if (
          mark.type.name === 'insertion' ||
          mark.type.name === 'deletion' ||
          mark.type.name === 'format_change'
        ) {
          mark.pos = node.pos;
          finalTracks.push(mark);
        }
      });
    }
  });
  return finalTracks;
};

export default props => {
  return new Plugin({
    key: hideShowPlugin,
    state: {
      init: (_, state) => {
        return DecorationSet.empty;
      },
      apply(tr, prev, _, newState) {
        let decorations;
        let createdDecorations = DecorationSet.empty;
        const allMatches = getTrackChanges(newState);
        console.log('in apply', allMatches);
        if (allMatches.length > 0) {
          decorations = allMatches.map((result, index) => {
            if (result.type.name === 'insertion') {
              const position = DocumentHelpers.findMarkPosition(
                newState,
                result.pos,
                'insertion',
              );

              return Decoration.inline(position.from, position.to, {
                class: 'show-insertion',
              });
            }
            if (result.type.name === 'deletion') {
              const position = DocumentHelpers.findMarkPosition(
                newState,
                result.pos,
                'deletion',
              );

              return Decoration.inline(position.from, position.to, {
                class: 'hide-deletion',
              });
            }
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
        const hideShowPluginState = state && hideShowPlugin.getState(state);
        return hideShowPluginState.createdDecorations;
      },
      hideShow: show => {
        console.log(show);
      },
    },
  });
};
