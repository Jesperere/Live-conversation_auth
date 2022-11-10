import mongoose, { Schema } from 'mongoose'

export const userSchema = new Schema({
    alias: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    // color: { type: String },
    token: { type: String }
})

export const User = mongoose.model('User', userSchema)