const express = require("express");
const ProductModel = require("../models/product.model");
const router = express.Router();
const controller = require("../controllers/product.controller");

// Hämtar alla våra produkter
router.get("/api/product", controller.getAllProducts);

// Hämtar alla kategorier
router.get("/api/product/categories", controller.getCategories);

// Skapar en produkt
router.post("/api/product", controller.createProduct);

// Uppdaterar en produkt
router.put("/api/product/:id", controller.updateProduct);

module.exports = router;
