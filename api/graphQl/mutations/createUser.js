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
    },
    email: {
      name: 'Email',
      type: GraphQLString
    },
    password: {
      name: 'Password',
      type: GraphQLString
    }
  },
  resolve: (source, args) => {
    const newUser = Db.createUser({
      login: args.login,
      password: args.password,
      email: args.email,
    })
    return new Promise(res => res(newUser))
  }
}
