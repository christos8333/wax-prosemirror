import { Plugin, PluginKey } from 'prosemirror-state';
import AnnotationState from './AnnotationState';

export const AnnotationPluginKey = new PluginKey('annotation-magic');

export const AnnotationPlugin = (name, options) => {
  console.log(context);
  return new Plugin({
    key: AnnotationPluginKey,
    state: {
      init() {
        return new AnnotationState({
          styles: options.styles,
          map: new Map(),
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
        const { selection } = state;
        // multiple characters selected
        if (!selection.empty) {
          const annotations = this.getState(state).termsAt(
            selection.from,
            selection.to,
          );
          console.log(annotations);
          options.onSelectionChange(annotations);
          return decorations;
        }
        // only cursor change
        const annotations = this.getState(state).termsAt(selection.from);
        options.onSelectionChange(annotations);
        return decorations;
      },
    },
  });
};
