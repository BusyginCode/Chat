const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

const userType = require('./models/user');

const createUser = require('./mutations/createUser');

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
        console.log('Mutation')
        const newUser = createUser(args)
        return new Promise(res => res(newUser))
      }
    },
  }
});
