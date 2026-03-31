let platform1 = document.querySelector(".platform1")
platform1.textContent = localStorage.getItem("platform1")
let title = document.querySelector(".title")
title.textContent = localStorage.getItem("title1")
let mode1 = document.querySelector(".platform3")
if (localStorage.getItem("mode1") == "self Improvement"){
    mode1.textContent = "IMPROVEMENT"
}else{
    mode1.textContent = "COMPETITION"
}

let bin = document.querySelector(".bgBin");

bin.addEventListener("click", () => {
    let keys = [
        "checkBox",
        "dateName",
        "dateNum",
        "mode",
        "platform",
        "startDay",
        "startMonth",
        "startRating",
        "currentRating",
        "passedDays",
        "ratingDifference",
        "remainingDays",
        "title"
    ];

    let maxItems = 5
    let pageNum = localStorage.getItem("pageNumber");
    pageNum--;
    localStorage.setItem("pageNumber", pageNum);

    for (let i = 1; i < maxItems; i++) {
        keys.forEach(key => {
            let nextValue = localStorage.getItem(key + (i + 1));

            if (nextValue !== null) {
                localStorage.setItem(key + i, nextValue);
            } else {
                localStorage.removeItem(key + i);
            }
        });
    }
    window.location.href = "../index.html";
});

let cross = document.querySelector(".bgCross");
cross.addEventListener("click", ()=>{
    window.location.href = "../index.html";
})

let monthOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let dateTime = document.querySelector(".dateTime");

let dateName = localStorage.getItem("dateName1");
let dateNum = Number(localStorage.getItem("dateNum1"));

let currentMonth = new Date().getMonth();
let currentDay = new Date().getDate();
let currentYear = new Date().getFullYear();
let realCurrentYear = new Date().getFullYear();

let nowDay = currentDay;
let nowMonth = currentMonth;

if (dateName === "days") {
    nowDay += dateNum;
}
else if (dateName === "weeks") {
    nowDay += dateNum * 7;
}
else if (dateName === "months") {
    nowMonth += dateNum;
}

while (nowDay > 31) {
    nowDay -= 31;
    nowMonth += 1;
}

while (nowMonth > 11) {
    nowMonth -= 12;
    currentYear += 1;
}

dateTime.textContent = `${monthOfYear[currentMonth]} ${currentDay}, ${realCurrentYear} — ${monthOfYear[nowMonth]} ${nowDay}, ${currentYear}`;

let logRatingBtn = document.querySelector(".rightSec button");
let overlay = document.querySelector(".overlay")
logRatingBtn.addEventListener("click", ()=>{
    overlay.style.display = "flex";
})

let newRatingInput = document.querySelector(".ratingValue");
newRatingInput.value = localStorage.getItem("currentRating1");

let cancelBtn = document.querySelector(".cancel");
let saveBtn = document.querySelector(".save");
let inputDiv = document.querySelector(".inputCard");
cancelBtn.addEventListener("click", ()=>{
    inputDiv.classList.add("animate")
    inputDiv.addEventListener("animationend", ()=>{
        overlay.style.display = "none"
        inputDiv.classList.remove("animate")
    }, {once: true})
})

// saveBtn.addEventListener("click", ()=>{

// })

let remainingDays = document.querySelector(".remainingDays");
remainingDays.textContent = localStorage.getItem("remainingDays1");

let startRating = document.querySelector(".startRating");
let currentRatingText = document.querySelector(".currentRatingText");
startRating.innerHTML = `Start: <span class="num">${localStorage.getItem("startRating1")}</span>`;
currentRatingText.innerHTML = `Current: <span class="num">${localStorage.getItem("currentRating1")}</span>`;
let ratingDifference = Number(localStorage.getItem("currentRating1")) - Number(localStorage.getItem("startRating1"));
localStorage.setItem("ratingDifference1", ratingDifference);

let ratingDifferenceText = document.querySelector(".differenceText");
let ratingOnOverlay = document.querySelector(".ratingOnOverlay");
if (ratingDifference > 0){

    let currentRating = document.querySelector(".currentRating");
    currentRating.innerHTML = `${localStorage.getItem("currentRating1")} <span class="increase">+${ratingDifference}</span>`;
    
    ratingDifferenceText.style.color = "lightGreen";
    ratingOnOverlay.style.width = "100%"
    ratingDifferenceText.innerHTML = `<div class="img"></div>+${ratingDifference} pts`
    
    let image = document.querySelector(".img");
    image.style.backgroundImage = `url("../assets/increase.png")`;
}else if(ratingDifference < 0){

    let currentRating = document.querySelector(".currentRating");
    currentRating.innerHTML = `${localStorage.getItem("currentRating1")} <span class="decrease">${ratingDifference}</span>`;
    
    ratingDifferenceText.style.color = "red";
    ratingOnOverlay.style.width = "100%"
    ratingOnOverlay.style.backgroundColor = "red";
    ratingDifferenceText.innerHTML = `<div class="img"></div>${ratingDifference} pts`
    
    let image = document.querySelector(".img");
    image.style.backgroundImage = `url("../assets/decrease.png")`;
}else{
    let currentRating = document.querySelector(".currentRating");
    currentRating.innerHTML = `${localStorage.getItem("currentRating1")}`;
    ratingDifferenceText.textContent = "— 0 pts"
}

let startDate = document.querySelector(".startDate");
let lastDate = document.querySelector(".lastDate");
startDate.textContent = `${monthOfYear[currentMonth]} ${currentDay}, ${realCurrentYear}`;
lastDate.textContent = `${monthOfYear[nowMonth]} ${nowDay}, ${currentYear}`;

let leftDays = Number(localStorage.getItem("remainingDays1"));
let passedDays = Number(localStorage.getItem("passedDays1"));
let timeOnOverlay = document.querySelector(".timeOnOverlay");
let total = passedDays + leftDays;
let percentage = total == 0 ? 0 : (passedDays / total) * 100;
let percentageText = document.querySelector(".percentageText");
percentageText.textContent = `${Math.round(percentage)}% complete`;
timeOnOverlay.style.width = `${percentage}%`