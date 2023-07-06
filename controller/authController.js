const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports.register = async (req, res) => {
    try {
        const user = req.body;

        //encrypting user password
        const hashPass = await bcrypt.hash(user.password, 5);

        //making user details object
        const userData = {
            name: user.name,
            email: user.email,
            password: hashPass,
            isAdmin: user.isAdmin ? user.isAdmin : false
        }

        const newUser = new User(userData);

        newUser.save().then(response => {
                res.status(200).json({
                    message: 'User created successfully',
                    success: true
                })
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Failed to create user',
                    success: false,
                    error: error.message
                })
            });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to create user',
            success: false,
            error: error.message
        })
    }
}

module.exports.login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({
            'email': email
        });

        if (user != null) {
            if (bcrypt.compare(password, user.password)) {
                //implement send otp: tentative
                // res.redirect('/customers');

                //generating jwt access token
                const token = jwt.sign({
                    userId: email
                }, process.env.SECRET_KEY)

                //storing the token in cookie and sending it to the user
                res.cookie('secret', token, {
                    maxAge: 86400000,
                    // signed: true
                })

                // res.redirect('/customers');

                // res.status(200).json({
                //     message: 'User logged in successfully',
                //     success: true
                // });

                res.redirect('/customer/allCustomers');

            } else {
                res.status(401).json({
                    message: 'Invalid password',
                    success: false
                });
            }
        } else {
            res.status(401).json({
                message: 'Invalid email',
                success: false
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            success: false,
            error: error.message
        });
    }
}

module.exports.getLogin = async (req, res) => {
    try {
        res.render('login.ejs');
    } catch (error) {
        console.log("Failed to load login page");
    }
}