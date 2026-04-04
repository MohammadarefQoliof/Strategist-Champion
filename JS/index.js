let pageNumber = Number(localStorage.getItem("pageNumber")) || 0;
localStorage.setItem("pageNumber", pageNumber);
let btn;
if (pageNumber == 0) {
    let targetLogo = document.createElement("div")
    let topText = document.createElement("h1")
    let bottomText = document.createElement("p")
    btn = document.createElement("button")
    let tasksBar = document.querySelector(".tasksBar")
    
    topText.textContent = "No goals yet"
    bottomText.textContent = "Set a training period and start logging your rating to track improvement."
    btn.textContent = "Create First Goal"
    
    targetLogo.classList.add("targetLogo")
    topText.classList.add("topText")
    bottomText.classList.add("bottomText")
    btn.classList.add("btn", "btn-primary")
    
    tasksBar.append(targetLogo, topText, bottomText, btn)
}else {
    btn = false
    for(let i = 1; i<=Number(localStorage.getItem("pageNumber")); i++){
        let card = document.createElement("div")
        let tasksBar = document.querySelector(".tasksBar")
        let leftSec = document.createElement("div")
        let rightSec = document.createElement("div")
        let logoDiv = document.createElement("div")
        let logo = document.createElement("div")
        let titleOfCard = document.createElement("h1")
        let dateOfCard = document.createElement("div")
        let ratingTextNum = document.createElement("div")
        let ratingText = document.createElement("p")
        let ratingNum = document.createElement("p")
        let ratingChange = document.createElement("p")
        let nextLogo = document.createElement("div")
        let platformTitle = document.createElement("h1")
        let timeLeft = document.createElement("div")
        let time = document.createElement("p")
        let timeText = document.createElement("p")

        titleOfCard.textContent = localStorage.getItem(`chesstitle${i}`)
        ratingText.textContent = "Rating"
        let ratingDifference = localStorage.getItem(`ratingDifference${i}`)
        if (ratingDifference > 0){
            ratingNum.innerHTML = `${localStorage.getItem(`currentRating${i}`)} <span class="increase">+${ratingDifference}</span>`;
        }else if (ratingDifference < 0){
            ratingNum.innerHTML = `${localStorage.getItem(`currentRating${i}`)} <span class="decrease">${ratingDifference}</span>`;
        }else{
            ratingNum.textContent = localStorage.getItem(`currentRating${i}`);
        }
        timeText.textContent = "Time Left"
        
        ratingText.classList.add("ratingText")
        ratingNum.classList.add("ratingNum")
        dateOfCard.classList.add("dateOfCard")
        titleOfCard.classList.add("titleOfCard")
        card.classList.add("card")
        leftSec.classList.add("leftSec")
        rightSec.classList.add("rightSec")
        logoDiv.classList.add("logoDiv")
        logo.classList.add("logoImg")
        ratingChange.classList.add("ratingChange")
        platformTitle.classList.add("platformTitle")
        nextLogo.classList.add("nextLogo")
        timeLeft.classList.add("timeLeft")
        time.classList.add("time")
        timeText.classList.add("timeText")
        
        if(localStorage.getItem(`mode${i}`) == "self Improvement"){
            logo.style.backgroundImage = `url("assets/fire.png")`
        }else{
            logo.style.backgroundImage = `url("assets/sword.png")`
        }
        
        let checkBox = localStorage.getItem(`checkBox${i}`)
        
        if(checkBox == "true"){
            dateOfCard.textContent = `${localStorage.getItem(`dateNum${i}`)} ${localStorage.getItem(`dateName${i}`)} + ${localStorage.getItem(`fideDateNum${i}`)} ${localStorage.getItem(`fideDateName${i}`)} competition`
            platformTitle.innerHTML = `${localStorage.getItem(`platform${i}`)} <span class="spanFide">+Fide</span>`
            if(localStorage.getItem(`platform${i}`) == "CHESS.COM"){
                platformTitle.style.width = "160px"
            }else{
                platformTitle.style.width = "140px"
            }
        }else{
            dateOfCard.textContent = `${localStorage.getItem(`dateNum${i}`)} ${localStorage.getItem(`dateName${i}`)}`
            platformTitle.textContent = localStorage.getItem(`platform${i}`)
            if(localStorage.getItem(`platform${i}`) == "CHESS.COM"){
                platformTitle.style.width = "120px"
            }else{
                platformTitle.style.width = "90px"
            }
        }

        
        let daysList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        let currentDay = new Date().getDate()
        let currentMonth = new Date().getMonth()

        let dateNum = Number(localStorage.getItem(`dateNum${i}`))
        let dateName = localStorage.getItem(`dateName${i}`)
        let startMonth = Number(localStorage.getItem(`startMonth${i}`))
        let startDay = Number(localStorage.getItem(`startDay${i}`))
        
        let totalDays = 0;
        if (dateName == "days") {
            totalDays = dateNum;
        }else if (dateName == "weeks") {
            totalDays = dateNum * 7;
        }else if (dateName == "months") {
            for (let j = 0; j < dateNum; j++) {
                let monthIndex = (startMonth + j) % 12;
                totalDays += daysList[monthIndex];
            }
        }
        let passedDays = 0;

        let tempMonth = startMonth;
        let tempDay = startDay;

        while (tempMonth !== currentMonth || tempDay !== currentDay) {
            passedDays++;

            tempDay++;

            if (tempDay > daysList[tempMonth]) {
                tempDay = 1;
                tempMonth = (tempMonth + 1) % 12;
            }
        }

        let fideDateName = localStorage.getItem(`fideDateName${i}`)
        let fideDateNum = localStorage.getItem(`fideDateNum${i}`) || 0
        let fideDaysLeft = fideDateName == "day" ? Number(fideDateNum) : Number(fideDateNum) * 7;

        let leftDays = totalDays + fideDaysLeft - passedDays;
        localStorage.setItem(`fideLeftDays${i}`, fideDaysLeft)
        localStorage.setItem(`remainingDays${i}`, leftDays);
        localStorage.setItem(`passedDays${i}`, passedDays);
        
        if (leftDays <= 0) {
            time.textContent = `0d`;
        } else {
            time.textContent = `${leftDays}d`;
        }

        card.addEventListener("click", ()=>{
            localStorage.setItem("currentPage", i);
            window.location.href = `HTML/sec.html`
        })

        timeLeft.append(timeText, time)
        ratingNum.append(ratingChange)
        ratingTextNum.append(ratingText, ratingNum)
        platformTitle.append(nextLogo)
        logoDiv.append(logo)
        leftSec.append(logoDiv, titleOfCard, dateOfCard, ratingTextNum)
        rightSec.append(platformTitle, timeLeft)
        card.append(leftSec, rightSec)
        tasksBar.append(card)
    }
}

