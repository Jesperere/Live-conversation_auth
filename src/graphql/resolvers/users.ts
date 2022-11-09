import { ApolloError } from "apollo-server";
import { User } from "../../models/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const resolvers = {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      // See if an old user exists with email attempting to register
      const oldUser = await User.findOne({ email });

      //Throw error if that user exists
      if (oldUser) {
        throw new ApolloError('A user is already regsistered with the email' + email, 'USER_ALREADY_EXISTS');
      }
      // Encrypt password
      const salt = await bcrypt.genSalt()
      var encrypedPassword = await bcrypt.hash(password, salt);


      //Build out mongoose model (User)
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encrypedPassword
      })

      const res = await newUser.save();

      return {
        message: "User added"
      };
    },
    
  },
  Query: {
    user: (_, { ID }) => User.findById(ID)
  }
}
