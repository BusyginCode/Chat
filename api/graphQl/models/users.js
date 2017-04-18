const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLList = graphql.GraphQLList;

const User = require('./user');

module.exports = new GraphQLObjectType({
  name: 'Users',
  description: "Type for user search",
  fields: {
    users: {
      type: new GraphQLList(User),
      description: "List of users",
    }
  }
});
