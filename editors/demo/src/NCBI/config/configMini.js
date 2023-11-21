import { DefaultSchema } from 'wax-prosemirror-core';
import {
  InlineAnnotationsService,
  ListsService,
  BaseService,
  LinkService,
} from 'wax-prosemirror-services';

const config = {
  MenuService: [
    {
      templateArea: 'topBar',
      toolGroups: [
        'Base',
        {
          name: 'Annotations',
          exclude: ['Code', 'StrikeThrough', 'Underline', 'SmallCaps'],
        },
        'Lists',
      ],
    },
  ],

  RulesService: [],
  ShortCutsService: {},
  LinkService: {},
  SchemaService: DefaultSchema,
  PmPlugins: [],

  services: [
    new InlineAnnotationsService(),
    new LinkService(),
    new BaseService(),
    new ListsService(),
  ],
};

export default config;
