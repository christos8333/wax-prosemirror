import { emDash, ellipsis } from 'prosemirror-inputrules';
import { debounce } from 'lodash';

import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  ImageService,
  ImageToolGroupService,
  LinkService,
  ListsService,
  ListToolGroupService,
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
  TrackOptionsToolGroupService,
  TrackCommentOptionsToolGroupService,
  CustomTagInlineToolGroupService,
  CustomTagBlockToolGroupService,
  CustomTagService,
  disallowPasteImagesPlugin,
  // YjsService,
  BlockDropDownToolGroupService,
  // TitleToolGroupService,
  AskAiContentService,
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

async function DummyPromise(userInput) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('User input:', userInput);
      if (userInput === 'reject') {
        reject('Your request could not be processed for now');
      } else {
        resolve(
          'He made significant contributions to theoretical physics, including achievements in quantum mechanics',
        );
      }
    }, 3150);
  });
}

const updateTitle = debounce(title => {
  console.log(title);
}, 100);

const saveTags = tags => {
  // console.log(tags);
};

const updateTrackStatus = status => {
  // console.log('status', status);
};

const onWarning = message => {
  alert(message);
};

export default {
  MenuService: [
    {
      templateArea: 'mainMenuToolBar',
      toolGroups: [
        'Base',
        'BlockDropDown',
        // 'TitleTool',
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
        'ToggleAi',
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

  // CommentsService: { readOnly: true },
  // OrderedListService: { subList: false },
  // BulletListService: { subList: false },
  // JoinUpService: { subList: false },
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
  PmPlugins: [
    // tableEditing(),
    columnResizing(),
    invisibles([hardBreak()]),
    disallowPasteImagesPlugin(() =>
      onWarning(
        'Images are not allowed. Please upload them through filemanager',
      ),
    ),
  ],
  ImageService: { showAlt: true },
  CommentsService: {
    showTitle: true
  },
  CustomTagService: {
    tags: [
      { label: 'custom-tag-label-1', tagType: 'inline' },
      { label: 'custom-tag-label-2', tagType: 'inline' },
      { label: 'custom-tag-label-3', tagType: 'block' },
      { label: 'label 2', tagType: 'block' },
    ],
    updateTags: saveTags,
  },
  // YjsService: {
  //   // eslint-disable-next-line no-restricted-globals
  //   connectionUrl: 'ws://localhost:4000',
  //   docIdentifier: 'prosemirror-demo',
  // },

  AskAiContentService: {
    AskAiContentTransformation: DummyPromise,
  },

  services: [
    // new TitleToolGroupService(),
    // new YjsService(),
    new BlockDropDownToolGroupService(),
    new AskAiContentService(),
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
    new CustomTagInlineToolGroupService(),
    new CustomTagBlockToolGroupService(),
  ],
};
