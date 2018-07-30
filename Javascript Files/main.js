var cells;
var hLines;
var vLines;
var turn = "p1";
var p1points = 0;
var p2points = 23;
var pointThisTurn = false;
var rowNum;
var colNum;
var lineType;
var mostRecentlyClicked;
var x;
var correctAnswer = [];
var currentCell;
var element;
var cellsNeedToBeFilled = [];
var cellsNeedToBeFilledTrivia =[];
var alreadyAsked = [];
var alreadyAskedTrivia=[];
var confettiPlayers = [];
var xTrivia;
var trivia = false;
var countTimer=0;
var counter = 30;
var counterFlag = false;

function setUpBoard(){
    hLines=generateHorizontal(6,5);
    vLines=generateVertical(5,6);
    cells=generateCells(5,5);
    updateDisplayedPlayerTurn();
}

window.onload = function(){
    addListenerForHElements();
    addListenerForVElements();
}

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
}

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
}

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
}

function checkLines(cell){
    return (checkHorizontal(cell) && checkVertical(cell));
}

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
}

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
}

function addListenerForHElements(){
    var hElements = document.getElementsByClassName('linehorizontal');
    for(var i = 0; i < hElements.length; i++){
        hElements[i].addEventListener("click", clickFunction);
    }
}

function addListenerForVElements(){
    var vElements = document.getElementsByClassName('linevertical');
    for(var i = 0; i < vElements.length; i++){
        vElements[i].addEventListener("click", clickFunction);
    }
}

function onTimer() {
    document.getElementById('mycounter').innerHTML = counter;
    counter--;
    if (counter < 0) {
        $('#myModal').modal('hide');
        counterFlag = false;
        counter = 30;
        answerIncorrect();
        cellsNeedToBeFilled=[];
        // cellsNeedToBeFilledTrivia=[];
        setTimeout(onTimer, 1000);
    }

    else if (counterFlag) {
        setTimeout(onTimer, 1000);
    }
}

function onTimerTwo() {
    document.getElementById('mycounter').innerHTML = counter;
    counter--;
    if (counter < 0) {
        $('#myModal').modal('hide');
        counterFlag = false;
        counter = 30;
        answerIncorrect();
        cellsNeedToBeFilled=[];
        // cellsNeedToBeFilledTrivia=[];
        setTimeout(onTimer, 100000);
    }
    else if (counterFlag) {
        setTimeout(onTimer, 100000);
    }
}

function clickFunction(event) {
    element = event.target;
    mostRecentlyClicked = {
        element,
        lineType: " ",
        row: " ",
        col: " "
    };
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
    if (lineType === "linehorizontal" &&  hLines[rowNum][colNum].active !== true ){
        hLines[rowNum][colNum].active = true;
        checkCells();
        currentTurn();
    }
    if(lineType === "linevertical" &&  vLines[rowNum][colNum].active !== true)
    {
        vLines[rowNum][colNum].active = true;
        checkCells();
        currentTurn();
    }
}

