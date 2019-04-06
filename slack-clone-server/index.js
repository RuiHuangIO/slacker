import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

import typeDefs from "./schema";
import resolvers from "./resolvers";

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
);
