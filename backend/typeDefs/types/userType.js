const { gql } = require("apollo-server");

const userType = gql`
  type User {
    id: ID!,
    username: String!,
    email: String!,
    password: String,
    createdAt: String,
    token: String!
  },
  type User2 {
    id: ID!,
    username: String!,
    email: String!,
    password: String,
    createdAt: String,
    token: String!,
    postsData: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  },
  input UpdateInput {
    username: String!
    email: String!
    id: ID
    password: String
  },
  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
  },
  type Mutation {
    login(username: String!, password: String!): User!
    register(registerInput: RegisterInput): User!
    updateUser(updateInput: UpdateInput): User2!
  }
`;

module.exports = {
    userType
};