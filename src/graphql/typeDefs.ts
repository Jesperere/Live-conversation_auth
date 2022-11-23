export const typeDefs = `#graphql

  type User {
    alias: String
    email: String
    password: String
    color: String
    token: String
  }

  input RegisterInput {
    email: String
    alias: String
    password: String
    color: String
    confirmPassword: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Message {
    message: String
  }

  type MessageToken {
    message: String
    token: String
    email: String
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): Message
    loginUser(loginInput: LoginInput): MessageToken
  }
`;