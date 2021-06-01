const express = require("express");
const OrderModel = require("../models/order.model");
const router = express.Router();
const controller = require("../controllers/order.controller"); 

//Hämtar alla våra orders

router.get("/api/order", controller.getAllOrders);

// Hämtar en specifik ordrar
router.get("/api/order/:id", controller.getOrderById);

//Skapar en ordrar
router.post("/api/order", controller.createOrder);

module.exports = router;
