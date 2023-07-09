const Sale = require('../models/sale');

module.exports.updateSale = async (req, res) => {
    try {
        let saleData = req.body;

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
            const data = {
                "date": result.date,
                "totalAmount": parseInt(saleData.amount) + result.totalAmount,
                "totalProfit": parseInt(saleData.profit) + result.totalProfit,
                "totalCustomer": parseInt(1) + result.totalCustomer
            }

            //updating the sale
            Sale.findOneAndUpdate({
                "date": result.date
            }, data).then(result => {
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
        const skipCount = (pageNumber - 1) * 10;

        // console.log(pageNumber);
        // console.log(skipCount);

        const salesData = await Sale.find({}).skip(skipCount).limit(10).sort({
            "date": -1
        })
        // const salesData = await Sale.find({});

        // console.log(salesData);

        const salesCount = await Sale.countDocuments();

        res.render('sales.ejs', {
            "salesData": salesData,
            "salesCount": salesCount
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

module.exports.filterSales = async (req, res) => {
    try {
        const filterDate = req.params.filterDate;

        // console.log(filterDate);

        const sales = await Sale.find({
            'date': filterDate
        }).lean().sort({
            "date": -1
        });

        // console.log(sales);
        const salesCount = await Sale.countDocuments();

        res.render("sales.ejs", {
            "salesData": sales,
            "salesCount": salesCount
        });

    } catch (error) {
        console.log("Failed to fetch sales");
    }
}