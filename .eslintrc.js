/* eslint-disable import/no-extraneous-dependencies */
const { eslint } = require('@coko/lint');
/**
 * You can edit the eslint config file here.
 *
 * eg.
 * eslint.rules['no-console'] = ['warn', { allow: ['error', 'warn'] }],
 *
 */

eslint.env = {
  browser: true,
};

eslint.parser = 'babel-eslint';

eslint.parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

eslint.rules = {
  'sort-keys': 'off',
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: ['.storybook/**', 'stories/**', '.cz-config.js'],
    },
  ],
  'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  'class-methods-use-this': [1, { exceptMethods: ['run', 'enable', 'active'] }],

  'react/prop-types': [
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
  ],
  // 'import/no-named-as-default': 0,
};

module.exports = eslint;
