const mongoose = require('mongoose');
const Item = require('../models/item');

//adding a new item
module.exports.addItem = async (req, res) => {

    try {

        //item data
        const itemData = req.body;

        //item details object
        const item = new Item({
            name: itemData.name,
            price: parseInt(itemData.price),
            qty: parseInt(itemData.qty)
        })

        //saving the new item in the item collection in database
        item.save().then(result => {
            res.status(200).json({
                message: "Item added",
                success: true
            });
        }).catch(error => {
            res.status(401).json({
                message: "Failed to add Item",
                success: false,
                error: error.message
            });
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to add Item, server error",
            success: false,
            error: error.message
        });
    }
}

module.exports.removeItem = async (req, res) => {
    try {

        //item id to be removed
        const itemId = req.params.id;

        //removing the item from the item collection in database
        Item.findOneAndDelete({
            'itemId': itemId
        }).then((result) => {
            // console.log(result);
            res.status(200).json({
                message: 'Item removed',
                success: true
            });
        }).catch((error) => {
            res.status(401).json({
                message: 'Failed to remove item',
                success: false,
                error: error.message
            });
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to remove item, server error',
            success: false,
            error: error.message
        });
    }
}

module.exports.updateItem = async (req, res) => {
    try {
        const itemData = req.body;

        await Item.findOneAndUpdate({
            itemId: itemData.itemId
        }, itemData).then((result) => {
            // console.log(result);
            res.status(200).json({
                message: 'Item updated',
                success: true
            });
        }).catch((error) => {
            res.status(401).json({
                message: 'Failed to update item',
                success: false,
                error: error.message
            });
        });

    } catch (error) {
        res.status(401).json({
            message: 'Failed to update item, server error',
            success: false,
            error: error.message
        });
    }
}