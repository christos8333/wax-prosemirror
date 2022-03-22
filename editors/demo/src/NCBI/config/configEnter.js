import { DefaultSchema } from 'wax-prosemirror-utilities';
import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  ListsService,
  ListToolGroupService,
  BaseService,
  BaseToolGroupService,
  LinkService,
  EnterService,
} from 'wax-prosemirror-services';

const getContentOnEnter = source => {
  console.log('editor content', source);
};

const config = {
  MenuService: [
    {
      templateArea: 'topBar',
      toolGroups: [
        {
          name: 'Base',
          exclude: ['Save'],
        },
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
  EnterService: { getContentOnEnter },

  services: [
    new EnterService(),
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
