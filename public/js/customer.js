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

function handleNewCustomer(e) {
    try {
        // console.log(e.target);

        const table = document.getElementById('table');
        // console.log(table);
        const tableBody = document.getElementById('table-body');

        const newTableRow = document.createElement('tr');
        newTableRow.setAttribute("class", "table-row");
        const th = document.createElement('th');

        // const viewBtn = '<button class="btn btn-primary btn-sm" onclick="handleCustomerClick(event)" id=<%=customer.cid%>View</button>'

        const saveBtn=document.getElementById('save-btn')

        // console.log(saveBtn);

        th.innerHTML = "101";

        // const inputElem = document.createElement('input');
        // inputElem.setAttribute('type', 'text');

        // console.log(inputElem);

        newTableRow.appendChild(th);

        for (let i = 0; i < 5; i++) {
            const td = document.createElement('td');
            const inputElem = document.createElement('input');
            

            if (i == 0){
                inputElem.setAttribute('type', 'text');
                td.appendChild(inputElem);
            }
            else if (i == 1){
                inputElem.setAttribute('type', 'text');
                td.appendChild(inputElem);
            }
            else if (i == 2){
                inputElem.setAttribute('type', 'text');
                td.appendChild(inputElem);
            }
            else if (i == 3){
                inputElem.setAttribute('type', 'date');
                td.appendChild(inputElem);
            }
            else if (i == 4){
                inputElem.setAttribute('type', 'time');
                td.appendChild(inputElem);
            }
            td.appendChild(inputElem)

            newTableRow.appendChild(td);
        }

        const td = document.createElement('td');
        td.appendChild(saveBtn);
        newTableRow.appendChild(td);

        tableBody.appendChild(newTableRow);

        // } else {

        // }
        // console.log(tableBody);

    } catch (error) {

    }
}

function handleNewCustomer(e) {
    try {
        const table = document.getElementById('table');
        
        const tableBody = document.getElementById('table-body');

        const newTableRow = document.createElement('tr');
        newTableRow.setAttribute("class", "table-row");


    } catch (error) {

    }
}