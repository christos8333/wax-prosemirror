import { emDash, ellipsis } from "prosemirror-inputrules";
import { columnResizing, tableEditing } from "prosemirror-tables";
import invisibles, {
  space,
  hardBreak,
  paragraph
} from "@guardian/prosemirror-invisibles";

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

  RulesService: [emDash, ellipsis],

  ShortCutsService: {},

  PluginsService: [
    columnResizing(),
    tableEditing(),
    // TrackChangePlugin({ options: {} }),
    invisibles([hardBreak()])
  ]
};
