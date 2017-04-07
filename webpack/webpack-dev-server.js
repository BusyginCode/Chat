const Express = require('express');
const webpack = require('webpack');

const config = require('../src/config');
const webpackConfig = require('./dev.config');
const compiler = webpack(webpackConfig);

const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;

const WebpackDevServer = require('webpack-dev-server');

Object.keys(webpackConfig.entry).forEach(key => webpackConfig.entry[key].unshift(
  'webpack-dev-server/client?http://' + host + ':' + port + '/',
  'webpack/hot/dev-server'
));


const server = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: '/dist/',
  stats: {
    chunks: false,
    colors: true,
  }
});

server.listen(port, host, () =>
  console.log('Webpack dev server is listening on ' + host + ':' + port)
);
