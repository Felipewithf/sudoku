
// ----- TO DO -----

// mockup new ui for highscores and time


function imagepath(num) {

    return `assets/img/n-${num}.png`;
}

// selector numbers
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

let visualHelp = true;
let numberSelected = 0;
let intervalTimer_Id = "";
let gameTime = 0;
let board = [];


// coordinates for the 9 boxes (3x3) inside the board array
const boxes = [{
    "min_col": "0",
    "max_col": "4",
    "min_row": "0",
    "max_row": "4"
}, {
    "min_col": "3",
    "max_col": "7",
    "min_row": "0",
    "max_row": "4"
}, {
    "min_col": "6",
    "max_col": "10",
    "min_row": "0",
    "max_row": "4"
}, {
    "min_col": "0",
    "max_col": "4",
    "min_row": "3",
    "max_row": "7"
}, {
    "min_col": "3",
    "max_col": "7",
    "min_row": "3",
    "max_row": "7"
}, {
    "min_col": "6",
    "max_col": "10",
    "min_row": "3",
    "max_row": "7"
}, {
    "min_col": "0",
    "max_col": "4",
    "min_row": "6",
    "max_row": "10"
}, {
    "min_col": "3",
    "max_col": "7",
    "min_row": "6",
    "max_row": "10"
}, {
    "min_col": "6",
    "max_col": "10",
    "min_row": "6",
    "max_row": "10"
}];


//check if as game already exists
if (localStorage.getItem("currentBoard") === null) {
    startGameMessage();
} else {
    board = JSON.parse(localStorage.getItem("currentBoard"));
    renderUI_InitializeDragDrop();
    const retrieveTimer = localStorage.getItem('timer');
    startTimer(retrieveTimer);
}

function startNewGame() {
    $("#boardMessage").html("");
    let newBoardValue = generateSudokuBoard();
    createNewBoard(newBoardValue);
    startTimer(0);
    renderUI_InitializeDragDrop();
}

function startTimer(num){
    gameTime = num;
    intervalTimer_Id = setInterval(() => {
        console.log(`timer:${gameTime} seconds`);
        localStorage.setItem('timer',JSON.stringify(gameTime));
        gameTime ++;
    }, 1000);
}

function renderUI_InitializeDragDrop(){
    renderHTMLSelectionNumbers();
    renderHTMLBoard();
    setDraggble_droppable();
    check_NineRule();
}

function createNewBoard(newBoardValue) {

    //tile constructor
    function singleTile(column, row, value, id, static) {
        this.column = column,
            this.row = row,
            this.value = value,
            this.id = id,
            this.static = static
    }
    //clear any previous board and index
    board = [];

    let tileIdCounter = 0;
    //construct board with 81 tiles -  array of objects -
    for (let col_i = 0; col_i < 9; col_i++) {
        for (let row_i = 0; row_i < 9; row_i++) {
            let tileValue = newBoardValue[tileIdCounter];
            let staticTile = !(tileValue == "0");
            board.push(new singleTile(col_i + 1, row_i + 1, tileValue, tileIdCounter, staticTile));
            tileIdCounter++;
        };
    };

    localStorage.setItem("currentBoard", JSON.stringify(board));

}

function renderHTMLBoard() {
    //render sudoku board
    let index = 0;
    for (let colEl = 0; colEl < 9; colEl++) {
        let boardColumn = $("<ul>", { id: `c${colEl + 1}` });
        $("#sudoBoard").append(boardColumn);
        for (let rowEl = 0; rowEl < 9; rowEl++) {
            var tile = $("<li>",
                {
                    "column": board[index].column,
                    "row": board[index].row,
                    "value": board[index].value,
                    "id": index,
                    "static": board[index].static
                });
            tile.append($("<img>", { "src": imagepath(board[index].value) }));
            $(`#c${colEl + 1}`).append(tile);
            index++;
        }
    };
    checkGameLogic();

}
function renderHTMLSelectionNumbers() {
    //render user selection of Numbers
    for (const iterator of numbers) {
        let singleNumber = $("<li>", { "id": `sn${iterator}` })
            .append($("<img>",
                { "src": imagepath(iterator), "class": "dragme", "data-num": `${iterator}` }
            ));

        $("#numberSelection").append(singleNumber);

        const counter = board.filter(x => x.value == iterator).length;
        hideCompleteNumbers(iterator, counter)
    }
}

