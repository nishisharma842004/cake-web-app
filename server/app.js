// import express, { urlencoded } from "express";
// import dotenv from "dotenv";
// import { errorMiddleware } from "./middlewares/errorMiddleware.js";
// import cors from "cors";

// const app = express();
// export default app;

// dotenv.config({
//   path: "./config/config.env",
// });

// // ✅ CORS Middleware - Allow All Origins
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
//     allowedHeaders: ["Content-Type", "Authorization"], 
//     credentials: true, 
//   })
// );

// // app.use((req, res, next) => {
// //   res.setHeader(
// //     "Access-Control-Allow-Origin",
// //     "https://vishucakeshop.netlify.app"
// //   );

// //   res.setHeader(
// //     "Access-Control-Allow-Methods",
// //     "GET, POST, PUT, DELETE, OPTIONS"
// //   );

// //   next();
// // });

// // app.use(
// //   cors({ credentials: true, origin: "https://vishucakeshop.netlify.app" })
// // );

// app.use(express.json());
// app.use(
//   urlencoded({
//     extended: true,
//   })
// );

// app.set("trust proxy");

// // Importing Routes
// import userRoute from "./routes/userRoute.js";
// import orderRoute from "./routes/ordersRoute.js";
// import getMyOrdersRoute from "./routes/ordersRoute.js";
// import getOrderDetailsRoute from "./routes/ordersRoute.js";

// app.use("/api/v1", userRoute);
// app.use("/api/v1", orderRoute);
// app.use("/api/v1", getMyOrdersRoute);
// app.use("/api/v1", getOrderDetailsRoute);

// // Using Error Middleware
// app.use(errorMiddleware);




import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

// App Initialization
const app = express();
export default app;

// Load Environment Variables
dotenv.config({ path: "./config/config.env" });

// Enable CORS - Allow all origins or specify origin for production
app.use(
  cors({
    origin: "*", // Replace with frontend URL for production like: "https://yourdomain.com"
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body Parsing Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Trust proxy if deployed behind proxy like Vercel/Netlify
app.set("trust proxy", true);

// Importing Routes
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/ordersRoute.js";

// Mounting Routes
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

// Error Middleware (must be last)
app.use(errorMiddleware);
