import { Plugin, PluginKey } from "prosemirror-state";
export const findLink = new PluginKey("findLink");

export default items => {
  return () =>
    new Plugin({
      key: findLink,
      state: {
        init() {
          return items;
        }
      }
    });
};
