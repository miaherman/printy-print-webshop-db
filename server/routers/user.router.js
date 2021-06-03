const express = require("express");
let UserModel = require("../models/user.model");
const router = express.Router();
const controller = require("../controllers/user.controller"); 
const secure = require("../middleware/secure");

//Skapar en användare
router.post("/api/user/register", controller.createUser);

//Loggar in en användare
router.post("/api/user/login", controller.loginUser);

//Kollar av sessionen mot en specifik användare
router.post('/api/user/authenticate', secure, controller.authenticate);

//Loggar ut en användare
router.delete("/api/user/logout", controller.logoutUser);

module.exports = router;
