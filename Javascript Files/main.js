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
var mostRecentlyClicked;
var x;
var correctAnswer = [];
var currentCell;
var currentlyClickedLine;
var cellsNeedToBeFilled = [];
var alreadyAsked = [];
var alreadyAskedTrivia =[];
var confettiPlayers = [];
var xTrivia;
var trivia = false;
var countTimer=0;
var counter = 30;
var counterFlag = false;
var questionAnsweredGlobal;
var className;
var questions;
var questionAnswered;
values = [];
answers = [];

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
        answerIncorrect();
        setTimeout(onTimer, 1000);
        playWrongSound();
        resetVariables();
        callAskQuestion();
    }
    else if (counterFlag) {
        setTimeout(onTimer, 1000);
    }
}

function playWrongSound(){
    var obj = document.createElement("audio");
    obj.src="https://www.soundjay.com/misc/sounds/fail-trombone-03.mp3";
    obj.volume=0.10;
    obj.autoPlay=false;
    obj.preLoad=true;
    obj.play();
}

function playCorrectSound(){
    var obj = document.createElement("audio");
    obj.src="https://www.soundjay.com/misc/sounds/magic-chime-02.mp3";
    obj.volume=0.10;
    obj.autoPlay=false;
    obj.preLoad=true;
    obj.play();
}

function playWinnerSound(){
    var obj = document.createElement("audio");
    obj.src="https://www.soundjay.com/human/sounds/applause-01.mp3";
    obj.volume=0.10;
    obj.autoPlay=false;
    obj.preLoad=true;
    obj.play();
}

function callAskQuestion(){
    if(trivia){
        askQuestionTrivia();
    }
    else{
        askQuestion();
    }
}

function onTimerForTwoSquares() {
    document.getElementById('mycounter').innerHTML = counter;
    counter--;
    if (counter < 0) {
        $('#myModal').modal('hide');
        counterFlag = false;
        counter = 30;
        answerIncorrect();
        cellsNeedToBeFilled=[];
        playWrongSound();
        setTimeout(onTimer, 100000);
        callAskQuestion();
    }
    else if (counterFlag) {
        setTimeout(onTimer, 100000);
    }
}

function clickFunction(event) {
    currentlyClickedLine = event.target;
    mostRecentlyClicked = {
        currentlyClickedLine,
        lineType: " ",
        row: " ",
        col: " "
    };
    className = currentlyClickedLine.classList;
    currentlyClickedLine.classList.add("active");
    pointThisTurn=false;
    assignRowNumAndColNum();
    setLineToActive();
}

function assignRowNumAndColNum(){
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
}

