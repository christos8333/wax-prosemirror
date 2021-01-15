/* eslint-disable */

import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const hideShowPlugin = new PluginKey('hideShowPlugin');

export default props => {
  return new Plugin({
    key: hideShowPlugin,
    state: {
      init: (_, state) => {},
      apply(tr, prev, _, newState) {
        console.log('in apply');
      },
    },
    props: {
      decorations: state => {
        const hideShowPluginState = state && hideShowPlugin.getState(state);
        // return hideShowPluginState.createDecoration;
      },
    },
  });
};
