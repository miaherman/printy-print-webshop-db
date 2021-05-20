const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");


//Hämtar alla våra användare
exports.getAllUsers = async (req, res) => {
    const docs = await UserModel.find({});
    res.status(200).json(docs);
  };
  
  //Skapar en användare
  exports.createUser = async (req, res) => {

    const { role, username, password } = req.body;

    const existinguser = await UserModel.findOne({ username: req.body.username });

    //Kollar om användaren existerar
    if(existinguser) {
        return res.status(400).json("Username exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({role, username, password: hashedPassword})

    //Lägger till användaren i databasen
    const doc = await UserModel.create(newUser);
    res.status(201).json(doc);
  };

  //Loggar in användaren
exports.loginUser = async (req, res) => {

  const user = await UserModel.findOne({ username: req.body.username }).select('+password')

  if (!user || (!await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json("Wrong username or password");
  }
  //Sparar den hämtade användaren i sessionen
  req.session.user = user._id
  req.session.username = user.username
  delete user.password
  res.status(201).json(user);  
};
  
//Kollar av sessionen mot en specifik användare
exports.authenticate = (req, res) => {
  res.status(200).json({
      _id: req.session.user,
      username: req.session.username
  })
}

// Loggar ut en användare
  exports.logoutUser = async (req, res) => {
    if (req.session.user) {
      req.session = null;
      res.json('Byeyeyeyeye');
      return
  }

  res.status(404).json('No user is logged in');
  };
  
  
  