function setLineToActive(){
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

function assignQuestions(){
    questions = [];
    questions[0] = "What is the most popular drink in the world that does not contain alcohol?";
    correctAnswer[0] = "Coffee";
    questions[1] = "What is the most common blood type in humans? Type: ";
    correctAnswer[1] = "O+,o positive,o";
    questions[2] = "How many people were part of the main cast of the hit tv show Friends?";
    correctAnswer[2] = "6,six";
    questions[3] = "Who was Mario's best friend in Super Mario Bros";
    correctAnswer[3] = "Luigi";
    questions[4] = "Which US state has the highest number of colleges and universities?";
    correctAnswer[4] = "California";
    questions[5] = "What is the most used word";
    correctAnswer[5] = "The";
    questions[6]  = "What is the capital of California?";
    correctAnswer[6] = "Sacramento";
    questions[7] = "Whats the biggest ocean?";
    correctAnswer[7] = "Pacific,Pacific Ocean";
    questions[8] = "What is the largest country by area?";
    correctAnswer[8] = "Russia";
    questions[9] = "What is the tallest mountain in the world?";
    correctAnswer[9] = "Mount Everest,Everest";
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
    correctAnswer[17]="7,seven";
    questions[18] = "What is the biggest city in the United States by population size?";
    correctAnswer[18]="New York City,New York,NYC";
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
    questions[27] = "What is the tallest mammal?";
    correctAnswer[27]="A Giraffe,giraffes,Giraffe";
    questions[28] = "What color is the circle on the Japanese national flag?";
    correctAnswer[28]="Red";
    questions[29] = "The Statue of Liberty was given to the United States by which country?";
    correctAnswer[29]="france";
    questions[30] = "How many sides does an octagon have?";
    correctAnswer[30]="8,eight";
    questions[31] = "Who topped the Billboard charts with the single \"Love Yourself\" in February, 2016?";
    correctAnswer[31]="Justin Bieber,Bieber";
    questions[32] = "What is the name of the Dr Seuss character who steals Christmas?";
    correctAnswer[32]="Grinch";
    questions[33] = "What is the name of the pirate in Peter Pan?";
    correctAnswer[33]="Captain Hook,Hook";
    questions[34] = "What is the fastest land animal?";
    correctAnswer[34]="Cheetah,Cheetahs ";
    questions[35] = "What color are emeralds?";
    correctAnswer[35]="Green";
    questions[36] = "If you suffer from arachnophobia, what insect are you scared of?";
    correctAnswer[36]="Spiders,spider";
    questions[37] = "Which movie features the song Ding Dong The Witch Is Dead?";
    correctAnswer[37]="Wizard of Oz";
    questions[38] = "Who was US president during World War I?";
    correctAnswer[38]="Woodrow Wilson,Wilson";
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
    questions[44] = "What is the boiling point of water in degrees Celsius?";
    correctAnswer[44]="100,100 degrees,100 degrees celsius";
    questions[45] = "What is the formula for water?";
    correctAnswer[45]="H2O";
    questions[46] = "Name the largest continent";
    correctAnswer[46]="Asia";
    questions[47] = "Name the largest country by population";
    correctAnswer[47]="China";
    questions[48] = "Who was the first president of the United States?";
    correctAnswer[48]="George Washington,Washington";
    questions[49] = "Who sings the song \"Poker Face\"?";
    correctAnswer[49]="Lady Gaga,Gaga";
    questions[50] = "Where did the olympic games originate?";
    correctAnswer[50]="Greece";
}

function askQuestion(){
    assignQuestions();
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

function answerCorrectEdgeCases(){
    answerCorrect();
    askQuestion();
    questionAnswered = true;
    questionAnsweredGlobal=true;
}

function checkIfAnswerIsCorrect() {
    questionAnswered = false;
    edgeCases();
    if(questionAnswered ===false) {
        answerIncorrect();
        askQuestion();
        questionAnsweredGlobal=false;
    }
    resetVariables();
    checkIfGameOver();
    $('#myModal').modal('hide');
}

function edgeCases(){
    var userInput = document.getElementById('input_id').value;
    var answerArr = correctAnswer[x].split(",");
    for(var i=0; i<answerArr.length; i++) {
        if (answerArr[i].toLowerCase() === userInput.toLowerCase())
            answerCorrectEdgeCases();
        if (userInput.toLowerCase() === "The " + answerArr[i].toLowerCase() || userInput.toLowerCase() === "the " + answerArr[i].toLowerCase() || userInput.toLowerCase() === "THE " + answerArr[i].toLowerCase())
            answerCorrectEdgeCases();
        if (userInput.toLowerCase() === "A " + answerArr[i].toLowerCase() || userInput.toLowerCase() === "a " + answerArr[i].toLowerCase())
            answerCorrectEdgeCases();
    }
}

function resetVariables(){
    cellsNeedToBeFilled=[];
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
        onTimerForTwoSquares();
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
    }
    else{
        vLines[mostRecentlyClicked.row][mostRecentlyClicked.col].active = false;
    }
    currentlyClickedLine.classList.remove("active");
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
        document.getElementById("winner").innerHTML = "Player 1 Wins!";
        makeItConfetti();
        return true;
    }
    if((p1points + p2points === 25) && (p2points > p1points)){
        $('#p1modal').modal('show');
        document.getElementById("winner").innerHTML = "Player 2 Wins!";
        makeItConfetti();
        return true;
    }
}

function refreshPage(){
    window.location.reload();
}

