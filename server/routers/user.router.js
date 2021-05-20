const express = require("express");
const UserModel = require("../models/user.model");
const router = express.Router();
const controller = require("../controllers/user.controller"); 

//Hämtar alla våra användare

router.get("/api/user", controller.getAllUsers);

// Hämtar en specifik användare
router.get("/api/user/:id", controller.getUserById);

//Skapar en användare
router.post("/api/user", controller.createUser);

// Uppdaterar en användare
router.put("/api/user/:id", controller.updateUser);

//Tar bort en användare
router.delete("/api/user/:id", controller.deleteUser);

module.exports = router;
