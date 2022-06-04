require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('../routes/api');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Selamat Datang di Api PISCOKKU",
        daftarEndpoint: [
            "/api/login",
            "/api/register",
            "/api/searchproduct",
            "/api/admin (get)",
            "/api/user/profile",
            "/api/user/addproduct",
            "/api/user/updateproduct",
            "/api/user/getallproduct",
            "/api/user/buy",
            "/api/user/pay",
            "/api/user/sellerconfirm",
            "/api/user/buyerconfirm",
            "/api/user/myorder"
        ],
    });
});

app.use('/api', api)

app.listen(PORT, () => {
    console.log(`server is listening  on ${PORT}`);
});

module.exports = app;