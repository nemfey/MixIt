function getRandomElement(array) {
    return array[Math.floor(Math.random()*array.length)];
}

function generarColorAleatorio() {
    let palette = document.querySelectorAll("[data-clr]");
    let randomColor = [];
    let numberOfColors = 10; // cuantos colores utilizamos
    console.log("Numero de colores: ", numberOfColors);
    
    for(let i = 0; i < numberOfColors; ++i) {
        // guardar el color como variable antes si se quiere ganar para testear
        let color = getRandomElement(palette).dataset.clr;
        console.log(color);
        //
        randomColor.push(color);
    }
    colorFinal = averageHex(randomColor);
    console.log("Color final: ", colorFinal);
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