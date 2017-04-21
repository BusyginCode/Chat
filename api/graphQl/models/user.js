const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;

module.exports = new GraphQLObjectType({
  name: 'User',
  description: "User",
  fields: {
    id: {
      type: GraphQLString,
      description: "User id",
    },
    login: {
      type: GraphQLString,
      description: "User login",
    },
    email: {
      type: GraphQLString,
      description: "User email",
    },
    friends: {
      type: new GraphQLList(GraphQLString),
      description: "List of friends id's",
    }
  }
});
