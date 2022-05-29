const mysql = require('mysql');



const pool = mysql.createPool({
    connectionLimit: "10", // the number of connections node.js will hold open to our database
    password: "",
    user: "root",
    database: "piscokku",
    host: "localhost",
    port: "3306"

});


module.exports = pool;