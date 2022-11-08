// import { ApolloServer } from "@apollo/server";
import mongoose from "mongoose"

const MONGO_URL = "mongodb://localhost:27017/"

mongoose.connect(MONGO_URL)