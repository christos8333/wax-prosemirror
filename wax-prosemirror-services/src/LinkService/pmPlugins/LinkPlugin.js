import { Plugin, PluginKey } from "prosemirror-state";

export default keyPlugin => {
  const plugin_key = new PluginKey(keyPlugin);
  return new Plugin({
    key: plugin_key,
    state: {
      init: function init() {
        return {
          action: "HIDE_OVERLAY"
        };
      },
      apply(tr, oldState, newState, test) {
        const { key } = plugin_key;

        newState[key].action = "OPEN_OVERLAY";
        // console.log("first time");
        // newState[key].action =
        //   newState[key].action === "OPEN_OVERLAY"
        //     ? "HIDE_OVERLAY"
        //     : "OPEN_OVERLAY";
        return this.getState(newState);
      }
    }
  });
};
