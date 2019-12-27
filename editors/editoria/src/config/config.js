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
      toolGroups: ["Base", "Annotations", "Lists", "Images", "Tables"]
    },
    {
      templateArea: "leftSideBar",
      toolGroups: ["TextStyle"]
    }
  ],

  RulesService: [emDash, ellipsis],

  ShortCutsService: {},

  PmPlugins: [
    columnResizing(),
    tableEditing(),
    // TrackChangePlugin({ options: {} }),
    invisibles([hardBreak()])
  ]
};
