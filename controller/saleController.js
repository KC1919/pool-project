const Expense = require('../models/expense');
const Sale = require('../models/sale');

module.exports.updateSale = async (req, res) => {
    try {
        let saleData = req.body;

        console.log(saleData);

        // console.log(new Date().toLocaleString());
        // console.log(new Date().toLocaleDateString());

        // console.log(Date());
        // console.log(new Date())

        // console.log(saleData);


        const result = await Sale.findOne({
            "date": saleData.date
        });

        //if the current date sale is present in the db
        if (result != null) {

            //then update the sale

            //updated data
            // const data = {
            //     "date": result.date,
            //     "totalAmount": parseInt(saleData.amount) + result.totalAmount,
            //     "totalProfit": parseInt(saleData.profit) + result.totalProfit,
            //     "totalCustomer": parseInt(1) + result.totalCustomer
            // }

            //updating the sale
            Sale.findOneAndUpdate({
                "date": result.date
            }, {
                $inc: {
                    "orderAmount": saleData.amount,
                    "totalProfit": saleData.profit,
                    "totalCustomer": 1
                }
            }).then(result => {
                if (result != null) {
                    res.status(200).json({
                        message: "Sale updated",
                        success: true
                    });
                } else {
                    res.status(401).json({
                        message: "Failed to update sale",
                        success: false
                    });
                }
            }).catch(error => {
                res.status(401).json({
                    message: "Failed to update sale",
                    success: false,
                    error: error.message
                });
            })

        } else {

            //if sale not present, create the sale with current date

            //details of sale
            const data = {
                "date": new Date().toLocaleDateString(),
                "totalAmount": parseInt(saleData.amount),
                "totalProfit": parseInt(saleData.profit),
                "totalCustomer": parseInt(1)
            }

            const newSale = new Sale(data);

            //saving the sale data in the db
            newSale.save().then(result => {
                if (result != null) {
                    res.status(200).json({
                        message: "Sale updated",
                        success: true
                    });
                } else {
                    res.status(401).json({
                        message: "Failed to update sale",
                        success: false
                    });
                }
            }).catch(error => {
                res.status(401).json({
                    message: "Failed to update sale",
                    success: false,
                    error: error.message
                });
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Failed to update sale, server error",
            success: false
        });
    }
}

module.exports.getSales = async (req, res) => {
    try {

        const pageNumber = req.params.page;
        const skipCount = (pageNumber - 1) * 12;

        // console.log(pageNumber);
        // console.log(skipCount);

        const salesData = await Sale.find({}).skip(skipCount).limit(12).sort({
            "date": -1
        })
        // const salesData = await Sale.find({});

        // console.log(salesData);

        const salesCount = await Sale.countDocuments();

        res.render('sales.ejs', {
            "salesData": salesData,
            "salesCount": salesCount,
            "filterStatus": false
        });

        // res.status(200).json({
        //     "message": "Sales data",
        //     success: true,
        //     "salesData": salesData
        // })
    } catch (error) {
        res.status(500).json({
            "message": "Failed to fetch Sales data",
            success: false,
            "error": error.message
        })
    }
}

// module.exports.filterSales = async (req, res) => {
//     try {
//         const filterDate = req.params.filterDate;

//         // console.log(filterDate);

//         // console.log(new Date(Date.parse(filterDate)).toDateString());

//         const sales = await Sale.find({
//             'date': filterDate
//         }).lean().sort({
//             "date": -1
//         });

//         // console.log(sales);
//         const salesCount = sales.length;

//         res.render("sales.ejs", {
//             "salesData": sales,
//             "salesCount": salesCount
//         });

//     } catch (error) {
//         console.log("Failed to fetch sales, server error", error);
//         res.status(500).json({
//             message: "Failed to fetch sales, server error",
//             success: false,
//             error: error.message
//         })
//     }
// }

module.exports.getExpense = async (req, res) => {
    try {

        const expenseData = await Expense.find({});

        // console.log(expenseData); 

        res.render('expense.ejs', {
            "expenseData": expenseData != null ? expenseData : [],
        });
    } catch (error) {
        console.log("Failed to render expense page, server error", error);
        res.status(500).json({
            'message': "Failed to render expense data, server error",
            error: error.message
        })
    }
}

module.exports.addExpense = async (req, res) => {
    try {

        const {
            date,
            description,
            amount
        } = req.body;

        // console.log(date);
        // const ISODate = date.split('-').reverse().join('-');

        // console.log(ISODate);

        //converting date from string to date object
        const myDate = new Date(date)

        // console.log(myDate);

        const responseData = await Expense.findOne({
            'date': myDate
        });

        if (responseData != null) {
            Expense.updateOne({
                'date': myDate
            }, {
                $push: {
                    'expense': {
                        description,
                        amount
                    }
                },
                $inc: {
                    'totalCost': amount
                }
            }).then(result => {
                // console.log(result);
                res.status(200).json({
                    'message': "Expense updated successfully",
                    success: true
                })
            }).catch(error => {
                console.log("Failed to update expense", error);
                res.status(400).json({
                    'message': "Failed to update expense data",
                    success: false,
                    error: error.message
                })
            })
        } else {
            const dataObject = {
                'date': myDate,
                'expense': {
                    'description': description,
                    'amount': amount
                },
                'totalCost': amount
            }

            Expense.create(dataObject).then(result => {
                // console.log(result);
                res.status(200).json({
                    'message': "Expense added successfully",
                    success: true
                })
            }).catch(error => {
                console.log("Failed to create expense", error);
                res.status(400).json({
                    'message': "Failed to create expense data",
                    success: false,
                    error: error.message
                })
            })
        }

    } catch (error) {
        console.log("Failed to add expense", error);
        res.status(500).json({
            "message": "Failed to add expense, server error",
            success: false,
            error: error.message
        })
    }
}

module.exports.getExpenseByDate = async (req, res) => {
    try {

        const date = req.params.date;

        // const ISODate = date.split('-').reverse().join('-');

        //converting date from string to date object
        const myDate = new Date(date);

        const expenseData = await Expense.findOne({
            'date': myDate
        });

        console.log([expenseData]);

        // console.log(expenseData.expense[0]);

        res.render('expense.ejs', {
            "expenseData": expenseData != null ? [expenseData] : [],
        });
    } catch (error) {
        console.log("Failed to render expense page, server error", error);
        res.status(500).json({
            'message': "Failed to render expense data, server error",
            error: error.message
        })
    }
}

module.exports.filterSaleByDates = async (req, res) => {
    try {
        const startDate = req.params.startDate;
        const endDate = req.params.endDate;

        console.log(startDate);
        console.log(endDate);

        // console.log(new Date(startDate));
        // console.log(new Date(endDate));

        // console.log(new Date(Date.parse(startDate)).toDateString());
        // console.log(new Date(Date.parse(endDate)).toDateString());

        const sales = await Sale.find({
            'date': {
                $gte: startDate,
                $lte: endDate
            }
        })

        let totalOrderAmount = 0;
        let totalTableAmount = 0;
        let totalCustomers = 0;

        // console.log(sales);

        sales.forEach(sale => {
            totalOrderAmount += sale.orderAmount;
            totalTableAmount += sale.tableAmount;
            totalCustomers += sale.totalCustomer;
        })

        const salesData = {
            "totalCustomer": totalCustomers,
            "tableAmount": totalTableAmount,
            "orderAmount": totalOrderAmount,
            "startDate": startDate,
            "endDate": endDate
        }

        // console.log(totalSaleAmount);
        // console.log(totalCustomers);

        // console.log(sales);

        console.log(salesData);
        const salesCount = sales.length;

        res.render("sales.ejs", {
            "salesData": [salesData],
            "salesCount": salesCount,
            "filterStatus": true
        });

    } catch (error) {
        console.log("Failed to fetch sales, server error", error);
        res.status(500).json({
            message: "Failed to fetch sales, server error",
            success: false,
            error: error.message
        })
    }
}