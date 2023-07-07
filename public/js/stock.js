function handleEditStock(e) {
    try {
        const formDivElem = document.getElementById('edit-item-form-div');

        formDivElem.style.display = "block";

    } catch (error) {
        alert("Failed to display new order form");
    }
}

function closeEditItemForm(e) {
    try {
        const formDivElem = document.getElementById('edit-item-form-div');

        formDivElem.style.display = "none";
    } catch (error) {
        console.log("Failed to close form");
    }
}

function handleNewStock(e) {
    try {
        const formDivElem = document.getElementById('add-item-form-div');

        formDivElem.style.display = "block";

    } catch (error) {
        alert("Failed to display new order form");
    }
}

function closeNewItemForm(e) {
    try {
        const formDivElem = document.getElementById('add-item-form-div');

        formDivElem.style.display = "none";
    } catch (error) {
        console.log("Failed to close form");
    }
}

function addNewItem(e) {

    try {
        e.preventDefault();

        const itemForm = document.getElementById('add-item-form');

        const tableBody = document.getElementById('table-body');

        const newTableRow = document.createElement('tr');
        newTableRow.setAttribute('class', 'table-row');


        //new item data
        const itemName = document.getElementById("item-name").value;
        const itemQty = document.getElementById("add-item-qty").value;
        const sellPrice = document.getElementById("add-sell-price").value;
        const costPrice = document.getElementById("add-cost-price").value;

        // console.log(itemQty);

        const th = document.createElement('th');

        newTableRow.appendChild(th);
        th.innerHTML = '#';

        for (let i = 0; i <= 3; i++) {
            const td = document.createElement('td');

            if (i == 0)
                td.innerHTML = itemName;
            else if (i == 1)
                td.innerHTML = itemQty;
            else if (i == 2)
                td.innerHTML = costPrice;
            else if (i == 3)
                td.innerHTML = sellPrice;

            newTableRow.appendChild(td);
        }

        itemForm.reset()

        tableBody.appendChild(newTableRow);

        const itemData = {
            "name": itemName,
            "qty": itemQty,
            "costPrice": costPrice,
            "sellPrice": sellPrice
        };

        console.log(itemData);

        saveItemToDb(itemData);
    } catch (error) {
        console.log(error);
        alert("Failed to add item", error.message);
    }
}

async function saveItemToDb(itemData) {
    try {
        const response = await fetch('/item/addItem', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemData
            })
        })

        const jsonResp = await response.json();

        alert(jsonResp.message);

    } catch (error) {
        alert('Failed to save item to database', error.message);
    }
}

async function editItem(e) {
    try {

        e.preventDefault();

        const confirmEdit = confirm("Save Changes");

        if (confirmEdit == true) {

            const editForm = document.getElementById('edit-item-form');

            const item = document.getElementById("select-item");
            const itemName = item.value;
            const itemId = item.options[item.selectedIndex].dataset.id;
            const itemQty = document.getElementById("edit-item-qty").value;
            const sellPrice = document.getElementById("edit-sell-price").value;
            const costPrice = document.getElementById("edit-cost-price").value;

            console.log(itemId);

            const itemData = {
                "name": itemName,
                "itemId": itemId,
                "qty": itemQty,
                sellPrice,
                costPrice
            }

            // console.log(itemData);

            editForm.reset();

            const response = await fetch('/item/updateItem', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemData)
            })

            const jsonResp = await response.json();

            console.log(jsonResp);

            if (jsonResp.success == true) {
                alert(jsonResp.message);
                window.location.reload();
            } else {
                alert(jsonResp.message + '\n' + jsonResp.error);
            }
        }

    } catch (error) {
        console.log("Failed to edit item: ", error.message);
        alert("Failed to edit item: ", error.message)
    }
}

async function deleteItem(e) {
    try {

        const confrimDelete=confirm("Remove the item?");

        if(confrimDelete==true){
            const itemId = e.target.id;
            const rowElem = document.getElementById('table-row-' + itemId);
            rowElem.remove();
    
            const response = await fetch('/item/removeItem', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "itemId": itemId
                })
            });
    
            const jsonResp = await response.json();
    
            alert(jsonResp.message);
        }

    } catch (error) {
        console.log("Failed to remove item", error.message);
        alert("Failed to remove item", error.message);
    }
}