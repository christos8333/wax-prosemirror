import { parseTracks } from "./helpers";
const heading = {
  attrs: {
    level: { default: 1 },
    track: { default: [] }
  },
  content: "inline*",
  group: "block",
  defining: true,
  parseDOM: [
    {
      tag: "h1",
      attrs: { level: 1 },
      getAttrs(hook, next) {
        Object.assign(hook, {
          track: parseTracks(hook.dom.dataset.track)
        });
        next();
      }
    },
    {
      tag: "h2",
      attrs: { level: 2 },
      getAttrs(hook, next) {
        Object.assign(hook, {
          track: parseTracks(hook.dom.dataset.track)
        });
        next();
      }
    },
    {
      tag: "h3",
      attrs: { level: 3 },
      getAttrs(hook, next) {
        Object.assign(hook, {
          track: parseTracks(hook.dom.dataset.track)
        });
        next();
      }
    }
  ],
  toDOM(hook, next) {
    const attrs = {};
    if (hook.node.attrs.track.length) {
      attrs["data-track"] = JSON.stringify(hook.node.attrs.track);
    }
    hook.value = [`h${hook.node.attrs.level}`, attrs, 0];
    next();
  }
};

export default heading;
