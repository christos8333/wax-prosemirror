import { parseTracks } from "../helpers";
const sourceNote = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "p.source-note",
      getAttrs(hook, next) {
        Object.assign(hook, {
          track: parseTracks(hook.dom.dataset.track)
        });
        next();
      }
    }
  ],
  toDOM(hook, next) {
    Object.assign(hook.value[1], {
      "data-track": JSON.stringify(hook.node.attrs.track)
    });
    next();
  }
};

export default sourceNote;
