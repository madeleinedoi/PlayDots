var cells, hLines, vLines;
// var hl = [
//     {col:1 row:1} ,{col:2, row:1}];
// var vl = [{row:1 col:1},{row:1 col:2}];

function generateCells(numCol, numRow){
    var cells = [];
    for(var col =0; col<numCol; col++){
        for(var row =0; row<numRow; row++){
            cells.push({
                col:col,
                row:row,
                active:false,
                owner:""
            })
        }

    }
    return cells;
};


function generateHorizontal(numCol,numRow){
    var cells = [];
    for(var col =0; col<numCol; col++){
        for(var row =0; row<=numRow; row++){
            cells.push({
                col:col,
                row:row,
                active:false,

            })
        }

    }
    return cells;
};
//console.info(generateHorizontal(4, 3));//Test

function generateVertical(numCol,numRow){
    var cells = [];
    for(var col =0; col<=numCol; col++){
        for(var row =0; row<numRow; row++){
            cells.push({
                col:col,
                row:row,
                active:false,
            })
        }

    }
    return cells;
};
//console.info(generateVertical(2, 2));//Test


var $quoteBox = document.getElementById('quotebox');
var quotesList = [
    {
        quote: " ",
    }
];
function randomQuote() {
    var randIdx = Math.floor(Math.random() * quotesList.length);
    var randQuote = quotesList[randIdx];
    $quoteBox.setAttribute('style','font-size: 25px; color: darkmagenta; text-align:center;');
    $quoteBox.innerHTML = "Player 1, please take your turn to begin";
}


// function points(cells){
//     for(var c=0; c< cells.length; c++){
//         if(cells[c]==="active"){
//             if(playerTurn === "p1")){
//                 p1points++;}
//             else{
//                 p2points++;}
// }
// }
// }

function checkLines(cell){
    return (checkHorizontal(cell) && checkVertical(cell));

}
function checkCells(){
    cells.forEach(function(cell){
        if(checkLines(cell)){
            cell.filled=true;
            cell.owner="owned";//change later
        }
        //console.info(`${cell.row}:${cell.col} is${cell.filled ? "" : " not"} filled.`);
        //change score here

    });
}

function setUpBoard(){
    hLines=generateHorizontal(5,5);
    vLines=generateVertical(5,5);
    cells=generateCells(5,5);

}

function checkHorizontal(cell) {
    var topline = false;
    var bottomline = false;
    hLines.forEach(function(line) {
        if (line.col === cell.col && line.row === cell.row && line.active) {
            topline = true;
        }
        if (line.col === cell.col && line.row === cell.row + 1 && line.active) {
            bottomline = true;
        }
    });
    return topline && bottomline;
};

function checkVertical(cell) {
    var rightline = false;
    var leftline = false;
    vLines.forEach(function(line) {
        if (line.col === cell.col && line.row === cell.row && line.active) {
            leftline = true;
        }
        if (line.col === cell.col+1 && line.row === cell.row && line.active) {
            rightline = true;
        }

    })
    return leftline && rightline;
};


function addListenerForHElements(element) {
    var hElements = document.getElementsByClassName('linehorizontal');
    for(var i = 0; i < hElements.length; i++){
        hElements[i].addEventListener("click", clickFunction)
    }
}
window.onload = function(){
    addListenerForHElements();
    addListenerForVElements();
};
function addListenerForVElements(element) {
    var vElements = document.getElementsByClassName('linevertical');
    for(var i = 0; i < vElements.length; i++){
        vElements[i].addEventListener("click", clickFunction)
    }
}
var turnCount = 0;
 function clickFunction(event) {
     var rowNum;
     var colNum;
     var element = event.target;
     var className = element.classList;
     turnCount++;
     let currentTurn = "p1";
     if (turnCount%2 === 0) {
         currentTurn = "p2";
         element.classList.add("active");
     }
     else{
         currentTurn = "p1";
         element.classList.add("active");}
     console.info(currentTurn);

     for (var c = 0; c < className.length; c++) {
         if (className[c].startsWith("row-")){
             rowNum = className[c].length - 1;
         }
         if (className[c].startsWith("col-")) {
             colNum = className[c].length - 1;
         }
        // target.addClass("linehorizontal:active");
     }
     //update row and col for each line
     // if(element.classList[rowNum][colNum].contains("active")){
     //     element.classList[rowNum][colNum].
 }


// function clickFunction(element){
//     document.log(document.getElementById("hor1").getElementsByClassName("linehorizontal")[0]);
//     document.getElementById("hor1").getElementsByClassName("linehorizontal")[0].style.backgroundColor = "red";
// }

//Tests
//setUpBoard();
//console.info(checkCells(cells));//Test




//Work in Progress:
// function gameOver(){
//     if(filledCount === numOfCells){
//         return "Game Over";
//     }
// }
