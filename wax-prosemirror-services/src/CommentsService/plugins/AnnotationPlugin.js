import { Plugin, PluginKey } from 'prosemirror-state';
import AnnotationState from './AnnotationState';

let contentSize = 0;
let allCommentsCount = 0;

export const AnnotationPluginKey = new PluginKey('annotationPlugin');
export const AnnotationPlugin = (name, options) => {
  return new Plugin({
    key: AnnotationPluginKey,
    state: {
      init() {
        return new AnnotationState({
          styles: options.styles,
          map: options.existingComments(),
          instance: options.instance,
          onAnnotationListChange: options.onAnnotationListChange,
          onSelectionChange: options.onSelectionChange,
        });
      },
      apply(transaction, pluginState, oldState, newState) {
        return pluginState.apply(transaction, newState);
      },
    },
    props: {
      decorations(state) {
        const { decorations } = this.getState(state);
        if (
          contentSize !== state.doc.content.size ||
          this.getState(state).allTermsList().length !== allCommentsCount
        ) {
          // const annotations = this.getState(state).termsAt(
          //   0,
          //   state.doc.content.size,
          // );
          // options.onSelectionChange(annotations);

          options.onSelectionChange(this.getState(state).allTermsList());
        }
        contentSize = state.doc.content.size;
        allCommentsCount = this.getState(state).allTermsList().length;
        return decorations;
      },
    },
  });
};
