import mongoose from 'mongoose';

// Define the Feedback schema
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Trims whitespace around the string
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Ensures the email is stored in lowercase
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Validates email format
  },
  message: {
    type: String,
    required: true,
    trim: true, // Trims whitespace around the string
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Rating can't be less than 1
    max: 5, // Rating can't be greater than 5
  },
  item: {
    type: String,
    required: true, // Makes the item a required field
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation time
  },
});

// Create and export the model
export const Feedback = mongoose.model('Feedback', feedbackSchema);
