const express = require("express");
const router = express.Router();
const DeliveryModel = require("../models/delivery.model");
const controller = require("../controllers/delivery.controller"); 

//Hämtar alla våra leveranser
router.get("/api/delivery", controller.getAllDeliverys);

//Skapar en leverans
router.post("/api/delivery", controller.createDelivery);


module.exports = router;
