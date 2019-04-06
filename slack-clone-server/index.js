import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

import typeDefs from "./schema";
import resolvers from "./resolvers";

import models from './models';

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

models.sequelize.sync().then(() => {
  app.listen({ port: 8080 }, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  );
});
