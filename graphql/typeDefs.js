// usually this file is named as Schema.js || Schema.config.js

import { gql } from "apollo-server";

export const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
  }

  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    password: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input delPostInput {
    id: ID!
  }
  input createPostInput {
    body: String!
  }
  input createCommnentInput {
    postId: ID!
    body: String!
  }
  input delCommnetInput {
    postId: ID!
    commentId: ID!
  }
  input likePostInput {
    postId: ID!
  }

  type Query {
    # sayHi: String
    getPosts: [Post]
    getOnePost(id: ID!): Post
  }

  type Mutation {
    register(input: RegisterInput): User!
    login(input: LoginInput): User!
    createPost(input: createPostInput): Post!
    deletePost(input: delPostInput): Post!
    createComment(input: createCommnentInput): Post!
    deleteCommnet(input: delCommnetInput): Post!
    likePost(input: likePostInput): Post!
  }

  type Subscription {
    newPost: Post!
  }
`;

// export { typeDefs };
