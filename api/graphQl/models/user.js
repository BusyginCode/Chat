const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

module.exports = new GraphQLObjectType({
  name: 'User',
  description: "Users",
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
    }
  }
});
