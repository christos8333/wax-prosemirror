import { SchemaHelpers } from "wax-prosemirror-utilities";

const extractProse = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "p.extract-prose",
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

export default extractProse;