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
var alreadyAsked;

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
    var alreadyAsked = [];
    var questions = [];
    questions[0] = "What is 10/2?";
    questions[1] = "What is 30/3?";
    questions[2] = "What is 30/10?";
    questions[3] = "What is 10/10";
    questions[4] = "What is 100/10";
    questions[5] = "What is the most used word";
    correctAnswer[0] = "5";
    correctAnswer[1] = "10";
    correctAnswer[2] = "3";
    correctAnswer[3] = "1";
    correctAnswer[4] = "10";
    correctAnswer[5] = "the";
    x = Math.floor(Math.random() * questions.length);
    document.write(questions[x]);
    // if(alreadyAsked.includes(x))
    // {
    //     x = Math.floor(Math.random()*4);
    // }
    // document.write(questions[x]);
    // alreadyAsked.push(questions[x]);
    //checkIfAnswerIsCorrect();
};

function checkIfAnswerIsCorrect() {
        var userInput = document.getElementById('input_id').value;
        if (userInput === correctAnswer[x]) {
            assignPoints();
            currentCell.active = true;
            currentCell.owner = turn;
            changeCellBackgroundColor(currentCell.row, currentCell.col);
            alreadyAsked = true;
            $('#myModal').modal('hide');
            checkCells();
        }
            if(alreadyAsked){
                if(mostRecentlyClicked.lineType === "linehorizontal") {
                    changeCellBackgroundColor(currentCell.row, currentCell.col);
                    changeCellBackgroundColor(currentCell.row + 1, currentCell.col);
                    changeCellBackgroundColor(currentCell.row - 1, currentCell.col);
                }
                    else{
                        changeCellBackgroundColor(currentCell.row, currentCell.col);
                        changeCellBackgroundColor(currentCell.row, currentCell.col+1);
                        changeCellBackgroundColor(currentCell.row, currentCell.col-1);
                    }
                    assignPoints();
                    alreadyAsked = !alreadyAsked;
                    }
            // changeCellBackgroundColor(currentCell.row, currentCell.col);
            // alreadyAsked = true;
            // $('#myModal').modal('hide');
            // checkCells();
        else {
            currentCell.active = false;
            pointThisTurn=false;
            currentCell.owner = "";
            // changeCellBackgroundColor(currentCell.row, currentCell.col);
            deactivateLastClickedLine();
            $('#myModal').modal('hide');
        }
}

function checkCells() {
    cells.forEach(function (cell) {
        if (checkLines(cell) && !cell.active && !cell.owner){
            displayQuestion();
            currentCell = cell;
        }
    });
};

function displayQuestion() {
    if(!alreadyAsked){
        $('#myModal').modal('show');
        pointThisTurn = true;
    }
   else{
        pointThisTurn = true;
    }
}

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
    if(pointThisTurn ===false){
        turn = turn === "p1" ? "p2" : "p1";
    }
  updateDisplayedPlayerTurn();
};

function updateDisplayedPlayerTurn(){
    document.getElementById("turnTeller1").innerHTML = `Player ${turn === "p1" ? "1" : "2"} Go!`;
};

function changeCellBackgroundColor(rowNum, colNum) {
    var htmlCells = [];
    htmlCells = document.getElementsByClassName("cell");
    console.info(htmlCells);
    for (var c = 0; c < htmlCells.length; c++) {
        if (htmlCells[c].classList.contains("row-" + rowNum) && htmlCells[c].classList.contains("col-" + colNum)) {
            htmlCells[c].classList.add(turn);
        }
    }
}







//Tests
setUpBoard();
//checkCells();
//checkLines(cells[1]);






