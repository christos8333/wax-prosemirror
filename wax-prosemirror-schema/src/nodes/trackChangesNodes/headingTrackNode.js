import { SchemaHelpers } from "wax-prosemirror-utilities";

const heading = {
  attrs: {
    id: { default: "" },
    track: { default: [] }
  },
  content: "inline*",
  group: "block",
  defining: true,
  parseDOM: [
    {
      tag: "h1",
      getAttrs(hook, next) {
        Object.assign(hook, {
          id: hook.dom.dataset.id,
          track: SchemaHelpers.parseTracks(hook.dom.dataset.track)
        });
        next();
      }
    },
    {
      tag: "h2",
      getAttrs(hook, next) {
        Object.assign(hook, {
          "data-id": hook.node.attrs.id,
          track: SchemaHelpers.parseTracks(hook.dom.dataset.track)
        });
        next();
      }
    },
    {
      tag: "h3",
      getAttrs(hook, next) {
        Object.assign(hook, {
          track: SchemaHelpers.parseTracks(hook.dom.dataset.track)
        });
        next();
      }
    }
  ],
  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-track": JSON.stringify(hook.node.attrs.track)
      });
    }
    next();
  }
};

export default heading;
