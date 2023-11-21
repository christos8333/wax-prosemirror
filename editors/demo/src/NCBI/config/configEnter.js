import { DefaultSchema } from 'wax-prosemirror-core';
import {
  InlineAnnotationsService,
  ListsService,
  BaseService,
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
    new LinkService(),
    new BaseService(),
    new ListsService(),
  ],
});

export default configEnter;
