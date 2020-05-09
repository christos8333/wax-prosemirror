import { SchemaHelpers } from "wax-prosemirror-utilities";

const epigraphProse = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    id: { default: "" },
    track: { default: [] },
    group: { default: "" }
  },
  parseDOM: [
    {
      tag: "p.epigraph-prose",
      getAttrs(hook, next) {
        Object.assign(hook, {
          id: hook.dom.dataset.id,
          track: SchemaHelpers.parseTracks(hook.dom.dataset.track),
          group: hook.dom.dataset.group
        });
        next();
      }
    }
  ],
  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-id": hook.node.attrs.id,
        "data-track": JSON.stringify(hook.node.attrs.track),
        "data-group": hook.node.attrs.group
      });
    }
    next();
  }
};

export default epigraphProse;
