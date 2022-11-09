import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

export const typeDefs = `#graphql

  type User {
    username: String
    email: String
    password: String
    color: String
    # token: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Query {
    user(id: ID!): User
  }

  type Message {
    message: String
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): Message
    loginUser(loginInput: LoginInput): User
  }
`;