import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import "graphql-import-node";
import { createServer } from "http";
import { schema } from "./gqlDefinition";

const run = async () => {
  const app = express();

  const httpServer = createServer(app);

  const server = new ApolloServer({
    schema,
    debug: true,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  httpServer.listen(3000, () => {
    console.log(`🚀  Server ready at port 3000`);
  });
};

run();
