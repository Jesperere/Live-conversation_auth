import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './src/graphql/typeDefs';
import { resolvers } from './src/graphql/resolvers/users';
import { environment } from './src/util/env';


const mongoInit = () =>  mongoose.connect(environment.MONGO_URL)

const apolloInit = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  return server.listen(environment.PORT);
}

export const startServer = async () => {
  await mongoInit();
  console.log("MongoDB Connected");
  
  const apolloState = await apolloInit();
  console.log(`Server running at ${apolloState.url}`);

}
