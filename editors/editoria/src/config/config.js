import { emDash, ellipsis } from 'prosemirror-inputrules';
import { columnResizing, tableEditing } from 'prosemirror-tables';
import {
  AnnotationToolGroupService,
  ImageService,
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
  DisplayTextToolGroupService,
  MathService,
  FindAndReplaceService,
  EditingSuggestingService,
  TrackingAndEditingToolGroupService,
  FullScreenService,
  FullScreenToolGroupService,
  SpecialCharactersService,
  SpecialCharactersToolGroupService,
  HighlightService,
  TextHighlightToolGroupServices,
  EditorInfoToolGroupServices,
  BottomInfoService,
  TransformService,
  TransformToolGroupService,
  TrackOptionsService,
  TrackOptionsToolGroupService,
  TrackCommentOptionsToolGroupService,
} from 'wax-prosemirror-services';

import { DefaultSchema } from 'wax-prosemirror-utilities';

import { WaxSelectionPlugin } from 'wax-prosemirror-plugins';

import invisibles, {
  space,
  hardBreak,
  paragraph,
} from '@guardian/prosemirror-invisibles';

const updateTitle = title => {
  console.log(title);
};

export default {
  MenuService: [
    {
      templateArea: 'mainMenuToolBar',
      toolGroups: [
        'Base',
        {
          name: 'Annotations',
          more: [
            'Superscript',
            'Subscript',
            'SmallCaps',
            'Underline',
            'StrikeThrough',
          ],
        },
        'HighlightToolGroup',
        'TransformToolGroup',
        'Notes',
        'Lists',
        'Images',
        'SpecialCharacters',
        'CodeBlock',
        'Tables',
        'TrackingAndEditing',
        'FullScreen',
      ],
    },
    {
      templateArea: 'leftSideBar',
      toolGroups: ['DisplayText'],
    },
    {
      templateArea: 'commentTrackToolBar',
      toolGroups: ['TrackCommentOptions'],
    },
    {
      templateArea: 'BottomRightInfo',
      toolGroups: ['InfoToolGroup'],
    },
  ],

  SchemaService: DefaultSchema,
  TitleService: { updateTitle },
  RulesService: [emDash, ellipsis],
  ShortCutsService: {},
  EnableTrackChangeService: { enabled: false, toggle: true },
  AcceptTrackChangeService: {
    own: {
      accept: true,
    },
    others: {
      accept: true,
    },
  },
  RejectTrackChangeService: {
    own: {
      reject: true,
    },
    others: {
      reject: true,
    },
  },
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
    new EditingSuggestingService(),
    new DisplayTextToolGroupService(),
    new MathService(),
    new FindAndReplaceService(),
    new TrackingAndEditingToolGroupService(),
    new FullScreenService(),
    new FullScreenToolGroupService(),
    new SpecialCharactersService(),
    new SpecialCharactersToolGroupService(),
    new HighlightService(),
    new TextHighlightToolGroupServices(),
    new EditorInfoToolGroupServices(),
    new BottomInfoService(),
    new TransformService(),
    new TransformToolGroupService(),
    new TrackOptionsToolGroupService(),
    new TrackCommentOptionsToolGroupService(),
  ],
};