function addQuestionsToValuesArrayForTrivia(){
    for (var cell = 0; cell < values.length; cell++) {
        document.getElementById(`values${cell+1}`).innerHTML =  `${cell+1}.` + values[cell];
        if(`values${cell+1}` === undefined){
            break;
        }
        if(values.length === 25){
            $('#25questions').modal('show');
        }
    }
}

function addAnswersToAnswersArrayForTrivia(){
    for (var cell = 0; cell < answers.length; cell++) {
        document.getElementById(`answers${cell+1}`).innerHTML =  `${cell+1}.` + answers[cell];
        if(`answers${cell+1}` === undefined){
            break;
        }
        if(answers.length === 25){
            $('#25questions').modal('show');
        }
    }
}

function addRecordQuestions() {
    var inp = document.getElementById('inputtext');
    values.push(inp.value);
    addQuestionsToValuesArrayForTrivia();
    inp.value = "";
}

function addRecordAnswers() {
    var inp = document.getElementById('input');
    answers.push(inp.value);
    addAnswersToAnswersArrayForTrivia();
    inp.value = "";
}

function startTrivia() {
    if (values.length >= 10 && answers.length >= 10) {
        trivia = true;
        transitionToGridFromTrivia();
        askQuestionTrivia();
    }
    else{
        $('#modalwrong').modal('show');
    }
}

function transitionToGridFromTrivia(){
    document.getElementById("box").style.display = "none";
    document.getElementById("grid").style.display = "block";
    document.getElementById("startbutton").style.display = "none";
    document.getElementById("t").style.display="block";
}

function askQuestionTrivia(){
    if(alreadyAskedTrivia.length === values.length){
        alreadyAskedTrivia = [];
    }
    xTrivia = Math.floor(Math.random() * values.length);
    // while(alreadyAskedTrivia.includes(values[xTrivia])) {
    //     xTrivia = Math.floor(Math.random() * values.length);
    // }
    // alreadyAskedTrivia.push(values[xTrivia]);
    document.getElementById('questionTrivia').innerHTML = values[xTrivia];
}

function checkIfAnswerIsCorrectTrivia(){
    var userInput = document.getElementById("inputgrid").value;
    if (userInput.toLowerCase() === answers[xTrivia].toLowerCase()) {
        answerCorrect();
    }
    else {
        answerIncorrect();
    }
    askQuestionTrivia();
    resetVariables();
    checkIfGameOver();
    $('#myModal').modal('hide');
}

function playSound(){
    if(pointThisTurn=== true){
       playCorrectSound();
    }
    else{
        playWrongSound();
    }
    if(checkIfGameOver() === true){
        playWinnerSound();
    }
}

function enterKey(){
    document.getElementById('input_id').onkeydown = function(e){
        if(e.keyCode == 13){
            checkIfAnswerIsCorrect();
            playSound();
        }
    };
}

function enterButton(){
    $(document).ready(function() {
        $(".playSound").click(function() {
          playSound();
        });
    });
}

function enterKeyTrivia() {
    document.getElementById('inputgrid').onkeydown = function (e) {
        if (e.keyCode == 13) {
            checkIfAnswerIsCorrectTrivia();
            playSound();
        }
    };
}

function openModal(){
    $('#myModal').on('hidden.bs.modal', function() {
        $(this)
            .find("input,textarea,select").val('');
    });
    $.fn.modal.prototype.constructor.Constructor.DEFAULTS.backdrop = 'static';
}

function enterKeyAnswers(){
    document.getElementById('input').onkeydown = function(e) {
        if (e.keyCode == 13) {
            addRecordAnswers();
        }
    }
}

function enterKeyQuestions(){
    document.getElementById('inputtext').onkeydown = function(e) {
        if (e.keyCode == 13) {
            addRecordQuestions();
        }
    }
}

function createDiv() {
        var boardDiv = document.createElement("div");
        boardDiv.className = "confetti";
        return boardDiv;
}

function createAndModifyDivsConfetti() {
    createDiv();
        var board = document.getElementById("confetti-land"),
            myDivs = [],
            i = 0,
            numOfDivs = 350;
        for (i; i < numOfDivs; i += 1) {
            myDivs.push(createDiv());
            board.appendChild(myDivs[i]);
    }
}

setUpBoard();