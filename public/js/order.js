// const socket = io('/');

// socket.on('completeOrder', data => {
//     console.log(data);
// })

let paymentMode = "Online";

const billPaidElem = document.getElementById('bill-paid-div');
const paymentMethodElem = document.getElementById('payment-method-div');

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
    paymentMethodElem.style.display = "block";
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
        window.location.href = "/customer/allCustomers";
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
        console.log(formDivElem);
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
                    td.innerHTML = itemQty;
                else if (i == 2)
                    td.innerHTML = pricePerItem;
                else if (i == 3)
                    td.innerHTML = itemQty * pricePerItem;

                newTableRow.appendChild(td);
            }

            const removeBtn = document.createElement('button');
            removeBtn.setAttribute('class', 'remove-btn');
            removeBtn.addEventListener('click', removeItem);
            removeBtn.setAttribute('id', 'remove-btn-' + itemId);
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
        console.log("Failed to add order", error.message);
        alert("Failed to add order", error);
    }
}

async function saveOrderToDb(orderData) {
    try {
        const response = await fetch('/order/orderItem', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData)
        })

        const json = await response.json();

        // console.log(json);/
        window.location.reload();

    } catch (error) {
        alert("Failed to save order to DB")
    }
}

async function removeItem(e) {
    try {

        // const confirmDelete = confirm('Are you sure to remove an item?');
        // console.log(confirmDelete);
        // if (confirmDelete == true) {
        const rowId = e.target.id.split('-')[2];
        // console.log(rowId);
        const rowElem = document.getElementById('table-row-' + rowId);
        // console.log(rowElem);
        const itemQty = rowElem.cells[1].innerHTML;
        rowElem.remove();

        // console.log(itemQty);

        removeItemFromDb(rowId, itemQty);
        // }


    } catch (error) {
        console.log('Failed to remove item', error);
    }
}

async function removeItemFromDb(itemId, itemQty) {
    try {

        // console.log(itemId, itemQty);

        // console.log(cid);
        const response = await fetch('/order/removeItem', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "itemId": itemId,
                "itemQty": itemQty,
                "cid": cid
            })
        })

        const jsonResp = await response.json();
        alert(jsonResp.message);

    } catch (error) {
        console.log("Failed to remove item from order", error);
    }
}

async function completeOrder(e) {
    try {
        // console.log(cid);

        const response = await fetch('/order/completeOrder', {
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

        for (let i = 1; i <= 3; i++) {
            if (i == 1) {
                completeOrderElem.children[i].children[1].innerHTML = tableAmount;
            } else if (i == 2) {
                completeOrderElem.children[i].children[1].innerHTML = orderAmount;
            } else if (i == 3) {
                completeOrderElem.children[i].children[1].innerHTML = totalPayableAmount;
            }
        }

        completeOrderElem.style.display = "block";

    } catch (error) {
        console.log(error.message);
        alert('Failed to complete order', error);
    }
}

async function applyMembership(e) {
    try {
        const totalAmountElem = document.getElementById('total-amount-div').children[1];
        const totalAmount = totalAmountElem.innerHTML;
        const mobile = document.getElementById("memship-mobile").value;

        console.log(totalAmount);
        const response = await fetch("/membership/applyMembership", {
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

        // console.log(jsonResp);
        if (jsonResp.success == true) {
            totalAmountElem.innerHTML = jsonResp.amountToBePaid;
        }

        alert(jsonResp.message);


    } catch (error) {
        alert("Failed to apply membership", error);
    }
}

async function memshipInput(e) {
    try {
        const number = e.target.value;
        const finishBtn = document.getElementById('finish-order-btn');
        finishBtn.disabled = true;
        // console.log(number);
    } catch (error) {
        console.log("Failed to input number", error);
    }
}

async function finishOrder(e) {
    try {

        const memshipData=document.getElementById('memship-mobile').value;
        if(memshipData.length==0)
            alert("If membership exists, kindly apply.")

        const confirmFinishOrder = confirm("Click yes to finish the order.")

        if (confirmFinishOrder) {
            const paymentDiv = document.getElementById('complete-order-div');

            // const orderAmount = document.getElementById("order-amount-div").children[1].innerHTML;
            // const tableAmount = document.getElementById("table-amount-div").children[1].innerHTML;
            // const totalAmountPaid = document.getElementById('total-amount-div').children[1].innerHTML;
            // console.log(orderAmount);
            // console.log(tableAmount);

            // console.log(totalAmountPaid);

            paymentDiv.style.display = "none";

            // const completeOrderBtn = document.getElementById('complete-order-btn');
            // const newOrderBtn = document.getElementById('new-order-btn');

            // completeOrderBtn.hidden = true;
            // newOrderBtn.hidden = true;

            // for (let i = 0; i < orderData.length; i++) {
            //     const removeBtn = document.getElementById('remove-btn-' + orderData[i].itemId);
            //     removeBtn.hidden = true;
            // }

            // billPaidElem.innerHTML = `Bill Paid : <strong>Rs.  ${parseInt(orderAmount) + parseInt(tableAmount)}</strong>`;

            // billPaidElem.children[0].innerHTML='Bill Paid :';
            // billPaidElem.children[1].innerHTML=`<strong>Rs. ${parseInt(totalAmountPaid)} </strong>`;
            // billPaidElem.innerHTML = `Bill Paid : <strong>Rs. ${parseInt(totalAmountPaid)} </strong>`;
            // billPaidElem.style.display = "block";

            // paymentMethodElem.children[0].innerHTML='Payment Mode :';
            // paymentMethodElem.children[1].innerHTML=`<strong>  ${paymentMode} </strong>`;
            // paymentMethodElem.innerHTML = `<p>Payment Mode :</p> <br> <strong>  ${paymentMode} </strong>`;
            // paymentMethodElem.style.display = "block";

            const response = await fetch("/order/finishOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "paymentStatus": true,
                    "cid": cid,
                    "paymentMode": paymentMode
                })
            })
        }

        window.location.reload();

    } catch (error) {
        alert("Failed to finish payment" + error);
    }
}

async function handleCashPayment(e) {
    try {
        const paymentModeElem = e.target;
        // console.log(paymentModeElem);
        const elemId = paymentModeElem.id;

        console.log(elemId);

        if (elemId == "radio-btn-cash") {
            const onlineElem = document.getElementById("radio-btn-online");
            onlineElem.checked = false;
            // paymentModeElem.setAttribute('checked', 'true');
            paymentMode = "Cash";
        }
    } catch (error) {
        console.log("Failed to select payment mode", error.message);
        alert("Failed to select payment mode", error.message);
    }
}

async function handleOnlinePayment(e) {
    try {
        const paymentModeElem = e.target;
        console.log(paymentModeElem);
        const elemId = paymentModeElem.id;

        if (elemId == "radio-btn-online") {
            const cashElem = document.getElementById("radio-btn-cash");
            cashElem.checked = false;
            // paymentModeElem.setAttribute('checked', 'true');
            paymentMode = "Online";
        }
    } catch (error) {
        console.log("Failed to select payment mode", error.message);
        alert("Failed to select payment mode", error.message);
    }
}