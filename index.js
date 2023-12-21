import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import { typeDefs } from "./graphql/typeDefs.js";
// import { resolvers } from "./graphql/resolvers.js";
import { resolvers } from "./graphql/resolvers/index.js";
import dotenv from "dotenv";
dotenv.config();

const startServer = async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await mongoose.connect(process.env.MONGODB);
    console.log(`🚀 MongoDB Connected`);

    const { url } = await server.listen({ port: 3030 });
    console.log(`🚀 Server Running at ${url}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

startServer();
