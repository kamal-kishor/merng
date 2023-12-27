import { Schema, model } from "mongoose";

const postSchema = new Schema({
  _id: String,
  body: String,
  username: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      body: String,
      username: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: [
    {
      username: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

// const Post = model<IPost>("Post", postSchema);
export default model("Post", postSchema);
