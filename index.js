let homeScore = 0
let guestScore = 0
let homeScoreDisplay = document.getElementById("score-home")
let guestScoreDisplay = document.getElementById("score-guest")
let home = document.getElementById("home")
let guest = document.getElementById("guest")
let undoBtn = document.getElementById("btn-undo")
let infoEl = document.getElementById("info")
let infoBtn = document.getElementById("btn-info")
let infoCloseBtn = document.getElementById("btn-info-close")
let scoreLog = []
let counter = 0



function addScore(team, increment, undoing = false) {
    if (team === "home") {
        homeScore += increment
        homeScoreDisplay.textContent = homeScore;
        // homeScoreDisplay.classList.add("sparkIn")
        // resetAnimation("sparkIn")
    } else if (team === "guest") {
        guestScore += increment
        guestScoreDisplay.textContent = guestScore
    }
    if (!undoing) scoreLog.push({team: team, score: increment})
    checkWinning()
    checkScoreFontSize()
    if (homeScore === 0 && guestScore === 0)
        undoBtn.style.visibility = "hidden";
    if (homeScore !== 0 || guestScore !== 0)
        undoBtn.style.visibility = "visible";
}



// function resetAnimation(el) {
//     el.style.animation = 'none';
//     el.offsetHeight; /* trigger reflow */
//     el.style.animation = null;
// }

function checkScoreFontSize() {
    if (homeScore > 99 || guestScore > 99) {
        homeScoreDisplay.classList.add("scoreSmaller")
        guestScoreDisplay.classList.add("scoreSmaller")
    }
    if (homeScore > 999) {
        homeScoreDisplay.textContent = "999"
    }
    if (guestScore > 999) {
        guestScoreDisplay.textContent = "999"
    }
}



function checkWinning() {
    if (homeScore > guestScore) {
        guest.classList.remove("winning")
        home.classList.add("winning")
    } else if (homeScore < guestScore) {
        home.classList.remove("winning")
        guest.classList.add("winning")
    } else {
        home.classList.remove("winning")
        guest.classList.remove("winning")
    }
}



function undo() {
    let lastScore = scoreLog[scoreLog.length - 1];
    if (lastScore.team === "home") {
        addScore("home", -lastScore.score, true)
    } else if (lastScore.team === "guest") {
        addScore("guest", -lastScore.score, true)
    }
    scoreLog.pop();
}



function toggleDarkMode() {
    let elementList = [
        "backdrop",
        "container",
        "home",
        "guest",
        "score-home",
        "score-guest",
        "add1-home",
        "add2-home",
        "add3-home",
        "add1-guest",
        "add2-guest",
        "add3-guest",
        "btn-undo",
        "btn-mode",
        "btn-info",
        "info",
        "credits"
    ]
    for (let i = 0; i < elementList.length; i++) {
        document.getElementById(elementList[i]).classList.toggle("dark");
    }
    for (let i = 0; i < 2; i++) {
        document.getElementsByClassName("score-wrapper")[i].classList.toggle("dark");
    }
    counter++;
    let modeBtn = document.getElementById("btn-mode");
    if (counter % 2 !== 0) modeBtn.textContent = "to light mode"
    else modeBtn.textContent = "to dark mode"
}



function toggleInfoPane() {
    infoEl.classList.toggle("fadeIn")
    infoEl.classList.toggle("fadeOut")
    infoBtn.classList.add("fadeOut")
    infoCloseBtn.disabled = false
}



function closeInfoPane() {
    infoEl.classList.remove("fadeIn")
    infoEl.classList.add("fadeOut")
    infoBtn.classList.remove("fadeOut")
    infoBtn.classList.add("fadeIn")
    infoCloseBtn.disabled = true
}



document.getElementById("add1-home").addEventListener("click", function () {
    addScore("home", 1)
})
document.getElementById("add2-home").addEventListener("click", function () {
    addScore("home", 2)
})
document.getElementById("add3-home").addEventListener("click", function () {
    addScore("home", 3)
})
document.getElementById("add1-guest").addEventListener("click", function () {
    addScore("guest", 1)
})
document.getElementById("add2-guest").addEventListener("click", function () {
    addScore("guest", 2)
})
document.getElementById("add3-guest").addEventListener("click", function () {
    addScore("guest", 3)
})

document.getElementById("btn-undo").addEventListener("click", undo)
document.getElementById("btn-mode").addEventListener("click", toggleDarkMode)
document.getElementById("btn-info").addEventListener("click", toggleInfoPane)
document.getElementById("btn-info-close").addEventListener("click", closeInfoPane)

