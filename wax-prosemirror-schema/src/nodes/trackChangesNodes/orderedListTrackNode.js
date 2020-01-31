import { parseTracks } from "../helpers";
const orderedlist = {
  group: "block",
  content: "list_item+",
  attrs: {
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "ol",
      getAttrs(hook, next) {
        Object.assign(hook, {
          track: parseTracks(hook.dom.dataset.track)
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

export default orderedlist;
