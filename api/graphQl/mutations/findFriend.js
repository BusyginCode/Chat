const graphql = require('graphql');
const GraphQLString = graphql.GraphQLString;
const Db = require('../../../db');
const userType = require('../models/user');

module.exports = {
  type: userType,
  args: {
    login: {
      name: 'Login',
      type: GraphQLString
    }
  },
  resolve: (source, args) => {
    const user = Db.findUser({
      login: args.login,
    });
    return new Promise(res => res(user))
  }
}
