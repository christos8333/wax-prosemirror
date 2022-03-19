import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DOMSerializer, DOMParser } from 'prosemirror-model';

const chatPlugin = new PluginKey('chatPlugin');

const serializer = schema => {
  const WaxSerializer = DOMSerializer.fromSchema(schema);
  return content => {
    const container = document.createElement('article');
    container.appendChild(WaxSerializer.serializeFragment(content));
    return container.innerHTML;
  };
};

const parser = schema => {
  const WaxParser = DOMParser.fromSchema(schema);

  return content => {
    const container = document.createElement('article');

    container.innerHTML = content;
    return WaxParser.parse(container);
  };
};

export default props => {
  return new Plugin({
    key: chatPlugin,
    state: {
      init: (_, state) => {},
      apply(tr, prev, _, newState) {},
    },
    props: {
      handleKeyDown(view, event) {
        if (event.key === 'Enter' && !event.shiftKey) {
          if (view.state.doc.content.size <= 2) {
            return true;
          }
          const WaxOptions = {
            doc: {},
            schema: view.props.options.schema,
            plugins: view.props.options.plugins,
          };
          const parse = parser(view.props.options.schema);
          WaxOptions.doc = parse('');

          const serialize = serializer(view.props.options.schema);
          props.getContent(serialize(view.state.doc.content));

          view.updateState(EditorState.create(WaxOptions));
          if (view.dispatch) {
            view.state.tr.setMeta('addToHistory', false);
          }
          return true;
        }
        return false;
      },
    },
  });
};
