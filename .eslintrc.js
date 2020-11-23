const { eslint } = require('@coko/lint');

eslint.parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

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
    ],
  },
];

module.exports = eslint;
