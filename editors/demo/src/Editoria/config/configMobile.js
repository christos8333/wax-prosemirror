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
  BaseService,
  BaseToolGroupService,
  DisplayBlockLevelService,
  DisplayToolGroupService,
  ImageToolGroupService,
  TextBlockLevelService,
  TextToolGroupService,
  NoteService,
  NoteToolGroupService,
  EditingSuggestingService,
  TrackChangeService,
  CommentsService,
  CodeBlockService,
  CodeBlockToolGroupService,
  DisplayTextToolGroupService,
  BlockDropDownToolGroupService,
  HighlightService,
  TextHighlightToolGroupServices,
  EditorInfoToolGroupServices,
  BottomInfoService,
  TransformService,
  TransformToolGroupService,
  CustomTagInlineToolGroupService,
  CustomTagBlockToolGroupService,
  CustomTagService,
} from 'wax-prosemirror-services';

import { DefaultSchema } from 'wax-prosemirror-core';

import invisibles, {
  space,
  hardBreak,
  paragraph,
} from '@guardian/prosemirror-invisibles';

const updateTitle = title => {};

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
        'TransformToolGroup',
        'CustomTagInline',
        'BlockDropDown',
        'Notes',
        'Lists',
        'Images',
        'CodeBlock',
        'Tables',
        // 'TrackChange',
      ],
    },
    {
      templateArea: 'BottomRightInfo',
      toolGroups: ['InfoToolGroup'],
    },
  ],

  SchemaService: DefaultSchema,
  RulesService: [emDash, ellipsis],
  ShortCutsService: {},
  TitleService: { updateTitle },
  EnableTrackChangeService: { enabled: false },

  PmPlugins: [columnResizing(), tableEditing(), invisibles([hardBreak()])],
  CustomTagService: {
    tags: [
      { label: 'custom-tag-label-1', tagType: 'inline' },
      { label: 'custom-tag-label-2', tagType: 'inline' },
      { label: 'custom-tag-label-3', tagType: 'block' },
    ],
  },

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
    new ImageToolGroupService(),
    new AnnotationToolGroupService(),
    new NoteToolGroupService(),
    new ListToolGroupService(),
    new CodeBlockService(),
    new CodeBlockToolGroupService(),
    new EditingSuggestingService(),
    new DisplayTextToolGroupService(),
    new BlockDropDownToolGroupService(),
    new HighlightService(),
    new TextHighlightToolGroupServices(),
    new EditorInfoToolGroupServices(),
    new BottomInfoService(),
    new TransformService(),
    new TransformToolGroupService(),
    new CustomTagService(),
    new CustomTagInlineToolGroupService(),
    new CustomTagBlockToolGroupService(),
  ],
};
