const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;

const getUser = require('./queries/getUser');
const getUsers = require('./queries/getUsers');
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
    },
    users: {
      type: new GraphQLList(userType),
      args: {
        ids: {
          type: new GraphQLList(GraphQLString)
        }
      },
      resolve: function(_, args) {
        console.log('QUERY FIND USERS ', getUsers(args.ids))
        return getUsers(args.ids)
      }
    }
  }
});
