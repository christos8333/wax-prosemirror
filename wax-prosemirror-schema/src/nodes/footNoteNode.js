import { v4 as uuid } from "uuid";

const footnote = {
  group: "inline",
  content: "inline*",
  inline: true,
  atom: true,
  attrs: {
    id: { default: "" }
  },
  toDOM: node => {
    // node.attrs.id = uuid();
    // console.log(node.attrs);
    return ["footnote", node.attrs, 0];
  },
  parseDOM: [
    {
      tag: "footnote",
      getAttrs(dom) {
        console.log("poutsea", dom.getAttribute("id"));
        return {
          id: dom.getAttribute("id")
        };
      }
    }
  ]
};

export default footnote;
