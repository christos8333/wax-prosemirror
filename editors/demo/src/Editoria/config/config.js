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
          content: askKb ? 'KB will be queried' : 'Just a normal call',
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

const getComments = debounce(comments => {
  console.log(comments);
}, 2000);

const setComments = (
  comments = [
    // {
    //   id: 'a1',
    //   from: 5,
    //   to: 10,
    //   data: {
    //     type: 'comment',
    //     yjsFrom: 5,
    //     yjsTo: 10,
    //     pmFrom: 5,
    //     pmTo: 10,
    //     conversation: [
    //       {
    //         content: '1111',
    //         displayName: 'admin',
    //         userId: 'b3cfc28e-0f2e-45b5-b505-e66783d4f946',
    //         timestamp: 1710501980537,
    //       },
    //     ],
    //     title: '111',
    //     group: 'main',
    //     viewId: 'main',
    //   },
    //   endHeight: 362.3579406738281,
    // },
    // {
    //   id: 'a2',
    //   from: 8,
    //   to: 15,
    //   data: {
    //     type: 'comment',
    //     yjsFrom: 8,
    //     yjsTo: 15,
    //     pmFrom: 8,
    //     pmTo: 15,
    //     conversation: [
    //       {
    //         content: '222',
    //         displayName: 'admin',
    //         userId: 'b3cfc28e-0f2e-45b5-b505-e66783d4f946',
    //         timestamp: 1710501987197,
    //       },
    //     ],
    //     title: '222',
    //     group: 'main',
    //     viewId: 'main',
    //   },
    //   endHeight: 266.3579406738281,
    // },
    // {
    //   id: 'b8d907d4-1859-49a9-abcd-13788d497758',
    //   from: {
    //     type: {
    //       client: 2887320119,
    //       clock: 150,
    //     },
    //     tname: null,
    //     item: {
    //       client: 2887320119,
    //       clock: 185,
    //     },
    //     assoc: 0,
    //   },
    //   to: {
    //     type: {
    //       client: 2887320119,
    //       clock: 150,
    //     },
    //     tname: null,
    //     item: {
    //       client: 2887320119,
    //       clock: 195,
    //     },
    //     assoc: 0,
    //   },
    //   data: {
    //     yjsFrom: {
    //       type: {
    //         client: 2887320119,
    //         clock: 150,
    //       },
    //       tname: null,
    //       item: {
    //         client: 2887320119,
    //         clock: 185,
    //       },
    //       assoc: 0,
    //     },
    //     yjsTo: {
    //       type: {
    //         client: 2887320119,
    //         clock: 150,
    //       },
    //       tname: null,
    //       item: {
    //         client: 2887320119,
    //         clock: 195,
    //       },
    //       assoc: 0,
    //     },
    //     pmFrom: 164,
    //     pmTo: 174,
    //     type: 'comment',
    //     conversation: [
    //       {
    //         content: 'dfgdfgd',
    //         displayName: 'admin',
    //         userId: 'b3cfc28e-0f2e-45b5-b505-e66783d4f946',
    //         timestamp: 1713699155995,
    //       },
    //     ],
    //     title: 'dgfdgf',
    //     group: 'main',
    //     viewId: 'main',
    //   },
    //   endHeight: 406.734375,
    // },
  ],
) => {
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
  //   connectionUrl: 'ws://localhost:5010',
  //   // connectionUrl: 'ws://0.tcp.ap.ngrok.io:17607',
  //   docIdentifier: 'prosemirror-r5dw4q2fe2eedreeeeeweewwewerc',
  //   YjsType: 'prosemirror',
  // },

  AskAiContentService: {
    AskAiContentTransformation: DummyPromise,
    AiOn: true,
    AskKb: false,
    // GenerateImages: false,
    CustomPromptsOn: true,
    FreeTextPromptsOn: true,
    CustomPrompts: [],
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
