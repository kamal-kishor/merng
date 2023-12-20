import Post from "../../module/Post.js";

export const post_resolver = {
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
