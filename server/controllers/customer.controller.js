// const CustomerModel = require("../models/customer.model");

// //Hämtar alla våra produkter
// exports.getAllCustomers = async (req, res) => {
//   const docs = await CustomerModel.find({});
//   res.status(200).json(docs);
// };

// // Hämtar en specifik Customer
// exports.getCustomerById = async (req, res) => {
//   const docs = await CustomerModel.find({});
//   res.status(200).json(docs);
// };

// //Skapar en Customer
// exports.createCustomer = async (req, res) => {
//   const newCustomer = new CustomerModel({
//     name: req.body.name,
//     address: req.body.address,
//     email: req.body.email,
//     phoneNr: req.body.phoneNr,
//   });

//   if (newCustomer) {
//     const doc = await CustomerModel.create(newCustomer);
//     return res.status(201).json(doc);
//   } else {
//     return res.status(404).json("FEL FEL FEL");
//   }
// };

// // Uppdaterar en Customer 
// exports.updateCustomer = async (req, res) => {
//   const doc = await CustomerModel.findOne({ _id: req.params.id });

//   const updatedCustomer = new CustomerModel(Object.assign(doc, req.body));
//   await updatedCustomer.save();
//   res.json("Customer updated");
// };

// //Tar bort en Customer
// exports.deleteCustomer = async (req, res) => {
//   const doc = await CustomerModel.findOne({ _id: req.params.id });

//   if (doc) {
//     await doc.remove();
//     res.status(201).json(doc);
//   } else {
//     res.status(404).json("Customer does not exist");
//   }
// };
