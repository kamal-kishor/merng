import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { AuthenticationError } from "apollo-server";

const check_auth = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired Token ");
      }
    }
    throw new Error("Authencation Token must Be 'Bearer [Token] ");
  }

  throw new Error("Authorization Header must Be Provided ");
};

export { check_auth };
