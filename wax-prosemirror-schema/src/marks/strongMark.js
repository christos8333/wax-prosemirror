const strong = {
  parseDOM: [
    { tag: "strong" },
    {
      tag: "b",
      getAttrs: node => node.style.fontWeight != "normal" && null
    }
    // {
    //   style: "font-weight",
    //   getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
    // }
  ],
  toDOM(hook, next) {
    hook.value = ["strong", 0];
    next();
  }
};

export default strong;
