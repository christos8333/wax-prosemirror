import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

const placeHolderText = new PluginKey("placeHolderText");

export default props => {
  return new Plugin({
    key: placeHolderText,
    props: {
      decorations: state => {
        const decorations = [];
        const decorate = (node, pos) => {
          if (
            node.type.isBlock &&
            node.childCount === 0 &&
            state.doc.content.childCount === 1
          ) {
            decorations.push(
              Decoration.node(pos, pos + node.nodeSize, {
                class: "empty-node",
                "data-content": props.content
              })
            );
          }
        };
        state.doc.descendants(decorate);

        return DecorationSet.create(state.doc, decorations);
      }
    }
  });
};
