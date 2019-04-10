import { schema } from "prosemirror-schema-basic";
import { orderedList, bulletList, listItem } from "prosemirror-schema-list";
import { tableNodes } from "prosemirror-tables";

const pDOM = ["p", 0],
  blockquoteDOM = ["blockquote", 0],
  hrDOM = ["hr"],
  preDOM = ["pre", ["code", 0]],
  brDOM = ["br"];

// :: Object
// [Specs](#model.NodeSpec) for the nodes defined in this schema.
export const nodes = {
  // :: NodeSpec The top level document node.
  doc: {
    content: "block+"
  },

  // :: NodeSpec A plain paragraph textblock. Represented in the DOM
  // as a `<p>` element.
  paragraph: {
    content: "inline*",
    group: "block",
    attrs: {
      class: { default: "paragraph" }
    },
    parseDOM: [
      {
        tag: "p",
        getAttrs(dom) {
          return {
            class: dom.getAttribute("class")
          };
        }
      }
    ],
    toDOM(node) {
      return ["p", node.attrs, 0];
    }
  },

  figureTitle: {
    content: "inline*",
    group: "block",
    attrs: {
      class: { default: "figureTitle" }
    },
    parseDOM: [
      {
        tag: "p",
        getAttrs(dom) {
          return {
            class: dom.getAttribute("class")
          };
        }
      }
    ],
    toDOM(node) {
      return ["p", node.attrs, 0];
    }
  },

  figureCaption: {
    content: "inline*",
    group: "block",
    attrs: {
      class: { default: "figureCaption" }
    },
    parseDOM: [
      {
        tag: "p",
        getAttrs(dom) {
          return {
            class: dom.getAttribute("class")
          };
        }
      }
    ],
    toDOM(node) {
      return ["p", node.attrs, 0];
    }
  },

  // :: NodeSpec A horizontal rule (`<hr>`).
  horizontal_rule: {
    group: "block",
    parseDOM: [{ tag: "hr" }],
    toDOM() {
      return hrDOM;
    }
  },

  // :: NodeSpec A heading textblock, with a `level` attribute that
  // should hold the number 1 to 6. Parsed and serialized as `<h1>` to
  // `<h6>` elements.
  heading: {
    attrs: { class: { default: "ct" }, level: { default: 1 } },
    content: "inline*",
    group: "block",
    defining: true,
    parseDOM: [
      { tag: "h1", attrs: { level: 1 } },
      { tag: "h2", attrs: { level: 2 } },
      { tag: "h3", attrs: { level: 3 } },
      { tag: "h4", attrs: { level: 4 } },
      { tag: "h5", attrs: { level: 5 } },
      { tag: "h6", attrs: { level: 6 } }
    ],
    toDOM(node) {
      if (node.attrs.level === 1) {
        return ["h" + node.attrs.level, node.attrs, 0];
      } else {
        return ["h" + node.attrs.level, 0];
      }
    }
  },

  // :: NodeSpec A code listing. Disallows marks or non-text inline
  // nodes by default. Represented as a `<pre>` element with a
  // `<code>` element inside of it.
  codeBlock: {
    content: "block+",
    group: "block",
    defining: true,
    attrs: {
      class: { default: "code-block" }
    },
    parseDOM: [{ tag: "pre" }],
    toDOM(node) {
      return ["pre", node.attrs, 0];
    }
  },

  // :: NodeSpec The text node.
  text: {
    group: "inline"
  },

  // :: NodeSpec An inline image (`<img>`) node. Supports `src`,
  // `alt`, and `href` attributes. The latter two default to the empty
  // string.
  image: {
    inline: true,
    attrs: {
      src: {},
      alt: { default: null },
      title: { default: null }
    },
    group: "inline",
    draggable: true,
    parseDOM: [
      {
        tag: "img[src]",
        getAttrs(dom) {
          return {
            src: dom.getAttribute("src"),
            title: dom.getAttribute("title"),
            alt: dom.getAttribute("alt")
          };
        }
      }
    ],
    toDOM(node) {
      return ["img", node.attrs];
    }
  },

  // :: NodeSpec A hard line break, represented in the DOM as `<br>`.
  hard_break: {
    inline: true,
    group: "inline",
    selectable: false,
    parseDOM: [{ tag: "br" }],
    toDOM() {
      return brDOM;
    }
  }
};

