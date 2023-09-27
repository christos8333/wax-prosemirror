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
  // BlockDropDownToolGroupService,
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

const text = `In the shroud of redundant noise, consectetur,
A symphony sweeter than summer is discovered,
In the hearty paws and gentle eyes of a dog, our protector,
A tangible form of love, in fur is covered.

Against every day's chaos, turmoil, and upset,
A wagging tail carries, perhaps, the simplest antidote,
A soothing balm to a soul, in life's whirling roulette,
In each bark and paw, an unwritten heartfelt note.

Faithful are they, standing unwavering by our side,
Through the laughter, the struggles, and silent cries,
In their hearts, a world where compassion and loyalty reside,
Reflecting the truest emotions in their warm, gleaming eyes.

From the grandeur of a golden retriever's gallop,
To the charming chortle of a chihuahua's cheer,
Each breed, each dog, narrates a touching tale,
A saga of love, in their worlds, so clear.

They are guardian angels sporting leathered noses,
Draped in a cloak spun with devotion and trust,
They chase not just toys, but away our woes,
Their love, a precious gem, untouched by worldly rust.

In every dog, there lies a universe obscure,
A cosmos of gentleness veiled by playful veneer,
Their paw prints leave indelible marks, so pure,
Within us, they awaken a love, incredibly dear.

So here's to these creatures, adorable, and fierce,
The ones who teach us about love unfeigned,
In the echoing cacophony of this life, so diverse,
Semper fidelis - forever faithful, their love remains.`;

async function DummyPromise(userInput) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('User input:', userInput);
      if (userInput === 'reject') {
        reject('Your request could not be processed for now');
      } else {
        resolve(text);
      }
    }, 4150);
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
        // 'BlockDropDown',
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
    // new BlockDropDownToolGroupService(),
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
