const db = require("../models/db");

exports.add_product = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        const tokenDecodablePart = token.split(".")[1];
        const decoded = Buffer.from(tokenDecodablePart, "base64").toString();
        var tokendata = JSON.parse(decoded);


        const productname = req.body.product_name;
        const productprice = req.body.product_price;
        const productqty = req.body.product_qty;
        const productseller = tokendata.user.users_name;

        const isproductavail = await db.check_productname(productname)

        if (isproductavail) {
            return res.status(409).json({
                status: 409,
                message: "Product name already exist",
            });
        }

        if (!productname || !productprice || !productqty) {
            return res.status(400).json({
                status: 400, message: "Bad Request"
            });
        }

        await db.add_product(productname, productprice, productqty, productseller)
        return res.status(200).json({
            status: 200, message: "Product Added"
        });


    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
};

exports.update_product = async (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const tokenDecodablePart = token.split(".")[1];
    const decoded = Buffer.from(tokenDecodablePart, "base64").toString();
    var tokendata = JSON.parse(decoded);


    const productname = req.body.product_name;
    const productprice = req.body.product_price;
    const productqty = req.body.product_qty;
    const productseller = tokendata.user.users_name;

    if (productname) {

        //rung mari
        await db.update_product_name(productname);
    }
    if (productprice) {
        await db.update_product_price(productprice);
    }
    if (productqty) {
        await db.update_product_price(productqty);
    }


};