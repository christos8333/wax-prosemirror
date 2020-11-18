const { commitizen } = require('@coko/lint');

commitizen.scopes = [
  'core',
  'components',
  'layouts',
  'plugins',
  'schema',
  'services',
  'utilities',
  'editors',
  '*',
];

module.exports = commitizen;
