import { post_resolver } from "./post_resolver.js";
import { user_resolver } from "./user_resolver.js";
import { comment_resolver } from "./comment_resolver.js";
import { like_resolver } from "./like_resolver.js";

export const resolvers = {
  Query: {
    ...post_resolver.Query,
  },
  Mutation: {
    ...user_resolver.Mutation,
    ...post_resolver.Mutation,
    ...comment_resolver.Mutation,
    ...like_resolver.Mutation,
  },
  Subscription: {
    ...like_resolver.Subscription,
  },
};
