import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers/index.js";
// import { PubSub } from "graphql-subscriptions";
import dotenv from "dotenv";
dotenv.config();

// const pubsub = new PubSub();

const startServer = async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      context: ({ req }) => ({ req }),
      // context: ({ req, connection }) => {
      //   if (connection) {
      //     // For WebSocket Connection
      //     return { ...connection.context, pubsub };
      //   }
      //   // For HTTP Connections
      //   return { req, pubsub };
      // },

      // subscriptions: {
      //   path: "/graphql", // The path for WebSocket subscriptions
      //   onConnect: (connectionParams, webSocket, context) => {
      //     // Handle WebSocket connection initialization
      //     // You can use connectionParams for authentication or additional data
      //   },
      //   onDisconnect: (webSocket, context) => {
      //     // Handle WebSocket disconnection
      //   },
      // },
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
