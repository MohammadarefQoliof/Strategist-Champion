function deletePlan(){
    let keys = [
        "chesstitle",
        "mode",
        "platform",
        "currentRating",
        "startRating",
        "dateNum",
        "dateName",
        "checkBox",
        "startMonth",
        "startDay",
        "fideRating",
        "currentFideRating",
        "fideDateNum",
        "fideDateName",
        "fideLeftDays",
        "remainingDays",
        "passedDays",
        "fideRatingDifference",
        "ratingDifference",
        "ratingHistory",
        "ratingDifferenceList",
        "allRatingHistory",
        "startYear",
        "lastDay",
        "lastMonth",
        "lastYear"
    ];

    let deleteIndex = Number(localStorage.getItem("currentPage"));
    let totalItems = Number(localStorage.getItem("pageNumber"));

    for (let i = deleteIndex; i < totalItems; i++) {
        keys.forEach(key => {
            let nextValue = localStorage.getItem(key + (i + 1));

            if (nextValue !== null) {
                localStorage.setItem(key + i, nextValue);
            } else {
                localStorage.removeItem(key + i);
            }
        });
    }

    keys.forEach(key => {
        localStorage.removeItem(key + totalItems);
    });

    localStorage.setItem("pageNumber", totalItems - 1);

    if (deleteIndex > totalItems - 1) {
        localStorage.setItem("currentPage", totalItems - 1);
    }

    window.location.href = "index.html";
}