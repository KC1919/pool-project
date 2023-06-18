const Customer = require('../models/customer');

module.exports.addCustomer = async (req, res) => {
    try {
        const data = req.body;

        const count = await Customer.countDocuments();

        data.cid = count + 1;

        // console.log(data);

        data.entryTime = new Date().getTime();

        //creating new customer
        const customer = new Customer(data);

        //saving the customer in the database
        customer.save().then(result => {
            res.status(200).json({
                message: "Customer created",
                success: true,
                result: result
            })
        }).catch(error => {
            res.status(401).json({
                message: "Failed to create customer",
                success: false,
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

module.exports.allCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({}).lean().sort({"cid":-1});

        // console.log(customers);

        res.render("customer.ejs", {
            "customers": customers
        });

    } catch (error) {
        console.log("Failed to fetch customers");
    }
}