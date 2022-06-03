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
        message: "Haloooooo, buka https://gist.github.com/alvingxv/e716f6b922974c2fafe54e2c3cc22b6f buat dokumentasi yaaaa :D"
    });
});

app.use('/api', api)

app.listen(PORT, () => {
    console.log(`server is listening  on ${PORT}`);
});

module.exports = app;