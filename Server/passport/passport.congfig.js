import passport from "passport";
import bcryptjs from "bcryptjs";

import User from "../models/user.model.js";

import { GraphQLLocalStrategy } from "graphql-passport";

const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("Serializing User ", user);
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing User");
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("Invalid Username/Password");
        }
        const validPassword = bcryptjs.compare(password, user.password);
        if (!validPassword) {
          throw new Error("Invalid Username/Password");
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};
export default configurePassport