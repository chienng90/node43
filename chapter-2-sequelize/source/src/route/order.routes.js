import express from "express";
import { fetchOrderHistory, placeOrder } from "../controller/order.controller.js";

const orderRouter = express.Router();

orderRouter.get("/orders", fetchOrderHistory)
orderRouter.post("/orders", placeOrder)

export default orderRouter