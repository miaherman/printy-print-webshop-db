const OrderModel = require("../models/order.model");

//Hämtar alla våra ordrar
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
  
  const { customer, delivery, price, products } = req.body

  const newOrder = new OrderModel({
    customer,
    delivery,
    price,
    products,
  });

  if (newOrder) {
    console.log(newOrder);
    const doc = await OrderModel.create(newOrder);
    return res.status(201).json(doc);
  } else {
    return res.status(404).json("FEL FEL FEL");
  }
};

