const Customer = require('../models/customer');
const {
    v4
} = require('uuid');
const Table = require('../models/table');

module.exports.addCustomer = async (req, res) => {
    try {
        const data = req.body;

        // console.log(data);

        // const count = await Customer.countDocuments();

        data.cid = v4();

        // console.log(data);

        data.entryTime = new Date().getTime();

        data.time = new Date().toLocaleTimeString('en-GB', {
            timeZone: 'Asia/Kolkata'
        });

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

        const pageNumber = req.params.page;
        const skipCount = (pageNumber - 1) * 10;


        const customer = await Customer.find({}).skip(skipCount).limit(10).sort({
            "date": -1,
            "time": -1
        })

        const customersCount = await Customer.countDocuments();

        // console.log(customersCount);

        // const customers = await Customer.find({}).lean().sort({
        //     "date": -1,
        //     "time": -1
        // });

        // console.log(customers);

        const tableData = await Table.find({});

        // console.log(tableData);

        res.render("customer.ejs", {
            "customers": customer,
            "tableData": tableData,
            "customerCount": customersCount
        });

    } catch (error) {
        console.log("Failed to fetch customers");
    }
}

module.exports.filterCustomers = async (req, res) => {
    try {
        const filterDate = req.params.filterDate;

        // console.log(filterDate);

        const customers = await Customer.find({
            'date': filterDate
        }).lean().sort({
            "date": -1,
            "time": -1
        });

        const tableData = await Table.find({});

        // console.log(customers);

        res.render("customer.ejs", {
            "customers": customers,
            "tableData": tableData
        });

    } catch (error) {
        console.log("Failed to fetch customers");
    }
}