function setDraggble_droppable() {
    //set all numberSelectors as draggable
    $(".dragme").draggable({
        revert: "invalid",
        cursor: "move",
        helper: "clone",
        start: function (event) {
            let loadNumber = $(event.target).data("num");
            numberSelected = loadNumber;
        }
    });
    //set containers as droppable if they have not value -> update tile value -> check game logic
    $("[static='false']").droppable({
        accept: ".dragme",
        drop: function (event, ui) {
            updateTileValue(event);
            checkGameLogic(event);
            localStorage.setItem("currentBoard", JSON.stringify(board));
        },
        classes: {
            "ui-droppable-active": "ui-state-highlight"
        },
    });
}


//update values
function updateTileValue(event) {

    //remove all issue classes
    removeAllIssues();

    //store image element
    let imgEl = $(event.target).children("img");
    //render the new image
    $(imgEl[0]).attr("src", imagepath(numberSelected));
    //get the value from numberSelected and update the li attribute value
    $(event.target).attr({ "value": numberSelected });
    // update the board array values for game logic
    board[$(event.target).attr("id")].value = numberSelected.toString();
}


// ++++++++ TILE REMOVAL STUFF ++++++++++ //

// Delete number by double clicking
$("[static='false']").on("dblclick", function (e) {
    let targetEl = ($(e.target).parent());
    //update Board array
    board[$(targetEl).attr("id")].value = 0;
    // render on HTML
    $(targetEl).attr({ "value": 0 });
    $(e.target).attr("src", `assets/img/n-0.png`);
    //remove all issue classes
    removeAllIssues();
    checkGameLogic();

    //update local storage
    localStorage.setItem("currentBoard", JSON.stringify(board));
});

// remove all issues on classes
function removeAllIssues() {
    board.forEach(tile => {
        $(`#${tile.id}`).removeClass("issue");
    });
}

//stop interval for timer
function endOfTimer(){
    clearInterval(intervalTimer_Id);
}

// ++++++++ GAME LOGIC ++++++++++ //

function checkGameLogic() {

    let nineRule = check_NineRule();
    let columnRule = check_ColumnRule();
    let rowRule = check_RowRule();
    let boxRule = check_BoxRule();
    let fullBoardRule = check_81Rule();

    if (nineRule && columnRule && rowRule && boxRule && fullBoardRule) {
        console.log('you solve the mistery!');
        endOfGameMessage();
        endOfTimer();
    } else {
        console.log(`9 Rule: ${nineRule}, Column Rule: ${columnRule}, Row Rule:${rowRule}, Box Rule:${boxRule}, Board Complete:${fullBoardRule}`);
    }
}

function check_NineRule() {
    // check that no more than NINE numbers of the same number are in the board
    let validation = true;
    numbers.forEach(number => {
        const counter = board.filter(x => x.value == number).length;

        if (counter <= 9) {
            hideCompleteNumbers(number, counter);
        }

        if (counter > 9) {
            validation = false;

            console.log(`Something is wrong: To many ${number}`);

            if (visualHelp) {
                const tileWithIssues = board.filter(x => x.value == number);
                showIssues(tileWithIssues);
            }
        }

    });
    //return true or false to validate Nine Rule
    return validation;
}

