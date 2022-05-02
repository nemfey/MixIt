function showMenu() {
    document.getElementById('menu').style.display = "";
    document.getElementById('game').style.display = 'none';
}

function createColor(dataColor, styleColor) {
    let color = document.createElement('clr');
    color.style = styleColor;
    color.dataset.clr = dataColor;
    color.classList.add('clr')

    return color;
}

function normalMode() {
    const containerColors = document.querySelector(".container");
    containerColors.innerHTML = "";

    containerColors.appendChild(createColor("#FF0000","background-color: #FF0000"));
    containerColors.appendChild(createColor("#00FF00","background-color: #00FF00"));
    containerColors.appendChild(createColor("#0000FF","background-color: #0000FF"));
    containerColors.appendChild(createColor("#FFFFFF","background-color: #FFFFFF"));
    containerColors.appendChild(createColor("#000000","background-color: #000000"));

    document.getElementById('menu').style.display = 'none';
    runGame();
}

function hardMode() {
    const containerColors = document.querySelector(".container");
    containerColors.innerHTML = "";

    containerColors.appendChild(createColor("#008000","background-color: #008000"));
    containerColors.appendChild(createColor("#808000","background-color: #808000"));
    containerColors.appendChild(createColor("#00FF00","background-color: #00FF00"));
    containerColors.appendChild(createColor("#FFFF00","background-color: #FFFF00"));
    containerColors.appendChild(createColor("#FF8000","background-color: #FF8000"));
    containerColors.appendChild(createColor("#FF0000","background-color: #FF0000"));
    containerColors.appendChild(createColor("#800000","background-color: #800000"));
    containerColors.appendChild(createColor("#000000","background-color: #000000"));
    containerColors.appendChild(createColor("#FF00FF","background-color: #FF00FF"));
    containerColors.appendChild(createColor("#800080","background-color: #800080"));
    containerColors.appendChild(createColor("#000080","background-color: #000080"));
    containerColors.appendChild(createColor("#0000FF","background-color: #0000FF"));
    containerColors.appendChild(createColor("#00FFFF","background-color: #00FFFF"));
    containerColors.appendChild(createColor("#FFFFFF","background-color: #FFFFFF"));
    containerColors.appendChild(createColor("#C0C0C0","background-color: #C0C0C0"));
    containerColors.appendChild(createColor("#808080","background-color: #808080"));

    document.getElementById('menu').style.display = 'none';
    runGame();
}