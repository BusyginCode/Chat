import express from 'express';

const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;

const config = require('../../src/config');

const schema = new GraphQLSchema({
  query: require('./query'),
  mutation: require('./mutation')
});

const graphQLServer = express();
graphQLServer.use('/', graphqlHTTP({ schema: schema, graphiql: true }));
graphQLServer.listen(config.graphQlPort);
console.log("The GraphQL Server is running.")
