const Customer = require('../models/customer');
const Table = require('../models/table');
const Item = require('../models/item');

module.exports.getCustomerOrder = async (req, res) => {
    try {

        //extracting customer id from the request parameter
        const cid = req.params.cid;

        //fetching customer order details using the "customer id" from the db
        const customer = await Customer.findOne({
            'cid': cid
        });

        let items = [];

        const customerOrder = customer.order;

        customerOrder.forEach(async item => {
            items.push(item.itemId);
        })

        // console.log(customerOrder);

        // console.log(items);

        const itemData = await Item.find({
            "itemId": {
                $in: items
            }
        }, {
            "_id": 0,
            "name": 1,
            "costPrice": 1,
            "sellPrice": 1,
            "itemId": 1
        })

        console.log(itemData);

        console.log(customerOrder);

        res.render('order.ejs', {
            'orderData': customerOrder
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Order not found, server error",
            error: error.message
        });
    }
}

module.exports.addToOrder = async (req, res) => {
    try {

        const cid = req.body.cid;

        const orderDetails = {
            "itemId": req.body.itemId,
            "qty": parseInt(req.body.qty),
            "amount": parseInt(req.body.amount)
        }

        //fetching the customer details
        const customer = await Customer.findOne({
            'cid': cid
        });

        //if customer doen not have any existing order, then add the order
        if (customer.order.length == 0) {

            //adding the order to the customer
            Customer.findOneAndUpdate({
                'cid': cid
            }, {
                $push: {
                    'order': orderDetails
                }
            }).then(result => {
                if (result != null) {
                    res.status(200).json({
                        message: "Order updated",
                        success: true
                    });
                } else {
                    res.status(401).json({
                        message: "Failed to update order",
                        success: false
                    });
                }
            }).catch(error => {
                res.status(401).json({
                    message: "Failed to update order",
                    success: false,
                    error: error.message
                });
            })
        } else {

            const customerOrder = customer.order;

            let present; //to check the status if the item already exists in customer orders
            let presentItem; //to store the item which already exists and has to be updated

            //searching if the item that is to be updated is already present in the ordere list of customer
            for (let i = 0; i < customerOrder.length; i++) {
                let item = customerOrder[i];

                //if present stop searching further, break from the loop
                if (item.itemId == orderDetails.itemId) {
                    present = true;
                    presentItem = item;
                    break;
                }
            }

            //item present
            if (present) {

                //item details object with updated details
                const updateItem = {
                    "itemId": orderDetails.itemId,
                    "qty": orderDetails.qty + presentItem.qty,
                    "amount": orderDetails.amount + presentItem.amount
                }

                // console.log(updateItem);

                //updating the item in the orders list of the customer
                Customer.updateOne({
                    'cid': cid,
                    "order.itemId": orderDetails.itemId
                }, {
                    $set: {
                        "order.$.qty": updateItem.qty,
                        "order.$.amount": updateItem.amount
                    }
                }).then(result => {

                    if (result.modifiedCount != 0) {
                        res.status(200).json({
                            message: "Order updated",
                            success: true
                        });
                    } else {
                        res.status(401).json({
                            message: "Failed to update order",
                            success: false
                        });
                    }
                }).catch(error => {
                    res.status(401).json({
                        message: "Failed to update order",
                        success: false,
                        error: error.message
                    });
                });
            } else { //if item is not present

                //then add the item to the order list of the customer
                Customer.findOneAndUpdate({
                    'cid': cid
                }, {
                    $push: {
                        'order': orderDetails
                    }
                }).then(result => {
                    if (result != null) {
                        res.status(200).json({
                            message: "Order updated",
                            success: true
                        });
                    } else {
                        res.status(401).json({
                            message: "Failed to update order",
                            success: false
                        });
                    }
                }).catch(error => {
                    res.status(401).json({
                        message: "Failed to update order",
                        success: false,
                        error: error.message
                    });
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            message: "Failed to update order, server error",
            success: false,
            error: error.message
        });
    }
}

module.exports.completeOrder = async (req, res) => {
    try {

        // console.log(new Date().getTime());

        const date = new Date();

        //data received from frontend, order amount and customer id
        const data = req.body;

        //calculating exit time
        const exitTime = date.getTime();


        //human readable format for end time
        const endTime = date.toLocaleTimeString();

        // console.log(endTime);


        //fetching customer details
        const customer = await Customer.findOne({
            'cid': data.cid
        }, {
            'tableSize': 1,
            'entryTime': 1
        });

        //calculating time duration played
        const timeDiff = parseInt(exitTime) - parseInt(customer.entryTime);

        let tableAmount = 0;


        //fetching price for table size
        const tableAmountPerHour = await Table.findOne({
            'size': customer.tableSize
        }, {
            'price': 1
        });

        //calculating hours
        const timeRatio = timeDiff / (60 * 60 * 1000);

        //calculating price for the time duration played
        tableAmount = Math.round(tableAmountPerHour.price * timeRatio);

        //total amount = tableAmount + orderAmount
        const totalAmount = tableAmount + parseInt(data.amount);

        // console.log(totalAmount);

        //updating total amount and exit time for customer
        await Customer.findOneAndUpdate({
            'cid': data.cid
        }, {
            $set: {
                'totalAmount': totalAmount,
                'exitTime': endTime
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to complete order, server error",
            success: false,
            error: error.message
        });
    }
}