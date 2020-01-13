import { parseTracks, blockLevelToDOM } from "./helpers";
const epigraphPoetry = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: { default: "epigraph-poetry" },
    track: { default: [] }
  },
  parseDOM: [
    {
      tag: "p.epigraph-poetry",
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

export default epigraphPoetry;
