let currentPage = localStorage.getItem("currentPage")
let platform1 = document.querySelector(".platform1")
platform1.textContent = localStorage.getItem(`platform${currentPage}`)
let title = document.querySelector(".title")
title.textContent = localStorage.getItem(`chesstitle${currentPage}`)
let mode1 = document.querySelector(".platform3")
if (localStorage.getItem(`mode${currentPage}`) == "self Improvement"){
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
        "chesstitle",
        "ratingHistory"
    ];

    let maxItems = Number(localStorage.getItem("currentPage")) + 1;
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
    if(localStorage.getItem("ratingDifferencenull")){
        localStorage.removeItem("ratingDifferencenull")
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

let dateName = localStorage.getItem(`dateName${currentPage}`);
let dateNum = Number(localStorage.getItem(`dateNum${currentPage}`));

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
newRatingInput.value = localStorage.getItem(`currentRating${currentPage}`);

let cancelBtn = document.querySelector(".cancel");
let saveBtn = document.querySelector(".save");
let inputDiv = document.querySelector(".inputCard");
let ratingHistory = document.querySelector(".ratingHistorySec");
cancelBtn.addEventListener("click", ()=>{
    inputDiv.classList.add("animate")
    inputDiv.addEventListener("animationend", ()=>{
        overlay.style.display = "none"
        inputDiv.classList.remove("animate")
    }, {once: true})
})

let logHistory = JSON.parse(localStorage.getItem(`ratingHistory${currentPage}`)) || [];
saveBtn.addEventListener("click", ()=>{
    let newRating = newRatingInput.value;
    let currentFullDate = `${monthOfYear[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`
    let currentTime;
    if(new Date().getMinutes() < 10){
        currentTime = `${new Date().getHours()}:0${new Date().getMinutes()}`;
    }else{
        currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;
    }
    
    logHistory.push({
        rating: newRating,
        ratingDifference: newRating - Number(localStorage.getItem(`currentRating${currentPage}`)),
        date: currentFullDate,
        time: currentTime
    })
    localStorage.setItem(`ratingHistory${currentPage}`, JSON.stringify(logHistory));
    localStorage.setItem(`currentRating${currentPage}`, newRating);
    location.reload();
})




let remainingDays = document.querySelector(".remainingDays");
remainingDays.textContent = localStorage.getItem(`remainingDays${currentPage}`);

let startRating = document.querySelector(".startRating");
let currentRatingText = document.querySelector(".currentRatingText");
startRating.innerHTML = `Start: <span class="num">${localStorage.getItem(`startRating${currentPage}`)}</span>`;
currentRatingText.innerHTML = `Current: <span class="num">${localStorage.getItem(`currentRating${currentPage}`)}</span>`;
let ratingDifference = Number(localStorage.getItem(`currentRating${currentPage}`)) - Number(localStorage.getItem(`startRating${currentPage}`));
localStorage.setItem(`ratingDifference${currentPage}`, ratingDifference);

let ratingDifferenceText = document.querySelector(".differenceText");
let ratingOnOverlay = document.querySelector(".ratingOnOverlay");
if (ratingDifference > 0){

    let currentRating = document.querySelector(".currentRating");
    currentRating.innerHTML = `${localStorage.getItem(`currentRating${currentPage}`)} <span class="increase">+${ratingDifference}</span>`;
    
    ratingDifferenceText.style.color = "lightGreen";
    ratingOnOverlay.style.width = "100%"
    ratingDifferenceText.innerHTML = `<div class="img"></div>+${ratingDifference} pts`
    
    let image = document.querySelector(".img");
    image.style.backgroundImage = `url("../assets/increase.png")`;
}else if(ratingDifference < 0){

    let currentRating = document.querySelector(".currentRating");
    currentRating.innerHTML = `${localStorage.getItem(`currentRating${currentPage}`)} <span class="decrease">${ratingDifference}</span>`;
    
    ratingDifferenceText.style.color = "red";
    ratingOnOverlay.style.width = "100%"
    ratingOnOverlay.style.backgroundColor = "red";
    ratingDifferenceText.innerHTML = `<div class="img"></div>${ratingDifference} pts`
    
    let image = document.querySelector(".img");
    image.style.backgroundImage = `url("../assets/decrease.png")`;
}else{
    let currentRating = document.querySelector(".currentRating");
    currentRating.innerHTML = `${localStorage.getItem(`currentRating${currentPage}`)}`;
    ratingDifferenceText.textContent = "— 0 pts"
}

let startDate = document.querySelector(".startDate");
let lastDate = document.querySelector(".lastDate");
startDate.textContent = `${monthOfYear[currentMonth]} ${currentDay}, ${realCurrentYear}`;
lastDate.textContent = `${monthOfYear[nowMonth]} ${nowDay}, ${currentYear}`;

let leftDays = Number(localStorage.getItem(`remainingDays${currentPage}`));
let passedDays = Number(localStorage.getItem(`passedDays${currentPage}`));
let timeOnOverlay = document.querySelector(".timeOnOverlay");
let total = passedDays + leftDays;
let percentage = total == 0 ? 0 : (passedDays / total) * 100;
let percentageText = document.querySelector(".percentageText");
percentageText.textContent = `${Math.round(percentage)}% complete`;
timeOnOverlay.style.width = `${percentage}%`

let ratingHistorySec = document.querySelector(".ratingHistorySec");
let ratingHistoryMainDiv = document.querySelector(".ratingHistory")
let ratingHistoryData = JSON.parse(localStorage.getItem(`ratingHistory${currentPage}`)) || [];
console.log(ratingHistoryData.length);

if(ratingHistoryData.length > 0){
    for(let i = ratingHistoryData.length - 1; i >= 0; i--){
        let ratingHistoryDiv = document.createElement("div");
        let stringForHistory = document.createElement("p");
        ratingHistorySec.remove()

        if(ratingHistoryData[i].ratingDifference > 0){
            stringForHistory.innerHTML = `<div class="ratingDiv"> <span class="iRating">${ratingHistoryData[i].rating}</span> <span class="greenColor iRatingDifference">${ratingHistoryData[i].ratingDifference > 0 ? "+" : ""}${ratingHistoryData[i].ratingDifference}</span> </div> <div class="timeAndDate"> <span class="iDate">${ratingHistoryData[i].date}</span> · <span class="iDate">${ratingHistoryData[i].time}</span> </div>`;
        }else if(ratingHistoryData[i].ratingDifference < 0){
            stringForHistory.innerHTML = `<div class="ratingDiv"> <span class="iRating">${ratingHistoryData[i].rating}</span> <span class="redColor iRatingDifference">${ratingHistoryData[i].ratingDifference > 0 ? "+" : ""}${ratingHistoryData[i].ratingDifference}</span> </div> <div class="timeAndDate"> <span class="iDate">${ratingHistoryData[i].date}</span> · <span class="iDate">${ratingHistoryData[i].time}</span> </div>`;
        }else{
            stringForHistory.innerHTML = `<div class="ratingDiv"> <span class="iRating">${ratingHistoryData[i].rating}</span> <span class="iRatingDifference">${ratingHistoryData[i].ratingDifference > 0 ? "+" : ""}${ratingHistoryData[i].ratingDifference}</span> </div><div class="timeAndDate"> <span class="iDate">${ratingHistoryData[i].date}</span> · <span class="iDate">${ratingHistoryData[i].time}</span> </div>`;
        }
        
        stringForHistory.classList.add("stringForHistory")
        ratingHistoryDiv.classList.add("ratingHistoryDiv");
    
        ratingHistoryDiv.append(stringForHistory);
        ratingHistoryMainDiv.append(ratingHistoryDiv);
    }
}else{
    let historySec = document.querySelector(".historyText");
    historySec.textContent = "No entries yet. Log your first rating!"
}