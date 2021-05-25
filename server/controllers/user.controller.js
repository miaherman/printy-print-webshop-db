const CustomerModel = require("../models/customer.model");
const bcrypt = require("bcrypt");

//Hämtar alla våra användare
exports.getAllUsers = async (req, res) => {
  const docs = await CustomerModel.find({});
  res.status(200).json(docs);
};

//Skapar en användare
exports.createUser = async (req, res) => {
  const {
    role,
    firstName,
    lastName,
    address,
    zipCode,
    city,
    email,
    phoneNr,
    password,
  } = req.body;
  console.log(req.body);

  const existinguser = await CustomerModel.findOne({ email: req.body.email });

  //Kollar om användaren existerar
  if (existinguser) {
    return res.status(400).json("Username exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new CustomerModel({
    role,
    firstName,
    lastName,
    address,
    zipCode,
    city,
    email,
    phoneNr,
    password: hashedPassword,
  });
  console.log(newUser);

  //Lägger till användaren i databasen
  const doc = await CustomerModel.create(newUser);
  res.status(201).json(doc);
};

//Loggar in användaren
exports.loginUser = async (req, res) => {
  const user = await CustomerModel.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json("Wrong email or password");
  }
  //Sparar den hämtade användaren i sessionen
  req.session.user = user._id;
  req.session.role = user.role;
  req.session.firstName = user.firstName;
  req.session.lastName = user.lastName;
  req.session.address = user.address;
  req.session.zipCode = user.zipCode;
  req.session.city = user.city;
  req.session.email = user.email;
  req.session.phoneNr = user.phoneNr;
  delete user.password;
  res.status(201).json(user);
};

//Kollar av sessionen mot en specifik användare
exports.authenticate = (req, res) => {
  res.status(200).json({
    _id: req.session.user,
    role: req.session.role,
    firstName: req.session.firstName,
    lastName: req.session.lastName,
    address: req.session.address,
    zipCode: req.session.zipCode,
    city: req.session.city,
    email: req.session.email,
    phoneNr: req.session.phoneNr,
  });
};

// Loggar ut en användare
exports.logoutUser = async (req, res) => {
  if (req.session.user) {
    req.session = null;
    res.json("Byeyeyeyeye");
    return;
  }

  res.status(404).json("No user is logged in");
};
