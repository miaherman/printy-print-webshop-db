const express = require("express");
const ProductModel = require("../models/product.model");
const router = express.Router();

//Hämtar alla våra produkter
router.get("/api/product", async (req, res) => {
  const docs = await ProductModel.find({});
  res.status(200).json(docs);
});

// Hämtar en specifik produkt
router.get("/api/product/:id", async (req, res) => {
  const docs = await ProductModel.find({});
  res.status(200).json(docs);
});

//Skapar en produkt
router.post("/api/product", async (req, res) => {
  const newProduct = new ProductModel({
    title: req.body.title,
    description: req.body.description,
    size: req.body.size,
    price: req.body.price,
    image: req.body.image,
    path: req.body.path,
    category: req.body.category,
    stock: req.body.stock
  });

  if (newProduct) {
    const doc = await ProductModel.create(newProduct);
    return res.status(201).json(doc);
  } else {
    return res.status(404).json("FEL FEL FEL");
  }
});

// Uppdaterar en produkt
router.put("/api/product/:id", async (req, res) => {
  const doc = await ProductModel.findOne({ _id: req.params.id });

  const updatedProduct = new ProductModel(Object.assign(doc, req.body));
  await updatedProduct.save();
  res.json("Product updated");
});

//Tar bort en produkt
router.delete("/api/product/:id", async (req, res) => {
  const doc = await ProductModel.findOne({ _id: req.params.id });

  if (doc) {
    await doc.remove();
    res.status(201).json(doc);
  } else {
    res.status(404).json("Product does not exist");
  }
});

module.exports = router;
