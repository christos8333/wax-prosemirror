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
  DisplayTextToolGroupService,
  MathService,
  FindAndReplaceService,
  EditingSuggestingService,
  FullScreenService,
  SpecialCharactersService,
  HighlightService,
  BottomInfoService,
  TransformService,
  CustomTagService,
  disallowPasteImagesPlugin,
  BlockDropDownToolGroupService,
  AskAiContentService,
  // YjsService,
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
  // console.log(title);
}, 100);

const getComments = debounce(comments => {
  console.log(comments);
}, 2000);

const setComments = (comments = []) => {
  return comments;
};

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
    tableEditing(),
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
    showTitle: true,
    getComments,
    setComments,
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
    AiOn: true,
  },

  services: [
    // new YjsService(),
    new BlockDropDownToolGroupService(),
    new AskAiContentService(),
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
    new DisplayTextToolGroupService(),
    new MathService(),
    new FindAndReplaceService(),
    new FullScreenService(),
    new SpecialCharactersService(),
    new HighlightService(),
    new BottomInfoService(),
    new TransformService(),
  ],
};
