function startingBoardValue(){

    const tenMediumBoards = [
        [0, 7, 4, 0, 0, 1, 6, 9, 0, 0, 8, 0, 0, 9, 2, 0, 0, 7, 3, 0, 9, 0, 7, 6, 1, 0, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 8, 6, 1, 9, 5, 4, 0, 0, 0, 2, 0, 3, 7, 0, 8, 5, 0, 1, 0, 5, 0, 0, 0, 3, 6, 5, 4, 0, 0, 6, 8, 0, 0, 0],
        [0, 0, 9, 0, 0, 6, 5, 4, 1, 0, 0, 0, 0, 0, 2, 0, 8, 0, 0, 0, 7, 8, 5, 0, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 5, 8, 7, 0, 0, 1, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 9, 1, 7, 4, 0, 1, 2, 0, 0, 0, 0, 0, 0, 9, 7, 0, 0, 0, 1, 4, 0, 2, 0, 3, 4, 0, 9, 0, 0, 1, 0],
        [1, 0, 0, 0, 7, 0, 2, 3, 4, 0, 0, 6, 0, 1, 0, 5, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 6, 2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 5, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 5, 8, 0, 3, 0, 0, 2, 0, 0, 0, 5, 7, 1, 9, 0, 8, 4, 0, 0],
        [5, 0, 0, 0, 2, 0, 8, 0, 4, 0, 3, 0, 0, 1, 0, 5, 0, 0, 0, 0, 0, 0, 4, 8, 3, 7, 0, 2, 0, 5, 7, 9, 1, 0, 0, 0, 0, 0, 3, 8, 0, 0, 9, 0, 0, 0, 6, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 4, 0, 0, 3, 0, 0, 0, 0, 6, 1, 9, 0, 0, 0, 0, 0, 8, 0, 2, 5, 6],
        [0, 0, 0, 0, 0, 4, 2, 9, 0, 0, 1, 4, 0, 8, 0, 3, 0, 6, 0, 9, 0, 3, 0, 5, 0, 4, 0, 0, 8, 0, 0, 0, 0, 0, 3, 9, 0, 0, 0, 2, 7, 8, 5, 0, 0, 4, 0, 7, 1, 0, 0, 8, 6, 0, 0, 3, 0, 0, 4, 2, 6, 0, 5, 0, 0, 0, 0, 3, 0, 4, 0, 1, 0, 0, 8, 5, 0, 1, 9, 0, 3],
        [3, 0, 0, 1, 2, 5, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 8, 2, 1, 0, 0, 0, 0, 5, 4, 3, 0, 7, 0, 5, 0, 2, 0, 6, 0, 0, 9, 5, 0, 0, 0, 0, 0, 0, 0, 2, 8, 9, 0, 0, 0, 1, 0, 9, 3, 2, 6, 0, 8, 0, 0, 0, 8, 0, 0, 2, 0, 3, 6, 0, 9, 0, 0, 6, 0, 0, 9, 0, 0, 2],
        [0, 8, 9, 0, 0, 7, 0, 1, 0, 0, 0, 0, 0, 0, 9, 3, 4, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 3, 6, 0, 0, 0, 0, 3, 8, 5, 0, 0, 4, 0, 5, 0, 0, 9, 6, 0, 0, 2, 8, 9, 6, 1, 4, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [2, 1, 0, 6, 0, 0, 4, 9, 0, 6, 0, 0, 4, 0, 0, 1, 7, 0, 0, 0, 9, 1, 5, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 8, 0, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 5, 0, 1, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 2, 0, 0],
        [0, 0, 0, 2, 0, 0, 3, 0, 1, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 3, 5, 9, 0, 7, 0, 0, 0, 0, 5, 8, 3, 0, 0, 0, 0, 0, 6, 1, 0, 0, 9, 0, 6, 0, 0, 0, 0, 1, 0, 0, 0, 0, 7, 0, 0, 0, 6, 0, 2, 6, 0, 1, 0, 9, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 9, 8, 0],
        [3, 4, 2, 1, 7, 9, 6, 5, 8, 6, 7, 5, 4, 2, 8, 9, 3, 1, 9, 8, 1, 6, 3, 5, 4, 7, 2, 8, 5, 9, 7, 6, 1, 3, 2, 4, 1, 2, 7, 9, 4, 3, 8, 6, 5, 4, 6, 3, 5, 8, 2, 1, 9, 7, 2, 9, 8, 3, 5, 4, 7, 1, 6, 7, 1, 4, 2, 9, 6, 5, 8, 3, 5, 3, 6, 8, 1, 7, 2, 4, 0],
        
    ];

    let randomNumber = Math.floor(Math.random() * 10);
    // console.log(`Board number: J_${randomNumber}`);

    return tenMediumBoards[randomNumber];
}

//  Fetch new boards but takes awhile to render, issues finding medium boards
// 
// const apiURL = "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}";

// function getSudokuBoard(apiURL){
//     fetch(apiURL)
//     .then((response)=>{
//         return response.json()
//     })
//     .then((data) =>{
//         let newMediumBoard = findNewBoard(data);
//         if (newMediumBoard !== undefined){
//             console.log (newMediumBoard);
//             return newMediumBoard;
//         }
//     });
// }

// function findNewBoard(apiBoards){
//     console.log(apiBoards.newboard.grids[0].difficulty);

//     let newBoard = [];
//    if (apiBoards.newboard.grids[0].difficulty === "Medium"){
//     let boardfound = apiBoards.newboard.grids[0].value;
//     newBoard = boardfound.flat();
//    }
//    else
//    {
//     getSudokuBoard(apiURL);
//     return ;
//    }
//    return  newBoard;
// }



