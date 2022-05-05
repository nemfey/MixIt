function getRandomElement(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

function generarColorAleatorio() {
    let color = [];
    let num_mix = Math.floor((Math.random() * (13)) + 2);
    let colores = document.querySelectorAll("[data-clr]");  // En vez de #color poner .clr
    let col_tmp = getRandomElement(colores).dataset.clr;            //TEMPORAL PARA VER SI FUNCIONA
    let nuevalong = color.push(col_tmp);
    console.log("Color Mezcla: ",col_tmp);
    for (let step = 0; step < num_mix-1; step++)
    {
        let num_col = Math.floor((Math.random() * (13)) + 2);
        col_tmp = getRandomElement(colores).dataset.clr;                 //TEMPORAL PARA VER SI FUNCIONA
        let nuevalong  = color.push(col_tmp);
        console.log("Color Mezcla: ",col_tmp);
    }
    colorFinal = averageHex(color);
    console.log("Color Final: ",colorFinal);
    document.querySelector(".solution").style.backgroundColor = colorFinal;
}

function averageHex(colors) {
    if(colors.length == 1) return colors.at(0);
    // transform all hex codes to integer arrays, e.g. [[R, G, B], [R,G,B], ...]
    let numbers = colors.map(function (hex) {
        let split = hex.match(/[\da-z]{2}/gi);
        return split.map(function (toInt) { return parseInt(toInt, 16); });
    });
    
    // reduce the array by averaging all values, resulting in an average [R, G, B]
    let averages = numbers.reduce(function (total, amount, index, array) {
        return total.map(function (subtotal, subindex) {
            // if we reached the last color, average it out and return the hex value
            if (index == array.length - 1) {
                let result = Math.round((subtotal + amount[subindex]) / array.length).toString(16);
                return result.length == 2 ? '' + result : '0' + result;
            }
            else return subtotal + amount[subindex];
        });
    });
    return "#" + averages.join('');
}

function checkAccuracy() {
    if (displayMix == null) return 0;
    let tmp = [];
    tmp.push(displayMix);
    tmp.push(colorFinal);

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

function clean() {
    document.querySelector(".display").style.backgroundColor = "";
    colorDisplay = [];
    displayMix = null;
    console.log("clean");
}