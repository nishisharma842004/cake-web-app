import express from "express";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";
import {
  feedBack,
  getAdminOrders,
  getMyOrders,
  getOrderDetails,
  paymentVerifivcation,
  placeOrder,
  placeOrderOnline,
  processOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/createorder", authenticateToken, placeOrder);

router.post("/createorderonline", authenticateToken, placeOrderOnline);

router.post("/paymentverification", authenticateToken, paymentVerifivcation);

router.get("/myorders", authenticateToken, getMyOrders);

router.post("/feedBack", authenticateToken, feedBack);

router.get("/order/:id", authenticateToken, getOrderDetails);

router.get("/admin/orders", authenticateToken, authorizeAdmin, getAdminOrders);

router.get("/admin/order/:id", authenticateToken, authorizeAdmin, processOrder);

export default router;
