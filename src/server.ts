import {ApolloServer} from '@apollo/server';
import {buildSubgraphSchema} from '@apollo/subgraph';
import express from 'express';
import http from 'http';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import {resolvers, typeDefs} from './graphql';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import {expressMiddleware} from '@apollo/server/express4';
import {DB} from './models';

interface Context {
  token?: string;
}

(async () => {
  dotenv.config();
  const app = express();
  const httpServer = http.createServer(app);
  const {json} = bodyParser;

  const server = new ApolloServer<Context>({
    schema: buildSubgraphSchema([
      {
        typeDefs: typeDefs.userSchema,
        resolvers: resolvers.userResolver,
      },
      {
        typeDefs: typeDefs.querySchema,
      },
    ]),
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    morgan('common'),
    expressMiddleware(server, {
      context: async ({req}) => ({token: req.headers.token}),
    })
  );

  const PORT = process.env.PORT || 4000;
  const mongoURI = process.env.MONGO_PROD_URI || process.env.MONGO_DEV_URI;
  DB.Init(mongoURI);

  await new Promise<void>(resolve => httpServer.listen({port: PORT}, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
})();
