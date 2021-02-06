import { Decoration, DecorationSet } from 'prosemirror-view';
import { Plugin, TextSelection } from 'prosemirror-state';

const captionPlugin = key =>
  new Plugin({
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        console.log('in apply');
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });

export default captionPlugin;
