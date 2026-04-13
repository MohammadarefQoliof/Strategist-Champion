let currentPage = localStorage.getItem("currentPage")
let platform1 = document.querySelector(".platform1")
let platform2 = document.createElement("p")
platform1.textContent = localStorage.getItem(`platform${currentPage}`)
let title = document.querySelector(".title")
title.textContent = localStorage.getItem(`chesstitle${currentPage}`)
let fideCheckBox = localStorage.getItem(`checkBox${currentPage}`)
let platform3 = document.querySelector(".platform3")

if (localStorage.getItem(`mode${currentPage}`) == "self Improvement"){
    platform3.textContent = "IMPROVEMENT"
}else{
    platform3.textContent = "COMPETITION"
}
if(fideCheckBox == "true"){
    platform2.classList.add("platform2")
    platform2.textContent = "+ FIDE"
    platform3.before(platform2)
}else{
    platform2.classList.remove("platform2")
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
        "ratingHistory",
        "ratingDifferenceList",
        "fideDateName",
        "fideDateNum",
        "fideLeftDays",
        "fideRating",
        "allRatingHistory"
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
    window.location.href = "index.html";
});

let cross = document.querySelector(".bgCross");
cross.addEventListener("click", ()=>{
    window.location.href = "index.html";
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

if(fideCheckBox == "true"){
    let fideDaysLeft = localStorage.getItem(`fideLeftDays${currentPage}`)
    nowDay += Number(fideDaysLeft)
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

let ratingAndDuration = document.querySelector(".ratingAndDuration")

let timeProgress = document.querySelector(".timeProgress")
timeProgress.textContent = "TIME PROGRESS"

if(fideCheckBox == "true"){
    ratingAndDuration.style.width = "88%"

    let currentFideRating = localStorage.getItem(`currentFideRating${currentPage}`)
    let startFideRating = localStorage.getItem(`fideRating${currentPage}`)
    let imgAndRating = document.createElement("div")
    let fideRatingOnOverlay = document.createElement("div")
    let imgRatingDiff = document.createElement("div")
    let fideRatingNumDifference = document.createElement("p")
    let fideRatingDifference = Number(currentFideRating) - Number(startFideRating)
    localStorage.setItem(`fideRatingDifference${currentPage}`, fideRatingDifference)
    let fideRatingPoints = document.createElement("p")
    if (Number(localStorage.getItem(`fideRatingDifference${currentPage}`)) > 0){

        imgRatingDiff.style.backgroundImage = `url("./assets/increase.png")`
        fideRatingPoints.textContent = `+${localStorage.getItem(`fideRatingDifference${currentPage}`)} pts`
        fideRatingPoints.classList.add("fideRatingPoints")
        fideRatingPoints.style.color = "lightgreen"
        imgAndRating.classList.add("imgAndRating")
        imgRatingDiff.classList.add("imgRatingDiff")
        fideRatingOnOverlay.style.backgroundColor = "orange"
        fideRatingOnOverlay.style.width = "100%"
        fideRatingNumDifference.textContent = `+${localStorage.getItem(`fideRatingDifference${currentPage}`)}`
        fideRatingNumDifference.style.color = 'lightgreen'
        
    }else if(Number(localStorage.getItem(`fideRatingDifference${currentPage}`)) < 0){
        imgRatingDiff.style.backgroundImage = `url("./assets/decrease.png")`
        fideRatingPoints.textContent = `${localStorage.getItem(`fideRatingDifference${currentPage}`)} pts`
        fideRatingPoints.classList.add("fideRatingPoints")
        imgAndRating.classList.add("imgAndRating")
        imgRatingDiff.classList.add("imgRatingDiff")
        fideRatingPoints.style.color = "red"
        fideRatingOnOverlay.style.backgroundColor = "red"
        fideRatingOnOverlay.style.width = "3%"
        fideRatingNumDifference.textContent = `${localStorage.getItem(`fideRatingDifference${currentPage}`)}`
        fideRatingNumDifference.style.color = 'red'
        
    }else{
        fideRatingPoints.classList.remove("fideRatingPoints")
        imgAndRating.classList.remove("imgAndRating")
        imgRatingDiff.classList.remove("imgRatingDiff")
        fideRatingPoints.textContent = "— 0 pts"
        fideRatingOnOverlay.style.backgroundColor = "orange"
        fideRatingOnOverlay.style.width = "3%"
        fideRatingNumDifference.style.opacity = "0"
    }
    imgAndRating.append(imgRatingDiff, fideRatingPoints)
    
    let fideLogRating = document.createElement("div")
    let trophy = document.createElement("div")
    let bgBin = document.querySelector(".bgBin")
    
    fideLogRating.classList.add("fideBtn")
    trophy.classList.add("trophy")
    
    fideLogRating.append(trophy, "FIDE")
    bgBin.before(fideLogRating)
    
    let inputForFide = document.querySelector(".ratingValueForFide")
    inputForFide.value = localStorage.getItem(`currentFideRating${currentPage}`)
    
    let overlayForFide = document.querySelector(".overlayForFide")
    fideLogRating.addEventListener("click", ()=>{
        overlayForFide.style.display = "flex"
    })
    
    let cancelForFideBtn = document.querySelector(".cancelForFide");
    let inputDiv = document.querySelector(".inputCardForFide");
    
    cancelForFideBtn.addEventListener("click", ()=>{
        inputDiv.classList.add("animate")
        inputDiv.addEventListener("animationend", ()=>{
            inputDiv.classList.remove("animate")
            overlayForFide.style.display = "none"
        }, {once: true})
    })

    let saveForFide = document.querySelector(".saveForFide")
    let logHistory = JSON.parse(localStorage.getItem(`allRatingHistory${currentPage}`)) || []

    saveForFide.addEventListener("click", ()=>{
        let newRating = inputForFide.value;
        let currentFullDate = `${monthOfYear[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`
        let currentTime;
        if(new Date().getMinutes() < 10){
            currentTime = `${new Date().getHours()}:0${new Date().getMinutes()}`;
        }else{
            currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;
        }
        let ratingDifferenceList = JSON.parse(localStorage.getItem(`ratingDifferenceList${currentPage}`)) || [];
        let lastRatingDifference = newRating - Number(localStorage.getItem(`currentFideRating${currentPage}`))
        ratingDifferenceList.push(lastRatingDifference)
        localStorage.setItem(`ratingDifferenceList${currentPage}`, JSON.stringify(ratingDifferenceList))
        
        logHistory.push({
            type: "fide",
            rating: newRating,
            ratingDifference: lastRatingDifference,
            date: currentFullDate,
            time: currentTime
        })
        localStorage.setItem(`allRatingHistory${currentPage}`, JSON.stringify(logHistory));
        localStorage.setItem(`currentFideRating${currentPage}`, newRating);
        location.reload();
    })

    document.addEventListener("keydown", (e)=>{
        if(e.key == "Enter"){
            saveForFide.click()
        }
    })
    
    let durationSec = document.querySelector(".durationSec")
    let fideRatingSec = document.createElement("div")
    let fideRatingText = document.createElement("p")
    let fideRatingNum = document.createElement("p")
    
    fideRatingSec.classList.add("fideRatingSec")
    fideRatingText.classList.add("fideRatingText")
    fideRatingNum.classList.add("fideRatingNum")
    fideRatingNumDifference.classList.add("fideRatingNumDifference")

    fideRatingText.textContent = "FIDE Rating"
    fideRatingNum.textContent = localStorage.getItem(`currentFideRating${currentPage}`)
    
    let ratingJourneyText = document.querySelector(".ratingJourneyText")
    let diagram = document.querySelector(".diagram")
    let practicePhase = document.querySelector(".practicePhase")
    let fideRatingJourneyText = document.createElement("p")
    let fideRatingJourneyBg = document.createElement("div")
    let fideRatingOverlay = document.createElement("div")
    let fideRatings = document.createElement("div")
    let fideRatingStart = document.createElement("p")
    let fideRatingCurrent = document.createElement("p")

    fideRatingOnOverlay.classList.add("onOverlay")
    fideRatingJourneyText.classList.add("fideRatingJourneyText")
    fideRatingJourneyBg.classList.add("ratingJourney")
    fideRatingOverlay.classList.add("fideRatingOverlay")
    fideRatings.classList.add("texts")
    
    ratingJourneyText.textContent = "PRACTICE RATING JOURNEY"
    fideRatingStart.innerHTML = `Start: <span class="num">${localStorage.getItem(`fideRating${currentPage}`)}</span>`
    fideRatingCurrent.innerHTML = `Current: <span class="num">${localStorage.getItem(`currentFideRating${currentPage}`)}`
    diagram.style.height = "550px"
    fideRatingJourneyText.textContent = "FIDE RATING JOURNEY"


    fideRatingNum.append(fideRatingNumDifference)
    fideRatingOverlay.append(fideRatingOnOverlay)
    fideRatingJourneyText.append(imgAndRating)
    fideRatings.append(fideRatingStart, fideRatingCurrent)
    fideRatingJourneyBg.append(fideRatingJourneyText, fideRatingOverlay, fideRatings)
    practicePhase.before(fideRatingJourneyBg)
    fideRatingSec.append(fideRatingText, fideRatingNum)
    durationSec.before(fideRatingSec)
}else{
    let ratingJourneyText = document.querySelector(".ratingJourneyText")
    
    ratingAndDuration.style.width = "100%"

    ratingJourneyText.textContent = "Rating Journey"
}

let logRatingBtn = document.querySelector(".btnLogRating");
let overlay = document.querySelector(".overlay")
let describe = document.querySelector(".describe")
let platformCapitalize = localStorage.getItem(`platform${currentPage}`)[0].toUpperCase() + localStorage.getItem(`platform${currentPage}`).slice(1).toLowerCase()
describe.textContent = `Recording a ${platformCapitalize} practice rating`
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

let logHistory = JSON.parse(localStorage.getItem(`allRatingHistory${currentPage}`)) || [];
saveBtn.addEventListener("click", ()=>{
    let newRating = newRatingInput.value;
    let currentFullDate = `${monthOfYear[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`
    let currentTime;
    if(new Date().getMinutes() < 10){
        currentTime = `${new Date().getHours()}:0${new Date().getMinutes()}`;
    }else{
        currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;
    }
    let ratingDifferenceList = JSON.parse(localStorage.getItem(`ratingDifferenceList${currentPage}`)) || [];
    let lastRatingDifference = newRating - Number(localStorage.getItem(`currentRating${currentPage}`))
    ratingDifferenceList.push(lastRatingDifference)
    localStorage.setItem(`ratingDifferenceList${currentPage}`, JSON.stringify(ratingDifferenceList))
    
    logHistory.push({
        type: "normal",
        rating: newRating,
        ratingDifference: lastRatingDifference,
        date: currentFullDate,
        time: currentTime
    })
    localStorage.setItem(`allRatingHistory${currentPage}`, JSON.stringify(logHistory));
    localStorage.setItem(`currentRating${currentPage}`, newRating);
    location.reload();
})

document.addEventListener("keydown", (e)=>{
    if(e.key == "Enter" && overlay.style.display === "flex"){
        saveBtn.click()
    }
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
    image.style.backgroundImage = `url("./assets/increase.png")`;
}else if(ratingDifference < 0){

    let currentRating = document.querySelector(".currentRating");
    currentRating.innerHTML = `${localStorage.getItem(`currentRating${currentPage}`)} <span class="decrease">${ratingDifference}</span>`;
    
    ratingDifferenceText.style.color = "red";
    ratingOnOverlay.style.width = "3%"
    ratingOnOverlay.style.backgroundColor = "red";
    ratingDifferenceText.innerHTML = `<div class="img"></div>${ratingDifference} pts`
    
    let image = document.querySelector(".img");
    image.style.backgroundImage = `url("./assets/decrease.png")`;
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
let percentage = total <= 0 ? 0 : (passedDays / total) * 100;
percentage = percentage >= 100 ? 100 : percentage;
let percentageText = document.querySelector(".percentageText");
percentageText.textContent = `${Math.round(percentage)}% complete`;
timeOnOverlay.style.width = `${percentage}%`


let ratingHistorySec = document.querySelector(".ratingHistorySec");
let ratingHistoryMainDiv = document.querySelector(".ratingHistory")
let allRatingHistoryData = JSON.parse(localStorage.getItem(`allRatingHistory${currentPage}`)) || [];


if(allRatingHistoryData.length > 0){
    for(let i = allRatingHistoryData.length - 1; i >= 0; i--){
        let ratingHistoryDiv = document.createElement("div");
        let stringForHistory = document.createElement("p");
        let backgroundBin = document.createElement("div")
        let binDiv = document.createElement("div")
        ratingHistorySec.remove()
        
        if(allRatingHistoryData[i].ratingDifference > 0 && allRatingHistoryData[i].type == "normal"){
            stringForHistory.innerHTML = `<div class="ratingDiv"> <span class="iRating">${allRatingHistoryData[i].rating}</span> <span class="greenColor iRatingDifference">${allRatingHistoryData[i].ratingDifference > 0 ? "+" : ""}${allRatingHistoryData[i].ratingDifference}</span> </div> <div class="timeAndDate"> <span class="iDate">${allRatingHistoryData[i].date}</span> · <span class="iDate">${allRatingHistoryData[i].time}</span> </div>`;
        }else if(allRatingHistoryData[i].ratingDifference < 0 && allRatingHistoryData[i].type == "normal"){
            stringForHistory.innerHTML = `<div class="ratingDiv"> <span class="iRating">${allRatingHistoryData[i].rating}</span> <span class="redColor iRatingDifference">${allRatingHistoryData[i].ratingDifference > 0 ? "+" : ""}${allRatingHistoryData[i].ratingDifference}</span> </div> <div class="timeAndDate"> <span class="iDate">${allRatingHistoryData[i].date}</span> · <span class="iDate">${allRatingHistoryData[i].time}</span> </div>`;
        }else if(allRatingHistoryData[i].ratingDifference == 0 && allRatingHistoryData[i].type == "normal"){
            stringForHistory.innerHTML = `<div class="ratingDiv"> <span class="iRating">${allRatingHistoryData[i].rating}</span> <span class="iRatingDifference">${allRatingHistoryData[i].ratingDifference > 0 ? "+" : ""}${allRatingHistoryData[i].ratingDifference}</span> </div><div class="timeAndDate"> <span class="iDate">${allRatingHistoryData[i].date}</span> · <span class="iDate">${allRatingHistoryData[i].time}</span> </div>`;
        }else if(allRatingHistoryData[i].ratingDifference > 0 && allRatingHistoryData[i].type == "fide"){
            stringForHistory.innerHTML = `<div class="ratingDiv"> <span class="iFideRating">${allRatingHistoryData[i].rating}</span> <span class="greenColor iRatingDifference">${allRatingHistoryData[i].ratingDifference > 0 ? "+" : ""}${allRatingHistoryData[i].ratingDifference}</span> </div>  <div class="timeAndDate"><div class="fideType">FIDE</div> <span class="iDate">${allRatingHistoryData[i].date}</span> · <span class="iDate">${allRatingHistoryData[i].time}</span> </div>`;
        }else if(allRatingHistoryData[i].ratingDifference < 0 && allRatingHistoryData[i].type == "fide"){

        }else if(allRatingHistoryData[i].ratingDifference == 0 && allRatingHistoryData[i].type == "fide"){

        }
        
        stringForHistory.classList.add("stringForHistory")
        backgroundBin.classList.add("backgroundBin")
        binDiv.classList.add("binDiv")
        
        backgroundBin.append(binDiv)
        ratingHistoryDiv.append(stringForHistory, backgroundBin);
        
        
        if(allRatingHistoryData[i].type == "fide"){
            ratingHistoryDiv.classList.add("ratingHistoryDiv", "fideHistory");
        }else{
            ratingHistoryDiv.classList.add("ratingHistoryDiv");
        }
        
        backgroundBin.addEventListener("click", ()=>{
            let ratingDifferenceList = JSON.parse(localStorage.getItem(`ratingDifferenceList${currentPage}`))
            if (allRatingHistoryData[i].type == "normal"){
                let currentRating = Number(localStorage.getItem(`currentRating${currentPage}`))
                
                currentRating -= Number(ratingDifferenceList[i])
                ratingDifferenceList.splice(i, 1)
                
                localStorage.setItem(`currentRating${currentPage}`, currentRating)
                
            }else{
                
                
                let currentFideRating = Number(localStorage.getItem(`currentFideRating${currentPage}`))
                currentFideRating -= Number(ratingDifferenceList[i])
                ratingDifferenceList.splice(i, 1)
                
                localStorage.setItem(`currentFideRating${currentPage}`, currentFideRating)
            }
            
            allRatingHistoryData.splice(i, 1)
    
            localStorage.setItem(`ratingDifferenceList${currentPage}`, JSON.stringify(ratingDifferenceList))
            localStorage.setItem(`allRatingHistory${currentPage}`, JSON.stringify(allRatingHistoryData))
            
            location.reload()
        })

        ratingHistoryMainDiv.append(ratingHistoryDiv);
    }


}else{
    let historySec = document.querySelector(".historyText") || "";
    historySec.textContent = "No entries yet. Log your first rating!"
}
console.log(JSON.parse(localStorage.getItem(`allRatingHistory${currentPage}`)));


