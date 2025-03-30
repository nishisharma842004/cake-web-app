// const mongoose = require("mongoose");

// const contactSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: Number,
//     min: 1,
//     max: 5,
//     default: 3, // optional, can be removed if not needed
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("Contact", contactSchema);




import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    rating: {
      type: Number,
      min: [1, "Minimum rating is 1"],
      max: [5, "Maximum rating is 5"],
      default: 3,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
