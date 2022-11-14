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
  FillTheGapQuestionService,
  FillTheGapToolGroupService,
  QuestionsDropDownToolGroupService,
  EssayService,
  MatchingService,
  MultipleDropDownService,
  MultipleDropDownToolGroupService,
} from 'wax-prosemirror-services';

import { DefaultSchema } from 'wax-prosemirror-core';
import invisibles, { hardBreak } from '@guardian/prosemirror-invisibles';

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
        'QuestionsDropDown',
        'FillTheGap',
        'MultipleDropDown',
        'FullScreen',
      ],
    },
  ],

  SchemaService: DefaultSchema,
  RulesService: [emDash, ellipsis],

  PmPlugins: [columnResizing(), tableEditing(), invisibles([hardBreak()])],

  services: [
    new MatchingService(),
    new FillTheGapQuestionService(),
    new FillTheGapToolGroupService(),
    new MultipleChoiceQuestionService(),
    new QuestionsDropDownToolGroupService(),
    new MultipleDropDownService(),
    new MultipleDropDownToolGroupService(),
    new EssayService(),
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
