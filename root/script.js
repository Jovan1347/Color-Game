let button = document.querySelector(".new-color-button");
let buttonRgb = document.querySelector(".pick-rgb");
let buttonHexa = document.querySelector(".pick-hexa");
let colorBoxes = document.querySelectorAll(".color-box");
let colorBoxesArray = Array.from(colorBoxes);
let colorNameBox = document.querySelector("#color");
let buttonName = document.querySelector(".name-button");
let playerInput = document.querySelector(".player-input");
let playerName = document.querySelector(".player-name");
let scoreboard = document.querySelector(".scoreboard");
let rowName = document.querySelectorAll(".row-name td");
let arrayRowName = Array.from(rowName);
let rowScore = document.querySelectorAll(".row-score td");
let arrayRowScore = Array.from(rowScore);
let finalScore = document.querySelector(".final-score");
let newGame = document.querySelector(".new-game");
let newGameButton = document.querySelector(".play-again");
const scoreArray = [];
const nameArray = [];

let points = 5;
let correctColor;
let hexColor;

const randomHex = () => {
  const hexValues = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  let hex = "#";
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * hexValues.length);
    hex += hexValues[index];
  }
  return hex;
};

function setColors(type) {
  colorBoxes.forEach((box) => {
    if (!box.style.backgroundColor) {
      box.style.display = "flex";
      box.style.backgroundColor = randomHex();
    }
  });

  buttonName.style.pointerEvents = "none";
  playerInput.style.pointerEvents = "none";

  function getRandomItemColor(colorBoxesArray) {
    correctColor = Math.floor(Math.random() * colorBoxesArray.length);

    let item = colorBoxesArray[correctColor];
    let currentColor = randomHex();
    item.style.backgroundColor = currentColor;

    if (type === "rgb") {
      let boxColorName = window.getComputedStyle(item).backgroundColor;
      colorNameBox.innerHTML = boxColorName;
      buttonHexa.style.display = "none";
      buttonRgb.style.pointerEvents = "none";
      buttonHexa.style.pointerEvents = "none";
    } else {
      colorNameBox.innerHTML = currentColor;
      buttonRgb.style.display = "none";
      buttonRgb.style.pointerEvents = "none";
      buttonHexa.style.pointerEvents = "none";
    }
    return item;
  }
  const result = getRandomItemColor(colorBoxesArray);
  return result;
}

button.addEventListener("click", () => {
  button.style.display = "none";
  buttonRgb.style.display = "flex";
  buttonHexa.style.display = "flex";
});

buttonRgb.addEventListener("click", () => {
  colorBoxes.forEach((box) => {
    box.style.display = "flex";
    box.style.visibility = "visible";
  });
  setColors("rgb");
});
buttonHexa.addEventListener("click", () => {
  colorBoxes.forEach((box) => {
    box.style.display = "flex";
    box.style.visibility = "visible";
  });
  setColors("hex");
});

colorBoxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (index !== correctColor) {
      box.style.visibility = "hidden";
      points -= 1;
    } else {
      scoreArray.unshift(points);
      newGame.style.display = "flex";
      finalScore.innerHTML = "YOUR SCORE IS: " + points;
      for (let index = 0; index < scoreArray.length; index++) {
        arrayRowScore[index].innerHTML = scoreArray.slice(0, 10)[index];
        if (scoreArray.length > 10) {
          scoreArray.pop();
        }
      }
    }
  });
});

buttonName.addEventListener("click", () => {
  playerName.innerHTML = "Player Name: " + playerInput.value;
  nameArray.unshift(playerInput.value);
  for (let index = 0; index < nameArray.length; index++) {
    arrayRowName[index].innerHTML = nameArray.slice(0, 10)[index];
    if (nameArray.length > 10) {
      nameArray.pop();
    }
  }
  playerInput.value = "";
  playerInput.style.pointerEvents = "none";
  buttonName.style.pointerEvents = "none";
});

newGameButton.addEventListener("click", () => {
  colorBoxes.forEach((box) => {
    box.style.display = "none";
  });
  points = 5;
  buttonName.style.pointerEvents = "unset";
  playerInput.style.pointerEvents = "unset";
  playerName.innerHTML = "Player Name: ";
  button.style.display = "unset";
  buttonHexa.style.display = "none";
  buttonRgb.style.display = "none";
  buttonRgb.style.pointerEvents = "unset";
  buttonHexa.style.pointerEvents = "unset";
  newGame.style.display = "none";
  colorNameBox.innerHTML = "";
});
