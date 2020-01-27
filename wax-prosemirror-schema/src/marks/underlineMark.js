const underline = {
  parseDOM: [{ tag: "u" }, { style: "text-decoration:underline" }],
  toDOM: (hook, next) => {
    hook.value = [
      "span",
      {
        style: "text-decoration:underline"
      }
    ];
    next();
  }
};

export default underline;
