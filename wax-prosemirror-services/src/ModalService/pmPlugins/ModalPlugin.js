import { Plugin, PluginKey } from "prosemirror-state";
import actions from "./actions";
export default key =>
  new Plugin({
    key: new PluginKey(key),
    state: {
      init: function init() {
        return {
          action: actions.HIDE_OVERLAY
        };
      },
      apply: function apply(tr) {}
    }
  });
