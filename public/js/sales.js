if (parseInt(localStorage.getItem("salesPageNumber")) == 1 || salesCount <= 12 || localStorage.getItem("salesPageNumber") == null) {
    document.getElementById('pagination-prev-btn-div').hidden = true;
}

if (localStorage.getItem("salesPageNumber") != null && (parseInt(localStorage.getItem("salesPageNumber")) * 12 > salesCount || salesCount <= 12)) {
    document.getElementById('pagination-next-btn-div').hidden = true;
}



async function filterByDate(e) {
    try {
        const startDate = document.getElementById('start-date-input-filter').value;
        const endDate = document.getElementById('end-date-input-filter').value;

        if (startDate.length > 0 && endDate.length > 0) {
            // const response = await fetch('/sale/filter', {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         "startDate": startDate,
            //         "endDate": endDate
            //     })
            // });

            window.location.href=`/sale/filter/${startDate}/${endDate}`

            
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
        if (currPage != null && currPage > 1) {
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

        if (localStorage.getItem("salesPageNumber") == null) {
            localStorage.setItem("salesPageNumber", "1");
        }

        let currPage = parseInt(localStorage.getItem("salesPageNumber"));
        currPage += 1;
        localStorage.setItem("salesPageNumber", `${currPage}`);
        window.location.href = `/sale/getSales/${currPage}`;

    } catch (error) {
        console.log("Cannot load next page", error);
    }
}