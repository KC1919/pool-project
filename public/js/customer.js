// const socket = io('/');

let customerId;

// socket.on('message', data=>{
//     console.log(data);
// })

if (customerCount <= 10 || localStorage.getItem("page") == null || parseInt(localStorage.getItem("page")) == 1) {
    document.getElementById('pagination-prev-btn-div').hidden = true;
}

if (localStorage.getItem("page") != null && (parseInt(localStorage.getItem("page")) * 10 > customerCount || customerCount <= 10)) {
    document.getElementById('pagination-next-btn-div').hidden = true;
}

async function handleCustomerClick(e) {
    try {

        const elemId = e.target.id;

        console.log(elemId);
        // const elem = document.getElementById('table-row-' + elemId);
        // console.log(elem);

        // for (let i = 0; i < elem.children.length - 1; i++) {
        //     const child = elem.children[i];
        //     console.log(child.innerHTML);
        // }

        window.location.href = `/order/customerOrder/${elemId}`

    } catch (error) {
        console.log(error);
    }
}

function handleNewCustomer(e) {
    try {

        const formDivElem = document.getElementById('new-customer-form-div');

        formDivElem.style.display = "block";

    } catch (error) {
        console.log("Failed to display form");
    }
}

function closeForm(e) {
    try {
        const formDivElem = document.getElementById('new-customer-form-div');

        formDivElem.style.display = "none";
    } catch (error) {
        console.log("Failed to close form");
    }
}

async function saveCustomer(e) {
    try {
        e.preventDefault();

        const customerForm = document.getElementById('new-customer-form');

        //new customer data
        const name = document.getElementById("name").value;
        const mobile = document.getElementById("mobile").value;
        // const tableNumberElem = document.getElementById("select-table-number");
        // const tableNumber=tableNumberElem.options[tableNumberElem.selectedIndex].dataset.id
        const tableSize = document.getElementById("select-table-size").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        const tableNumber = document.getElementById('tableNumber').value;
        const customerData = {
            "name": name,
            "mobile": mobile,
            "tableNumber": tableNumber,
            "tableSize": tableSize,
            "date": date,
            "time": time
        }

        customerForm.reset();
        closeForm(null);

        //creating new row with customer data
        const table = document.getElementById('table');
        const tableBody = document.getElementById('table-body');

        // console.log(viewBtn);

        const newTableRow = document.createElement('tr');
        newTableRow.setAttribute("class", "table-row");
        const th = document.createElement('th');

        if (tableBody.children.length == 0) {
            th.innerHTML = "1"
        } else {
            const val = tableBody.children[0].children[0].innerHTML;
            const cid = parseInt(val) + 1;
            th.innerHTML = cid;
        }

        newTableRow.appendChild(th);

        for (let i = 0; i <= 6; i++) {
            const td = document.createElement('td');

            if (i == 0)
                td.innerHTML = name;
            else if (i == 1)
                td.innerHTML = mobile;
            else if (i == 2)
                td.innerHTML = tableNumber;
            else if (i == 3)
                td.innerHTML = tableSize;
            else if (i == 4)
                td.innerHTML = date;
            else if (i == 5)
                td.innerHTML = time;
            else if (i == 6)
                td.innerHTML = "";

            newTableRow.appendChild(td);
        }

        const viewBtn = document.createElement('button');
        viewBtn.setAttribute('class', 'view-btn');
        viewBtn.addEventListener('click', handleCustomerClick)
        viewBtn.innerHTML = "View";

        const td = document.createElement('td');
        td.appendChild(viewBtn);
        newTableRow.append(td);

        // console.log(tableBody.children.length);

        if (tableBody.children.length == 0) {
            // console.log(tableBody);
            tableBody.appendChild(newTableRow);
            saveCustomerToDb(customerData, viewBtn);
        } else {
            tableBody.insertBefore(newTableRow, tableBody.firstChild);
            saveCustomerToDb(customerData, viewBtn);
        }

    } catch (error) {
        console.log("Failed to add customer", error);
    }
}

async function saveCustomerToDb(customerData, viewBtn) {
    try {

        // console.log(customerData);
        const response = await fetch("/customer/addCustomer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customerData)
        })

        const json = await response.json();

        console.log(json);

        viewBtn.setAttribute('id', json.result.cid);

        window.location.reload();

        // console.log(viewBtn);

        // console.log(json);

    } catch (error) {
        console.log("Failed to save customer to database", error);
    }
}

async function filterByDate(e) {
    try {
        const filterElem = document.getElementById('date-input-filter');

        const filterDate = filterElem.value;

        if (filterDate.length > 0) {
            window.location.href = `/customer/filterCustomers/${filterDate}`
        } else {
            alert("Select Date");
        }

    } catch (error) {
        console.log("Failed to filter customer result", error.message);
        alert("Failed to filter customer result", error.message);
    }
}

async function handlePrevClick(e) {
    try {
        let currPage = parseInt(localStorage.getItem("page"));
        console.log(currPage);
        if (currPage > 1) {
            currPage -= 1;
            localStorage.setItem("page", `${currPage}`);
            window.location.href = `/customer/allCustomers/${currPage}`;
        } else {
            //do nothing  
        }
    } catch (error) {
        console.log("Cannot load previous page", error);
    }
}

async function handleNextClick(e) {
    try {

        if (localStorage.getItem("page") == null) {
            localStorage.setItem("page", "1");
        }

        let currPage = parseInt(localStorage.getItem("page"));
        currPage += 1;
        localStorage.setItem("page", `${currPage}`);
        window.location.href = `/customer/allCustomers/${currPage}`;

    } catch (error) {
        console.log("Cannot load next page", error);
    }
}

async function deleteCustomer(e) {
    try {

        const confirmDelete = confirm('Confirm Delete Customer');

        if (confirmDelete == true) {
            const customerId = e.target.id.split('$')[1];

            const response = await fetch(`/customer/delete/${customerId}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const jsonResp = await response.json();

            alert(jsonResp.message);

            if (jsonResp.success == true) {
                window.location.reload();
            }

        }
        // console.log(jsonResp.message);

    } catch (error) {
        console.log("Failed to delete customer", error);
        alert("failed to delete customer", error.message)
    }
}