function handleNewOrder(e) {
    try {

        const formDivElem = document.getElementById('new-order-form-div');

        formDivElem.style.display = "block";

    } catch (error) {
        console.log("Failed to display form");
    }
}

async function customersPage(e) {
    try {
        window.location.href = "http://localhost:3000/customer/allCustomers";
    } catch (error) {
        console.log("Cannot go to customers page");
    }
}

function closeForm(e) {
    try {
        const formDivElem = document.getElementById('new-order-form-div');

        formDivElem.style.display = "none";
    } catch (error) {
        console.log("Failed to close form");
    }
}

async function placeOrder(e) {
    try {
        e.preventDefault();

        const orderForm = document.getElementById('new-order-form');

        //new order data
        const item = document.getElementById("select-item");
        const itemName = item.value;
        const itemId = item.options[item.selectedIndex].id;
        const itemQty = document.getElementById("item-qty").value;

        let pricePerItem;
        let totalQty;
        for (let i = 0; i < items.length; i++) {
            if (items[i].itemId == itemId) {
                pricePerItem = items[i].sellPrice;
                totalQty = items[i].qty;
                break;
            }
        }

        if (totalQty < itemQty) {
            alert("Insufficient Stock for the selected item");
        } else {
            orderForm.reset();
            // closeForm(null);

            //creating new row with customer data
            const tableBody = document.getElementById('table-body');

            const newTableRow = document.createElement('tr');
            newTableRow.setAttribute("class", "table-row");

            // const th = document.createElement('th');

            // if (tableBody.children.length == 0) {
            //     th.innerHTML = "1"
            // } else {
            //     const val = tableBody.children.length;
            //     const oid = parseInt(val) + 1;
            //     th.innerHTML = oid;
            // }

            // newTableRow.appendChild(th);

            for (let i = 0; i <= 3; i++) {
                const td = document.createElement('td');

                if (i == 0)
                    td.innerHTML = itemName;
                else if (i == 1)
                    td.innerHTML = pricePerItem;
                else if (i == 2)
                    td.innerHTML = itemQty;
                else if (i == 3)
                    td.innerHTML = itemQty * pricePerItem;

                newTableRow.appendChild(td);
            }

            const removeBtn = document.createElement('button');
            removeBtn.setAttribute('class', 'remove-btn');
            removeBtn.addEventListener('click', removeItem);
            removeBtn.setAttribute('id', itemId);
            removeBtn.innerHTML = "remove";

            const td = document.createElement('td');
            td.appendChild(removeBtn);
            newTableRow.append(td);

            newTableRow.setAttribute('id', 'table-row-' + itemId);

            tableBody.appendChild(newTableRow);

            console.log(cid);

            const orderData = {
                cid,
                itemId,
                itemQty,
                'amount': itemQty * pricePerItem
            };

            saveOrderToDb(orderData);
        }

    } catch (error) {
        console.log("Failed to add customer", error);
    }
}

async function saveOrderToDb(orderData) {
    try {
        const response = await fetch('http://localhost:3000/order/orderItem', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData)
        })

        const json = await response.json();

        console.log(json);

    } catch (error) {

    }
}

async function removeItem(e) {
    try {

        const rowId = e.target.id;
        const rowElem = document.getElementById('table-row-' + rowId);
        const itemQty = rowElem.cells[2].innerHTML;
        rowElem.remove();


        removeItemFromDb(rowId, itemQty);

    } catch (error) {
        console.log('Failed to remove item', error);
    }
}

async function removeItemFromDb(itemId, itemQty) {
    try {
        const response = await fetch('http://localhost:3000/order/removeItem', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "itemId": itemId,
                "itemQty": itemQty
            })
        })

        const json = await response.json();

        console.log(json);
    } catch (error) {
        console.log("Failed to remove item from order");
    }
}