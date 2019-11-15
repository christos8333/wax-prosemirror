import { parseFormatList, parseTracks, blockLevelToDOM } from "./helpers";

// Npdes
const pDOM = ["p", 0],
  brDOM = ["br"],
  blockquoteDOM = ["blockquote", 0];

//Marks
const emDOM = ["em", 0],
  strongDOM = ["strong", 0],
  codeDOM = ["code", 0];
const EditoriaSchema = {
  nodes: {
    doc: {
      content: "block+"
    },

    text: {
      group: "inline"
    },

    hard_break: {
      inline: true,
      group: "inline",
      selectable: false,
      parseDOM: [{ tag: "br" }],
      toDOM() {
        return brDOM;
      }
    },
    image: {
      inline: true,
      attrs: {
        src: {},
        alt: { default: null },
        title: { default: null },
        track: { default: [] }
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
              track: parseTracks(dom.dataset.track),
              alt: dom.getAttribute("alt")
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = {};
        let temp = "";
        if (node.attrs.track.length) {
          attrs["data-track"] = JSON.stringify(node.attrs.track);
        }
        let { src, alt, title } = node.attrs;
        return ["img", { src, alt, title }];
      }
    },
    paragraph: {
      group: "block",
      content: "inline*",
      attrs: {
        class: { default: "paragraph" },
        track: { default: [] }
      },
      parseDOM: [
        {
          tag: "p.paragraph",
          getAttrs(dom) {
            return {
              class: dom.getAttribute("class"),
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = blockLevelToDOM(node);
        return ["p", attrs, 0];
      }
    },
    author: {
      content: "inline*",
      group: "block",
      priority: 0,
      defining: true,
      attrs: {
        class: { default: "author" },
        track: { default: [] }
      },
      parseDOM: [
        {
          tag: "p.author",
          getAttrs(dom) {
            return {
              class: dom.getAttribute("class"),
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = blockLevelToDOM(node);
        return ["p", attrs, 0];
      }
    },
    epigraphProse: {
      content: "inline*",
      group: "block",
      priority: 0,
      defining: true,
      attrs: {
        class: { default: "epigraph-prose" },
        track: { default: [] }
      },
      parseDOM: [
        {
          tag: "p.epigraph-prose",
          getAttrs(dom) {
            return {
              class: dom.getAttribute("class"),
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = blockLevelToDOM(node);
        return ["p", attrs, 0];
      }
    },
    epigraphPoetry: {
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
          getAttrs(dom) {
            return {
              class: dom.getAttribute("class"),
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = blockLevelToDOM(node);
        return ["p", attrs, 0];
      }
    },
    sourceNote: {
      content: "inline*",
      group: "block",
      priority: 0,
      defining: true,
      attrs: {
        class: { default: "source-note" },
        track: { default: [] }
      },
      parseDOM: [
        {
          tag: "p.source-note",
          getAttrs(dom) {
            return {
              class: dom.getAttribute("class"),
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = blockLevelToDOM(node);
        return ["p", attrs, 0];
      }
    },
    paragraphCont: {
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
          getAttrs(dom) {
            return {
              class: dom.getAttribute("class"),
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = blockLevelToDOM(node);
        return ["p", attrs, 0];
      }
    },
    extractProse: {
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
          getAttrs(dom) {
            return {
              class: dom.getAttribute("class"),
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = blockLevelToDOM(node);
        return ["p", attrs, 0];
      }
    },
    extractPoetry: {
      content: "inline*",
      group: "block",
      priority: 0,
      defining: true,
      attrs: {
        class: { default: "extract-poetry" },
        track: { default: [] }
      },
      parseDOM: [
        {
          tag: "p.extract-poetry",
          getAttrs(dom) {
            return {
              class: dom.getAttribute("class"),
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = blockLevelToDOM(node);
        return ["p", attrs, 0];
      }
    },
    title: {
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
          getAttrs(dom) {
            return {
              class: dom.getAttribute("class"),
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = blockLevelToDOM(node);
        return ["p", attrs, 0];
      }
    },
    subtitle: {
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
          getAttrs(dom) {
            return {
              class: dom.getAttribute("class"),
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = blockLevelToDOM(node);
        return ["p", attrs, 0];
      }
    },
    heading: {
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
          getAttrs(dom) {
            return {
              track: parseTracks(dom.dataset.track)
            };
          }
        },
        {
          tag: "h2",
          attrs: { level: 2 },
          getAttrs(dom) {
            return {
              track: parseTracks(dom.dataset.track)
            };
          }
        },
        {
          tag: "h3",
          attrs: { level: 3 },
          getAttrs(dom) {
            return {
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = {};
        if (node.attrs.track.length) {
          attrs["data-track"] = JSON.stringify(node.attrs.track);
        }
        return [`h${node.attrs.level}`, attrs, 0];
      }
    },
    ordered_list: {
      group: "block",
      content: "list_item+",
      attrs: {
        order: { default: 1 },
        track: { default: [] }
      },
      parseDOM: [
        {
          tag: "ol",
          getAttrs(dom) {
            return {
              order: dom.hasAttribute("start") ? +dom.getAttribute("start") : 1,
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = {};
        if (node.attrs.order !== 1) {
          attrs.start = node.attrs.order;
        }
        if (node.attrs.track.length) {
          attrs["data-track"] = JSON.stringify(node.attrs.track);
        }
        return ["ol", attrs, 0];
      }
    },
    bullet_list: {
      group: "block",
      content: "list_item+",
      attrs: {
        track: { default: [] }
      },
      parseDOM: [
        {
          tag: "ul",
          getAttrs(dom) {
            return {
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = {};
        if (node.attrs.track.length) {
          attrs["data-track"] = JSON.stringify(node.attrs.track);
        }
        return ["ul", attrs, 0];
      }
    },
    list_item: {
      content: "block+",
      attrs: {
        track: { default: [] }
      },
      parseDOM: [
        {
          tag: "li",
          getAttrs(dom) {
            return {
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = {};
        if (node.attrs.track.length) {
          attrs["data-track"] = JSON.stringify(node.attrs.track);
        }
        return ["li", attrs, 0];
      },
      defining: true
    },
    blockquote: {
      content: "block+",
      group: "block",
      defining: true,
      parseDOM: [{ tag: "blockquote" }],
      toDOM() {
        return blockquoteDOM;
      }
    }
  },
  marks: {
    link: {
      attrs: {
        href: { default: null },
        rel: { default: "" },
        target: { default: "blank" },
        title: { default: null }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: "a[href]",
          getAttrs: dom => {
            const href = dom.getAttribute("href");
            const target = href && href.indexOf("#") === 0 ? "" : "blank";
            return {
              href: dom.getAttribute("href"),
              title: dom.getAttribute("title"),
              target
            };
          }
        }
      ],
      toDOM(node) {
        return ["a", node.attrs, 0];
      }
    },
    em: {
      parseDOM: [{ tag: "i" }, { tag: "em" }, { style: "font-style=italic" }],
      toDOM() {
        return emDOM;
      }
    },
    strong: {
      parseDOM: [
        { tag: "strong" },
        {
          tag: "b",
          getAttrs: node => node.style.fontWeight != "normal" && null
        },
        {
          style: "font-weight",
          getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
        }
      ],
      toDOM() {
        return strongDOM;
      }
    },
    code: {
      parseDOM: [{ tag: "code" }],
      toDOM() {
        return codeDOM;
      }
    },
    subscript: {
      excludes: "superscript",
      parseDOM: [{ tag: "sub" }, { style: "vertical-align=sub" }],
      toDOM: () => ["sub"]
    },
    superscript: {
      excludes: "subscript",
      parseDOM: [{ tag: "sup" }, { style: "vertical-align=super" }],
      toDOM: () => ["sup"]
    },
    strikethrough: {
      parseDOM: [
        { tag: "strike" },
        { style: "text-decoration:line-through" },
        { style: "text-decoration-line:line-through" }
      ],
      toDOM: () => [
        "span",
        {
          style: "text-decoration-line:line-through"
        }
      ]
    },
    underline: {
      parseDOM: [{ tag: "u" }, { style: "text-decoration:underline" }],
      toDOM: () => [
        "span",
        {
          style: "text-decoration:underline"
        }
      ]
    },
    // small_caps: {
    //   attrs: {
    //     class: { default: "small-caps" }
    //   },
    //   inclusive: false,
    //   parseDOM: [
    //     {
    //       tag: "span",
    //       getAttrs(dom) {
    //         return { class: dom.getAttribute("class") };
    //       }
    //     }
    //   ],
    //   toDOM(node) {
    //     return ["span", node.attrs, 0];
    //   }
    // },
    source: {
      parseDOM: [{ tag: "cite" }],
      toDOM() {
        return ["cite", 0];
      }
    },
    insertion: {
      attrs: {
        user: {
          default: 0
        },
        username: {
          default: ""
        },
        date: {
          default: 0
        },
        approved: {
          default: true
        }
      },
      inclusive: false,
      group: "track",
      parseDOM: [
        {
          tag: "span.insertion",
          getAttrs(dom) {
            return {
              user: parseInt(dom.dataset.user),
              username: dom.dataset.username,
              date: parseInt(dom.dataset.date),
              inline: true,
              approved: false
            };
          }
        },
        {
          tag: "span.approved-insertion",
          getAttrs(dom) {
            return {
              user: parseInt(dom.dataset.user),
              username: dom.dataset.username,
              date: parseInt(dom.dataset.date),
              inline: true,
              approved: true
            };
          }
        }
      ],
      toDOM(node) {
        return [
          "span",
          {
            class: node.attrs.approved
              ? "approved-insertion"
              : `insertion user-${node.attrs.user}`,
            "data-user": node.attrs.user,
            "data-username": node.attrs.username,
            "data-date": node.attrs.date
          }
        ];
      }
    },
    deletion: {
      attrs: {
        user: {
          default: 0
        },
        username: {
          default: ""
        },
        date: {
          default: 0
        }
      },
      inclusive: false,
      group: "track",
      parseDOM: [
        {
          tag: "span.deletion",
          getAttrs(dom) {
            return {
              user: parseInt(dom.dataset.user),
              username: dom.dataset.username,
              date: parseInt(dom.dataset.date)
            };
          }
        }
      ],
      toDOM(node) {
        return [
          "span",
          {
            class: `deletion user-${node.attrs.user}`,
            "data-user": node.attrs.user,
            "data-username": node.attrs.username,
            "data-date": node.attrs.date
          }
        ];
      }
    },
    format_change: {
      attrs: {
        user: {
          default: 0
        },
        username: {
          default: ""
        },
        date: {
          default: 0
        },
        before: {
          default: []
        },
        after: {
          default: []
        }
      },
      inclusive: false,
      group: "track",
      parseDOM: [
        {
          tag: "span.format-change",
          getAttrs(dom) {
            return {
              user: parseInt(dom.dataset.user),
              username: dom.dataset.username,
              date: parseInt(dom.dataset.date),
              before: parseFormatList(dom.dataset.before),
              after: parseFormatList(dom.dataset.after)
            };
          }
        }
      ],
      toDOM(node) {
        return [
          "span",
          {
            class: `format-change user-${node.attrs.user}`,
            "data-user": node.attrs.user,
            "data-username": node.attrs.username,
            "data-date": node.attrs.date,
            "data-before": JSON.stringify(node.attrs.before),
            "data-after": JSON.stringify(node.attrs.after)
          }
        ];
      }
    }
  }
};

export default EditoriaSchema;
