import { orderedList, bulletList, listItem } from "prosemirror-schema-list";
import { tableNodes } from "prosemirror-tables";

const pDOM = ["p", 0],
  brDOM = ["br"];

const emDOM = ["em", 0],
  strongDOM = ["strong", 0],
  codeDOM = ["code", 0];

const XpubSchema = {
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
    },
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
    source: {
      parseDOM: [{ tag: "cite" }],
      toDOM() {
        return ["cite", 0];
      }
    }
  }
};

const allNodes = {
  ...XpubSchema.nodes,
  ...tableNodes({
    tableGroup: "block",
    cellContent: "block+"
  })
};

export default XpubSchema;
