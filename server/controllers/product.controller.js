const ProductModel = require("../models/product.model");

//Hämtar alla våra produkter
exports.getAllProducts = async (req, res) => {
  const docs = await ProductModel.find({});

  res.status(200).json(docs);
};

//Skapar en produkt
exports.createProduct = async (req, res) => {
  const newProduct = new ProductModel({
    title: req.body.title,
    description: req.body.description,
    size: req.body.size,
    price: req.body.price,
    image: req.body.image,
    path: req.body.path,
    categories: req.body.categories,
    stock: req.body.stock
  });

  if (newProduct) {
    const doc = await ProductModel.create(newProduct);
    return res.status(201).json(doc);
  } else {
    return res.status(404).json("FEL FEL FEL");
  }
};

// Uppdaterar en produkt
exports.updateProduct = async (req, res) => {

  const doc = await ProductModel.findOne({ _id: req.body._id });

  const updatedProduct = new ProductModel(Object.assign(doc, req.body));
  await updatedProduct.save();
  res.json("Product updated");
};

exports.getCategories = async (req, res) => {
  const docs = await ProductModel.find({});
  console.log(docs);
  let allCategories = [];
  
  docs.forEach(d => allCategories.push(...d.categories));

  console.log(allCategories);
  // remove duplicates
  allCategories = new Set(allCategories)

  let allCategoriesArray = Array.from(allCategories)
  console.log(allCategoriesArray)

  res.status(200).json(allCategoriesArray);
};


