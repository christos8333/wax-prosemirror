import { emDash, ellipsis } from 'prosemirror-inputrules';
import { columnResizing, tableEditing } from 'prosemirror-tables';
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
  CommentsService,
  CodeBlockService,
  CodeBlockToolGroupService,
  TrackChangeToolGroupService,
  DisplayTextToolGroupService,
  BlockDropDownToolGroupService,
  HighlightService,
  TextHighlightToolGroupServices,
} from 'wax-prosemirror-services';

import { WaxSelectionPlugin } from 'wax-prosemirror-plugins';

import invisibles, {
  space,
  hardBreak,
  paragraph,
} from '@guardian/prosemirror-invisibles';

export default {
  MenuService: [
    {
      templateArea: 'topBar',
      toolGroups: [
        'Base',
        {
          name: 'Annotations',
          more: ['Superscript', 'Subscript', 'SmallCaps'],
        },
        'HighlightToolGroup',
        'BlockDropDown',
        'Notes',
        'Lists',
        'Images',
        'CodeBlock',
        'Tables',
        'TrackChange',
      ],
    },
  ],

  RulesService: [emDash, ellipsis],
  ShortCutsService: {},
  EnableTrackChangeService: { enabled: false },

  PmPlugins: [
    columnResizing(),
    tableEditing(),
    invisibles([hardBreak()]),
    WaxSelectionPlugin,
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
    new ListToolGroupService(),
    new CodeBlockService(),
    new CodeBlockToolGroupService(),
    new TrackChangeToolGroupService(),
    new DisplayTextToolGroupService(),
    new BlockDropDownToolGroupService(),
    new HighlightService(),
    new TextHighlightToolGroupServices(),
  ],
};
