const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;

const User = require('./user');

module.exports = new GraphQLObjectType({
  name: 'RemoveUser',
  description: "Remove User",
  fields: {
    user: {
      type: User,
      description: "User",
    },
    friends: {
      type: new GraphQLList(User),
      description: "List of user friends",
    }
  }
});
