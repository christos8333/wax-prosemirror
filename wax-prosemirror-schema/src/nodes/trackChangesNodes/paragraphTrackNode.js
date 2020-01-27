import { parseTracks } from "../helpers";

const paragraph = {
  group: "block",
  content: "inline*",
  attrs: {
    track: { default: [] }
  },
  parseDOM: {
    tag: "p.paragraph",
    getAttrs(hook, next) {
      Object.assign(hook, {
        track: parseTracks(hook.dom.dataset.track)
      });
      next();
    }
  },
  toDOM(hook, next) {
    Object.assign(hook.value[1], {
      "data-track": JSON.stringify(hook.node.attrs.track)
    });
    next();
  }
};

export default paragraph;