const extraNodes = {
  ordered_list: {
    ...orderedList,
    content: "list_item+",
    group: "block"
  },
  bullet_list: {
    ...bulletList,
    content: "list_item+",
    group: "block"
  },
  list_item: {
    ...listItem,
    content: "paragraph block*",
    group: "block"
  },
  // codeMirrorNode: {
  //   group: "block",
  //   content: "text*",
  //   code: true,
  //   defining: true,
  //   attrs: {
  //     text: { default: "" },
  //     language: { default: "text/plain" }
  //   },
  //   parseDOM: [
  //     {
  //       tag: "pre",
  //       getAttrs: dom => ({
  //         text: dom.textContent,
  //         language: dom.getAttribute("data-language") || "text/plain"
  //       })
  //     }
  //   ],
  //   toDOM(node) {
  //     return ["pre", { "data-language": node.attrs.language }, node.attrs.text];
  //   },
  //   marks: schema.markSpec
  // },
  subtitle: {
    content: "inline*",
    group: "block",
    priority: 0,
    defining: true,
    attrs: {
      class: { default: "cst" }
    },
    parseDOM: [
      {
        tag: "p",
        getAttrs(dom) {
          return {
            class: dom.getAttribute("class")
          };
        }
      }
    ],
    toDOM(node) {
      return ["p", node.attrs, 0];
    }
  },
  // :: NodeSpec A blockquote (`<blockquote>`) wrapping one or more blocks.
  epigraph: {
    content: "block+",
    group: "block",
    defining: true,
    attrs: {
      class: { default: "epigraph" }
    },
    parseDOM: [{ tag: "blockquote" }],
    toDOM(node) {
      return ["blockquote", node.attrs, 0];
    }
  },
  quote: {
    content: "block+",
    group: "block",
    defining: true,
    attrs: {
      class: { default: "quote" }
    },
    parseDOM: [{ tag: "blockquote" }],
    toDOM(node) {
      return ["blockquote", node.attrs, 0];
    }
  },
  special: {
    content: "block+",
    group: "block",
    defining: true,
    attrs: {
      class: { default: "block-special" }
    },
    parseDOM: [
      {
        tag: "div",
        getAttrs(dom) {
          return {
            class: dom.getAttribute("class")
          };
        }
      }
    ],
    toDOM(node) {
      return ["div", node.attrs, 0];
    }
  },
  important: {
    content: "block+",
    group: "block",
    defining: true,
    attrs: {
      class: { default: "block-important" }
    },
    parseDOM: [
      {
        tag: "div",
        getAttrs(dom) {
          return {
            class: dom.getAttribute("class")
          };
        }
      }
    ],
    toDOM(node) {
      return ["div", node.attrs, 0];
    }
  },
  recommended: {
    content: "block+",
    group: "block",
    defining: true,
    attrs: {
      class: { default: "block-recommended" }
    },
    parseDOM: [
      {
        tag: "div",
        getAttrs(dom) {
          return {
            class: dom.getAttribute("class")
          };
        }
      }
    ],
    toDOM(node) {
      return ["div", node.attrs, 0];
    }
  },
  caution: {
    content: "block+",
    group: "block",
    defining: true,
    attrs: {
      class: { default: "block-caution" }
    },
    parseDOM: [
      {
        tag: "div",
        getAttrs(dom) {
          return {
            class: dom.getAttribute("class")
          };
        }
      }
    ],
    toDOM(node) {
      return ["div", node.attrs, 0];
    }
  },
  tip: {
    content: "block+",
    group: "block",
    defining: true,
    attrs: {
      class: { default: "block-tip" }
    },
    parseDOM: [
      {
        tag: "div",
        getAttrs(dom) {
          return {
            class: dom.getAttribute("class")
          };
        }
      }
    ],
    toDOM(node) {
      return ["div", node.attrs, 0];
    }
  },
  footnote: {
    group: "inline",
    content: "inline*",
    inline: true,
    // This makes the view treat the node as a leaf, even though it
    // technically has content
    atom: true,
    toDOM: () => ["footnote", 0],
    parseDOM: [{ tag: "footnote" }]
  }
};

export default {
  ...nodes,
  ...extraNodes,
  ...tableNodes({
    tableGroup: "block",
    cellContent: "block+"
  })
};
