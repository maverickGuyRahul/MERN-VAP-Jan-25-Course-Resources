import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const { Schema, model } = mongoose;

// 1. Define schema
const userProfileSchema = new Schema({
  user_id: {
    type: Number,
    unique: true,
  },
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

// 2. Apply the AutoIncrement plugin to auto-increment 'user_id'
userProfileSchema.plugin(AutoIncrement, { inc_field: 'user_id' });

// 3. Export Mongoose model
export default model('UserProfile', userProfileSchema);
