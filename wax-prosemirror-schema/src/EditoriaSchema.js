// Npdes
const pDOM = ["p", 0],
  brDOM = ["br"];

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

    paragraph: {
      content: "inline*",
      group: "block",
      parseDOM: [{ tag: "p" }],
      toDOM() {
        return pDOM;
      }
    }
  },
  marks: {
    link: {
      attrs: {
        href: {},
        title: { default: null }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: "a[href]",
          getAttrs(dom) {
            return {
              href: dom.getAttribute("href"),
              title: dom.getAttribute("title")
            };
          }
        }
      ],
      toDOM(node) {
        let { href, title } = node.attrs;
        return ["a", { href, title }, 0];
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
    small_caps: {
      attrs: {
        class: { default: "small-caps" }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: "span",
          getAttrs(dom) {
            return { class: dom.getAttribute("class") };
          }
        }
      ],
      toDOM(node) {
        return ["span", node.attrs, 0];
      }
    },
    source: {
      parseDOM: [{ tag: "cite" }],
      toDOM() {
        return ["cite", 0];
      }
    }
  }
};

export default EditoriaSchema;
