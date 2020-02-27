const footnote = {
  group: "inline",
  content: "paragraph+",
  inline: true,
  atom: true,
  toDOM: () => ["footnote", 0],
  parseDOM: [{ tag: "footnote" }]
};

export default footnote;