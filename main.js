var cells;
var hLines;
var vLines;
var turn = "p1";
var p1points = 0;
var p2points = 0;
var pointThisTurn = false;
var rowNum;
var colNum;
var lineType;
var mostRecentlyClicked;//for deactivate
var x;
var correctAnswer = [];
var currentCell;
var element;
var cellsNeedToBeFilled = [];
var alreadyAsked = [];
var cellCount;
var confettiPlayers = [];

function setUpBoard(){
    hLines=generateHorizontal(6,5);
    vLines=generateVertical(5,6);
    cells=generateCells(5,5);
    updateDisplayedPlayerTurn();
};

window.onload = function(){
    addListenerForHElements();
    addListenerForVElements();
};

function generateCells(numCol, numRow){
    var cells = [];
    for (var col = 0; col < numCol; col++){
        for (var row = 0; row < numRow; row++){
            cells.push({
                col: col,
                row: row,
                active: false,
                owner: ""
            })
        }
    }
    return cells;
};

function generateHorizontal(numCol,numRow){
    var cells = [];
    for(var i =0; i<=numRow; i++){
        var row = [];
        for(var j =0; j<numCol; j++){
            row.push({
                col:j,
                row:i,
                active:false,
            })
        }
        cells.push(row);
    }
    return cells;
};

function generateVertical(numCol,numRow){
    var cells = [];
    for(var i =0; i<numRow; i++){
        var row = [];
        for(var j =0; j<=numCol; j++){
            row.push({
                col:j,
                row:i,
                active:false,
            })
        }
        cells.push(row);
    }
    return cells;
};

function checkLines(cell){
    return (checkHorizontal(cell) && checkVertical(cell));
};

function checkHorizontal(cell){
    var topline = false;
    var bottomline = false;
    if (hLines[cell.row][cell.col].active){
        topline = true;
    }
    if (hLines[cell.row+1][cell.col].active){
        bottomline = true;
    }
    return topline && bottomline;
};

function checkVertical(cell){
    var rightline = false;
    var leftline = false;
    if (vLines[cell.row][cell.col].active){
        rightline = true;
    }
    if (vLines[cell.row][cell.col+1].active){
        leftline = true;
    }
    return leftline && rightline;
};

function addListenerForHElements(){
    var hElements = document.getElementsByClassName('linehorizontal');
    for(var i = 0; i < hElements.length; i++){
        hElements[i].addEventListener("click", clickFunction);
    }
};

function addListenerForVElements(){
    var vElements = document.getElementsByClassName('linevertical');
    for(var i = 0; i < vElements.length; i++){
        vElements[i].addEventListener("click", clickFunction);
    }
};

function clickFunction(event) {
    element = event.target;
    mostRecentlyClicked = {
        element,
        lineType: " ",
        row: " ",
        col: " "
    };
    // mostRecentlyClicked = element;
    var className = element.classList;
    element.classList.add("active");
    pointThisTurn=false;
    for (var c = 0; c < className.length; c++){
        if (className[c].startsWith("line")){
            lineType = className[c];
            mostRecentlyClicked.lineType = className[c];
        }
        if (className[c].startsWith("row-")){
            rowNum = className[c][className[c].length - 1];
            mostRecentlyClicked.row = className[c][className[c].length - 1];
        }
        if (className[c].startsWith("col-")){
            colNum = className[c][className[c].length - 1];
            mostRecentlyClicked.col = className[c][className[c].length - 1];
        }
    }
    if (lineType === "linehorizontal"){
        hLines[rowNum][colNum].active = true;
    } else {
        vLines[rowNum][colNum].active = true;
    }
    checkCells();
    currentTurn();
};

function askQuestion(){
    var questions = [];
    questions[0] = "What is the most popular drink in the world that does not contain alcohol?";
    correctAnswer[0] = "Coffee";
    questions[1] = "What is the most common blood type in humans? Type: ";
    correctAnswer[1] = "O";
    questions[2] = "How many people were part of the main cast of the hit tv show Friends?";
    correctAnswer[2] = "6";
    questions[3] = "Who was Mario's best friend in Super Mario Bros";
    correctAnswer[3] = "Luigi";
    questions[4] = "What is the world’s fastest land animal?";
    correctAnswer[4] = "Cheetah";
    questions[5] = "What is the most used word";
    correctAnswer[5] = "The";
    questions[6]  = "What is the capital of California?";
    correctAnswer[6] = "Sacramento";
    questions[7] = "Whats the biggest ocean?";
    correctAnswer[7] = "Pacific";
    questions[8] = "What is the largest country by area?";
    correctAnswer[8] = "Russia";
    questions[9] = "What is the tallest mountain in the world?";
    correctAnswer[9] = "Mount Everest";
    questions[10] = "In what year did the United States gain independence?";
    correctAnswer[10] = "1776";
    questions[11] = "In cooking, margarine is used as a substitute for what ingredient?";
    correctAnswer[11]= "Butter";
    questions[12] = "What is one quarter of 1,000?";
    correctAnswer[12] = "250";
    questions[13] = "Babe Ruth is associated with which sport?";
    correctAnswer[13] = "Baseball";
    questions[14] = "The title role of the 1990 movie “Pretty Woman” was played by which actress?";
    correctAnswer[14] = "Julia Roberts";
    questions[15] = "Does sound travel faster through steel or water?";
    correctAnswer[15] = "Steel";
    questions[16] = "What is sushi traditionally wrapped in?";
    correctAnswer[16] = "Seaweed";
    questions[17] = "How many colors are there in a rainbow?";
    correctAnswer[17]="7";
    questions[18] = "What is the biggest city in the United States by population size?";
    correctAnswer[18]="New York City";
    questions[19] = "What is the biggest island in the world?";
    correctAnswer[19]="Greenland";
    questions[20] = "Which city is known as the City of Love?";
    correctAnswer[20]="Paris";
    questions[21] = "What is the only American state to begin with a P?";
    correctAnswer[21]="Pennsylvania";
    questions[22] = "What is soccer called in Europe?";
    correctAnswer[22]="Futbol";
    questions[23] = "What is the capital of Spain?";
    correctAnswer[23]="Madrid";
    questions[24] = "If you _________ too hard, you might fracture a rib.";
    correctAnswer[24]="Sneeze";
    questions[25] = "What do Italian's call pizza?";
    correctAnswer[25]="Pie";

    if(alreadyAsked.length === 25){
        alreadyAsked = [];
    }
    x = Math.floor(Math.random()*questions.length);
    if(alreadyAsked.includes(questions[x])) {
       askQuestion();
    }
    alreadyAsked.push(questions[x]);
    document.getElementById('question').innerHTML = questions[x];
};

