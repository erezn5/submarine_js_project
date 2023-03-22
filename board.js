const SubmarineHandler = require("./submarine-manager");

const BOARD_ROWS = 5;
const BOARD_COLS = 8;

class Board {
    
    constructor() {
      this.grid = this.createGrid();
    }

    hit(submarines) {
      // Generate coords x & y to select random cell to hit.
      const x = Math.floor(Math.random() * 5);
      const y = Math.floor(Math.random() * 8);
    
      const position = `${x},${y}`;
    
      console.log(`Computer is hitting coordinates (${position})`);
    
      // Check if the cell has already been marked
      if (this.grid[x][y] === 'X' || this.grid[x][y] === '*') {
        console.log("This cell has already been marked.");
        return false;
      }
    
      // Check if a submarine is present at the given coordinates
      if (submarines[position]) {
        // Hit
        this.grid[x][y] = '*';
        const submarine = submarines[position];
    
        // When a cell is hit there is a need to remove this cell from the submarine cell (part of the submarine)
        submarine.cells = submarine.cells.filter(cell => cell[0] !== x || cell[1] !== y);
    
        // Check if all the parts of the submarine were hit 
        if (submarine.cells.length === 0) {
          submarine.sunk = true;
          console.log("The submarine has been sunk!");
          return true;
        } else {
          console.log("You hit a submarine!");
        }
      } else {
        // Miss
        this.grid[x][y] = 'X';
        console.log("You missed!");
      }
      return false;
    }

    createGrid(){
        let grid = []
        for (let i = 0; i<BOARD_ROWS; i++) {
            grid[i] = [];
            for(let j = 0; j<BOARD_COLS; j++) {
                grid[i][j] = '-';
            }
        }
        return grid;
    }

    // Will be used to print board and will be used to print board for each phase in the game
    printBoard(){
      const cols = this.createCols();
      console.log(cols);
      for (let i = 0; i < BOARD_ROWS; i++) {
          let rowStr = i + ' ';
          for (let j = 0; j < BOARD_COLS; j++) {
              if (this.grid[i][j] == '-') {
                rowStr += '- ';
            } else {
                rowStr += 'O ';
            }
          }
          console.log(rowStr);
      }
  }

  updateBoard(){
    for (let i = 0; i < BOARD_ROWS; i++) {
      console.log(this.grid[i].join(' '));
    }
  }

  createCols(){
    let result = '  ';
    for(let i= 0; i<BOARD_COLS; i++){
        result += i + ' ';
    }
    return result;
  }

  getGrid(){
    return this.grid;
  }
  
}

module.exports = Board;