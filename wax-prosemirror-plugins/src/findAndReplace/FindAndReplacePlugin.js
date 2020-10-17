/* eslint-disable */
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const findAndReplacePlugin = new PluginKey('findAndReplacePlugin');

export default props => {
  return new Plugin({
    key: findAndReplacePlugin,
    state: {
      init: (_, state) => {
        return {};
      },
      apply(tr, prev, _, newState) {},
    },
    props: {
      decorations: state => {
        const findAndReplacePluginState =
          state && findAndReplacePlugin.getState(state);
        // return findAndReplacePluginState.createDecoration;
      },
      setResults: results => {
        console.log(results);
      },
    },
  });
};
