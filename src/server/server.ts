import {ApolloServer} from '@apollo/server';
import {buildSubgraphSchema} from '@apollo/subgraph';
import express from 'express';
import http from 'http';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import {expressMiddleware} from '@apollo/server/express4';
import {resolvers, typeDefs} from '../graphql';
import {router} from '../routes';
import {logger} from '../logger';
import {DB, User, userModel} from '../models';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import passport from 'passport';
import session from 'express-session';
import {Strategy as LocalStrategy} from 'passport-local';

interface Context {
  token?: string;
}

export class Server {
  private static _port: string | number;
  private static _server: ApolloServer<Context>;
  private static _app: express.Express;
  private static _serverURL: string;

  public static get serverURL(): string {
    return this._serverURL;
  }

  public static get port(): string | number {
    return this._port;
  }

  public static init = async () => {
    dotenv.config();
    this._serverURL = process.env.SERVER_URL || 'http://localhost';
    this._app = express();
    const httpServer = http.createServer(this._app);
    const {json} = bodyParser;

    this._server = new ApolloServer<Context>({
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

    await this._server.start();

    this._app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      json(),
      morgan(
        ':status :method :url HTTP/:http-version :response-time ms ":referrer" ":user-agent"',
        {
          stream: {
            write: message => {
              return logger.info(message.trim());
            },
          },
        }
      ),
      expressMiddleware(this._server, {
        context: async ({req}) => {
          return {
            token: req.headers.token,
          };
        },
      })
    );

    // TODO: logging doesn't seem to be working as intended for requests outside of graphQL.
    this._app.use(
      cors<cors.CorsRequest>(),
      json(),
      router,
      morgan(
        ':status :method :url HTTP/:http-version :response-time ms ":referrer" ":user-agent"',
        {
          stream: {
            write: message => {
              return logger.info(message.trim());
            },
          },
        }
      ),
      session({
        secret: process.env.SESSION_SECRET || 'Best Secret In The World',
        resave: false,
        saveUninitialized: false,
      }),
      passport.initialize(),
      passport.session()
    );

    // passport.use(
    //   new GoogleStrategy(
    //     {
    //       clientID: process.env.GC_CLIENT_ID || '',
    //       clientSecret: process.env.GC_CLIENT_SECRET || '',
    //       callbackURL: 'http://www.example.com/auth/google/callback',

    //     },
    //     function (accessToken, refreshToken, profile, cb) {
    //       // pass
    //     }
    //   )
    // );

    this._port = process.env.PORT || 4000;
    const mongoURI = process.env.MONGO_PROD_URI || process.env.MONGO_DEV_URI;
    await DB.Init(mongoURI);

    passport.use(userModel.createStrategy());
    passport.serializeUser((user, done) => {
      done(null, (user as User).id);
    });
    passport.deserializeUser((id, done) => {
      userModel
        .findById(id)
        .then(user => {
          console.log(user);
          done(null, user);
        })
        .catch(err => {
          done(err, false);
        });
    });

    await new Promise<void>(resolve =>
      httpServer.listen({port: this._port}, resolve)
    );
    logger.info(`🚀 Server ready at ${this._serverURL}:${this._port}/`);
  };
}
