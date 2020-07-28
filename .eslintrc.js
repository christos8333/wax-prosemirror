/* eslint-disable import/no-extraneous-dependencies */
const { eslint } = require('@coko/lint');
/**
 * You can edit the eslint config file here.
 *
 * eg.
 * eslint.rules['no-console'] = ['warn', { allow: ['error', 'warn'] }],
 *
 */

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
      devDependencies: ['.storybook/**', 'stories/**'],
    },
  ],
  'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  'react/prop-types': [
    2,
    { ignore: ['children', 'className', 'onClick', 'theme'] },
  ],
  'import/no-named-as-default': 0,
};

module.exports = eslint;