function check_ColumnRule() {
    //check that no more than TWO numbers are in the same column
    let validation = true;
    //check each column
    for (let column_index = 1; column_index < 10; column_index++) {
        //store the values of board.column on a new array
        let valuesOfColumn = board.filter(x => x.column == column_index);
        //check how each numbers(values) are in each valuesOfColumn
        numbers.forEach(number => {
            let counterOfValues = valuesOfColumn.filter(x => x.value == number).length;
            if (counterOfValues > 1) {
                validation = false;

                console.log(`something is wrong to many ${number} on column ${column_index}`);

                if (visualHelp) {
                    let tileWithIssues = valuesOfColumn.filter(x => x.value == number);
                    showIssues(tileWithIssues);
                }

            }
        });
    }
    //return true or false to validate Column Rule
    return validation;
}

function check_RowRule() {
    //check that no more than TWO numbers are in the same row
    let validation = true;
    //check each row
    for (let row_index = 1; row_index < 10; row_index++) {
        //store the values of board.row on a new array
        let valuesOfRow = board.filter(x => x.row == row_index);

        //check how each numbers(values) are in each valuesOfRow
        numbers.forEach(number => {
            let counterOfValues = valuesOfRow.filter(x => x.value == number).length;
            // console.log(`Values that match ${number}::: ${counterOfValues} times`);
            if (counterOfValues > 1) {
                validation = false;

                console.log(`something is wrong to many ${number} on row ${row_index}`);

                if (visualHelp) {
                    let tileWithIssues = valuesOfRow.filter(x => x.value == number);
                    showIssues(tileWithIssues);
                }
            }
        });
    }
    return validation;
}

function check_81Rule() {
    // Check that each cell has a value other than 0 which means a number is in it
    let validation = true;

    //check that there is no empty cells
    let emptyCells = board.filter(x => x.value == 0).length;
    if (emptyCells > 0) {
        console.log(`${emptyCells} empty cells`);
        validation = false;
    } else {
    }
    return validation;
}

function check_BoxRule() {
    //check that no more than TWO numbers are in the same column
    let validation = true;

    boxes.forEach(box => {

        //filter board for 9 cells that fit on the boxes coordinates
        let checkBox = board.filter(x => x.column > box.min_col && x.column < box.max_col &&
            x.row > box.min_row && x.row < box.max_row);

        numbers.forEach(number => {
            let multipleNumbers = checkBox.filter(x => x.value == number).length;

            if (multipleNumbers > 1) {
                validation = false;

                console.log(`to many ${number} in a box`);

                if (visualHelp) {
                    let tileWithIssues = checkBox.filter(x => x.value == number);
                    showIssues(tileWithIssues);
                }
            };
        });
    });
    return validation;
}


// ++++++++ VISUAL HELP ++++++++++ //

function showIssues(wrongTiles) {
    wrongTiles.forEach(element => {
        $(`#${element.id}`).addClass("issue");
    });
}

function hideCompleteNumbers(num, count) {
    const numberEl = $(`#sn${num}`);
    // console.log(numberEl[0]);
    if (count === 9) {
        numberEl.attr("class", "completeNumber");
    } else {
        numberEl.attr("class", "");
    }
}


// ++++++++ BOARD MESSAGES ++++++++++ //

function endOfGameMessage() {
    $('#numberSelection').html("");
    $('#sudoBoard').html("");
    $('#boardMessage').html(
        `<h2>Game over</h2>
        <h3>Your time was: ${gameTime} seconds</h3>
        <div id="startNewGameBtn">
        <h3>play another board</h3>
        </div>
        `);
    localStorage.clear();
    console.log('localstorage & board cleared');
    // location.reload();

    // ++++++++ EVENT LISTENERS ++++++++++ //
    $('#startNewGameBtn').on("click", function () {
        // location.reload();
        startNewGame();
        console.log("Handler for `click` called.");
    });
}

function startGameMessage() {
    
    $('#numberSelection').html("");
    $('#sudoBoard').html("");
    $('#boardMessage').html(
        `<h2>Welcome to Sudoku!</h2>
        <div id="startNewGameBtn">
        <h3>Start Game</h3>
        </div>
        `);
        // ++++++++ EVENT LISTENERS ++++++++++ //
    $('#startNewGameBtn').on("click", function () {
        // location.reload();
        startNewGame();
        console.log("Handler for `click` called.");
    });
}




