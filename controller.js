const Board = require("./board.js")
const SubmarineHandler = require("./submarine-manager.js")

// will create a new board game with 4 submarines varying sizes 1 to 4 and will locate them randomally on the board
const b = new Board();
const s = new SubmarineHandler(b.getGrid())
var sunkSubmarines = 0;
initGame();
playGame();

function initGame(){
    submarines = s.placeSubmarinesAndGetSubmarines();
    console.log(submarines);
    b.printBoard()
}

function playGame(){
  while (!isGameOver()) {
    const hitResult = b.hit(submarines);
    if (hitResult) {
      sunkSubmarines++;
    }
    b.updateBoard();
  }
}

function isGameOver() {
  if (sunkSubmarines === 4) {
    console.log("Congratulations, you have sunk all submarines!!");
    return true;
  }
  return false;
}