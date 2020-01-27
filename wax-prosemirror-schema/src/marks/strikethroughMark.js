const strikethrough = {
  parseDOM: [
    { tag: "strike" },
    { style: "text-decoration:line-through" },
    { style: "text-decoration-line:line-through" }
  ],
  toDOM: (hook, next) => {
    hook.value = [
      "span",
      {
        style: "text-decoration-line:line-through"
      }
    ];
    next();
  }
};

export default strikethrough;
