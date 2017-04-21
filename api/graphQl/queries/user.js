const graphql = require('graphql');
const GraphQLString = graphql.GraphQLString;
const Db = require('../../../db');
const userType = require('../models/user');

module.exports = {
  type: userType,
  args: {
    id: {
      type: GraphQLString
    }
  },
  resolve: function(_, args) {
    return Db.findUser(args.id)
  }
}
