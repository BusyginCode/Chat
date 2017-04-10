const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

const getUser = require('./queries/getUser');
const userType = require('./models/user');

module.exports = new GraphQLObjectType({
  name: 'Query',
  description: "Query",
  fields: {
    user: {
      type: userType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: function(_, args) {
        return getUser(args.id)
      }
    }
  }
});