function askQuestion(){
    var questions = [];
    questions[0] = "What is the most popular drink in the world that does not contain alcohol?";
    correctAnswer[0] = "Coffee";
    questions[1] = "What is the most common blood type in humans? Type: ";
    correctAnswer[1] = "O+";
    questions[2] = "How many people were part of the main cast of the hit tv show Friends?";
    correctAnswer[2] = "6";
    questions[3] = "Who was Mario's best friend in Super Mario Bros";
    correctAnswer[3] = "Luigi";
    questions[4] = "Which US state has the highest number of colleges and universities?";
    correctAnswer[4] = "California";
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
    questions[14] = "Spinach is high in which mineral?";
    correctAnswer[14] = "Iron";
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
    questions[26] = "Which planet is the closest to Earth?";
    correctAnswer[26]="Venus";
    questions[27] = "Which is the tallest mammal?";
    correctAnswer[27]="Giraffe";
    questions[28] = "What color is the circle on the Japanese national flag?";
    correctAnswer[28]="Red";
    questions[29] = "The title role of the 1990 movie \"Pretty Woman\" was played by which actress?";
    correctAnswer[29]="Julia Roberts";
    questions[30] = "How many sides does an octagon have?";
    correctAnswer[30]="8";
    questions[31] = "Who topped the Billboard charts with the single \"Love Yourself\" in February, 2016?";
    correctAnswer[31]="Justin Bieber";
    questions[32] = "What is the name of the Dr Seuss character who steals Christmas?";
    correctAnswer[32]="Grinch";
    questions[33] = "What is the name of the pirate in Peter Pan?";
    correctAnswer[33]="Captain Hook";
    questions[34] = "Which is the fastest land animal?";
    correctAnswer[34]="Cheetah";
    questions[35] = "What color are emeralds?";
    correctAnswer[35]="Green";
    questions[36] = "If you suffer from arachnophobia, which animal are you scared of?";
    correctAnswer[36]="Spiders";
    questions[37] = "Which movie features the song Ding Dong The Witch Is Dead?";
    correctAnswer[37]="Wizard of Oz";
    questions[38] = "Who was US president during World War I?";
    correctAnswer[38]="Woodrow Wilson";
    questions[39] = "What is the largest bone in the human body?";
    correctAnswer[39]="femur";
    questions[40] = "What is a female deer called?";
    correctAnswer[40]="Doe";
    questions[41] = "Ursula belonged to which Disney movie?";
    correctAnswer[41]="Little Mermaid";
    questions[42] = "What is the national sport of Canada?";
    correctAnswer[42]="Hockey";
    questions[43] = "What is rowing called in the United States?";
    correctAnswer[43]="Crew";
    questions[44] = "Soccer's international championship is known as?";
    correctAnswer[44]="World Cup";
    questions[45] = "What is the formula for water?";
    correctAnswer[45]="H2O";
    questions[46] = "Name the largest continent";
    correctAnswer[46]="Asia";
    questions[47] = "Name the largest country by population";
    correctAnswer[47]="China";
    questions[48] = "Who was the first president of the United States?";
    correctAnswer[48]="George Washington";
    questions[49] = "Who sings the song \"Poker Face\"?";
    correctAnswer[49]="Lady Gaga";
    questions[50] = "Where did the olympic games orginate?";
    correctAnswer[50]="Greece";
    if(alreadyAsked.length === 50){
        alreadyAsked = [];
    }
    x = Math.floor(Math.random()*questions.length);
    if(alreadyAsked.includes(questions[x])) {
        askQuestion();
    }
    alreadyAsked.push(questions[x]);
    document.getElementById('question').innerHTML = questions[x];
}

function answerCorrect(){
    for (var cell = 0; cell < cellsNeedToBeFilled.length; cell++) {
        cellsNeedToBeFilled[cell].active = true;
        cellsNeedToBeFilled[cell].owner = turn;
        changeCellBackgroundColor(cellsNeedToBeFilled[cell].row,  cellsNeedToBeFilled[cell].col);
        assignPoints();
    }
}

function answerIncorrect(){
    currentCell.active = false;
    pointThisTurn=false;
    currentTurn();
    currentCell.owner = "";
    deactivateLastClickedLine();
}

function answerCorrectTrivia(){
    for (var cell = 0; cell < cellsNeedToBeFilledTrivia.length; cell++) {
        cellsNeedToBeFilled[cell].active = true;
        cellsNeedToBeFilled[cell].owner = turn;
        changeCellBackgroundColor(cellsNeedToBeFilledTrivia[cell].row,  cellsNeedToBeFilledTrivia[cell].col);
        assignPoints();
    }
}

function answerIncorrectTrivia(){
    currentCell.active = false;
    pointThisTurn=false;
    currentTurn();
    currentCell.owner = "";
    deactivateLastClickedLine();
    askQuestionTrivia();
}


function checkIfAnswerIsCorrect() {
    var userInput = document.getElementById('input_id').value;
    if (userInput.toLowerCase() === correctAnswer[x].toLowerCase()) {
        answerCorrect();
        askQuestion();
    }
    else {
        answerIncorrect();
        askQuestion();
    }
    cellsNeedToBeFilled=[];
    $('#myModal').modal('hide');
    checkIfGameOver();
    counter = 30;
    counterFlag = false;
}

function checkCells() {
    cells.forEach(function (cell) {
        if (checkLines(cell) && !cell.active && !cell.owner){
            displayQuestion();
            currentCell = cell;
            cellsNeedToBeFilled.push(cell);
            twoManyCountDown();
        }
    });
}

function twoManyCountDown(){
    countTimer = cellsNeedToBeFilled.length;
    if(countTimer>=2){
        counter=30;
        onTimerTwo();
    }
    else{
        counter=30;
        onTimer();
    }
}

function displayQuestion() {
    $('#myModal').modal('show');
    pointThisTurn = true;
    counterFlag = true;
}

function assignPoints() {
    if (turn === "p1") {
        p1points++;
        document.getElementById("p1").innerHTML = p1points;
    }
    else {
        p2points++;
        document.getElementById("p2").innerHTML = p2points;
    }
    pointThisTurn = true;
}

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
}

function updateDisplayedPlayerTurn(){
    document.getElementById("turnTeller1").innerHTML = `Player ${turn === "p1" ? "1" : "2"} Go!`;
    return true;
}

