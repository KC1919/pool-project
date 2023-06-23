function handleCustomerClick(e) {
    try {

        const elemId = e.target.id;
        const elem = document.getElementById('table-row-' + elemId);
        // console.log(elem);

        for (let i = 0; i < elem.children.length - 1; i++) {
            const child = elem.children[i];
            console.log(child.innerHTML);
        }

    } catch (error) {
        console.log(error);
    }
}

// function handleNewCustomer(e) {
//     try {
//         // console.log(e.target);

//         const table = document.getElementById('table');
//         // console.log(table);
//         const tableBody = document.getElementById('table-body');

//         const newTableRow = document.createElement('tr');
//         newTableRow.setAttribute("class", "table-row");
//         const th = document.createElement('th');

//         // const viewBtn = '<button class="btn btn-primary btn-sm" onclick="handleCustomerClick(event)" id=<%=customer.cid%>View</button>'

//         const saveBtn=document.getElementById('save-btn')

//         // console.log(saveBtn);

//         th.innerHTML = "101";

//         // const inputElem = document.createElement('input');
//         // inputElem.setAttribute('type', 'text');

//         // console.log(inputElem);

//         newTableRow.appendChild(th);

//         for (let i = 0; i < 5; i++) {
//             const td = document.createElement('td');
//             const inputElem = document.createElement('input');


//             if (i == 0){
//                 inputElem.setAttribute('type', 'text');
//                 td.appendChild(inputElem);
//             }
//             else if (i == 1){
//                 inputElem.setAttribute('type', 'text');
//                 td.appendChild(inputElem);
//             }
//             else if (i == 2){
//                 inputElem.setAttribute('type', 'text');
//                 td.appendChild(inputElem);
//             }
//             else if (i == 3){
//                 inputElem.setAttribute('type', 'date');
//                 td.appendChild(inputElem);
//             }
//             else if (i == 4){
//                 inputElem.setAttribute('type', 'time');
//                 td.appendChild(inputElem);
//             }
//             td.appendChild(inputElem)

//             newTableRow.appendChild(td);
//         }

//         const td = document.createElement('td');
//         td.appendChild(saveBtn);
//         newTableRow.appendChild(td);

//         tableBody.appendChild(newTableRow);

//         // } else {

//         // }
//         // console.log(tableBody);

//     } catch (error) {

//     }
// }

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

function saveCustomer(e) {
    try {
        e.preventDefault();

        const customerForm = document.getElementById('new-customer-form');

        //new customer data
        const name = document.getElementById("name").value;
        const mobile = document.getElementById("mobile").value;
        const tableNumber = document.getElementById("tableNumber").value;
        const tableSize = document.getElementById("tableSize").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

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


        const viewBtn = '<button class="view-btn" id="view-btn" onclick = "handleCustomerClick(event)" > View </button>'

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

        for (let i = 0; i <= 5; i++) {
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

            newTableRow.appendChild(td);
        }

        const td = document.createElement('td');
        td.innerHTML = viewBtn;
        newTableRow.append(td);

        if (tableBody.children.length == 0) {
            // console.log(tableBody);
            tableBody.appendChild(newTableRow);
            saveCustomerToDb(customerData);
        } else {
            tableBody.insertBefore(newTableRow, tableBody.firstChild);
            saveCustomerToDb(customerData);
        }

    } catch (error) {
        console.log("Failed to add customer", error);
    }
}

async function saveCustomerToDb(customerData) {
    try {

        console.log(customerData);
        const response = await fetch("http://localhost:3000/customer/addCustomer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customerData)
        })

        const json = await response.json();

        console.log(json);
    } catch (error) {
        console.log("Failed to save customer to database", error);
    }
}