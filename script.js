// const display = (() => {
//     const 
// })(); 

function createGameboard() {

    let cells = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    
    const putSymbol = (symbol, rowNum, colNum) => {
        cells[rowNum][colNum] = symbol;
    };

    const print = () => {
        console.table(cells);
    };

    const clear = () => {
        cells.length = 0;
        cells.push([' ', ' ', ' ']);
        cells.push([' ', ' ', ' ']);
        cells.push([' ', ' ', ' ']);
    };

    const domRender = () => {        
        const domCells = document.querySelectorAll('.cell');

        domCells.forEach((domCell) => {
            domCell.textContent = cells[domCell.dataset.row][domCell.dataset.col];
        });

    };
    
    return { cells, print, putSymbol, clear, domRender };
}

function createController() {
    let gameboard = createGameboard();
    let XName = 'Player 1';
    let OName = 'Player 2';
    let playerTurn = 'X';
    let isGameOver = false;

    const domInit = () => {
        document.querySelector('#create-btn').onclick = (event) => {
            XName = prompt('X Player name?', XName);
            OName = prompt('O Player name?', OName);
            updatePlayerTurnText();
        };

        const domCells = document.querySelectorAll('.cell');

        domCells.forEach((domCell) => {
            domCell.onclick = () => {
                turn(domCell.dataset.row, domCell.dataset.col);
            };
        });

        document.querySelector('#reset-btn').onclick = (event) => {
            playerTurn = 'X';
            isGameOver = false;
            gameboard.clear();
            gameboard.domRender();
            updatePlayerTurnText();
        };

    };

    const turn = (rowNum, colNum) => {
        if (isGameOver) {
            return;
        }

        if (gameboard.cells[rowNum][colNum].trim() != '') {
            return;
        }
        
        gameboard.putSymbol(playerTurn, rowNum, colNum);
        gameboard.domRender();
        
        if (isWin(rowNum, colNum)) {
            isGameOver = true;
            updateStatusBox(`${XName} Won`);
            if (playerTurn == 'O') {
                updateStatusBox(`${OName} Won`);
            }
            
            return;
        }

        switchTurn();
        updatePlayerTurnText();
    }

    const switchTurn = () => {
        if (playerTurn == 'X') {
            playerTurn = 'O';
            return;
        }

        playerTurn = 'X';
    }

    const isWin = (rowNum, colNum) => {
        //vertical
        if (gameboard.cells[rowNum][0] == playerTurn
            && gameboard.cells[rowNum][1] == playerTurn
            && gameboard.cells[rowNum][2] == playerTurn
        ) {
            return true;
        }
        
        // horizontal
        if (gameboard.cells[0][colNum] == playerTurn
            && gameboard.cells[1][colNum] == playerTurn
            && gameboard.cells[2][colNum] == playerTurn
        ) {
            return true;
        }

        // slant backslash
        if (gameboard.cells[0][0] == playerTurn
            && gameboard.cells[1][1] == playerTurn
            && gameboard.cells[2][2] == playerTurn
        ) {
            return true;
        }

        // slant slash
        if (gameboard.cells[2][0] == playerTurn
            && gameboard.cells[1][1] == playerTurn
            && gameboard.cells[0][2] == playerTurn
        ) {
            return true;
        }
        
        return false;

    }

    const updatePlayerTurnText = () => {
        if (playerTurn == 'X') {
            updateStatusBox(`${XName}'s turn`);
            return;
        }

        updateStatusBox(`${OName}'s turn`);
    }

    const updateStatusBox = (text) => {
        document.querySelector('#status-box').textContent = text;
    };


    domInit();

    return { gameboard }
}

const game = createController();

