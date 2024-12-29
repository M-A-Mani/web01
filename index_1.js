const zero = document.getElementById("zero");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const period = document.getElementById("period");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const times = document.getElementById("times");
const divide = document.getElementById("divide");
const power = document.getElementById("power");
const DELbt = document.getElementById("DELbt");
const ANSbt = document.getElementById("ANSbt");
const ACbt = document.getElementById("ACbt");
const resbt = document.getElementById("resbt");
const resultDisplay = document.getElementById("res");

let equation = "";
let res = 0;
let ans = "";

// Function to update the display
function updateDisplay() {
  resultDisplay.innerHTML = equation || "0"; // Display 0 if the equation is empty
}

// Function to calculate the result
function calculateResult() {
  try {
    // Replace symbols with actual operators
    for (let i = equation.length - 1; i > 0; i--) {
      console.log(i);
      if (!isNaN(equation[i - 1]) && equation[i] == "A") {
        equation = equation.slice(0, i) + "*" + equation.slice(i);
      }
    }
    for (let i = equation.length - 1; i > 0; i--) {
      console.log(i);
      if (!isNaN(equation[i]) && equation[i - 1] == "S") {
        equation = equation.slice(0, i) + "*" + equation.slice(i);
      }
    }
    let tempEquation = equation
      .replaceAll("x", "*")
      .replaceAll("^", "**")
      .replaceAll("ANS", ans);

    // Evaluate the result safely
    res = Function(`"use strict"; return (${tempEquation});`)();
    equation = res.toString();
    ans = res.toString();
    updateDisplay();
  } catch (error) {
    resultDisplay.innerHTML = "Error";
  }
}

// Attach event listeners for number and operator buttons
const buttons = [
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  period,
  plus,
  minus,
  times,
  divide,
  power,
];
const buttonValues = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "+",
  "-",
  "x",
  "/",
  "^",
];

buttons.forEach((button, index) => {
  if (button) {
    button.addEventListener("click", () => {
      equation += buttonValues[index];
      updateDisplay();
    });
  }
});

// Attach event listeners for special buttons
if (ACbt) {
  ACbt.addEventListener("click", () => {
    equation = "";
    updateDisplay();
  });
}

if (DELbt) {
  DELbt.addEventListener("click", () => {
    equation = equation.slice(0, -1);
    updateDisplay();
  });
}

if (ANSbt) {
  ANSbt.addEventListener("click", () => {
    equation += "ANS";
    updateDisplay();
  });
}

if (resbt) {
  resbt.addEventListener("click", calculateResult);
}

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || ["+", "-", "*", "/", ".", "^"].includes(key)) {
    equation += key === "*" ? "x" : key;
  } else if (key === "Backspace") {
    equation = equation.slice(0, -1);
  } else if (key === "Enter") {
    calculateResult();
    return;
  } else if (key === "Escape") {
    equation = "";
  } else if (key === "A" || key === "a") {
    equation += "ANS";
  }

  updateDisplay();
});
