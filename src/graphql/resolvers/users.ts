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
        throw new ApolloError('A user is already registered with the email' + email, 'USER_ALREADY_EXISTS');
      }
      // Encrypt password
      var encrypedPassword = await bcrypt.hash(password, 10);

      //Build out mongoose model (User)
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encrypedPassword
      })

      const token = jwt.sign(
        { user_id: newUser._id, email },
        "UNSAFE STRING",
        { expiresIn: "2h" }
      );

      newUser.token = token;
      const res = await newUser.save();

      return {
        id: res.id,
        ...res
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      // See if a user exists with the email
      const user = await User.findOne({ email })
      //check if the entered password equals the encrypted password
      if (user && (await bcrypt.compare(password, user.password))) {
        //create a NEW token
        const token = jwt.sign(
          { user_id: user._id, email }, // this was previously newUser._id, not sure which one works.
          "UNSAFE STRING",
          { expiresIn: "2h" }
        );
        //attach token to user model that we found above
        user.token = token

        return {
          id: user.id,
          ...user
        }
      } else {
        // if the user doesnt exist return error
        throw new ApolloError('Incorrect Password', 'INCORRECT_PASSWORD')
      }
    }
  },
  Query: {
    user: (_, { ID }) => User.findById(ID)
  }
}

// module.exports = {
//   Mutation: {
//     async registerUser(_, { registerInput: { username, email, password } }) {
//       // See if an old user exists with email attempting to register
//       const oldUser = await User.findOne({ email });

//       //Throw error if that user exists
//       if (oldUser) {
//         throw new ApolloError('A user is already registered with the email' + email, 'USER_ALREADY_EXISTS');
//       }
//       // Encrypt password
//       var encrypedPassword = await bcrypt.hash(password, 10);

//       //Build out mongoose model (User)
//       const newUser = new User({
//         username: username,
//         email: email.toLowerCase(),
//         password: encrypedPassword
//       })

//       const token = jwt.sign(
//         { user_id: newUser._id, email },
//         "UNSAFE STRING",
//         { expiresIn: "2h" }
//       );

//       newUser.token = token;
//       const res = await newUser.save();

//       return {
//         id: res.id,
//         ...res
//       };
//     },
//   },
//   Query: {
//     user: (_, { ID }) => User.findById(ID)
//   }
// }
