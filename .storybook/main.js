const { main } = require('@coko/storybook')

const webpackOverride = config => {
  config.module.rules[0].use[0].options.plugins.splice(
    3,
    0,
    'babel-plugin-parameter-decorator',
  )

  // console.dir(config.module.rules[0], { depth: null })
  const babelLoaderPlugins = config.module.rules[0].use[0].options.plugins
  console.dir(babelLoaderPlugins)

  return config
}

main.webpackFinal = webpackOverride

module.exports = main
