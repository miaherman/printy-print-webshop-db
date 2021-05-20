const OrderModel = require("../models/order.model");

//Hämtar alla våra produkter
exports.getAllOrders = async (req, res) => {
  const docs = await OrderModel.find({});
  res.status(200).json(docs);
};

// Hämtar en specifik order
exports.getOrderById = async (req, res) => {
  const docs = await OrderModel.find({});
  res.status(200).json(docs);
};

//Skapar en order
exports.createOrder = async (req, res) => {
  const newOrder = new OrderModel({
    title: req.body.title,
    description: req.body.description,
    size: req.body.size,
    price: req.body.price,
    image: req.body.image,
    path: req.body.path,
    category: req.body.category,
    stock: req.body.stock
  });

  if (newOrder) {
    const doc = await OrderModel.create(newOrder);
    return res.status(201).json(doc);
  } else {
    return res.status(404).json("FEL FEL FEL");
  }
};

// Uppdaterar en order 
exports.updateOrder = async (req, res) => {
  const doc = await OrderModel.findOne({ _id: req.params.id });

  const updatedOrder = new OrderModel(Object.assign(doc, req.body));
  await updatedOrder.save();
  res.json("Order updated");
};

//Tar bort en order
exports.deleteOrder = async (req, res) => {
  const doc = await OrderModel.findOne({ _id: req.params.id });

  if (doc) {
    await doc.remove();
    res.status(201).json(doc);
  } else {
    res.status(404).json("Order does not exist");
  }
};
