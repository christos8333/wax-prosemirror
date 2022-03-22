import { emDash, ellipsis } from 'prosemirror-inputrules';
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
  DisplayTextToolGroupService,
  MathService,
  FullScreenService,
  FullScreenToolGroupService,
  SpecialCharactersService,
  SpecialCharactersToolGroupService,
  EditorInfoToolGroupServices,
  BottomInfoService,
  MultipleChoiceQuestionService,
  MultipleChoiceToolGroupService,
  FillTheGapQuestionService,
  FillTheGapToolGroupService,
  MultipleDropDownToolGroupService,
  EssayService,
  EssayToolGroupService,
  MatchingService,
  MatchingToolGroupService,
  EnterService,
} from 'wax-prosemirror-services';

import { DefaultSchema } from 'wax-prosemirror-utilities';
import invisibles, { hardBreak } from '@guardian/prosemirror-invisibles';

const getContentOnEnter = source => {
  console.log('editor content', source);
};

export default {
  MenuService: [
    {
      templateArea: 'mainMenuToolBar',
      toolGroups: [
        'Base',
        {
          name: 'Annotations',
          // exclude: ['LinkTool'],
          more: [
            'Superscript',
            'Subscript',
            'SmallCaps',
            'Underline',
            'StrikeThrough',
          ],
        },
        'Lists',
        'Images',
        'Tables',
        'MultipleDropDown',
        'Essay',
        'FillTheGap',
        'Matching',
        'FullScreen',
      ],
    },
  ],

  EnterService: { getContentOnEnter },
  SchemaService: DefaultSchema,
  RulesService: [emDash, ellipsis],

  PmPlugins: [columnResizing(), tableEditing(), invisibles([hardBreak()])],

  services: [
    new EnterService(),
    new MatchingService(),
    new MatchingToolGroupService(),
    new FillTheGapQuestionService(),
    new FillTheGapToolGroupService(),
    new MultipleChoiceQuestionService(),
    new MultipleChoiceToolGroupService(),
    new MultipleDropDownToolGroupService(),
    new EssayService(),
    new EssayToolGroupService(),
    new ListsService(),
    new LinkService(),
    new InlineAnnotationsService(),
    new ImageService(),
    new TablesService(),
    new BaseService(),
    new BaseToolGroupService(),
    new TableToolGroupService(),
    new ImageToolGroupService(),
    new AnnotationToolGroupService(),
    new ListToolGroupService(),
    new DisplayTextToolGroupService(),
    new MathService(),
    new FullScreenService(),
    new FullScreenToolGroupService(),
    new SpecialCharactersService(),
    new SpecialCharactersToolGroupService(),
    new EditorInfoToolGroupServices(),
    new BottomInfoService(),
  ],
};