let newGoalBtn = document.querySelector(".hoverBtn")
let overlay = document.querySelector(".overlay")

newGoalBtn.addEventListener("click", ()=>{
    overlay.style.display = "flex"
})
if(btn){
    btn.addEventListener("click", ()=>{
        overlay.style.display = "flex"
    })
}

let cancel = document.querySelector(".cancelBtn")
let save = document.querySelector(".saveBtn")
let inputDiv = document.querySelector(".inputCard")
let goalTitle = document.querySelector(".goalInput")

cancel.addEventListener("click", ()=>{
    inputDiv.classList.add("animate")
    inputDiv.addEventListener("animationend", ()=>{
        overlay.style.display = "none"
        inputDiv.classList.remove("animate")
    }, {once: true})
})
save.addEventListener("click", ()=>{
    let inputDuration = document.querySelector(".durationInput");
    if (!inputDuration.checkValidity()) {
        inputDuration.reportValidity();
        return;
    }
    
    let pageNumber = Number(localStorage.getItem("pageNumber")) || 0
    let modeValue = document.querySelector(".modeInput").value
    let platformValue = document.querySelector(".platformInput").value
    let startRatingValue = document.querySelector(".ratingInput").value
    let dateNumValue = document.querySelector(".durationInput").value
    let dateNameValue = document.querySelector(".dateInput").value
    let checkTheBox = document.querySelector("#fide").checked
    pageNumber++
    localStorage.setItem("pageNumber", pageNumber)
    localStorage.setItem(`chesstitle${pageNumber}`, goalTitle.value)
    localStorage.setItem(`mode${pageNumber}`, modeValue)
    localStorage.setItem(`platform${pageNumber}`, platformValue)
    localStorage.setItem(`currentRating${pageNumber}`, startRatingValue)
    localStorage.setItem(`startRating${pageNumber}`, startRatingValue)
    localStorage.setItem(`dateNum${pageNumber}`, dateNumValue)
    localStorage.setItem(`dateName${pageNumber}`, dateNameValue)
    localStorage.setItem(`checkBox${pageNumber}`, checkTheBox)
    localStorage.setItem(`startMonth${pageNumber}`, new Date().getMonth());
    localStorage.setItem(`startDay${pageNumber}`, new Date().getDate());
    if(checkTheBox){
        let fideRating = document.querySelector(".fideRatingInput").value
        let dateInputOwn = document.querySelector(".dateInputOwn").value
        let dateTime = document.querySelector(".dateSelect").value
        
        localStorage.setItem(`fideRating${pageNumber}`, fideRating)
        localStorage.setItem(`fideDateNum${pageNumber}`, dateInputOwn)
        localStorage.setItem(`fideDateName${pageNumber}`, dateTime)
    }

    location.reload()
})
document.addEventListener("keydown", (e)=>{
    if(e.key == "Enter" && overlay.style.display === "flex"){
        save.click()
    }
})

