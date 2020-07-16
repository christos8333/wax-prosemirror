const { main } = require('@coko/storybook')

const webpackOverride = config => {
  config.module.rules[0].use[0].options.plugins.splice(
    3,
    0,
    'babel-plugin-parameter-decorator',
  )

  return config
}

main.webpackFinal = webpackOverride

module.exports = main
