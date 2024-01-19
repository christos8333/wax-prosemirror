import { Plugin, PluginKey } from 'prosemirror-state';

const AnnotationPluginKey = new PluginKey('AnnotationPluginKey');

export default props => {
  return new Plugin({
    key: AnnotationPluginKey,
    state: {
      init() {
        return new annotation_state_1.AnnotationState({
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