function answerCorrect(){
    for (var cell = 0; cell < cellsNeedToBeFilled.length; cell++) {
        cellsNeedToBeFilled[cell].active = true;
        cellsNeedToBeFilled[cell].owner = turn;
        changeCellBackgroundColor(cellsNeedToBeFilled[cell].row,  cellsNeedToBeFilled[cell].col);
        assignPoints();

    }
};

function answerIncorrect(){
    currentCell.active = false;
    pointThisTurn=false;
    currentTurn();
    currentCell.owner = "";
    deactivateLastClickedLine();
};

function checkIfAnswerIsCorrect() {
    var userInput = document.getElementById('input_id').value;
    if (userInput.toLowerCase() === correctAnswer[x].toLowerCase()) {
        answerCorrect();
        askQuestion();
        cellCount++;
    }
    else {
        answerIncorrect();
    }
    cellsNeedToBeFilled = [];
    $('#myModal').modal('hide');
    checkIfGameOver();
};

function checkCells() {
    cells.forEach(function (cell) {
        if (checkLines(cell) && !cell.active && !cell.owner){
            displayQuestion();
            currentCell = cell;
            cellsNeedToBeFilled.push(cell);
        }
    });
};

function displayQuestion() {
    $('#myModal').modal('show');
    pointThisTurn = true;
};

function assignPoints() {
    if (turn === "p1") {
        p1points++;
        pointThisTurn = true;
        document.getElementById("p1").innerHTML = p1points;
    }
    else {
        p2points++;
        pointThisTurn = true;
        document.getElementById("p2").innerHTML = p2points;
    }
};

function deactivateLastClickedLine(){
    if(mostRecentlyClicked.lineType === "linehorizontal"){
        hLines[mostRecentlyClicked.row][mostRecentlyClicked.col].active = false;
        element.classList.remove("active");
    }
    else{
        vLines[mostRecentlyClicked.row][mostRecentlyClicked.col].active = false;
        element.classList.remove("active");
    }
}

function currentTurn(){
    if(pointThisTurn === false){
        turn = turn === "p1" ? "p2" : "p1";
    }
    updateDisplayedPlayerTurn();
};

function updateDisplayedPlayerTurn(){
    document.getElementById("turnTeller1").innerHTML = `Player ${turn === "p1" ? "1" : "2"} Go!`;
    return true;
};

function changeCellBackgroundColor(rowNum, colNum) {
    var htmlCells = [];
    htmlCells = document.getElementsByClassName("cell");
    for (var c = 0; c < htmlCells.length; c++) {
        if (htmlCells[c].classList.contains("row-" + rowNum) && htmlCells[c].classList.contains("col-" + colNum)) {
            htmlCells[c].classList.add(turn);
        }
    }
};

function makeItConfetti() {
    var confetti = document.querySelectorAll('.confetti');

    if (!confetti[0].animate) {
        return false;
    }

    for (var i = 0, len = confetti.length; i < len; ++i) {
        var snowball = confetti[i];
        snowball.innerHTML = '<div class="rotate"><div class="askew"></div></div>';
        var scale = Math.random() * .8 + .2;
        var player = snowball.animate([
            { transform: 'translate3d(' + (i/len*100) + 'vw,0,0) scale(' + scale + ')', opacity: scale },
            { transform: 'translate3d(' + (i/len*100 + 10) + 'vw,100vh,0) scale(' + scale + ')', opacity: 1 }
        ], {
            duration: Math.random() * 3000 + 3000,
            iterations: Infinity,
            delay: -(Math.random() * 5000)
        });


        confettiPlayers.push(player);
    }
}

function checkIfGameOver(){
    if((p1points + p2points === 25) && (p1points > p2points)){
        $('#p1modal').modal('show');
        makeItConfetti();
    }
    if((p1points + p2points === 25) && (p2points > p1points)){
        $('#p2modal').modal('show');
        makeItConfetti();
    }
}

function refreshPage(){
    window.location.reload();
}













//Tests
setUpBoard();
//checkCells();
//checkLines(cells[1]);