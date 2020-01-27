import { parseTracks, blockLevelToDOM } from "./helpers";

const paragraphCont = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "paragraph-cont" },
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "p.paragraph-cont",
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

export default paragraphCont;
