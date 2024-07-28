function handleNewExpense(e) {
    try {
        const formDivElem = document.getElementById('add-expense-form-div');

        formDivElem.style.display = "block";

    } catch (error) {
        alert("Failed to display new order form");
    }
}

function closeNewExpenseForm(e) {
    try {
        const formDivElem = document.getElementById('add-expense-form-div');
        formDivElem.style.display = "none";
    } catch (error) {
        console.log("Failed to close form");
    }
}


async function addExpense(e) {
    try {
        e.preventDefault();

        const expenseForm = document.getElementById('add-expense-form');

        const date = document.getElementById('new-expense-date').value;
        const description = document.getElementById('new-expense-desc').value;
        const amount = document.getElementById('new-expense-amount').value;

        const expenseData = {
            date,
            description,
            amount
        }

        const response = await fetch('/sale/addExpense', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(expenseData)
        });

        const jsonResp = await response.json();

        if (jsonResp.success == true) {
            expenseForm.reset();
            alert("Expense added successfully")
        } else if (jsonResp.success == false) {
            alert("Failed to add expense", jsonResp.error)
        }

    } catch (error) {
        console.log("Failed to add expense", error);
        alert("Failed to add expense", error.message)
    }
}

async function filterByDate(e) {
    try {
        const startDate = document.getElementById('start-date-input-filter').value;
        const endDate = document.getElementById('end-date-input-filter').value;

        if (startDate.length > 0 && endDate.length > 0) {
            window.location.href = `/sale/expenses/${startDate}/${endDate}`
        } else {
            alert("Select Date");
        }

    } catch (error) {
        console.log("Failed to filter expense result", error);
        alert("Failed to filter expense result", error.message);
    }
}