function changeCellBackgroundColor(rowNum, colNum) {
    var htmlCells = [];
    htmlCells = document.getElementsByClassName("cell");
    for (var c = 0; c < htmlCells.length; c++) {
        if (htmlCells[c].classList.contains("row-" + rowNum) && htmlCells[c].classList.contains("col-" + colNum)) {
            htmlCells[c].classList.add(turn);
        }
    }
}

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
        return true;
    }
    if((p1points + p2points === 25) && (p2points > p1points)){
        $('#p2modal').modal('show');
        makeItConfetti();
        return true;
    }
}

function refreshPage(){
    window.location.reload();
}

values = [];

function addRecordQuestions() {
    var inp = document.getElementById('inputtext');
    values.push(inp.value);
    for (var cell = 0; cell < values.length; cell++) {
        document.getElementById('values1').innerHTML =  "1." + values[0];
        if(values[1] === undefined){
            break;
        }
        else {
            document.getElementById('values2').innerHTML = "2." + values[1];
        }
        if(values[2] === undefined) {
            break;
        }
        else {
            document.getElementById('values3').innerHTML = "3." + values[2];
        }
        if(values[3] === undefined) {
            break;
        }
        else{
            document.getElementById('values4').innerHTML = "4." + values[3];
        }
        if(values[4] === undefined) {
            break;
        }
        else{
            document.getElementById('values5').innerHTML = "5." + values[4];
        }
        if(values[5] === undefined) {
            break;
        }
        else{
            document.getElementById('values6').innerHTML = "6." + values[5];
        }
        if(values[6] === undefined) {
            break;
        }
        else{
            document.getElementById('values7').innerHTML = "7." + values[6];
        }
        if(values[7] === undefined) {
            break;
        }
        else{
            document.getElementById('values8').innerHTML = "8." + values[7];
        }
        if(values[8] === undefined) {
            break;
        }
        else{
            document.getElementById('values9').innerHTML = "9." + values[8];
        }
        if(values[9] === undefined) {
            break;
        }
        else{
            document.getElementById('values10').innerHTML = "10." + values[9];
        }
        if(values[10] === undefined) {
            break;
        }
        else{
            document.getElementById('values11').innerHTML = "11." + values[10];
        }
        if(values[11] === undefined) {
            break;
        }
        else{
            document.getElementById('values12').innerHTML = "12." + values[11];
        }
        if(values[12] === undefined) {
            break;
        }
        else{
            document.getElementById('values13').innerHTML = "13." + values[12];
        }
        if(values[13] === undefined) {
            break;
        }
        else{
            document.getElementById('values14').innerHTML = "14." + values[13];
        }
        if(values[14] === undefined) {
            break;
        }
        else{
            document.getElementById('values15').innerHTML = "15." + values[14];
        }
        if(values[15] === undefined) {
            break;
        }
        else{
            document.getElementById('values16').innerHTML = "16." + values[15];
        }
        if(values[16] === undefined) {
            break;
        }
        else{
            document.getElementById('values17').innerHTML = "17." + values[16];
        }
        if(values[17] === undefined) {
            break;
        }
        else{
            document.getElementById('values18').innerHTML = "18." + values[17];
        }
        if(values[18] === undefined) {
            break;
        }
        else{
            document.getElementById('values19').innerHTML = "19." + values[18];
        }
        if(values[19] === undefined) {
            break;
        }
        else{
            document.getElementById('values20').innerHTML = "20." + values[19];
        }
        if(values[20] === undefined) {
            break;
        }
        else{
            document.getElementById('values21').innerHTML = "21." + values[20];
        }
        if(values[21] === undefined) {
            break;
        }
        else{
            document.getElementById('values22').innerHTML = "22." + values[21];
        }
        if(values[22] === undefined) {
            break;
        }
        else{
            document.getElementById('values23').innerHTML = "23." + values[22];
        }
        if(values[23] === undefined) {
            break;
        }
        else{
            document.getElementById('values24').innerHTML = "24." + values[23];
        }
        if(values[24] === undefined) {
            break;
        }
        else{
            document.getElementById('values25').innerHTML = "25." + values[24];
        }
        if(values.length === 25){
            document.getElementById("done").innerHTML = "Complete";
        }
    }
    inp.value = "";
}

answers = [];

