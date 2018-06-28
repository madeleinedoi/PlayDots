
//global variables
let currentTurn;
var p1points, p2points;
var turnCount = 0;
var cells;
var hLines;
var vLines;

//set ups hLines and vLines variables by
//generating all the corresponding lines in an array
function setUpBoard(){
    hLines=generateHorizontal(5,5);
    vLines=generateVertical(5,5);
    cells=generateCells(5,5);
    currentTurn = "p1";
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
    for(var j =0; j<numCol; j++){
        var row = [];
        for(var i =0; i<=numRow; i++){
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

//console.info(generateHorizontal(4, 3));//Test


//generates all the vertical lines row and col
function generateVertical(numCol,numRow){
    var cells = [];
    for(var j =0; j<=numCol; j++){
        var row = [];
        for(var i =0; i<numRow; i++){
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
//console.info(generateVertical(5, 5));//Test


//checks if a full cell is filled/active
function checkLines(cell){
    return (checkHorizontal(cell) && checkVertical(cell));
}

//checks if the two corresponding horizontal lines of a cell are active
function checkHorizontal(cell) {
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

//when helements are clicked, the click function is called
//and the active variable at that place in the
//hLines array will be set to true
function addListenerForHElements(element) {
    var hElements = document.getElementsByClassName('linehorizontal');
    for(var i = 0; i < hElements.length; i++){
        hElements[i].addEventListener("click", clickFunction);
        // hLines[i].setAttribute("active", true);
        }
}
//when velements are clicked, the click function is called
//and the active variable at that place in the
//vLines array will be set to true
function addListenerForVElements() {
    var vElements = document.getElementsByClassName('linevertical');
    for(var i = 0; i < vElements.length; i++){
        vElements[i].addEventListener("click", clickFunction);
        // vLines[i].setAttribute("active", true);
    }
}


//changes color when line is clicked
//updates currentTurn
function clickFunction(event) {
    var rowNum;
    var colNum;
    var lineType;
    var element = event.target;
    var className = element.classList;
    turnCount++;
    //determines whose turn it is and makes the line active
    if (turnCount % 2 === 0) {
        currentTurn = "p2";
        element.classList.add("active");
    }
    else {
        currentTurn = "p1";
        element.classList.add("active");
    }
    //computing the row and col of the clicked line
    for (var c = 0; c < className.length; c++) {
        if (className[c].startsWith("line")) {
            lineType = className[c];
        }
        if (className[c].startsWith("row-")) {
            rowNum = className[c].length - 1;
        }
        if (className[c].startsWith("col-")) {
            colNum = className[c].length - 1;
        }
        // target.addClass("linehorizontal:active");
    }
    //updating the vLines and hLines arrays
    //by changing clicked lines' active variable to true
       if(lineType==="linehorizontal"){
            let test;
            console.info(hLines[rowNum][colNum]);
            hLines[rowNum][colNum].active=true;
        } else{
           vLines[rowNum][colNum].active=true;
        }
    }


//checks if cell is filled by calling the checkLines function
//if it is filled then change cells active variable to true and
//determine the owner by using the currentTurn variable
//also determine points by using the currentTurn
    function checkCells() {
        cells.forEach(function (cell) {
            if (checkLines(cell)) {
                cell.active = true;
                if (!cell.owner) {
                    cell.owner = currentTurn;
                }
            }
            if (cell.active = true) {
                if (currentTurn === "p1") {
                    p1points++;
                }
                else {
                    p2points++;
                }
            }
            console.info(p1points);
            //console.info(p2points);
        });
}












// function points(){
// var p1, p2;
// if(p1){
//     p1points++;}
// else{
//     p2points++;}
// p1=!p1;
// }

//Tests
setUpBoard();
// checkCells();
//console.info(checkCells(cells));//Test





// var lineUtil = {
//     checkHorizontal: function(cell) {
//         var topline = false;
//         var bottomline = false;
//         if (hLines[cell.row][cell.col].active) {
//             topline = true;
//         }
//         if (hLines[cell.row+1][cell.col].active) {
//             bottomline = true;
//         }
//         return topline && bottomline;
//     }//lineUtil.checkHorizontal
//
// }
