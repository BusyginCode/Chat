var Express = require('express');
var webpack = require('webpack');

var config = require('../src/config');
var webpackConfig = require('./dev.config');
var compiler = webpack(webpackConfig);

var host = config.host || 'localhost';
var port = (Number(config.port) + 1) || 3001;
// var serverOptions = {
//   noInfo: true,
//   hot: true,
//   publicPath: webpackConfig.output.publicPath,
//   headers: {'Access-Control-Allow-Origin': '*'},
// };

// var app = new Express();

// app.use(require('webpack-dev-middleware')(compiler, serverOptions));
// app.use(require('webpack-hot-middleware')(compiler, {
//   path: '/__webpack_hmr',
// }));

// app.listen(port, function onAppListening(err) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.info('==> 🚧  Webpack development server listening on port %s', port);
//   }
// });

const WebpackDevServer = require('webpack-dev-server');

// HMR
Object.keys(webpackConfig.entry).forEach(key => webpackConfig.entry[key].unshift(
  'webpack-dev-server/client?http://' + host + ':' + port + '/',
  'webpack/hot/dev-server'
));


const server = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: '/dist/',
});

// server.use(require('webpack-hot-middleware')(compiler));
server.listen(port, host, () =>
  console.log('Webpack dev server is listening on ' + host + ':' + port)
);