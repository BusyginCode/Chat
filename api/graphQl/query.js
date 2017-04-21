const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;

const user = require('./queries/user');
const users = require('./queries/users');

module.exports = new GraphQLObjectType({
  name: 'Query',
  description: "Query",
  fields: {
    user,
    users,
  }
});
