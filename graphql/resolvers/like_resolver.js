import mongoose from "mongoose";
import Post from "../../module/Post.js";
import { check_auth } from "../../utl/check_auth.js";
import { UserInputError } from "apollo-server";

export const like_resolver = {
  Mutation: {
    likePost: async (parent, args, context) => {
      try {
        const { postId } = args.input;
        const { username } = check_auth(context);
        const post = await Post.findById(postId);

        if (post) {
          if (post.likes.find((like) => like.username === username)) {
            // Already like
            post.likes = post.likes.filter(
              (like) => like.username !== username
            );
          } else {
            // Create Like
            post.likes.push({
              username,
            });
          }

          await post.save();
          return post;
        } else {
          throw new UserInputError("Post Not Found");
        }
      } catch (error) {
        console.error("Error on the Like Post Resolver: ", error);
        throw new Error("Error on the Like Post Resolver: " + error.message);
      }
    },

    Subscription: {
      // newPost: {
      //   subscribe: (parent, args) => args.pubsub.asyncIterator("NEW POST"),
      // },
      newPost: {
        subscribe: async (parent, args, { pubsub }) => {
          return pubsub.asyncIterator("NEW_POST");
        },
      },
    },
  },
};
