const express = require('express');
const userRouter = express.Router();

var user_controller = require('../controllers/usercontroller');

userRouter.post('/addproduct', user_controller.add_product);
userRouter.post('/updateqty', user_controller.update_qty);
userRouter.post('/updateprice', user_controller.update_price);
userRouter.post('/searchproduct', user_controller.search_product);

module.exports = userRouter;