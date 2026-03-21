let pageNumber = localStorage.getItem("pageNumber") || 0
if(!pageNumber) {
    localStorage.setItem("pageNumber", 0)
}
let btn
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
    let pageNumber = Number(localStorage.getItem("pageNumber")) || 0
    pageNumber++
    console.log(save)
    localStorage.setItem("pageNumber", pageNumber)
    localStorage.setItem(`title${pageNumber}`, goalTitle.value)
    location.reload()
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