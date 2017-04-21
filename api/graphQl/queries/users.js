const graphql = require('graphql');
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;
const Db = require('../../../db');
const userType = require('../models/user');

module.exports = {
  type: new GraphQLList(userType),
  args: {
    ids: {
      type: new GraphQLList(GraphQLString)
    }
  },
  resolve: function(_, args) {
    return Db.findUsers(args.ids)
  }
}
