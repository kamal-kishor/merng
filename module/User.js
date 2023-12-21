import { Schema, model } from "mongoose";

const userSchema = new Schema({
  _id: String,
  email: String,
  token: String,
  username: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  password: String,
});

// module.exports = model("User", userSchema);
export default model("User", userSchema);
