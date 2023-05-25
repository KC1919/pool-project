const Item = require('../models/item');

//adding a new item
module.exports.addItem = async (req, res) => {

    try {

        //item data
        const itemData = req.body;

        const itemPresent = await Item.findOne({
            "name": itemData.name.toUpperCase()
        });

        //if item with same name already exists
        if (itemPresent != null) {

            //if item with same size already exists, then no need to add again

            let sizePresent = false;

            //checking if the item property we are trying to add already exists
            for (let i = 0; i < itemPresent.props.length; i++) {
                if (itemPresent.props[i].size == itemData.size) {
                    sizePresent = true;
                    break;
                }
            }

            if (sizePresent == true) {
                res.json({
                    message: "Item already exists",
                    success: false
                });
            } else {

                //create a properties object for the current item with different size,
                //but with same name

                const itemProps = {
                    "size": itemData.size,
                    "qty": itemData.qty,
                    "sellPrice": itemData.sellPrice,
                    "costPrice": itemData.costPrice,
                }

                //push the props object to the existing array of properties of the item
                itemPresent.props.push(itemProps);

                //update the item properties 
                Item.findOneAndUpdate({
                    "itemId": itemPresent.itemId
                }, itemPresent).then(result => {
                    res.status(200).json({
                        message: "Item added",
                        success: true,
                        result: result
                    });
                }).catch(error => {
                    res.status(401).json({
                        message: "Failed to add Item",
                        success: false,
                        error: error.message
                    });
                });
            }
        } else {

            //item details object
            const itemDetails = {
                name: itemData.name.toUpperCase(),
                props: {
                    size: itemData.size,
                    costPrice: parseInt(itemData.costPrice),
                    sellPrice: parseInt(itemData.sellPrice),
                    qty: parseInt(itemData.qty)
                }
            }

            //creating new item
            const item = new Item(itemDetails);

            //saving the new item in the item collection in database
            item.save().then(result => {
                res.status(200).json({
                    message: "Item added",
                    success: true,
                    result: result
                });
            }).catch(error => {
                res.status(401).json({
                    message: "Failed to add Item",
                    success: false,
                    error: error.message
                });
            })
        }



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
        const itemIds = req.body.itemId;

        if (itemIds.length > 0) {
            //removing the item from the item collection in database
            Item.deleteMany({
                "itemId": {
                    $in: itemIds
                }
            }).then((result) => {
                console.log(result);
                res.status(200).json({
                    message: 'Item removed',
                    success: true,
                    result: result
                });
            }).catch((error) => {
                res.status(401).json({
                    message: 'Failed to remove item',
                    success: false,
                    error: error.message
                });
            });
        } else {
            res.status(400).json({
                "message": "Item not found",
                success: false
            })
        }

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


        const itemUpdate = {
            "name": itemData.name,
            "props": {
                "size": itemData.size,
                "sellPrice": itemData.sellPrice,
                "costPrice": itemData.costPrice,
                "qty": itemData.qty
            }
        }

        await Item.findOneAndUpdate({
            itemId: itemData.itemId
        }, itemUpdate).then((result) => {
            res.status(200).json({
                message: 'Item updated',
                success: true,
                result: result
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