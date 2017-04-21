const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;

const createUser = require('./mutations/createUser');
const addFriend = require('./mutations/addFriend');
const findFriend = require('./mutations/findFriend');
const removeFriend = require('./mutations/removeFriend');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  description: "Mutation",
  fields: {
    createUser,
    addFriend,
    findFriend,
    removeFriend,
  }
});
