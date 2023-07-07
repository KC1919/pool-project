const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies['secret'];
        const payload = jwt.verify(token, process.env.SECRET_KEY);

        req.userId = payload.userId;

        next();

    } catch (error) {

        console.log('Unauthorized request, server error');

        res.redirect('/')
        // res.status(500).json({
        //     'message': 'Unauthorized request, server error',
        //     success: false,
        //     error: error.message
        // });
    }
}


module.exports = verifyUser;