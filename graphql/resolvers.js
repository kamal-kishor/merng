// import { Post } from "../module/Post";
// const Post = require("../module/Post.js");
import Post from "../module/Post.js";

export const resolvers = {
  Query: {
    // sayHi: () => {
    //   console.log("Hi");
    // },
    async getPosts() {
      try {
        const post = await Post.find();
        return post;
      } catch (error) {
        throw new Error(err);
      }
    },
  },
};

// export { resolvers };
