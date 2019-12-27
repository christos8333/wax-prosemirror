import { Plugin, PluginKey } from "prosemirror-state";
import Overlay from "./Overlay";
export default Components =>
  new Plugin({
    key: new PluginKey("test"),
    view(editorView) {
      return new Overlay(editorView);
    }
  });
