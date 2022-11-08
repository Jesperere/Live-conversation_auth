import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './src/graphql/typeDefs';
import { resolvers } from './src/graphql/resolvers/users';

dotenv.config()

const uri = process.env.MONGO_URL
console.log(uri);

const port = process.env.PORT
const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen(port)
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })