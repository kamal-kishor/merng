import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../../module/User.js";
import { UserInputError } from "apollo-server";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utl/validator.js";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

export const user_resolver = {
  Mutation: {
    async register(parent, args) {
      try {
        const { username, password, confirmPassword, email } = args.input;

        const { valid, errors } = validateRegisterInput(
          username,
          password,
          confirmPassword,
          email
        );
        if (!valid) {
          throw new UserInputError("validation-Errors", { errors });
        }

        //Check If User already added
        const user = await User.findOne({ email });
        if (user) {
          throw new UserInputError(
            "User name with This Email is already taken",
            {
              errors: {
                username: "This UserName is Already Taken with this Email",
              },
            }
          );
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          username,
          email,
          password: hashPassword,
          createdAt: new Date().toISOString(),
        });

        // Save The new User
        const res = await newUser.save();

        const token = generateToken(res);

        return { ...res._doc, id: res._id, token };
      } catch (error) {
        console.error("Error while saving to MongoDB:", error);
        throw new Error("Registration Failed: " + error.message);
      }
    },

    async login(parent, args) {
      try {
        const { email, password } = args.input;
        const { valid, errors } = validateLoginInput(email, password);
        if (!valid) {
          throw new UserInputError("Login-validation-Errors", { errors });
        }

        const user = await User.findOne({ email });

        if (!user) {
          errors.general = "User not Found";
          throw new UserInputError("Wrong Credentials ", errors);
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          errors.general = "Wrong Credentials";
          throw new UserInputError("Wrong Credentials ", errors);
        }

        const token = generateToken(user);

        return { ...user._doc, id: user._id, token };
      } catch (error) {
        console.error("Error while saving to MongoDB:", error);
        throw new Error("Registration Failed: " + error.message);
      }
    },
  },
};
