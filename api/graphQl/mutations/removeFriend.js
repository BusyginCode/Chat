const graphql = require('graphql');
const GraphQLString = graphql.GraphQLString;
const Db = require('../../../db');
const userAndFriends = require('../models/userAndFriends');

module.exports = {
  type: userAndFriends,
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
    const responce = Db.removeUserFriend({
      userId: args.userId,
      friendId: args.friendId,
    });
    return new Promise(res => res(responce))
  }
}
