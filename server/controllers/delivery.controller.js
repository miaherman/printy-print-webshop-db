const DeliveryModel = require("../models/delivery.model");

//Hämtar alla våra leveranssätt
exports.getAllDeliverys = async (req, res) => {
  const docs = await DeliveryModel.find({});
  res.status(200).json(docs);
};

// Hämtar en specifik leverans
// exports.getDeliveryById = async (req, res) => {
//   const docs = await DeliveryModel.find({});
//   res.status(200).json(docs);
// };

//Skapar ett leveranssätt
exports.createDelivery = async (req, res) => {
  const newDelivery = new DeliveryModel({
    shippingMethod: req.body.shippingMethod,
    time: req.body.time,
    price: req.body.price,
  });

  if (newDelivery) {
    const doc = await DeliveryModel.create(newDelivery);
    return res.status(201).json(doc);
  } else {
    return res.status(404).json("FEL FEL FEL");
  }
};


