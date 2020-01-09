import { parseTracks, blockLevelToDOM } from "./helpers";
const title = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "title" },
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "p.title",
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
    const attrs = blockLevelToDOM(hook.node);
    hook.value = ["p", attrs, 0];
    next();
  }
};

export default title;
