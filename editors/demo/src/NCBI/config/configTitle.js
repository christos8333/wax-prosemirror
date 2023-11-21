import {
  InlineAnnotationsService,
  BaseService,
  LinkService,
} from 'wax-prosemirror-services';

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

  PmPlugins: [],

  services: [
    new InlineAnnotationsService(),
    new LinkService(),
    new BaseService(),
  ],
};

export default configTitle;
