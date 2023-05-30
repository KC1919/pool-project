const Membership = require('../models/membership');

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
        const credData = req.body;

        const memship = await Membership.findOne({
            'mobile': credData.mobile
        });

        if (memship != null) {
            Membership.findOneAndUpdate({
                'mobile': credData.mobile
            }, {
                $set: {
                    'credit': memship.credit + parseInt(credData.credit)
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