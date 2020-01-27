const subscript = {
  excludes: "superscript",
  parseDOM: [{ tag: "sub" }, { style: "vertical-align=sub" }],
  toDOM(hook, next) {
    hook.value = ["sub"];
    next();
  }
};

export default subscript;
