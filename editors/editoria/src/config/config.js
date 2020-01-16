import { emDash, ellipsis } from "prosemirror-inputrules";
import { columnResizing, tableEditing } from "prosemirror-tables";
import {
  AnnotationToolGroupService,
  ImageService,
  PlaceholderService,
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
  ImageToolGroupService,
  TextBlockLevelService,
  TextToolGroupService
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
      toolGroups: ["Display", "Text"]
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
    new PlaceholderService(),
    new ImageService(),
    new AnnotationToolGroupService(),
    new InlineAnnotationsService(),
    new LinkService(),
    new ListsService(),
    new TableToolGroupService(),
    new TablesService(),
    new BaseService(),
    new BaseToolGroupService(),
    new DisplayBlockLevelService(),
    new DisplayToolGroupService(),
    new ImageToolGroupService(),
    new TextBlockLevelService(),
    new TextToolGroupService()
  ]
};
