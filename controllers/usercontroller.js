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

exports.update_qty = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        const tokenDecodablePart = token.split(".")[1];
        const decoded = Buffer.from(tokenDecodablePart, "base64").toString();
        var tokendata = JSON.parse(decoded);

        const productname = req.body.product_name;
        const productqty = req.body.product_qty;
        const productseller = tokendata.user.users_name;

        if (!productqty || !productname) {
            return res.sendStatus(400);
        }

        await db.update_qty(productname, productqty, productseller);
        return res.status(200).json({
            status: 200, message: "Product Qty updated"
        });

    } catch (e) {
        res.status(409).json(
            {
                status: 409,
                message: "Failed to update qty",
            }
        )
    }
};

exports.update_price = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        const tokenDecodablePart = token.split(".")[1];
        const decoded = Buffer.from(tokenDecodablePart, "base64").toString();
        var tokendata = JSON.parse(decoded);

        const productname = req.body.product_name;
        const productprice = req.body.product_price;
        const productseller = tokendata.user.users_name;

        if (!productprice || !productname) {
            return res.sendStatus(400);
        }

        await db.update_price(productname, productprice, productseller);
        return res.status(200).json({
            status: 200, message: "Product Qty updated"
        });

    } catch (e) {
        res.status(409).json(
            {
                status: 409,
                message: "Failed to update qty",
            }
        )
    }
};

exports.search_product = async (req, res, next) => {
    try {
        const searchterm = req.body.search;

        if (!searchterm) {
            return res.sendStatus(400);
        }

        const product = await db.search_product(searchterm)

        res.json({
            Product: product
        });

    } catch (e) {
        res.status(404).json(
            {
                status: 404,
                message: "Product not found",
            }
        )
    }
};