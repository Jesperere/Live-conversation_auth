import mongoose, {Schema} from 'mongoose'

export const userSchema = new Schema({
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String }
})

export const User = mongoose.model('User', userSchema)