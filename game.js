let color_final;
let col_display;
let display_mix;
let time;
let intervalid;



function runGame() {
    document.getElementById('game').style.display = "";

    clean();
    time = 30;
    generarColorAleatorio();

    const canvas = document.getElementById("canvas")
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    const ctx = canvas.getContext("2d")


    const countdownEl = document.getElementById('countdown');
    intervalid = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        if (time > 0) {
            time = time < 10 ? '0' + time : time;

            countdownEl.innerHTML = `00:${time}`;
            time--;
            time = time < 0 ? 0 : time;
        }
        else {
            let accu = checkAccuracy();
            var answer = window.confirm("You lose :( \nYou had an accuracy of " + parseFloat(accu).toFixed(2) + "% \n Want to play again?");
            if (intervalid) clearInterval(intervalid);
            if (answer) runGame();

            else
             showMenu();
        }
    }
    function MyConfirm() {
        if (intervalid) clearInterval(intervalid);
        if (window.confirm("You WIN!!! \n Want to play again?")) {
            //clean();
            runGame();
        }
        else {
            showMenu();
            
        }

    }

    let clrs = document.querySelectorAll(".clr")
    clrs.forEach(clr => {
        clr.addEventListener("click", () => {
            ctx.strokeStyle = clr.dataset.clr
            console.log(ctx.strokeStyle)
            col_display.push(clr.dataset.clr);
            if (col_display.length != 1) {
                display_mix = averageHex(col_display);
                document.querySelector(".display").style.backgroundColor = display_mix;
            }
            else {
                document.querySelector(".display").style.backgroundColor = clr.dataset.clr;
            }
            if (checkAccuracy() >= 96) {
                //clean();
                window.setTimeout(MyConfirm, 300);
            }
        })
    })

}