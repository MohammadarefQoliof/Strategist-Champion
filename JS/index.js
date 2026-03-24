let pageNumber = localStorage.getItem("pageNumber") || 0
if(!pageNumber) {
    localStorage.setItem("pageNumber", 0)
}
let usedPlans = document.querySelector(".usedPlans")
usedPlans.textContent = `${pageNumber}/5 plans used`
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

        titleOfCard.textContent = localStorage.getItem(`title${i}`)
        ratingText.textContent = "Rating"
        ratingNum.textContent = localStorage.getItem(`startRating${i}`)
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
            logo.style.backgroundImage = `url("../images/fire.png")`
        }else{
            logo.style.backgroundImage = `url("../images/sword.png")`
        }
        
        let checkBox = localStorage.getItem(`checkBox${i}`)
        console.log(checkBox);
        
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

        function getDaysLeft(i, totalDays) {
            let startDate = localStorage.getItem(`startDate${i}`);
            if (!startDate) return totalDays;

            let start = new Date(startDate);
            let now = new Date();

            let passedMs = now - start;
            let passedDays = Math.floor(passedMs / (1000 * 60 * 60 * 24));

            let leftDays = totalDays - passedDays;

            return leftDays > 0 ? leftDays : 0;
        }
        function daysFromRealMonths(months, startDateStr) {
            let start = startDateStr ? new Date(startDateStr) : new Date();
            let future = new Date(
                start.getFullYear(),
                start.getMonth() + months,
                start.getDate()
            );

            let diffMs = future - start;
            return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        }

        let totalDays;

        if(localStorage.getItem(`dateName${i}`) == "days"){
            totalDays = Number(localStorage.getItem(`dateNum${i}`))

            if (localStorage.getItem(`fideDateName${i}`) == "day"){
                totalDays += Number(localStorage.getItem(`fideDateNum${i}`))
            }else if(localStorage.getItem(`fideDateName${i}`) == "week"){
                totalDays += Number(localStorage.getItem(`fideDateNum${i}`)) * 7
            }else{
                let startDate = localStorage.getItem(`startDate${i}`);
                let fideNum = Number(localStorage.getItem(`fideDateNum${i}`))
                totalDays += daysFromRealMonths(fideNum, startDate);
            }
            let daysLeft = getDaysLeft(i, totalDays);
            time.textContent = `${daysLeft}d`;
        }else if(localStorage.getItem(`dateName${i}`) == "months"){
            let startDate = localStorage.getItem(`startDate${i}`);
            totalDays = daysFromRealMonths(Number(localStorage.getItem(`dateNum${i}`)), startDate)
            if (localStorage.getItem(`fideDateName${i}`) == "day"){
                totalDays += Number(localStorage.getItem(`fideDateNum${i}`))
            }else if(localStorage.getItem(`fideDateName${i}`) == "week"){
                totalDays += Number(localStorage.getItem(`fideDateNum${i}`)) * 7
            }else{
                let startDate = localStorage.getItem(`startDate${i}`);
                let fideNum = Number(localStorage.getItem(`fideDateNum${i}`))
                totalDays += daysFromRealMonths(fideNum, startDate);
            }
            let daysLeft = getDaysLeft(i, totalDays);
            time.textContent = `${daysLeft}d`;
        }else{
            totalDays = Number(localStorage.getItem(`dateNum${i}`)) * 7
            if (localStorage.getItem(`fideDateName${i}`) == "day"){
                totalDays += Number(localStorage.getItem(`fideDateNum${i}`))
            }else if(localStorage.getItem(`fideDateName${i}`) == "week"){
                totalDays += Number(localStorage.getItem(`fideDateNum${i}`)) * 7
            }else{
                let startDate = localStorage.getItem(`startDate${i}`);
                let fideNum = Number(localStorage.getItem(`fideDateNum${i}`));
                totalDays += daysFromRealMonths(fideNum, startDate);
            }
            let daysLeft = getDaysLeft(i, totalDays);
            time.textContent = `${daysLeft}d`;
        }

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

let hoverBtnMax5 = document.querySelector(".hoverBtn")
if(pageNumber >= 5){
    hoverBtnMax5.classList.add("maxPlan")
}else{
    hoverBtnMax5.classList.remove("maxPlan")
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
        localStorage.setItem(`title${pageNumber}`, goalTitle.value)
        localStorage.setItem(`mode${pageNumber}`, modeValue)
        localStorage.setItem(`platform${pageNumber}`, platformValue)
        localStorage.setItem(`startRating${pageNumber}`, startRatingValue)
        localStorage.setItem(`dateNum${pageNumber}`, dateNumValue)
        localStorage.setItem(`dateName${pageNumber}`, dateNameValue)
        localStorage.setItem(`checkBox${pageNumber}`, checkTheBox)
        localStorage.setItem(`startDate${pageNumber}`, new Date().toISOString());
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
        if(e.key == "Enter"){
            save.click()
        }
    })
    
    let checkBox = document.querySelector("#fide")
    let fideBox = document.querySelector(".checkFide")
    
    let fideInputSpace = false
    
    checkBox.addEventListener("input", () => {
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
                let dateMonth = document.createElement("option")
                fideInputSpace = document.createElement("div")
    
                ratingInput.type = "number"
                ratingInput.placeholder = "e.g. 1450"
    
                dateTitle.textContent = "PRACTICE PHASE DURATION"
                dateDesc.textContent = "How long you will train on your platform before the competition"
                dateInput.type = "Number"
                dateInput.value = "1"
                dateDay.value = "day"
                dateWeek.value = "week"
                dateMonth.value = "month"
                dateDay.textContent = "Day"
                dateWeek.textContent = "Week"
                dateMonth.textContent = "Month"
    
                inputTitle.textContent = "Current FIDE Rating"
    
                ratingInput.classList.add("input", "fideRatingInput")
                inputTitle.classList.add("inputTitle")
                fideInputSpace.classList.add("fideInputSpace")
                dateTitle.classList.add("dateTitle")
                dateDesc.classList.add("dateDesc")
                dateSec.classList.add("dateSec")
                dateInput.classList.add("input", "dateInputOwn")
                dateSelect.classList.add("dateSelect", "input")
    
                dateSelect.append(dateDay, dateWeek, dateMonth)
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
}