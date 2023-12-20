import { Schema, model } from "mongoose";

const postSchema = new Schema({
  _id: String,
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

// const Post = model<IPost>("Post", postSchema);
export default model("Post", postSchema);
