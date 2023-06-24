function handleNewOrder(e) {
    try {

        const formDivElem = document.getElementById('new-order-form-div');

        formDivElem.style.display = "block";

    } catch (error) {
        console.log("Failed to display form");
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


        const orderData = {
            itemName,
            itemId,
            itemQty
        };

        // console.log(orderData);
        // console.log(items);

        let pricePerItem;
        // for (let i = 0; i < itemsArr.length; i++) {
        //     if (itemsArr[i].itemId == itemId) {
        //         pricePerItem = itemsArr[i].sellPrice;
        //         break;
        //     }
        // }

        console.log(pricePerItem);

        orderForm.reset();
        // closeForm(null);

        //creating new row with customer data
        const tableBody = document.getElementById('table-body');

        const newTableRow = document.createElement('tr');
        newTableRow.setAttribute("class", "table-row");
        const th = document.createElement('th');

        if (tableBody.children.length == 0) {
            th.innerHTML = "1"
        } else {
            const val = tableBody.children.length;
            const oid = parseInt(val) + 1;
            th.innerHTML = oid;
        }

        newTableRow.appendChild(th);

        // for (let i = 0; i <= 3; i++) {
        //     const td = document.createElement('td');

        //     if (i == 0)
        //         td.innerHTML = itemName;
        //     else if (i == 1)
        //         td.innerHTML = mobile;
        //     else if (i == 2)
        //         td.innerHTML = tableNumber;
        //     else if (i == 3)
        //         td.innerHTML = tableSize;
        //     else if (i == 4)
        //         td.innerHTML = date;
        //     else if (i == 5)
        //         td.innerHTML = time;

        //     newTableRow.appendChild(td);
        // }

        // const viewBtn = document.createElement('button');
        // viewBtn.setAttribute('class', 'view-btn');
        // viewBtn.setAttribute('onclick', handleCustomerClick)
        // viewBtn.innerHTML = "View";

        // const td = document.createElement('td');
        // td.appendChild(viewBtn);
        // newTableRow.append(td);

        // // console.log(tableBody.children.length);

        // if (tableBody.children.length == 0) {
        //     // console.log(tableBody);
        //     tableBody.appendChild(newTableRow);
        //     saveCustomerToDb(customerData, viewBtn);
        // } else {
        //     tableBody.insertBefore(newTableRow, tableBody.firstChild);
        //     saveCustomerToDb(customerData, viewBtn);
        // }

    } catch (error) {
        console.log("Failed to add customer", error);
    }
}