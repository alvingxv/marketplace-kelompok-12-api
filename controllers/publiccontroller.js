const jsonwebtoken = require("jsonwebtoken");
const db = require("../models/db");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

exports.register = async (req, res, next) => {
    try {
        const name = req.body.name;
        const number = req.body.number;
        let password = req.body.password;
        var datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');


        if (!name || !password || !number) {
            return res.sendStatus(400);
        }

        checkname = await db.get_user_by_name(name);
        checknumber = await db.get_user_by_number(number);

        if (checkname || checknumber) {
            return res.status(409).json({
                status: 409,
                message: "name/number has been taken",
            });
        }

        const salt = genSaltSync(10);
        password = hashSync(password, salt);

        const user = await db.insert_user(name, password, number, datetime);

        const jsontoken = jsonwebtoken.sign({
            user: user,
        },
            "inikey", {
            expiresIn: "30m",
        }
        );

        res.status(201).json({
            status: 201,
            message: "User Created"
        });

    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
};

exports.login = async (req, res, next) => {
    try {
        const number = req.body.number;
        const password = req.body.password;
        user = await db.get_user_by_number(number);

        if (!user) {
            return res.status(401).json({
                status: 401,
                message: "Invalid number or password"
            });
        }

        const isValidPassword = compareSync(password, user.users_password);
        if (isValidPassword) {
            user.password = undefined;
            const jsontoken = jsonwebtoken.sign({
                user: user,
            },
                "inikey", {
                expiresIn: "30m",
            }
            );

            res.status(200).json({
                status: 200,
                token: jsontoken
            });
            //return res.redirect('/mainpage') ;
        } else {
            return res.status(401).json({
                status: 401,
                message: "Invalid number or password"
            });
        }
    } catch (e) {
        console.log(e);
    }
};