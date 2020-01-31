import { parseTracks, blockLevelToDOM } from "./helpers";
const title = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "title" }
  },
  parseDOM: [
    {
      tag: "p.title",
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: dom.getAttribute("class")
        });
        next();
      }
    }
  ],
  toDOM(hook, next) {
    const attrs = { class: hook.node.attrs.class };
    hook.value = ["p", attrs, 0];
    next();
  }
};

export default title;
