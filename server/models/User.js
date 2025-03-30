// import mongoose from "mongoose";

// const schema = new mongoose.Schema({
//   name: String,
//   username: String,
//   password: String,
//   role: {
//     type: String,
//     enum: ["admin", "user"],
//     default: "admin",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export const User = mongoose.model("User", schema);



import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // For password hashing

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false, // hide password from query results
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  specialDates: [
    {
      occasion: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Add a method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
