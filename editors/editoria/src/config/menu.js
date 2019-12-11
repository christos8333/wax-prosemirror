export default {
  MenuService: [
    {
      templateArea: "topBar",
      toolGroups: ["Annotation", { name: "RedoUndo", exclude: ["Redo"] }]
    },
    {
      templateArea: "leftSideBar",
      toolGroups: ["TextStyle"]
    }
  ]
};
