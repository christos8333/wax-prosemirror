import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  BaseService,
  BaseToolGroupService,
  LinkService,
} from 'wax-prosemirror-services';

import { WaxSelectionPlugin } from 'wax-prosemirror-plugins';

const configTitle = {
  MenuService: [
    {
      templateArea: 'topBar',
      toolGroups: [
        'Base',
        {
          name: 'Annotations',
          exclude: [
            'Code',
            'LinkTool',
            'StrikeThrough',
            'Underline',
            'SmallCaps',
          ],
        },
      ],
    },
  ],

  SchemaService: {
    nodes: {
      doc: {
        content: 'inline*',
      },
      text: {
        group: 'inline',
      },
      title: {
        group: 'inline',
        content: 'inline*',
        inline: true,
        parseDOM: [
          {
            tag: 'title',
          },
        ],
        toDOM(node) {
          return ['title', node.attrs, 0];
        },
      },
    },
    marks: {},
  },

  RulesService: [],
  ShortCutsService: {},

  PmPlugins: [WaxSelectionPlugin],

  services: [
    new InlineAnnotationsService(),
    new AnnotationToolGroupService(),
    new LinkService(),
    new BaseService(),
    new BaseToolGroupService(),
  ],
};

export default configTitle;
