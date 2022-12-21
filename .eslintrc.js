const { eslint } = require('@coko/lint');

eslint.parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    legacyDecorators: true,
    experimentalObjectRestSpread: true,
  },
};

eslint.rules['no-unused-vars'] = ['error', { varsIgnorePattern: 'inject' }];

eslint.rules['no-underscore-dangle'] = [
  'error',
  { allow: ['_tools', '_config'] },
];

eslint.rules['class-methods-use-this'] = [
  1,
  { exceptMethods: ['run', 'enable', 'active', 'select'] },
];
// eslint.rules['import/no-named-as-default'] = 0,

eslint.rules['react/prop-types'] = [
  2,
  {
    ignore: [
      'children',
      'className',
      'onClick',
      'onMouseDown',
      'onMouseEnter',
      'theme',
      'node',
      'view',
      'getPos',
      'readOnly',
    ],
  },
];

module.exports = eslint;
