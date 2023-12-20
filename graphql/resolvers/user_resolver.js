// import Post from "../module/Post.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../../module/User.js";

export const user_resolver = {
  Mutation: {
    async register(
      { RegisterInput: { username, password, confirmPassword, email } },
      context,
      info
    ) {
      try {
        // const { username, password, confirmPassword, email } = args.input;
        password = await bcrypt.hash(password, 12);

        const newUser = new User({
          email,
          username,
          password,
          username,
          createdAt: new Date().toISOString(),
        });

        // Save The new User
        const res = await newUser.save();

        const token = jwt.sign(
          {
            id: res.id,
            email: res.email,
            username: res.username,
          },
          process.env.SECRET_KEY,
          { exporesIn: "1h" }
        );

        return { ...res._doc, id: res._id, token };
      } catch (error) {
        console.error("Error while saving to MongoDB:", error);
        throw new Error("Registration Failed due to ", error);
      }
    },
  },
};
