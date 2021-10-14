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
} from 'wax-prosemirror-services';

import { DefaultSchema } from 'wax-prosemirror-utilities';
import { WaxSelectionPlugin } from 'wax-prosemirror-plugins';
import invisibles, { hardBreak } from '@guardian/prosemirror-invisibles';

/* Questions Services */
import FillTheGapQuestionService from '../FillTheGapQuestionService/FillTheGapQuestionService';
import FillTheGapToolGroupService from '../FillTheGapToolGroupService/FillTheGapToolGroupService';

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
        'Lists',
        'Images',
        'Tables',
        'MultipleChoice',
        'FillTheGap',
        'FullScreen',
      ],
    },
  ],

  SchemaService: DefaultSchema,
  RulesService: [emDash, ellipsis],

  PmPlugins: [
    columnResizing(),
    tableEditing(),
    invisibles([hardBreak()]),
    WaxSelectionPlugin,
  ],

  services: [
    new FillTheGapQuestionService(),
    new FillTheGapToolGroupService(),
    new MultipleChoiceQuestionService(),
    new MultipleChoiceToolGroupService(),
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
