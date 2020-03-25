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

import invisibles, {
  space,
  hardBreak,
  paragraph
} from "@guardian/prosemirror-invisibles";

export default {
  MenuService: [
    {
      templateArea: "topBar",
      toolGroups: ["Base", "Annotations", "Notes", "Lists", "Images", "Tables"]
    },
    {
      templateArea: "leftSideBar",
      toolGroups: ["Display", "Text"]
    }
  ],

  RulesService: [emDash, ellipsis],

  ShortCutsService: {},

  PmPlugins: [columnResizing(), tableEditing(), invisibles([hardBreak()])],

  services: [
    new PlaceholderService(),
    new ImageService(),
    new ListsService(),
    new InlineAnnotationsService(),
    new LinkService(),
    new TablesService(),
    new TextBlockLevelService(),
    new BaseService(),
    new BaseToolGroupService(),
    new DisplayBlockLevelService(),
    new NoteService(),
    new TableToolGroupService(),
    new DisplayToolGroupService(),
    new ImageToolGroupService(),
    new TextToolGroupService(),
    new AnnotationToolGroupService(),
    new NoteToolGroupService(),
    new ListToolGroupService(),
    new TrackChangeService(),
    new CommentsService()
  ]
};
