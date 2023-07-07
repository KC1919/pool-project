const Membership = require('../models/membership');
const Customer = require('../models/customer');

module.exports.addMembership = async (req, res) => {
    try {
        const memshipData = req.body;

        const result = await Membership.findOne({
            'mobile': memshipData.mobile
        });

        if (result != null) {
            res.status(400).json({
                message: 'Membership for the customer already exists',
                success: false
            });
        } else {
            Membership.create(memshipData).then(result => {
                if (result != null) {
                    res.status(200).json({
                        message: "Membership added successfully",
                        success: true
                    });
                } else {
                    res.status(400).json({
                        message: "Failed to add membership",
                        error: error.message,
                        success: false
                    });
                }
            }).catch(error => {
                res.status(400).json({
                    message: "Failed to add membership",
                    error: error.message,
                    success: false
                });
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Failed to add membership, server error",
            error: error.message
        });
    }
}

module.exports.addCredit = async (req, res) => {
    try {
        const credData = req.body.memberData;


        // console.log(credData);

        const memship = await Membership.findOne({
            'mobile': credData.mobile
        });

        if (memship != null) {
            Membership.findOneAndUpdate({
                'mobile': credData.mobile
            }, {
                $inc: {
                    'credit': parseInt(credData.credit)
                }
            }).then(result => {
                if (result != null) {
                    res.status(200).json({
                        message: 'Credit added successfully',
                        success: true
                    })
                } else {
                    res.status(400).json({
                        message: 'Failed to add credit',
                        success: false
                    })
                }
            }).catch(error => {
                res.status(400).json({
                    message: 'Failed to add credit',
                    success: false,
                    error: error.message
                })
            });
        } else {
            res.status(400).json({
                message: 'Membership not found',
                success: false
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Failed to add credit,server error',
            success: false,
            error: error.message
        })
    }
}

module.exports.applyMembership = async (req, res) => {
    try {

        // const data=request.app.get("data");
        // console.log(data);
        const billData = req.body;

        // console.log(billData);

        const memship = await Membership.findOne({
            'mobile': billData.mobile
        });

        // console.log(memship);

        let amountToBePaid = 0;

        if (memship != null) {
            billData.totalAmount = parseInt(billData.totalAmount)
            if (billData.totalAmount < 1000) {
                amountToBePaid = billData.totalAmount;
                return res.status(200).json({
                    "message": "Membership could not appplied, amount is less than 1000!",
                    "success": true,
                    "amountToBePaid": amountToBePaid
                });
            } else if (billData.totalAmount == 1000)
                amountToBePaid = Math.round(0.9 * billData.totalAmount);
            else if (billData.totalAmount > 1000)
                amountToBePaid = Math.round(0.85 * billData.totalAmount);

            // console.log(amountToBePaid);

            await Customer.findOneAndUpdate({
                'cid': billData.cid
            }, {
                $set: {
                    "totalPaidAmount": amountToBePaid
                }
            })

            res.status(200).json({
                "message": "Membership appplied!",
                "success": true,
                "amountToBePaid": amountToBePaid
            });

            // const credRemaining = memship.credit;
            // const totalBill = parseInt(billData.totalAmount);

            // if (credRemaining >= totalBill) {
            //     Membership.findOneAndUpdate({
            //         'mobile': billData.mobile
            //     }, {
            //         $set: {
            //             'credit': credRemaining - totalBill
            //         }
            //     }).then(result => {
            //         if (result != null) {
            //             res.status(200).json({
            //                 message: 'Membership applied',
            //                 success: true
            //             });
            //         } else {
            //             res.status(400).json({
            //                 message: 'Failed to apply Membership',
            //                 success: false,
            //                 error: error.message
            //             });
            //         }
            //     }).catch(error => {
            //         res.status(400).json({
            //             message: 'Failed to apply Membership',
            //             success: false,
            //             error: error.message
            //         });
            //     });
            // } else {
            //     if (credRemaining == 0) {
            //         res.status(200).json({
            //             message: 'No credit!',
            //             success: false
            //         });
            //     }
            // }
        } else {
            res.status(400).json({
                "message": "Membership does not exists!",
                "success": false,
                "amountToBePaid": amountToBePaid
            });
        }

    } catch (error) {
        console.log("Failed to apply Membership, server error", error);
        res.status(500).json({
            message: 'Failed to apply Membership, server error',
            success: false,
            error: error.message,
            "amountToBePaid": 0
        });
    }
}

module.exports.removeMembership = async (req, res) => {
    try {

        const custMobile = req.body.memberId;

        const memship = await Membership.findOne({
            'mobile': custMobile
        });

        if (memship != null) {
            Membership.findOneAndRemove({
                'mobile': custMobile
            }).then(result => {
                if (result != null) {
                    res.status(200).json({
                        message: 'Membership removed successfully',
                        success: true
                    })
                } else {
                    res.status(400).json({
                        message: 'Failed to remove Membership',
                        success: false
                    })
                }
            }).catch(error => {
                res.status(400).json({
                    message: 'Failed to remove Membership',
                    success: false,
                    error: error.message
                })
            })
        } else {
            res.status(400).json({
                message: 'Membership not found',
                success: false
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Failed to remove Membership',
            success: false,
            error: error.message
        })
    }
}

module.exports.getMembership = async (req, res) => {
    try {
        const memberships = await Membership.find({});

        res.render('membership.ejs', {
            "memberships": memberships
        });

    } catch (error) {
        res.status(500).json({
            "message": "Failed to load memberships",
            success: false,
            error: error.message
        });
    }
}