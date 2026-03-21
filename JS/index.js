let pageNum = localStorage.getItem("pageNumber") || 0;
if(!pageNum) {
    localStorage.setItem("pageNumber", 0)
}
let btn;
if (pageNum == 0) {
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
}
let newGoalBtn = document.querySelector(".btn")

newGoalBtn.addEventListener("click", ()=>{
    newGoal()
})
btn.addEventListener("click", ()=>{
    newGoal()
})

function newGoal() {
    let body = document.querySelector("body")
    let overlay = document.createElement("div")
    let inputCard = document.createElement("div")
    let title = document.createElement("h1")
    let goalTitle = document.createElement("h1")
    let goalInput = document.createElement("input")
    let modePlatform = document.createElement("div")
    let modeSec = document.createElement("div")
    let platformSec = document.createElement("div")
    let modeTitle = document.createElement("h1")
    let platformTitle = document.createElement("h1")
    let modeInput = document.createElement("select")
    let platformInput = document.createElement("select")
    let chessCom = document.createElement("option")
    let lichess = document.createElement("option")
    let selfImprove = document.createElement("option")
    let compPrep = document.createElement("option")

    lichess.value = "Lichess"
    lichess.textContent = "Lichess"
    
    selfImprove.value = "Self Improvement"
    selfImprove.textContent = "Self Improvement"
    
    compPrep.value = "Competition Prep"
    compPrep.textContent = "Competition Prep"

    modeTitle.textContent = "Mode"
    
    chessCom.value = "Chess.com"
    chessCom.textContent = "Chess.com"

    platformTitle.textContent = "Training Platform"

    goalTitle.textContent = "Goal Title"
    
    goalInput.type = "text"
    goalInput.placeholder = "e.g. Summer Open Prep"
    
    title.textContent = "Set New Training Goal"
    
    title.classList.add("title")
    modePlatform.classList.add("modePlatform")
    modeInput.classList.add("modeInput")
    platformInput.classList.add("platformInput")
    goalTitle.classList.add("goalTitle")
    goalInput.classList.add("goalInput")
    overlay.classList.add("overlay")
    inputCard.classList.add("inputCard")

    platformInput.append(chessCom, lichess)
    modeInput.append(selfImprove, compPrep)
    modeSec.append(modeTitle, modeInput)
    platformSec.append(platformTitle, platformInput)
    modePlatform.append(modeSec, platformSec)
    inputCard.append(title, goalTitle, goalInput, modePlatform)
    overlay.append(inputCard)
    body.append(overlay)
}