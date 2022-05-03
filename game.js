let color_final;    // color shown as objective
let col_display;    // colors used to create player's color
let display_mix;    // color created by the player

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

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let colors = document.querySelectorAll(".clr");
    colors.forEach(clr => {
        clr.addEventListener("click", () => {
            ctx.strokeStyle = clr.dataset.clr;
            console.log(ctx.strokeStyle);
            col_display.push(clr.dataset.clr);
            
            //if (col_display.length != 1) {
                display_mix = averageHex(col_display);
                document.querySelector(".display").style.backgroundColor = display_mix;
            /*}
            else {
                document.querySelector(".display").style.backgroundColor = clr.dataset.clr;
            }
            */
            if (checkAccuracy() >= 96) {
                window.setTimeout(MyConfirm, 300);
            }
        })
    })

}