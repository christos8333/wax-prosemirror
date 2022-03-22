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

import invisibles, {
  space,
  hardBreak,
  paragraph,
} from '@guardian/prosemirror-invisibles';

const configEnter = getContent => ({
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
  PmPlugins: [invisibles([hardBreak()])],
  EnterService: {
    getContentOnEnter: source => {
      getContent(source);
    },
  },

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
});

export default configEnter;
