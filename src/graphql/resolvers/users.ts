import { ApolloError } from "apollo-server";
import { User } from "../../models/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secret = "supersecret"

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
      var encryptedPassword = await bcrypt.hash(password, salt);

      //Build out mongoose model (User)
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword
      })

      const res = await newUser.save();
      return {
        message: "User added"
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      //Get user
      const user = await User.findOne({ email });

      //If user doesnt exist - throw error
      if (!user)
        throw new Error("Invalid user");

      //Compare password with encrypted password
      if (!bcrypt.compareSync(password, user.password))
        //if password doesnt match - throw err
        throw new Error("Invalid password");

      //Create JWT
      const token = jwt.sign({
        email: user.email,
        password: user.password
      }, secret, {
        expiresIn: "2h"
      });

      //Return JWT
      console.log(token);
      console.log("User logged in");
      return token
      // return {
      //   message:"user successfully logged in"
      // }
    }
  },
  Query: {
    user: (_, { ID }) => User.findById(ID);
  }
}
