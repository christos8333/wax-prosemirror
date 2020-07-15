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
  TextToolGroupService,
  NoteService,
  NoteToolGroupService,
  TrackChangeService,
  CommentsService
} from "wax-prosemirror-services";

import { WaxSelectionPlugin } from "wax-prosemirror-plugins";

import invisibles, {
  space,
  hardBreak,
  paragraph
} from "@guardian/prosemirror-invisibles";

export default {
  MenuService: [
    {
      templateArea: "topBar",
      toolGroups: [
        "Base",
        {
          name: "Annotations",
          more: ["Superscript", "Subscript", "SmallCaps"]
        },
        "Notes",
        "Lists",
        "Images",
        "Tables"
      ]
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
    invisibles([hardBreak()]),
    WaxSelectionPlugin
  ],

  // Always load first CommentsService and LinkService,
  //as it matters on how PM treats nodes and marks
  services: [
    new DisplayBlockLevelService(),
    new DisplayToolGroupService(),
    new TextBlockLevelService(),
    new TextToolGroupService(),
    new ListsService(),
    new LinkService(),
    new InlineAnnotationsService(),
    new TrackChangeService(),
    new CommentsService(),
    new PlaceholderService(),
    new ImageService(),
    new TablesService(),
    new BaseService(),
    new BaseToolGroupService(),
    new NoteService(),
    new TableToolGroupService(),
    new ImageToolGroupService(),
    new AnnotationToolGroupService(),
    new NoteToolGroupService(),
    new ListToolGroupService()
  ]
};
