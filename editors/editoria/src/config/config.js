import { emDash, ellipsis } from "prosemirror-inputrules";
import { columnResizing, tableEditing } from "prosemirror-tables";
import {
  ImageService,
  PlaceholderService,
  TextStyleService,
  InlineAnnotationsService,
  LinkService,
  ListsService,
  ListToolGroupService,
  TablesService,
  TableToolGroupService,
  BaseService,
  BaseToolGroupService,
  DisplayBlockLevelService,
  DisplayToolGroupService,
  ImageToolGroupService
} from "wax-prosemirror-services";

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
      toolGroups: ["Display"]
    }
  ],

  RulesService: [emDash, ellipsis],

  ShortCutsService: {},

  PmPlugins: [
    columnResizing(),
    tableEditing(),
    // TrackChangePlugin({ options: {} }),
    invisibles([hardBreak()])
  ],
  services: [
    new ListToolGroupService(),
    new TextStyleService(),
    new PlaceholderService(),
    new ImageService(),
    new InlineAnnotationsService(),
    // new OverlayService()
    new LinkService(),
    new ListsService(),
    new TableToolGroupService(),
    new TablesService(),
    new BaseService(),
    new BaseToolGroupService(),
    //new ImageToolGroupService(),
    new DisplayBlockLevelService(),
    new DisplayToolGroupService(),
    // new TextBlockLevelService(),
    // new TextToolGroupService()
    new ImageToolGroupService()
  ]
};
