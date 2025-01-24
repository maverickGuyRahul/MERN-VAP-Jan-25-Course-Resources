import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userProfileSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: "Hello, I'm new here!",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('UserProfile', userProfileSchema);
