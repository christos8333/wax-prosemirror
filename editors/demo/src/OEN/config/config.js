import { emDash, ellipsis } from 'prosemirror-inputrules';
import { debounce } from 'lodash';

import {
  InlineAnnotationsService,
  ImageService,
  LinkService,
  ListsService,
  BaseService,
  DisplayBlockLevelService,
  TextBlockLevelService,
  NoteService,
  TrackChangeService,
  CommentsService,
  CodeBlockService,
  // DisplayTextToolGroupService,
  MathService,
  FindAndReplaceService,
  EditingSuggestingService,
  FullScreenService,
  SpecialCharactersService,
  HighlightService,
  BottomInfoService,
  TransformService,
  CustomTagService,
  OENContainersService,
} from 'wax-prosemirror-services';
import { TablesService, tableEditing, columnResizing } from 'wax-table-service';

import { EditoriaSchema } from 'wax-prosemirror-core';

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
          isSection: false,
          nestedHeadingLevel: null,
          className: 'learning-objectives',
        },
        {
          displayName: 'Section',
          headingLevel: 2,
          isSection: true,
          nestedHeadingLevel: undefined,
          className: 'whatever',
        },
        {
          displayName: 'outline',
          headingLevel: 2,
          isSection: false,
          nestedHeadingLevel: 4,
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
          isSection: false,
          nestedHeadingLevel: null,
          className: 'key-terms',
        },
        {
          displayName: 'Summary',
          headingLevel: 2,
          isSection: false,
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
  PmPlugins: [invisibles([hardBreak()])],
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
    new OENContainersService(),
    new CustomTagService(),
    new DisplayBlockLevelService(),
    new TextBlockLevelService(),
    new ListsService(),
    new LinkService(),
    new InlineAnnotationsService(),
    new TrackChangeService(),
    new CommentsService(),
    new ImageService(),
    new TablesService(),
    new BaseService(),
    new NoteService(),
    new CodeBlockService(),
    new EditingSuggestingService(),
    // new DisplayTextToolGroupService(),
    new MathService(),
    new FindAndReplaceService(),
    new FullScreenService(),
    new SpecialCharactersService(),
    new HighlightService(),
    new BottomInfoService(),
    new TransformService(),
  ],
};