let checkBox = document.querySelector("#fide")
let fideBox = document.querySelector(".checkFide")

let fideInputSpace = false

checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
        if (!fideInputSpace) {
            let inputTitle = document.createElement("h1")
            let ratingInput = document.createElement("input")
            let dateSec = document.createElement("div")
            let dateTitle = document.createElement("h1")
            let dateDesc = document.createElement("p")
            let dateInput = document.createElement("input")
            let selectOption = document.createElement("div")
            let dateSelect = document.createElement("select")
            let dateDay = document.createElement("option")
            let dateWeek = document.createElement("option")
            fideInputSpace = document.createElement("div")

            ratingInput.type = "number"
            ratingInput.placeholder = "e.g. 1450"

            dateTitle.textContent = "PRACTICE PHASE DURATION"
            dateDesc.textContent = "How long you will train on your platform before the competition"
            dateInput.type = "Number"
            dateInput.value = "1"
            dateDay.value = "day"
            dateWeek.value = "week"
            dateDay.textContent = "Day"
            dateWeek.textContent = "Week"

            inputTitle.textContent = "Current FIDE Rating"

            ratingInput.classList.add("input", "fideRatingInput")
            inputTitle.classList.add("inputTitle")
            fideInputSpace.classList.add("fideInputSpace")
            dateTitle.classList.add("dateTitle")
            dateDesc.classList.add("dateDesc")
            dateSec.classList.add("dateSec")
            dateInput.classList.add("input", "dateInputOwn")
            dateSelect.classList.add("dateSelect", "input")

            dateSelect.append(dateDay, dateWeek)
            selectOption.append(dateInput, dateSelect)
            dateSec.append(dateTitle, dateDesc, selectOption)
            fideInputSpace.append(inputTitle, ratingInput, dateSec)
            fideBox.append(fideInputSpace)
        }
    }else {
        if (fideInputSpace) {
            fideInputSpace.remove()
            fideInputSpace = false
        }
    }
})
