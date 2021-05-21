const DeliveryModel = require("../models/Delivery.model");

//Hämtar alla våra produkter
exports.getAllDeliverys = async (req, res) => {
  const docs = await DeliveryModel.find({});
  res.status(200).json(docs);
};

// Hämtar en specifik produkt
exports.getDeliveryById = async (req, res) => {
  const docs = await DeliveryModel.find({});
  res.status(200).json(docs);
};

//Skapar en produkt
exports.createDelivery = async (req, res) => {
  const newDelivery = new DeliveryModel({
    // title: req.body.title,
    // description: req.body.description,
    // size: req.body.size,
    // price: req.body.price,
    // image: req.body.image,
    // path: req.body.path,
    // category: req.body.category,
    // stock: req.body.stock
  });

  if (newDelivery) {
    const doc = await DeliveryModel.create(newDelivery);
    return res.status(201).json(doc);
  } else {
    return res.status(404).json("FEL FEL FEL");
  }
};

// Uppdaterar en produkt
exports.updateDelivery = async (req, res) => {
  const doc = await DeliveryModel.findOne({ _id: req.params.id });

  const updatedDelivery = new DeliveryModel(Object.assign(doc, req.body));
  await updatedDelivery.save();
  res.json("Delivery updated");
};

//Tar bort en produkt
exports.deleteDelivery = async (req, res) => {
  const doc = await DeliveryModel.findOne({ _id: req.params.id });

  if (doc) {
    await doc.remove();
    res.status(201).json(doc);
  } else {
    res.status(404).json("Delivery does not exist");
  }
};


