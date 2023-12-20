// usually this file is named as Schema.js || Schema.config.js

import { gql } from "apollo-server";

export const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    # sayHi: String
    getPosts: [Post]
  }

  type Mutation {
    register(input: RegisterInput!): User
  }
`;

// export { typeDefs };