const footnote = {
  group: "inline",
  content: "paragraph+",
  inline: true,
  atom: true,
  toDOM: () => ["footnote"],
  parseDOM: [{ tag: "footnote" }]
};

export default footnote;
