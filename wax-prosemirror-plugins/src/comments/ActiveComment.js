import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

const activeCommnet = new PluginKey("activeCommnet");

export default props => {
  return new Plugin({
    key: activeCommnet,
    props: {
      decorations: state => {
        console.log("111");
      }
    }
  });
};
