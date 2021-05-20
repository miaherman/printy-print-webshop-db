const UserModel = require("../models/user.model");

//Hämtar alla våra användare
exports.getAllUsers = async (req, res) => {
    const docs = await UserModel.find({});
    res.status(200).json(docs);
  };
  
  // Hämtar en specifik användare
  exports.getUserById = async (req, res) => {
    const docs = await UserModel.find({});
    res.status(200).json(docs);
  };
  
  //Skapar en användare
  exports.createUser = async (req, res) => {
    // const newUser = new UserModel({
    //   role: req.body.role,
    //   username: req.body.username,
    //   password: req.body.password,
    // });
  
    // if (newUser) {
    //   const doc = await UserModel.create(newUser);
    //   return res.status(201).json(doc);
    // } else {
    //   return res.status(404).json("FEL FEL FEL");
    // }
  };
  
  // Uppdaterar användaruppgifter
  exports.updateUser = async (req, res) => {
    const doc = await UserModel.findOne({ _id: req.params.id });

  const updatedUser = new UserModel(Object.assign(doc, req.body));
  await updatedUser.save();
  res.json("User updated");
  };
  
  //Tar bort en användare
  exports.deleteUser = async (req, res) => {
    const doc = await UserModel.findOne({ _id: req.params.id });

    if (doc) {
      await doc.remove();
      res.status(201).json(doc);
    } else {
      res.status(404).json("User does not exist");
    }
  };
  
  
  