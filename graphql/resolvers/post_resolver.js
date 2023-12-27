import mongoose from "mongoose";
import Post from "../../module/Post.js";
import { check_auth } from "../../utl/check_auth.js";
import { AuthenticationError } from "apollo-server";

export const post_resolver = {
  Query: {
    // sayHi: () => {
    //   console.log("Hi");
    // },
    async getPosts() {
      try {
        const post = await Post.find().sort({ createdAt: -1 });
        return post;
      } catch (error) {
        throw new Error(err);
      }
    },

    async getOnePost(parent, args) {
      try {
        const post = await Post.findById(args.id);

        if (post) {
          return post;
        } else {
          throw new Error("Post not Found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    async createPost(parent, args, context) {
      try {
        const user = check_auth(context);
        const { body } = args.input;

        console.log("Post Created by the User: ", user);

        const newPost = new Post({
          _id: new mongoose.Types.ObjectId(),
          body,
          username: user.username,
          user: user.id,
        });

        const res = await newPost.save();

        // return post;
        return { ...res._doc, id: res._id };
      } catch (error) {
        console.error("Error on the CreatePost Resolver: ", error);
        throw new Error("Error on the CreatePost Resolver: " + error.message);
      }
    },

    async deletePost(parent, args, context) {
      const user = check_auth(context);
      const postId = args.id;
      try {
        const post = await Post.findById(postId);

        if (user.username === post.username) {
          await post.delete();
          return "Post Deleted Successfully";
        } else {
          throw new AuthenticationError("Action not Allowed");
        }
      } catch (error) {
        console.error("Error on the CreatePost Resolver: ", error);
        throw new Error("Error on the CreatePost Resolver: " + error.message);
      }
    },
  },
};
