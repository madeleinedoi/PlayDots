
//global variables
var cells;
var hLines;
var vLines;
var turn = "p1";
var turnCount = 1;
var p1points = 0;
var p2points = 0;
pointThisTurn = false;
var rowNum;
var colNum;
var lineType;
// let solvedQuestion = false;


//set ups hLines and vLines variables by
//generating all the corresponding lines in an array
function setUpBoard(){
    hLines=generateHorizontal(6,5);
    vLines=generateVertical(5,6);
    cells=generateCells(5,5);
    updateDisplayedPlayerTurn();
}
window.onload = function(){
    addListenerForHElements();
    addListenerForVElements();
};


//generates all the cells coordinates using the row and col (25 total)
//also keeps track of active variable and owner at each coordinate
function generateCells(numCol, numRow) {
    var cells = [];
    for (var col = 0; col < numCol; col++) {
        for (var row = 0; row < numRow; row++) {
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

//generates all the horizontal lines row and col
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




//generates all the vertical lines row and col
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



//checks if a full cell is filled/active
function checkLines(cell){
    return (checkHorizontal(cell) && checkVertical(cell));
};

//checks if the two corresponding horizontal lines of a cell are active
function checkHorizontal(cell){
    var topline = false;
    var bottomline = false;
    if (hLines[cell.row][cell.col].active) {
        topline = true;
    }
    if (hLines[cell.row+1][cell.col].active) {
        bottomline = true;
    }
    return topline && bottomline;
};


//checks if the two corresponding vertical lines of a cell are active
function checkVertical(cell) {
    var rightline = false;
    var leftline = false;
    if (vLines[cell.row][cell.col].active) {
        rightline = true;
    }
    if (vLines[cell.row][cell.col+1].active) {
        leftline = true;
    }
    return leftline && rightline;
};

//when hElements are clicked, the click function is called
//and the active variable at that place in the
//hLines array will be set to true
function addListenerForHElements(element) {
    var hElements = document.getElementsByClassName('linehorizontal');
    for(var i = 0; i < hElements.length; i++){
        hElements[i].addEventListener("click", clickFunction);
    }
};
//when velements are clicked, the click function is called
//and the active variable at that place in the
//vLines array will be set to true
function addListenerForVElements() {
    var vElements = document.getElementsByClassName('linevertical');
    for(var i = 0; i < vElements.length; i++){
        vElements[i].addEventListener("click", clickFunction);
    }
};

//changes color when line is clicked
function clickFunction(event) {
    var element = event.target;
    var className = element.classList;
    element.classList.add("active");
    turnCount++;
    pointThisTurn=false;
    //computing the row and col of the clicked line
    for (var c = 0; c < className.length; c++) {
        if (className[c].startsWith("line")) {
            lineType = className[c];
        }
        if (className[c].startsWith("row-")) {
            rowNum = className[c][className[c].length - 1];
        }
        if (className[c].startsWith("col-")) {
            colNum = className[c][className[c].length - 1];
        }
    }
    //updating the vLines and hLines arrays
    //by changing clicked lines' active variable to true
    if (lineType === "linehorizontal") {
        hLines[rowNum][colNum].active = true;
    } else {
        vLines[rowNum][colNum].active = true;
    }
    checkCells();
    currentTurn();
};


//checks if cell is filled by calling the checkLines function
//if it is filled then change cells active variable to true and
//determine the owner by using the currentTurn variable
function checkCells() {
    console.log(turn);
    cells.forEach(function (cell) {
        if (checkLines(cell) && !cell.active && !cell.owner){
            var questions = [];
            questions[0]="What is the capital of California?";
            var correctanswers = [];
            correctanswers[0] = "Sacramento";
            var txt;
            var userInput = prompt(questions[0], "...");


            // let correctAnswer = askQuestion();
            // if(correctAnswer && !solvedQuestion){
            //     solvedQuestion = true;
            if (userInput == correctanswers[0] && turn === "p1"){
                txt = "P1 Correct!";
                cell.active = true;
                cell.owner = turn;
                pointThisTurn=true;
                changeCellBackgroundColor(cell.row, cell.col);
                p1points++;
                document.getElementById("p1").innerHTML = p1points;
            }
            else if (userInput == correctanswers[0] && turn === "p2"){
                txt = "P2 Correct!";
                cell.active = true;
                cell.owner = turn;
                pointThisTurn=true;
                changeCellBackgroundColor(cell.row, cell.col);
                p2points++;
                document.getElementById("p2").innerHTML = p2points;
            }
            // else{
            //     cell.active = false;
            //     cell.owner = "";
            //     pointThisTurn=false;
            //     txt = "Next Player Please Take Your Turn";
            //
            // }

            else if(lineType===linehorizontal) {
                cell.active = false;
                cell.owner = "";
                pointThisTurn=false;
                txt = "Next Player Please Take Your Turn";
                hLines[rowNum][colNum].active = false;
            }
            else{
                cell.active = false;
                cell.owner = "";
                pointThisTurn= false;
                txt = "Next Player Please Take Your Turn";
                vLines[rowNum][colNum].active = false;
            }
            document.getElementById("demo").innerHTML = txt;


            // } else {
            //     deactivateLine(row, col);
            // }
    }
    });
};


//switches between player 1's turn and player 2's turn
function currentTurn(){
    if(!pointThisTurn){
        turn = turn === "p1" ? "p2" : "p1";
        let solvedQuestion = false;
    }
  updateDisplayedPlayerTurn();
};


function updateDisplayedPlayerTurn(){
    document.getElementById("turnTeller1").innerHTML = `Player ${turn === "p1" ? "1" : "2"} Go!`;
};

function changeCellBackgroundColor(rowNum, colNum){
    var htmlCells= [];
    htmlCells = document.getElementsByClassName("cell");
    console.info(htmlCells);
    for(var c = 0; c<htmlCells.length; c++){
        if (htmlCells[c].classList.contains("row-" + rowNum) && htmlCells[c].classList.contains("col-" + colNum)) {
            htmlCells[c].classList.add(turn);
        }
    }
};

// function askQuestion(){
//     var questions = [];
//     questions[0]="What is the capital of California?";
//     var correctanswers = [];
//     correctanswers[0] = "Sacramento";
//     var txt;
//     var userInput = prompt(questions[0], "...");
//     if (userInput == correctanswers[0]) {
//         txt = "Correct!";
//     } else {
//         txt = "Next Player Please Take Your Turn";
//     }
//     document.getElementById("demo").innerHTML = txt;
//
//
// }
// function askQuestion() {
//     var questions = [];
//     questions[0]="What is the capital of California?";
//     var correctanswers = [];
//     correctanswers[0] = "Sacramento";
//     prompt(questions[0], "...");
//         case "Martini":
//             text = "Excellent choice. Martini is good for your soul.";
//             break;
//         case "...":
//             text = "Daiquiri is my favorite too!";
//             break;
//         case "Cosmopolitan":
//             text = "Really? Are you sure the Cosmopolitan is your favorite?";
//             break;
//         default:
//             text = "I have never heard of that one..";
//     }

// function askQuestion() {
//     var questions = [
//         {
//             question: "What is 10/2?",
//             answers: {
//                 a: '3',
//                 b: '5',
//                 c: '115'
//             },
//             correctAnswer: 'b'
//         },
//         {
//             question: "What is 30/3?",
//             answers: {
//                 a: '3',
//                 b: '5',
//                 c: '10'
//             },
//             correctAnswer: 'c'
//         }
//     ];
//     for(var i = 0; i< questions.length; i++){
//         var prompt = prompt("questions[i]", " ");
//         var userInput = ;
//     }
//     if(userInput===questions[i].correctAnswer){
//         return true;
//     }
//     else{
//         return false;
//     }
// }



//Tests
setUpBoard();
//checkCells();
//checkLines(cells[1]);






