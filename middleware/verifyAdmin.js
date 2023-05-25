const User = require('../models/user');

const isAdmin = async (req, res, next) => {
    try {

        //fetching the details of logged in user
        const user = await User.findOne({
            "email": req.userId
        }, {
            "isAdmin": 1
        });

        //if logged in user is an admin, then request will process
        if (user.isAdmin === true) {
            next();
        } else { //if not an admin
            res.status(401).json({
                message: "Unauthorized user",
                success: false
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Unauthorized user, server error",
            success: false,
            error: error.message
        });
    }
}

module.exports = isAdmin;