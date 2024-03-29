import { emDash, ellipsis } from 'prosemirror-inputrules';
import {
  InlineAnnotationsService,
  ImageService,
  LinkService,
  ListsService,
  BaseService,
  DisplayTextToolGroupService,
  MathService,
  FullScreenService,
} from 'wax-prosemirror-services';

import { QuestionsService } from 'wax-questions-service';
import { TablesService, tableEditing, columnResizing } from 'wax-table-service';

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
        'FullScreen',
      ],
    },
    {
      templateArea: 'fillTheGap',
      toolGroups: ['FillTheGap'],
    },
    {
      templateArea: 'MultipleDropDown',
      toolGroups: ['MultipleDropDown'],
    },
  ],

  SchemaService: DefaultSchema,
  RulesService: [emDash, ellipsis],
  ImageService: { showAlt: true },

  PmPlugins: [invisibles([hardBreak()]), tableEditing(), columnResizing()],
  services: [
    new QuestionsService(),
    new ListsService(),
    new LinkService(),
    new InlineAnnotationsService(),
    new ImageService(),
    new TablesService(),
    new BaseService(),
    new DisplayTextToolGroupService(),
    new MathService(),
    new FullScreenService(),
  ],
};
