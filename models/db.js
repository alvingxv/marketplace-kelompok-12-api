const pool = require('../config/db_config')

let db = {};

db.get_all_user = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users ', (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users);
        });
    });
};


db.get_user_by_name = (name) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE users_name = ?', [name], (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users[0]);
        });
    });
};

db.get_user_by_number = (number) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE users_number = ?', [number], (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users[0]);
        });
    });
};


db.insert_user = (name, password, number, datetime) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users (users_name, users_password, users_number, users_datecreated) VALUES (?, ?, ?, ?)', [name, password, number, datetime], (error, result) => {
            if (error) {
                return reject(error);
            }

            return resolve(result.insertId);
        });
    });
};

db.add_product = (productname, productprice, productqty, productseller) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO product (product_name, product_price, product_qty, product_seller) VALUES (?, ?, ?, ?)', [productname, productprice, productqty, productseller], (error, result) => {
            if (error) {
                return reject(error);
            }

            return resolve();
        });
    });
};

db.check_productname = (productname) => {
    return new Promise((resolve, reject) => {
        let replacement = `'%${productname}%'`;
        let sqlStatement = `SELECT * from  product where product_name LIKE ${replacement}`;
        pool.query(sqlStatement, (error, product) => {
            if (error) {
                return reject(error);
            }
            return resolve(product[0]);
        });
    });
};

db.updateUser = (username, role, email, password, id, nomor_hp) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET username = ?, role= ?, email= ?, password=?, nomor_hp=? WHERE id_user = ?', [username, role, email, password, nomor_hp, id], (error) => {
            if (error) {
                return reject(error);
            }

            return resolve();
        });
    });
};



db.delete_user = (number) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM users WHERE users_number = ?', [number], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
};

db.topupuser = (nominal, userId) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET balance = balance + ? WHERE id_user = ?', [nominal, userId], (error) => {
            if (error) {
                return reject(error);
            }

            return resolve();
        });
    });
};

db.deductpengirim = (nominal, idpengirim) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET balance = balance - ? WHERE id_user = ?', [nominal, idpengirim], (error) => {
            if (error) {
                return reject(error);
            }

            return resolve();
        });
    });
};

db.addpenerima = (nominal, nomortujuan) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET balance = balance + ? WHERE nomor_hp = ?', [nominal, nomortujuan], (error) => {
            if (error) {
                return reject(error);
            }

            return resolve();
        });
    });
};





module.exports = db