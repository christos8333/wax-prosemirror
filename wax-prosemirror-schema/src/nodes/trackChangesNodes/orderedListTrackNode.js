import { SchemaHelpers } from "wax-prosemirror-utilities";

const orderedlist = {
  group: "block",
  content: "list_item+",
  attrs: {
    id: { default: "" },
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "ol",
      getAttrs(hook, next) {
        Object.assign(hook, {
          id: hook.dom.dataset.id,
          track: SchemaHelpers.parseTracks(hook.dom.dataset.track)
        });
        next();
      }
    }
  ],
  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-id": hook.node.attrs.id,
        "data-track": JSON.stringify(hook.node.attrs.track)
      });
    }
    next();
  }
};

export default orderedlist;
