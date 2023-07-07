function handleNewMember(e) {
    try {
        const formDivElem = document.getElementById('add-memship-form-div');

        formDivElem.style.display = "block";

    } catch (error) {
        alert("Failed to display new order form");
    }
}

function closeNewMemberForm(e) {
    try {
        const formDivElem = document.getElementById('add-memship-form-div');
        formDivElem.style.display = "none";
    } catch (error) {
        console.log("Failed to close form");
    }
}


function handleEditMember(e) {
    try {

        // console.log(e.target);
        const formDivElem = document.getElementById('edit-memship-form-div');

        console.log(formDivElem);

        formDivElem.style.display = "block";

    } catch (error) {
        alert("Failed to display new order form");
    }
}


function closeEditMemberForm(e) {
    try {
        const formDivElem = document.getElementById('edit-memship-form-div');

        formDivElem.style.display = "none";
    } catch (error) {
        console.log("Failed to close form");
    }
}

async function addMember(e) {
    try {
        e.preventDefault();

        const memberForm = document.getElementById('add-memship-form');
        const formDivElem = document.getElementById('add-memship-form-div');

        const tableBody = document.getElementById('table-body');

        const newTableRow = document.createElement('tr');
        newTableRow.setAttribute('class', 'table-row');

        const memberName = document.getElementById("new-member-name").value;
        const mobile = document.getElementById("new-member-mobile").value;
        const credits = document.getElementById("new-member-credit").value;

        for (let i = 0; i <= 2; i++) {
            const td = document.createElement('td');

            if (i == 0)
                td.innerHTML = memberName;
            else if (i == 1)
                td.innerHTML = mobile;
            else if (i == 2)
                td.innerHTML = credits;

            newTableRow.appendChild(td);
        }

        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('class', 'btn btn-danger btn-sm');
        removeBtn.addEventListener('click', removeMember);
        removeBtn.setAttribute('id', mobile);
        removeBtn.innerHTML = "Delete"

        const td = document.createElement('td');
        td.appendChild(removeBtn);
        newTableRow.append(td);

        newTableRow.setAttribute('id', 'table-row-' + mobile);

        memberForm.reset()

        formDivElem.style.display = "none";


        // console.log(newTableRow);

        tableBody.appendChild(newTableRow);

        const memberData = {
            "name": memberName,
            "mobile": mobile,
            "credit": credits
        }

        saveMemberToDb(memberData);

    } catch (error) {
        console.log("Failed to add membership", error.message);
        alert("Failed to add membership", error.message)
    }
}

async function saveMemberToDb(memberData) {
    try {
        const response = await fetch('/membership/addMembership', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(memberData)
        })

        const jsonResp = await response.json();

        alert(jsonResp.message);
    } catch (error) {
        console.log("Failed to remove membership from database", error.message);
        alert("Failed to remove membership from database", error.message);
    }
}

async function removeMember(e) {
    try {

        const confirmRemove=confirm("Remove the membership?");

        if(confirmRemove==true){
            const memberId = e.target.id;
            const rowElem = document.getElementById('table-row-' + memberId);
            rowElem.remove();
            removeMemberFromDb(memberId);
        }

    } catch (error) {
        console.log("Failed to remove membership", error.message);
        alert("Failed to remove membership", error.message);
    }
}

async function removeMemberFromDb(memberId) {
    try {
        const response = await fetch('/membership/removeMembership', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "memberId": memberId
            })
        })

        const jsonResp = await response.json();

        alert(jsonResp.message);
    } catch (error) {
        console.log("Failed to remove membership from database", error.message);
        alert("Failed to remove membership from database", error.message);
    }
}

async function editMember(e) {
    try {

        e.preventDefault();

        const memNameElem = document.getElementById("select-name");
        const name = memNameElem.options[memNameElem.selectedIndex].value;

        const memMobileElem = document.getElementById("select-mobile");
        const mobile = memMobileElem.options[memMobileElem.selectedIndex].value;

        const newCredit = document.getElementById('edit-member-credit').value;

        const rowMemberElem = document.getElementById('table-row-' + mobile);
        const credit = parseInt(rowMemberElem.cells[2].innerHTML);

        rowMemberElem.cells[2].innerHTML = parseInt(newCredit) + credit;

        const memberData = {
            name,
            mobile,
            "credit":newCredit
        }

        editMemberDataDB(memberData)

    } catch (error) {
        console.log("failed to edit membershipt", error.message);
        alert("failed to edit membershipt", error.message);
    }
}

async function editMemberDataDB(memberData) {
    try {
        const response = await fetch('/membership/addCredit', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                memberData
            })
        })

        const jsonResp = await response.json();

        alert(jsonResp.message);
    } catch (error) {
        console.log("Failed to remove membership from database", error.message);
        alert("Failed to remove membership from database", error.message);
    }
}