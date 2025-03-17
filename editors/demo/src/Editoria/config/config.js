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
  BlockQuoteService,
  YjsService,
} from 'wax-prosemirror-services';

import { TablesService, tableEditing, columnResizing } from 'wax-table-service';

import { EditoriaSchema } from 'wax-prosemirror-core';

import invisibles, {
  space,
  hardBreak,
  paragraph,
} from '@guardian/prosemirror-invisibles';

import CharactersList from './CharactersList';

// A second { options } param to handle calls bahavior
// this options will have the same names as in aiServce but in camelCase
async function DummyPromise(userInput, { askKb }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('User input:', userInput);
      if (userInput === 'reject') {
        reject('Your request could not be processed for now');
      } else {
        // JSON response test
        const json = JSON.stringify({
          content: askKb
            ? 'KB will be queried'
            : `<p>Hello my friend</p>
<strong>this is a strong</strong>
<h1>this a title</h1>`,
          citations: ['citation 1', 'citation 2', 'citation 3'],
          links: ['https://coko.foundation/', 'https://waxjs.net/about/'],
        });

        resolve(json);
      }
    }, 3150);
  });
}

const updateTitle = debounce(title => {
  // console.log(title);
}, 100);

const getComments = comments => {
  console.log(comments);
};

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
        'CustomTagBlock',
        'Notes',
        'Lists',
        'Images',
        'SpecialCharacters',
        'CodeBlock',
        'ToggleAi',
        'Tables',
        'TrackingAndEditing',
        'FindAndReplaceTool',
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
    // columnResizing(),
    invisibles([hardBreak()]),
    disallowPasteImagesPlugin(() =>
      onWarning(
        'Images are not allowed. Please upload them through filemanager',
      ),
    ),
  ],
  ImageService: { showAlt: true },
  SaveService: {
    saveSource: source => {
      console.log(source);
    },
  },
  CommentsService: {
    // showTitle: true,
    getComments,
    setComments,
    getMentionedUsers: (users, text) => {
      console.log(users, text);
    },
    userList: [
      { id: '1', displayName: 'test1' },
      { id: '2', displayName: 'test2' },
      { id: '3', displayName: 'test3' },
      { id: '4', displayName: 'test4' },
    ],
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

  YjsService: {
    // eslint-disable-next-line no-restricted-globals
    connectionUrl: 'ws://localhost:5010',
    // connectionUrl: 'ws://0.tcp.ap.ngrok.io:17607',
    docIdentifier: 'prosemirror-r5dw4dd5ee22rq254werc',
    YjsType: 'prosemirror',
  },

  AskAiContentService: {
    AskAiContentTransformation: DummyPromise,
    AiOn: true,
    AskKb: false,
    // GenerateImages: false,
    CustomPromptsOn: true,
    FreeTextPromptsOn: true,
    CustomPrompts: ['custom promt here!!'],
  },

  services: [
    new YjsService(),
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
