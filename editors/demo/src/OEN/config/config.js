import { emDash, ellipsis } from 'prosemirror-inputrules';
import { debounce } from 'lodash';
import { columnResizing, tableEditing } from 'prosemirror-tables';
import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  ImageService,
  ImageToolGroupService,
  LinkService,
  ListsService,
  ListToolGroupService,
  TablesService,
  TableToolGroupService,
  BaseService,
  BaseToolGroupService,
  DisplayBlockLevelService,
  DisplayToolGroupService,
  TextBlockLevelService,
  TextToolGroupService,
  NoteService,
  NoteToolGroupService,
  TrackChangeService,
  CommentsService,
  CodeBlockService,
  CodeBlockToolGroupService,
  // DisplayTextToolGroupService,
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
  TrackOptionsToolGroupService,
  TrackCommentOptionsToolGroupService,
  CustomTagInlineToolGroupService,
  CustomTagBlockToolGroupService,
  CustomTagService,
  OENContainersService,
  OENLeftToolGroupService,
  OENContainersToolGroupService,
} from 'wax-prosemirror-services';

import { EditoriaSchema } from 'wax-prosemirror-utilities';

import invisibles, {
  space,
  hardBreak,
  paragraph,
} from '@guardian/prosemirror-invisibles';

import CharactersList from './CharactersList';

// const updateTitle = title => {
//   console.log(title);
// };

const updateTitle = debounce(title => {
  // console.log(title);
}, 3000);

const saveTags = tags => {
  // console.log(tags);
};

const updateTrackStatus = status => {
  // console.log('status', status);
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
        'CustomTagInline',
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
      toolGroups: ['OENTools'],
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

  // CommentsService: { readOnly: true },
  // OrderedListService: { subList: false },
  // BulletListService: { subList: false },
  // JoinUpService: { subList: false },
  OENContainersService: [
    {
      groupHeader: 'Core Elements',
      items: [
        {
          displayName: 'Learning Objectives',
          headingLevel: 2,
          nestedHeadingLevel: null,
          className: 'learning-objectives',
        },
        {
          displayName: 'Section',
          headingLevel: 2,
          nestedHeadingLevel: null,
          className: 'section',
        },
        {
          displayName: 'outline',
          headingLevel: 2,
          nestedHeadingLevel: null,
          className: 'outline',
        },
      ],
    },
    {
      groupHeader: 'Core Elements 1',
      items: [
        {
          displayName: 'Key Terms',
          headingLevel: 2,
          nestedHeadingLevel: null,
          className: 'key-terms',
        },
        {
          displayName: 'Summary',
          headingLevel: 2,
          nestedHeadingLevel: null,
          className: 'summary',
        },
      ],
    },
  ],
  SpecialCharactersService: CharactersList,
  SchemaService: EditoriaSchema,
  TitleService: { updateTitle },
  RulesService: [emDash, ellipsis],
  ShortCutsService: {},
  EnableTrackChangeService: { enabled: false, toggle: true, updateTrackStatus },
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
  PmPlugins: [columnResizing(), tableEditing(), invisibles([hardBreak()])],
  CustomTagService: {
    tags: [
      { label: 'custom-tag-label-1', tagType: 'inline' },
      { label: 'custom-tag-label-2', tagType: 'inline' },
      { label: 'custom-tag-label-3', tagType: 'block' },
      { label: 'label 2', tagType: 'block' },
    ],
    // updateTags: saveTags,
  },

  services: [
    new OENContainersToolGroupService(),
    new OENContainersService(),
    new OENLeftToolGroupService(),
    new CustomTagService(),
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
    // new DisplayTextToolGroupService(),
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
    new CustomTagInlineToolGroupService(),
    new CustomTagBlockToolGroupService(),
  ],
};
