import { parseTracks } from "../helpers";
const extractPoetry = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "p.extract-poetry",
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

export default extractPoetry;
