const express = require("express");
const ProductModel = require("../models/product.model");
const router = express.Router();
const controller = require("../controllers/product.controller");
const secure = require("../middleware/secure");


//Hämtar alla våra produkter

router.get("/api/product", controller.getAllProducts);

// Hämtar en specifik produkt
router.get("/api/product/:id", controller.getProductById);

//Skapar en produkt
router.post("/api/product", controller.createProduct);

// Uppdaterar en produkt
router.put("/api/product/:id", controller.updateProduct);

//Tar bort en produkt
router.delete("/api/product/:id", controller.deleteProduct);

module.exports = router;
