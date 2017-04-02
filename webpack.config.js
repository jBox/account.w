function buildConfig(env) {
  return require('./webpack.config/' + env + '.js')(env)
}

module.exports = buildConfig;