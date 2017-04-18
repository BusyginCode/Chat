const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

const userType = require('./models/user');
const usersType = require('./models/users');

const createUser = require('./mutations/createUser');
const addFriend = require('./mutations/addFriend');
const findFriends = require('./mutations/findFriends');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  description: "Mutation",
  fields: {
    createUser: {
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
        const newUser = createUser(args)
        return new Promise(res => res(newUser))
      }
    },
    addFriend: {
      type: userType,
      args: {
        friendId: {
          name: 'Friend Id',
          type: GraphQLString
        },
        userId: {
          name: 'User Id',
          type: GraphQLString
        },
      },
      resolve: (source, args) => {
        const newUser = addFriend(args)
        return new Promise(res => res(newUser))
      }
    },
    findFriends: {
      type: usersType,
      args: {
        login: {
          name: 'Login',
          type: GraphQLString
        }
      },
      resolve: (source, args) => {
        const users = findFriends(args)
        return new Promise(res => res(users))
      }
    }
  }
});
