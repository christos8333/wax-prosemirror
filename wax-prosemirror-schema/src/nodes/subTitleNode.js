import { parseTracks, blockLevelToDOM } from "./helpers";
const subtitle = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "cst" },
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "p.cst",
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: dom.getAttribute("class"),
          track: parseTracks(hook.dom.dataset.track)
        });
        next();
      }
    }
  ],
  toDOM(hook, next) {
    const attrs = blockLevelToDOM(node);
    hook.value = ["p", attrs, 0];
    next();
  }
};

export default subtitle;
