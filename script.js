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
let currentTurn;
function clickFunction(event) {
    var rowNum;
    var colNum;
    var element = event.target;
    var className = element.classList;
    turnCount++;
    currentTurn="p1";
    if (turnCount%2 === 0){
        currentTurn = "p2";
        element.classList.add("activept");
    }
    else{
        currentTurn = "p1";
        element.classList.add("activepo");}

    for (var c = 0; c < className.length; c++) {
        if (className[c].startsWith("row-")){
            rowNum = className[c].length - 1;}
        if (className[c].startsWith("col-")) {
            colNum = className[c].length - 1;}
        // target.addClass("linehorizontal:active");
    }
    //update row and col for each line
    // if(element.classList[rowNum][colNum].contains("active")){
    //     element.classList[rowNum][colNum].
}
var p1points, p2points;
function checkCells(){
    cells.forEach(function(cell){
        if(checkLines(cell)){
            cell.active=true;
            cell.owner= currentTurn;//change later
            console.log(cell.owner);
        }
        if(cell.active==="true"){
            if(currentTurn ==="p1"){
                p1points++;}
            else{
                p2points++;
            }
        }
        // console.info(p1points);
        // console.info(p2points);
        //console.info(`${cell.row}:${cell.col} is${cell.filled ? "" : " not"} filled.`);
        //change score here
    });
}

// function clickFunction(element){
//     document.log(document.getElementById("hor1").getElementsByClassName("linehorizontal")[0]);
//     document.getElementById("hor1").getElementsByClassName("linehorizontal")[0].style.backgroundColor = "red";
// }

//Tests
setUpBoard();
checkCells();
//console.info(checkCells(cells));//Test



