async function filterByDate(e) {
    try {
        const filterDate = document.getElementById('date-input-filter').value;

        if (filterDate.length > 0) {
            window.location.href = `/sale/filterSales/${filterDate}`
        } else {
            alert("Select Date");
        }

    } catch (error) {
        console.log("Failed to filter sales result", error.message);
        alert("Failed to filter sales result", error.message);
    }
}