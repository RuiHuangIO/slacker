import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import path from 'path';

import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

models.sequelize.sync().then(() => {
  app.listen({ port: 8080 }, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  );
});
