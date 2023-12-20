import { post_resolver } from "./post_resolver.js";
import { user_resolver } from "./user_resolver.js";

export const resolvers = {
  Query: {
    ...post_resolver.Query,
  },
  Mutation: {
    ...user_resolver.Mutation,
  },
};
