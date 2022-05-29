const express = require('express');
const userRouter = express.Router();

var user_controller = require('../controllers/usercontroller');

userRouter.post('/addproduct', user_controller.add_product);

module.exports = userRouter;