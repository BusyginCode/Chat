const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 8001,
  graphQlHost: process.env.GRAPHQL_HOST || 'localhost',
  graphQlPort: process.env.GRAPHQL_PORT || 8088,
}, environment);
