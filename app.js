let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#New-btn");

let msg = document.querySelector("#msg");
let popup = document.querySelector(".popup");
let turnMsg = document.querySelector("#turn-msg");

let turnO = true;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const updateTurn = () => {
  turnMsg.innerText = turnO ? "Player O's Turn" : "Player X's Turn";
};

updateTurn();

/* BOX CLICK */
boxes.forEach((box) => {
  box.addEventListener("click", () => {

    box.innerText = turnO ? "O" : "X";

    box.style.transform = "scale(0.9) rotate(5deg)";

    setTimeout(() => {
      box.style.transform = "scale(1)";
    }, 150);

    box.disabled = true;

    turnO = !turnO;

    updateTurn();

    checkWinner();
  });
});

/* WINNER */
const showWinner = (winner) => {

  msg.innerText = `🎉 Player ${winner} Wins!`;

  popup.classList.remove("hide");

  boxes.forEach(b => b.disabled = true);
};

/* DRAW */
const checkDraw = () => {

  let filled = [...boxes].every(box => box.innerText !== "");

  if(filled){

    msg.innerText = "🤝 Match Draw!";

    popup.classList.remove("hide");
  }
};

/* CHECK WIN */
const checkWinner = () => {

  for(let p of winPatterns){

    let a = boxes[p[0]].innerText;
    let b = boxes[p[1]].innerText;
    let c = boxes[p[2]].innerText;

    if(a !== "" && a === b && b === c){

      showWinner(a);
      return;
    }
  }

  checkDraw();
};

/* RESET */
const resetGame = () => {

  turnO = true;

  boxes.forEach(b => {
    b.innerText = "";
    b.disabled = false;
    b.style.transform = "scale(1)";
  });

  popup.classList.add("hide");

  updateTurn();
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);