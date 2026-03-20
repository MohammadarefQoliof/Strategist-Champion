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

    overlay.classList.add("overlay")
    inputCard.classList.add("inputCard")

    overlay.append(inputCard)
    body.append(overlay)
}