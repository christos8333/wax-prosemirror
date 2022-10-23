import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DOMSerializer, DOMParser } from 'prosemirror-model';

const getContentOnEnterPlugin = new PluginKey('getContentOnEnterPlugin');

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
    key: getContentOnEnterPlugin,
    state: {
      init: (_, state) => {},
      apply(tr, prev, _, newState) {},
    },
    props: {
      handleKeyDown(view, event) {
        let isList = false;
        if (event.key === 'Enter' && !event.shiftKey) {
          if (view.state.doc.content.size <= 2) {
            return true;
          }
          const {
            selection: { from, to },
            config: { schema, plugins },
            doc: { content },
          } = view.state;

          view.state.doc.nodesBetween(from, to, node => {
            if (node.type.name === 'list_item') isList = true;
          });

          if (!isList) {
            const serialize = serializer(schema);
            props.getContentOnEnter(serialize(content));
            const parse = parser(schema);
            const WaxOptions = {
              doc: parse(''),
              schema,
              plugins,
            };

            view.updateState(EditorState.create(WaxOptions));
            if (view.dispatch) {
              view.dispatch(view.state.tr.setMeta('addToHistory', false));
            }
            return true;
          }
        }
        return false;
      },
    },
  });
};
