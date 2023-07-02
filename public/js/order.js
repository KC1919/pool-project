// const socket = io('/');

// socket.on('completeOrder', data => {
//     console.log(data);
// })

const billPaidElem = document.getElementById('bill-paid-div');

if (paymentStatus == true) {
    for (let i = 0; i < orderData.length; i++) {
        const removeBtn = document.getElementById('remove-btn-' + orderData[i].itemId);
        removeBtn.setAttribute("hidden", "hidden");
    }

    const completeOrderBtn = document.getElementById('complete-order-btn');
    const newOrderBtn = document.getElementById('new-order-btn');

    completeOrderBtn.setAttribute("hidden", "hidden");
    newOrderBtn.setAttribute("hidden", "hidden");

    billPaidElem.style.display = "block";
}

function handleNewOrder(e) {
    try {

        const formDivElem = document.getElementById('new-order-form-div');

        formDivElem.style.display = "block";

    } catch (error) {
        alert("Failed to display new order form");
    }
}

async function customersPage(e) {
    try {
        window.location.href = "http://localhost:3000/customer/allCustomers";
    } catch (error) {
        console.log("Cannot go to customers page");
    }
}

function closeOrderForm(e) {
    try {
        const formDivElem = document.getElementById('new-order-form-div');

        formDivElem.style.display = "none";
    } catch (error) {
        console.log("Failed to close form");
    }
}

function closeCompletePaymentForm(e) {
    try {
        const formDivElem = document.getElementById('complete-order-div');

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

            // console.log(cid);

            const orderData = {
                cid,
                itemId,
                itemQty,
                'amount': itemQty * pricePerItem
            };

            saveOrderToDb(orderData);
        }

    } catch (error) {
        alert("Failed to add customer", error);
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
        alert("Failed to save order to DB")
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

async function completeOrder(e) {
    try {
        // console.log(cid);

        const response = await fetch('http://localhost:3000/order/completeOrder', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "cid": cid
            })
        })

        const jsonResp = await response.json();

        // console.log(jsonResp);

        const orderAmount = jsonResp.billData.orderAmount;
        const tableAmount = jsonResp.billData.tableAmount;
        const totalPayableAmount = jsonResp.billData.totalPayableAmount;

        const completeOrderElem = document.getElementById('complete-order-div');

        // console.log(completeOrderElem);

        for (let i = 0; i < 3; i++) {
            if (i == 0) {
                completeOrderElem.children[i].children[1].innerHTML = tableAmount;
            } else if (i == 1) {
                completeOrderElem.children[i].children[1].innerHTML = orderAmount;
            } else if (i == 2) {
                completeOrderElem.children[i].children[1].innerHTML = totalPayableAmount;
            }
        }

        completeOrderElem.style.display = "block";

    } catch (error) {
        alert('Failed to complete order', error);
    }
}

async function applyMembership(e) {
    try {
        const totalAmountElem = document.getElementById('total-amount-div').children[1];
        const totalAmount = totalAmountElem.innerHTML;
        const mobile = document.getElementById("memship-mobile").value;

        console.log(totalAmount);
        const response = await fetch("http://localhost:3000/membership/applyMembership", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "totalAmount": totalAmount,
                "cid": cid,
                "mobile": mobile
            })
        })

        const jsonResp = await response.json();

        alert(jsonResp.message);

        totalAmountElem.innerHTML = 0;



    } catch (error) {
        alert("Failed to apply membership", error);
    }
}

async function finishOrder(e) {
    try {
        const paymentDiv = document.getElementById('complete-order-div');

        const orderAmount = document.getElementById("order-amount-div").children[1].innerHTML;
        const tableAmount = document.getElementById("table-amount-div").children[1].innerHTML;

        console.log(orderAmount);
        console.log(tableAmount);

        paymentDiv.style.display = "none";

        for (let i = 0; i < orderData.length; i++) {
            const removeBtn = document.getElementById('remove-btn-' + orderData[i].itemId);
            removeBtn.disabled = true;
        }

        const completeOrderBtn = document.getElementById('complete-order-btn');
        const newOrderBtn = document.getElementById('new-order-btn');

        completeOrderBtn.setAttribute("hidden", "hidden");
        newOrderBtn.setAttribute("hidden", "hidden");

        for (let i = 0; i < orderData.length; i++) {
            const removeBtn = document.getElementById('remove-btn-' + orderData[i].itemId);
            removeBtn.setAttribute("hidden", "hidden");
        }

        billPaidElem.innerHTML = `Bill Paid : <strong>Rs.  ${parseInt(orderAmount) + parseInt(tableAmount)}</strong>`;
        billPaidElem.style.display = "block";

        const response = await fetch("http://localhost:3000/order/finishOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "paymentStatus": true,
                "cid": cid
            })
        })

    } catch (error) {
        alert("Failed to finish payment" + error);
    }
}