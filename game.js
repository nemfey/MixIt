let addEventClicker = true;

let colorFinal;    // color shown as objective
let colorDisplay;    // colors used to create player's color
let displayMix;    // color created by the player

let time;
let intervalId;
countdownEl = document.getElementById('countdown');

function updateCountdown() {
    time--;
    if (time > 0) {
        time = time < 10 ? '0' + time : time;
        countdownEl.innerHTML = `00:${time}`;
        time = time < 0 ? 0 : time;
    }
    else {
        clearInterval(intervalId);
        let accuracy = checkAccuracy();
        var answer = window.confirm("You lose :( \nYou had an accuracy of " + parseFloat(accuracy).toFixed(2) + "% \n Want to play again?");
        if (answer) runGame();
        else showMenu();
    }
}

function MyConfirm() {
    if (intervalId) clearInterval(intervalId);
    if (window.confirm("You WIN!!! \n Want to play again?")) {
        runGame();
    }
    else showMenu();   
}

function runGame() {
    document.getElementById('game').style.display = "";

    time = 30;
    countdownEl.innerHTML = `00:${time}`;
    intervalId = setInterval(updateCountdown, 1000);

    clean();
    generarColorAleatorio();

    // only add click event once when needed
    if(addEventClicker) {
        const ctx = document.getElementById("canvas").getContext("2d");

        let colors = document.querySelectorAll(".clr");
        colors.forEach(clr => {
            clr.addEventListener("click", () => {
                ctx.strokeStyle = clr.dataset.clr;
                colorDisplay.push(clr.dataset.clr);
                
                console.log(ctx.strokeStyle);
                
                displayMix = averageHex(colorDisplay);
                document.querySelector(".display").style.backgroundColor = displayMix;
                
                if (checkAccuracy() >= 96) {
                    window.setTimeout(MyConfirm, 300);
                }
            })
        })
        addEventClicker = false;
    }

}