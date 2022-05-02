function averageHex(colors) {
    // transform all hex codes to integer arrays, e.g. [[R, G, B], [R,G,B], ...]
    let numbers = colors.map(function (hex) {
        // split in seperate R, G & B
        let split = hex.match(/[\da-z]{2}/gi);
        // transform to integer values
        return split.map(function (toInt) {
            return parseInt(toInt, 16);
        });
    });
    // reduce the array by averaging all values, resulting in an average [R, G, B]
    let averages = numbers.reduce(function (total, amount, index, array) {
        return total.map(function (subtotal, subindex) {
            // if we reached the last color, average it out and return the hex value
            if (index == array.length - 1) {
                let result = Math.round((subtotal + amount[subindex]) / array.length).toString(16);
                // add a leading 0 if it is only one character
                return result.length == 2 ? '' + result : '0' + result;
            } else {
                return subtotal + amount[subindex];
            }
        });
    });
    return "#" + averages.join('');
}

let color_final;
let col_display = [];
let display_mix;
let time = 30;

function runGame() {
    let intervalid;

    time = 30;
    clean();
    generarColorAleatorio();
    col_display = [];

    const canvas = document.getElementById("canvas")
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    const ctx = canvas.getContext("2d")

    

    function checkAccuracy() {
        if (display_mix == null) return 0;

        let tmp = [];
        tmp.push(display_mix);
        tmp.push(color_final);

        let numbers = tmp.map(function (hex) {
            // split in seperate R, G and B
            let split = hex.match(/[\da-z]{2}/gi);
            // transform to integer values
            return split.map(function (toInt) {
                return parseInt(toInt, 16);
            });
        });
        var red, blue, green;
        if (numbers[0][0] < numbers[1][0]) red = (numbers[0][0] / numbers[1][0]) * 100;
        else if (numbers[0][0] == numbers[1][0]) red = 100;
        else red = (numbers[1][0] / numbers[0][0]) * 100;

        if (numbers[0][1] < numbers[1][1]) green = (numbers[0][1] / numbers[1][1]) * 100;
        else if (numbers[0][1] == numbers[1][1]) green = 100;
        else green = (numbers[1][1] / numbers[0][1]) * 100;

        if (numbers[0][2] < numbers[1][2]) blue = (numbers[0][2] / numbers[1][2]) * 100;
        else if (numbers[0][2] == numbers[1][2]) blue = 100;
        else blue = (numbers[1][2] / numbers[0][2]) * 100;

        return (red + blue + green) / 3;
    }


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