let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let btns = ["yellow", "red", "green", "purple"];

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;
    let rndidx = Math.floor(Math.random() * 4); // Corrected to cover all colors
    let randColor = btns[rndidx];
    let rndbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log("Game sequence:", gameSeq);
    btnFlash(rndbtn);
    userSeq = []; // Reset user sequence at the start of each level
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 1000);
}

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(() => {
        btn.classList.remove("user-flash");
    }, 1000);
}

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started!");
        started = true;
        level = 0;
        gameSeq = [];
        levelUp();
    }
});

function checkans(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // Wait a bit before leveling up
        }
    } else {
        h2.innerText = "Game over! Press any key to start.";
        resetGame();
    }
}

function resetGame() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}

function btnpress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id"); // Declared `userColor` with let
    userSeq.push(userColor);
    console.log("User sequence:", userSeq);
    checkans(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnpress);
}
