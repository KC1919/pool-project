const Customer = require('../models/customer');
const {
    v4
} = require('uuid');
const Table = require('../models/table');

module.exports.addCustomer = async (req, res) => {
    try {
        const data = req.body;

        //generating unique customer id
        data.cid = v4();

        data.entryTime = new Date(data.date + " " + data.time).getTime();

        if (data.tableNumber.length == 0) data.tableNumber = 0;
        if (data.tableSize.length == 0) data.tableSize = "none";
        if (data.mobile.length == 0) data.mobile = null;

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

        const tableData = await Table.find({});

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

        // const pageNumber = req.params.page;
        // const skipCount = (pageNumber - 1) * 10;


        // const customer = await Customer.find({'date': filterDate}).skip(skipCount).limit(10).sort({
        //     "date": -1,
        //     "time": -1
        // })

        // const customersCount = await Customer.countDocuments();

        const customers = await Customer.find({
            'date': filterDate
        }).lean().sort({
            "date": -1,
            "time": -1
        });

        const customerCount = customers.length;
        // console.log(countCustomer);

        const tableData = await Table.find({});

        // console.log(customers);

        res.render("customer.ejs", {
            "customers": customers,
            "tableData": tableData,
            "customerCount": customerCount
        });

    } catch (error) {
        console.log("Failed to fetch customers");
    }
}

module.exports.deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;

        Customer.findOneAndDelete({
            'cid': customerId
        }).then(result => {
            res.status(200).json({
                'message': "Customer deleted successfully",
                success: true
            })
        }).catch(error => {
            res.status(400).json({
                'message': "Failed to delete customer",
                success: false
            })
        })

    } catch (error) {
        console.log("Failed to delete customer", error);
        res.status(500).json({
            'message': "Failed to delete customer",
            success: false,
            error: error.message
        })
    }
}