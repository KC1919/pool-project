const Customer = require('../models/customer');

module.exports.addCustomer = async (req, res) => {
    try {
        const data = req.body;

        const customer = new Customer(data);

        customer.save().then(result => {
            res.status(200).json({
                message: "Customer created",
                success: true,
                result: result
            })
        }).catch(error => {
            res.status(401).json({
                message: "Failed to create customer",
                success: true,
                error: error.message
            })
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to create customer, server error",
            success: false,
            error: error.message
        })
    }
}