function addRecordAnswers() {
    var inp = document.getElementById('input');
    answers.push(inp.value);
    for (var cell = 0; cell < answers.length; cell++) {
        document.getElementById('answers1').innerHTML =  "1." + answers[0];
        if(answers[1] === undefined){
            break;
        }
        else {
            document.getElementById('answers2').innerHTML = "2." + answers[1];
        }
        if(answers[2] === undefined) {
            break;
        }
        else {
            document.getElementById('answers3').innerHTML = "3." + answers[2];
        }
        if(answers[3] === undefined) {
            break;
        }
        else{
            document.getElementById('answers4').innerHTML = "4." + answers[3];
        }
        if(answers[4] === undefined) {
            break;
        }
        else{
            document.getElementById('answers5').innerHTML = "5." + answers[4];
        }
        if(answers[5] === undefined) {
            break;
        }
        else{
            document.getElementById('answers6').innerHTML = "6." + answers[5];
        }
        if(answers[6] === undefined) {
            break;
        }
        else{
            document.getElementById('answers7').innerHTML = "7." + answers[6];
        }
        if(answers[7] === undefined) {
            break;
        }
        else{
            document.getElementById('answers8').innerHTML = "8." + answers[7];
        }
        if(answers[8] === undefined) {
            break;
        }
        else{
            document.getElementById('answers9').innerHTML = "9." + answers[8];
        }
        if(answers[9] === undefined) {
            break;
        }
        else{
            document.getElementById('answers10').innerHTML = "10." + answers[9];
        }
        if(answers[10] === undefined) {
            break;
        }
        else{
            document.getElementById('answers11').innerHTML = "11." + answers[10];
        }
        if(answers[11] === undefined) {
            break;
        }
        else{
            document.getElementById('answers12').innerHTML = "12." + answers[11];
        }
        if(answers[12] === undefined) {
            break;
        }
        else{
            document.getElementById('answers13').innerHTML = "13." + answers[12];
        }
        if(answers[13] === undefined) {
            break;
        }
        else{
            document.getElementById('answers14').innerHTML = "14." + answers[13];
        }
        if(answers[14] === undefined) {
            break;
        }
        else{
            document.getElementById('answers15').innerHTML = "15." + answers[14];
        }
        if(answers[15] === undefined) {
            break;
        }
        else{
            document.getElementById('answers16').innerHTML = "16." + answers[15];
        }
        if(answers[16] === undefined) {
            break;
        }
        else{
            document.getElementById('answers17').innerHTML = "17." + answers[16];
        }
        if(answers[17] === undefined) {
            break;
        }
        else{
            document.getElementById('answers18').innerHTML = "18." + answers[17];
        }
        if(answers[18] === undefined) {
            break;
        }
        else{
            document.getElementById('answers19').innerHTML = "19." + answers[18];
        }
        if(answers[19] === undefined) {
            break;
        }
        else{
            document.getElementById('answers20').innerHTML = "20." + answers[19];
        }
        if(answers[20] === undefined) {
            break;
        }
        else{
            document.getElementById('answers21').innerHTML = "21." + answers[20];
        }
        if(answers[21] === undefined) {
            break;
        }
        else{
            document.getElementById('answers22').innerHTML = "22." + answers[21];
        }
        if(answers[22] === undefined) {
            break;
        }
        else{
            document.getElementById('answers23').innerHTML = "23." + answers[22];
        }
        if(answers[23] === undefined) {
            break;
        }
        else{
            document.getElementById('answers24').innerHTML = "24." + answers[23];
        }
        if(answers[24] === undefined) {
            break;
        }
        else{
            document.getElementById('answers25').innerHTML = "25." + answers[24];
        }
        if(answers.length === 25){
            document.getElementById("done2").innerHTML = "Complete";
            break;
        }
    }
    inp.value = "";
}

function startTrivia() {
    if (values.length >= 25 && answers.length >= 25) {
        trivia = true;
        document.getElementById("box").style.display = "none";
        document.getElementById("grid").style.display = "block";
        document.getElementById("startbutton").style.display = "none";
        document.getElementById("t").style.display="block";
        askQuestionTrivia();
    }
    else{
        $('#modalwrong').modal('show');
    }
}

function askQuestionTrivia(){
    if(alreadyAskedTrivia.length === 25){
        alreadyAskedTrivia = [];
    }
    xTrivia = Math.floor(Math.random()*values.length);
    // if(alreadyAsked.includes(values[xTrivia])) {
    //     askQuestionTrivia();
    // }
    // alreadyAsked.push(values[xTrivia]);
    document.getElementById("questionTrivia").innerHTML = values[xTrivia];
}

function checkIfAnswerIsCorrectTrivia(){
    var userInput = document.getElementById("inputgrid").value;
    if (userInput.toLowerCase() === answers[xTrivia].toLowerCase()) {
        answerCorrect();
        askQuestionTrivia();
        $('#myModal').modal('hide');
    }
    else {
        answerIncorrect();
        askQuestionTrivia();
        $('#myModal').modal('hide');
    }
    cellsNeedToBeFilled=[];
    checkIfGameOver();
    counter = 30;
    counterFlag = false;
}















//Tests
setUpBoard();
//checkCells();
//checkLines(cells[1]);