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

    const domRender = () => {
        
        const cells = document.querySelectorAll('.cell');

        cells.forEach((cell) => {
            cell.textContent = gameboard[cell.dataset.row][cell.dataset.col];
        });

    };
    
    return { gameboard, print, putSymbol, clear, domRender };
}

function createController() {
    const gameboard = createGameboard();
    let XName = 'Player 1';
    let OName = 'Player 2';
    let playerTurn = 'X';
    let isGameOver = false;

    const domInit = () => {
        document.querySelector('#create-btn').onclick = (event) => {
            XName = prompt('X Player name?', XName);
            OName = prompt('O Player name?', OName);
            updatePlayerTurnText();
        }

        const cells = document.querySelectorAll('.cell');

        cells.forEach((cell) => {
            cell.onclick = () => {
                turn(cell.dataset.row, cell.dataset.col);
            };
        });

    };

    const turn = (rowNum, colNum) => {
        if (isGameOver) {
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
        if (gameboard.gameboard[rowNum][0] == playerTurn
            && gameboard.gameboard[rowNum][1] == playerTurn
            && gameboard.gameboard[rowNum][2] == playerTurn
        ) {
            return true;
        }
        
        // horizontal
        if (gameboard.gameboard[0][colNum] == playerTurn
            && gameboard.gameboard[1][colNum] == playerTurn
            && gameboard.gameboard[2][colNum] == playerTurn
        ) {
            return true;
        }

        // slant backslash
        if (gameboard.gameboard[0][0] == playerTurn
            && gameboard.gameboard[1][1] == playerTurn
            && gameboard.gameboard[2][2] == playerTurn
        ) {
            return true;
        }

        // slant slash
        if (gameboard.gameboard[2][0] == playerTurn
            && gameboard.gameboard[1][1] == playerTurn
            && gameboard.gameboard[0][2] == playerTurn
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
}

// const gameboard = createGameboard();
// gameboard.putSymbol('X', 0, 0);
// gameboard.print();
// gameboard.clear();
// gameboard.print();

const game = createController();

