export default {
  menus: [
    {
      templateArea: "topBar",
      tools: ["redo", "undo"],
      groups: [
        "redo-undo",
        "annotations",
        { group: "Annotation", exclude: [], include: [] }
      ]
    }
  ]
};
