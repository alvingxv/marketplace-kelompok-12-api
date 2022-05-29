const express = require("express");
const api = express.Router();
const adminRouter = require("./admin");
const userRouter = require("./user");
var public_controller = require('../controllers/publiccontroller');
const { verifyToken, verifyTokenAdmin } = require("../middleware/auth_helper")

api.post('/register', public_controller.register);
api.post('/login', public_controller.login);

api.use("/admin", verifyTokenAdmin, adminRouter);
api.use("/user", verifyToken, userRouter);

module.exports = api;