import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import mergedResolvers from "./resolvers/index.js";
import mergerTypeDef from "./typeDefs/index.js";
import { connectDb } from "./db/connect.db.js";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import configurePassport from './passport/passport.congfig.js';
import {buildContext } from "graphql-passport";






try {
  const app = express();
  const httpServer = http.createServer(app);
  configurePassport()
  const mongoDbStore= connectMongo(session)
  const store=new mongoDbStore({
    uri:process.env.MONGO_URL+"/expenseQl",
    collection:"sessions"
  })

  store.on("error",(err)=>{
    console.log(err)
  })



  app.use(session({
    secret:process.env.SESSSION_SECRET,
    resave:false,//this option to save session to db on every request or not  if it is true then we have multiple session for one user
    saveUninitialized:false,//opt weather to save uninitialized user session  
    cookie:{
      maxAge:1*24*60*60*1000,
      httpOnly:true// this stop cross site scripting attacks
    },
    store:store
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  const server = new ApolloServer({
    typeDefs: mergerTypeDef,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/",
    express.json(),
    cors({
      origin:"http://localhost:5173",
      credentials:true //so we can send cookies to frontend
    }),
    expressMiddleware(server, {
      context: async ({ req ,res}) => buildContext({ req,res}),//context is an object that share accross all resolver
    })
  );

  connectDb()
    .then(async () => {
      await new Promise((res) => {
        httpServer.listen({ port: 4000 }, res);
      });
      console.log(`Server Started on http://localhost:4000`);
    })
    .catch((err) => {
      console.log(`Error while connecting db and start server`);
      console.log(err.message)
      process.exit(1);
    });
} catch (error) {
  console.log(error.message);
}
