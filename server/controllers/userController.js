// import { User } from "../models/User.js";
// import { Order } from "../models/Order.js";
// import { Contact } from "../models/Contact.js";
// import { asyncError } from "../middlewares/errorMiddleware.js";
// import jwt from "jsonwebtoken";

// export const myProfile = (req, res, next) => {
//   res.status(200).json({ success: true, user: req.user });
// };

// // Register a new user
// export const registerUser = asyncError(async (req, res, next) => {
//   const { name, username, password, role } = req.body;
//   const user = new User({ name, username, password, role });

//   await user.save();

//   const token = jwt.sign({ username, role }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });

//   res.status(201).json({ message: "User registered successfully", token });
// });

// export const loginUser = asyncError(async (req, res, next) => {
//   const { username, password } = req.body;
//   console.log(username  , password);
//   const user = await User.findOne({ username, password });
//   if (!user) {
//     res.json({ message: "User not found" });
//   } else {
//     const token = jwt.sign(
//       {
//         name: user.name,
//         username: user.username,
//         id: user._id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1hr" }
//     );

//     res.json({ message: "User Logged In", token });
//   }
// });

// // Admin Routes
// export const getAdminUsers = asyncError(async (req, res, next) => {
//   const users = await User.find({});

//   res.status(200).json({
//     success: true,
//     users,
//   });
// });

// export const getAdminStats = asyncError(async (req, res, next) => {
//   const usersCount = await User.countDocuments();

//   const orders = await Order.find({});

//   const preparingOrder = orders.filter((i) => i.orderStatus === "Preparing");
//   const shippedOrder = orders.filter((i) => i.orderStatus === "Shipped");
//   const deliveredOrder = orders.filter((i) => i.orderStatus === "Delivered");

//   let totalIncome = 0;

//   orders.forEach((i) => {
//     totalIncome += i.totalAmount;
//   });

//   res.status(200).json({
//     success: true,
//     usersCount,
//     ordersCount: {
//       total: orders.length,
//       preparing: preparingOrder.length,
//       shipped: shippedOrder.length,
//       delivered: deliveredOrder.length,
//     },
//     totalIncome,
//   });
// });

// export const contactForm = asyncError(async (req, res, next) => {
//   const { name, email, message } = req.body;

//   const formDetails = new Contact({name, email, message});
//   await formDetails.save();

//   res.status(200).json({ success: true, message: "Message sent Successfully" });
// });

// export const adminForm = asyncError(async (req, res, next) => {
//   const messages = await Contact.find({});
//   res.status(200).json({
//     success: true,
//     messages,
//   });
// });




import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
import { Contact } from "../models/Contact.js";
import { asyncError } from "../middlewares/errorMiddleware.js";
import jwt from "jsonwebtoken";

// 👤 User Profile (Authenticated)
export const myProfile = (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
};

// 📝 Register New User
export const registerUser = asyncError(async (req, res, next) => {
  const { name, username, password, role, specialDates } = req.body;

  // Check for existing user
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Username already exists" });
  }

  const user = new User({ name, username, password, role, specialDates });
  await user.save();

  const token = jwt.sign({ username, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).json({ success: true, message: "User registered successfully", token });
});

// 🔐 Login User
export const loginUser = asyncError(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      name: user.name,
      username: user.username,
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ success: true, message: "User logged in", token });
});

// 👨‍💼 Admin: Get All Users
export const getAdminUsers = asyncError(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ success: true, users });
});

// 📊 Admin: Get Stats
export const getAdminStats = asyncError(async (req, res, next) => {
  const usersCount = await User.countDocuments();
  const orders = await Order.find({});

  const preparingOrder = orders.filter((i) => i.orderStatus === "Preparing");
  const shippedOrder = orders.filter((i) => i.orderStatus === "Shipped");
  const deliveredOrder = orders.filter((i) => i.orderStatus === "Delivered");

  const totalIncome = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  res.status(200).json({
    success: true,
    usersCount,
    ordersCount: {
      total: orders.length,
      preparing: preparingOrder.length,
      shipped: shippedOrder.length,
      delivered: deliveredOrder.length,
    },
    totalIncome,
  });
});

// 📩 User: Contact/Feedback Form
export const contactForm = asyncError(async (req, res, next) => {
  const { name, email, message, rating } = req.body;

  const formDetails = new Contact({ name, email, message, rating });
  await formDetails.save();

  res.status(200).json({ success: true, message: "Message sent successfully" });
});

// 👨‍💼 Admin: View All Contact Messages
export const adminForm = asyncError(async (req, res, next) => {
  const messages = await Contact.find({}).sort({ createdAt: -1 });
  res.status(200).json({ success: true, messages });
});

// 🎉 Save Special Date
export const saveSpecialDate = asyncError(async (req, res, next) => {
  const { occasion, date, description } = req.body;
  const userId = req.user.id;
  const user = await User.findById(userId);
  user.specialDates.push({ occasion, date, description });
  await user.save();

  res.status(200).json({ success: true, message: "Special date saved!" });
});
