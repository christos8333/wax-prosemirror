import { Plugin, PluginKey } from "prosemirror-state";
export const placeholderLink = new PluginKey("placeholderLink");

export default items => {
  return () =>
    new Plugin({
      key: placeholderLink,
      state: {
        init() {
          return items;
        }
      }
    });
};
