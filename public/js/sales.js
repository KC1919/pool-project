

if (parseInt(localStorage.getItem("salesPageNumber")) * 10 > salesCount) {
    document.getElementById('pagination-next-btn-div').hidden = true;
}

if (parseInt(localStorage.getItem("salesPageNumber")) * 10 <= salesCount) {
    document.getElementById('pagination-prev-btn-div').hidden = true;
}

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

async function handlePrevClick(e) {
    try {
        let currPage = parseInt(localStorage.getItem("salesPageNumber"));
        // console.log(currPage);
        if (currPage!=null && currPage > 1) {
            currPage -= 1;
            localStorage.setItem("salesPageNumber", `${currPage}`);
            window.location.href = `/sale/getSales/${currPage}`;
        } else {
            //do nothing  
        }
    } catch (error) {
        console.log("Cannot load previous page", error);
    }
}

async function handleNextClick(e) {
    try {

        if(localStorage.getItem("salesPageNumber")==null){
            localStorage.setItem("salesPageNumber","1");
        }
        
        let currPage = parseInt(localStorage.getItem("salesPageNumber"));
        currPage+=1;
        localStorage.setItem("salesPageNumber", `${currPage}`);
        window.location.href = `/sale/getSales/${currPage}`;

    } catch (error) {
        console.log("Cannot load next page", error);
    }
}