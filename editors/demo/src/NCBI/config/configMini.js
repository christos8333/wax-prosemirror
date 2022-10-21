import { DefaultSchema } from 'wax-prosemirror-core';
import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  ListsService,
  ListToolGroupService,
  BaseService,
  BaseToolGroupService,
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
    new AnnotationToolGroupService(),
    new LinkService(),
    new ListToolGroupService(),
    new BaseService(),
    new ListsService(),
    new BaseToolGroupService(),
  ],
};

export default config;
