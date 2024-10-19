import { users } from "../dummyData/dummydata.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
const user_Resolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { name, username, password, gender } = input;
        if ((!name || !username, !password, !gender)) {
          throw new Error("All fields are required");
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User Already Exists");
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassowrd = await bcryptjs.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassowrd,
          gender,
          profilePicture: gender == "male" ? boyProfilePic : girlProfilePic,
        });
        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.log(`Error while creating user`, error);
        throw new Error(error.message || "Internal Server Error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        const user = await context.authenticate("graphql-local", {
          username,
          password,
        });
        await context.login(user);
        return user;
      } catch (error) {
        console.log(`Error while login user`, error);
        throw new Error(error.message || "Internal Server Error");
      }
    },
    logout: async (_,__, context) => {
      try {
        await context.logout();
        req.session.destroy((err) => {
          if (err) throw err;
        });
        res.clearCookie("connect.sid");
        return { message: "logged out successfully" };
      } catch (error) {
        console.log(`Error while logout user`, error);
        throw new Error(error.message || "Internal Server Error");
      }
    },
  },
  Query: {
    auth: async (_,__, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.log(`Error while auth user`, error);
        throw new Error(error.message || "Internal Server Error");
      }
    },
    user: async (_,{ userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        console.log(`Error while finding one user`, error);
        throw new Error(error.message || "Internal Server Error");
      }
    },
  },
};

export default user_Resolver;
