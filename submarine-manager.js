const BOARD_ROWS = 5;
const BOARD_COLS = 8;
const NUM_OF_SUBMARINES = 4;

class SubmarineHandler {
    constructor(grid){
        this.grid = grid;
    }

    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    placeSubmarinesAndGetSubmarines() {
      const submarineArray = this.generateSubmarineArray();
      this.submarines = {};
  
      for (let i = 0; i < NUM_OF_SUBMARINES; i++) {
        let submarineAdded = false;
        while (!submarineAdded) {
          const row = this.getRandomInt(BOARD_ROWS);
          const col = this.getRandomInt(BOARD_COLS);
          const direction = ['up', 'down', 'left', 'right'][this.getRandomInt(4)];
  
          if (this.canPlaceSubmarine(row, col, direction, submarineArray[i])) {
            this.placeSubmarine(row, col, direction, submarineArray[i]);
            submarineAdded = true;
          }
        }
      }
      return this.submarines;
    }

    generateSubmarineArray(){
      let array = [];

      for (let i = 0; i < NUM_OF_SUBMARINES; i++) {
        let randomInt = Math.floor(Math.random() * NUM_OF_SUBMARINES) + 1; // generates a random integer between 1 and 4
        array.push(randomInt); // adds the random integer to the array
      }
      return array;
    }


    canPlaceSubmarine(row, col, direction, size) {
      for (let i = 0; i < size; i++) {
        if (!this.isValidCell(row, col) || this.grid[row][col] !== '-') {
          return false;
        }
        [row, col] = this.getCloseCell(row, col, direction);
      }
      return true;
    }

    isValidCell(row, col) {
      return row >= 0 && row < BOARD_ROWS && col >= 0 && col < BOARD_COLS;
    }
  
    getCloseCell(row, col, direction) {
      let newRow, newCol;
    
      if (direction === 'up') {
        newRow = row - 1;
        newCol = col;
      } else if (direction === 'down') {
        newRow = row + 1;
        newCol = col;
      } else if (direction === 'left') {
        newRow = row;
        newCol = col - 1;
      } else if (direction === 'right') {
        newRow = row;
        newCol = col + 1;
      }
    
      return [newRow, newCol];
    }

    placeSubmarine(row, col, direction, size) {
      const submarine = {
        size,
        cells: [],
        sunk: false
      };
  
      for (let i = 0; i < size; i++) {
        submarine.cells.push([row, col]);
        this.grid[row][col] = 'O';
        const position = `${row},${col}`;
        this.submarines[position] = submarine;
        [row, col] = this.getCloseCell(row, col, direction);
      }
    }
}

module.exports = SubmarineHandler;