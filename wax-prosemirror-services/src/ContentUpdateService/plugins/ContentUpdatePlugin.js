import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { DOMParser } from 'prosemirror-model';

const contentUpdatePlugin = new PluginKey('contentUpdatePlugin');

const parser = schema => {
  const WaxParser = DOMParser.fromSchema(schema);
  return htmlContent => {
    const container = document.createElement('article');
    container.innerHTML = htmlContent;
    return WaxParser.parse(container);
  };
};

let currentView = null;

export default props => {
  return new Plugin({
    key: contentUpdatePlugin,
    state: {
      init: () => ({}),
      apply() {
        return {};
      },
    },
    view: editorView => {
      currentView = editorView;
      return {
        update: view => {
          currentView = view;
        },
        destroy: () => {
          currentView = null;
        },
      };
    },
    props: {
      updateContent: (htmlContent, view) => {
        const targetView = view || currentView;
        if (!targetView || !htmlContent) {
          return;
        }

        const { schema, plugins } = targetView.state;
        const parse = parser(schema);

        try {
          const parsedDoc = parse(htmlContent);
          const newState = EditorState.create({
            doc: parsedDoc,
            schema,
            plugins,
          });

          targetView.updateState(newState);

          if (props.onContentUpdate) {
            props.onContentUpdate(htmlContent, newState);
          }
        } catch (error) {
          if (props.onError) {
            props.onError(error);
          }
        }
      },
    },
  });
};

// Export function to update content from outside
export const updateContent = (htmlContent, app, view = null) => {
  if (!app) {
    console.error('ContentUpdatePlugin: App instance required');
    return;
  }

  const plugin = app.PmPlugins.get('contentUpdatePlugin');
  if (!plugin) {
    console.error(
      'ContentUpdatePlugin: Plugin not found. Make sure ContentUpdateService is added to services.',
    );
    return;
  }

  const targetView = view || currentView;
  if (targetView) {
    plugin.props.updateContent(htmlContent, targetView);
  } else {
    console.warn(
      'ContentUpdatePlugin: No view available. Pass the view as the third parameter or ensure the editor is initialized.',
    );
  }
};
