async function filterByDate(e) {
    try {
        const filterDate = document.getElementById('date-input-filter').value;
    
        window.location.href = `http://localhost:3000/sale/filterSales/${filterDate}`

    } catch (error) {
        console.log("Failed to filter sales result", error.message);
        alert("Failed to filter sales result", error.message);
    }
}