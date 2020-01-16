import { parseTracks, blockLevelToDOM } from "./helpers";
const extractProse = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "extract-prose" },
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "p.extract-prose",
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute("class"),
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

export default extractProse;
