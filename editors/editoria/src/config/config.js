import { emDash, ellipsis } from "prosemirror-inputrules";

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
  ],
  RulesService: [
    {
      rules: [emDash, ellipsis]
    }
  ],
  RulesService: [
    {
      shortCuts: {}
    }
  ]
};
