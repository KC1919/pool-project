const Table = require('../models/table');

module.exports.addTable = async (req, res) => {
    try {
        const tableData = req.body;

        tableData.price = parseInt(tableData.price)

        const result = await Table.findOne({
            'size': tableData.size
        });

        if (result != null) {
            res.status(400).json({
                message: "Table size already exists",
                success: false
            })
        } else {
            const table = new Table(tableData);

            table.save().then(result => {

                if (result != null) {
                    res.status(200).json({
                        message: "Table added",
                        success: true
                    });
                } else {
                    res.status(400).json({
                        message: "Failed to add table",
                        success: false
                    });
                }
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Failed to add table",
            success: true
        });
    }
}

module.exports.updateTable = async (req, res) => {
    try {
        const tableData = req.body;

        const table = await Table.findOne({
            'size': tableData.size
        });

        if (table != null) {
            Table.updateOne({
                'size': tableData.size
            }, {
                $set: {
                    'price': parseInt(tableData.price)
                }
            }).then(result => {
                if (result) {
                    res.status(200).json({
                        message: 'Table updated',
                        success: true
                    });
                } else {
                    res.status(400).json({
                        message: 'Failed to update table',
                        success: false
                    });
                }
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Failed to update table',
            success: false
        });
    }
}

module.exports.removeTable = async (req, res) => {
    try {
        const tableData = req.body;

        Table.findOneAndRemove({
            'size': tableData.size
        }).then(result => {
            if (result) {
                res.status(200).json({
                    message: 'Table removed',
                    success: true
                });
            } else {
                res.status(400).json({
                    message: 'Failed to remove table',
                    success: false
                });
            }
        })

    } catch (error) {
        res.status(500).json({
            message: 'Failed to remove table',
            success: false
        });
    }
}