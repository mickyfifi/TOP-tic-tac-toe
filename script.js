// const display = (() => {
//     const 
// })(); 

function createGameboard() {
    const emptyGameboard = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    let gameboard = structuredClone(emptyGameboard);

    const putSymbol = (symbol, rowNum, colNum) => {
        gameboard[rowNum][colNum] = symbol;
    };

    const print = () => {
        console.table(gameboard);
    };

    const clear = () => {
        gameboard = structuredClone(emptyGameboard);
    };
    
    return { gameboard, print, putSymbol, clear };
}

function createController() {
    let playerTurn = 'X';

    const turn = (rowNum, colNum) => {
        
    }


}

// const gameboard = createGameboard();
// gameboard.putSymbol('X', 0, 0);
// gameboard.print();
// gameboard.clear();
// gameboard.print();
