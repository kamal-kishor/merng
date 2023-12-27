import mongoose from "mongoose";
import Post from "../../module/Post.js";
import { check_auth } from "../../utl/check_auth.js";
import { AuthenticationError, UserInputError } from "apollo-server";

export const comment_resolver = {
  Mutation: {
    createComment: async (parent, args, context) => {
      try {
        const userDetails = check_auth(context);
        const username = userDetails.username;
        //   const postId = args.id;
        const { body, postId } = args.input;

        // console.log(
        //   "***********comment resolver***********",
        //   postId,
        //   body,
        //   username
        // );

        if (body.trim() === "") {
          throw new UserInputError("Empty Comment", {
            errors: { body: "Commnet body must not Empty" },
          });
        }

        const post = await Post.findById(postId);

        if (post) {
          post.comments.unshift({ body, username });
          await post.save();
          return post;
        } else throw new UserInputError("Post Not Found");
      } catch (error) {
        console.error("Error on the CreatePost Resolver: ", error);
        throw new Error("Error on the CreatePost Resolver: " + error.message);
      }
    },

    deleteCommnet: async (parent, args, context) => {
      try {
        const userDetails = check_auth(context);
        const username = userDetails.username;
        const { postId, commentId } = args.input;

        const post = await Post.findById(postId);

        console.log(
          "user Name at the comment Resolver: ",
          username,
          "PostId",
          postId,
          "Comment ID",
          commentId,
          "post ID",
          post
        );

        if (post) {
          const commentIndex = post.comments.findIndex(
            (c) => c._id === commentId
          );

          const comment = post.comments.find(
            (c) => c._id.toString() === commentId
          );
          if (comment) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError(
              "Action Not allowed by Unauthrized Person "
            );
          }
        } else {
          throw new AuthenticationError("No Post Find That ID");
        }
      } catch (error) {
        console.error("Error while saving to MongoDB:", error);
        throw new Error("Comment Deletion Failed: " + error.message);
      }
    },
  },
};
