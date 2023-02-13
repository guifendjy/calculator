/**
 * CALCULATOR
 */

// Display ||||

// element selection
var calculatorDisplay = document.querySelector("#calculator");
var total = document.querySelector(".display");

// default zero
var defaultZero = document.getElementById("default");

// operators
var operators = document.querySelectorAll("#operator");

// numbers
var previousNumber = document.querySelectorAll("#number");

// equal
var equal = document.querySelector("#equal");
// all-clear
var allClear = document.getElementById("all-clear");
// plusminus
var plusMinus = document.getElementById("plus-minus");
// percentage
var percentage = document.getElementById("percentage");
// -----------

// eventListeners |||||

previousNumber.forEach((number) => {
  number.addEventListener("click", () => {
    defaultZero.classList.add("default");
    deactivate();
    updateNumber(number.value);
    displayNumber();
  });
});

operators.forEach((op) => {
  op.addEventListener("click", () => {
    active(op);
    whichOperation(op);
  });
});

equal.addEventListener("click", () => {
  calculate();
  displayResult();
});

allClear.addEventListener("click", () => {
  cleaAll();
});

plusMinus.addEventListener("click", () => {
  appendMinus();
});

percentage.addEventListener("click", () => {
  if (firstOperand != "") {
    firstOperand = parseFloat(firstOperand) / 100;
    calculatorDisplay.innerText = firstOperand;
  }
});

// default variables
var firstOperand = "";
var secondOperand = "";
var theOperator = "";
// functions|||||||

// allClear && clear
function cleaAll() {
  firstOperand = "";
  secondOperand = "";
  theOperator = "";
  allClear.value = "AC";
  calculatorDisplay.innerText = "";
  defaultZero.classList.remove("default");
  deactivate();
  console.clear();
}

// appendMinus(it add a minus infront of the previous number when clicked)
function appendMinus() {
  firstOperand = "-" + firstOperand;
  calculatorDisplay.innerText = "0";
  displayNumber();
}

// update previous and current number after each buttonclick
function updateNumber(number) {
  allClear.value = "C";
  if ((number === ".") & firstOperand.includes(".")) return;
  if (firstOperand < 1) {
    if (number === "0" && firstOperand.includes("0")) return;
  }
  firstOperand = firstOperand + number;
}

// update number on calculatorDisplay
function displayNumber() {
  calculatorDisplay.innerText = firstOperand;
  console.log(calculatorDisplay.innerText);
}

// stores the operator and secondOperand
function whichOperation(op) {
  if (firstOperand === "") return;
  if ((firstOperand != "") & (secondOperand != "")) {
    // if a new operator is press for a new op this will run.
    calculate();
    displayResult();
  }
  // if equal is press this will run
  theOperator = op.value;
  secondOperand = firstOperand;
  firstOperand = "";
  console.log("eq", theOperator);
}

// does the calculations
function calculate() {
  let resultCalcution;
  const current = parseFloat(firstOperand);
  const previous = parseFloat(secondOperand);

  if ((firstOperand === "") & (secondOperand === "") & (theOperator === ""))
    return;

  if (firstOperand === "" || secondOperand === "" || theOperator === "") return;

  if ((firstOperand != "") & (secondOperand != "") & (theOperator != "")) {
    if (theOperator === "+") {
      resultCalcution = previous + current;
    }
    if (theOperator === "-") {
      resultCalcution = previous - current;
    }
    if (theOperator === "X") {
      resultCalcution = previous * current;
    }
    if (theOperator === "÷") {
      resultCalcution = previous / current;
    }
  }
  firstOperand = resultCalcution;
  secondOperand = "";
  theOperator = "";
}

// display result
function displayResult() {
  if (firstOperand === "" || firstOperand === undefined) return;
  console.log(firstOperand, theOperator, secondOperand);

  calculatorDisplay.innerHTML = firstOperand;
}

// add operator style
function active(op) {
  if (firstOperand != "" || secondOperand != "") {
    // adds operator style
    op.classList.toggle("active");

    // remove operator style from current operators to new operator.
    for (var i = 0; i < operators.length; i++) {
      if (operators[i].classList.contains("active") && operators[i] != op) {
        operators[i].classList.remove("active");
      }
    }
  }
  return;
}

// remove operator style after it's been stored
function deactivate() {
  //  operator to default style
  for (var i = 0; i < operators.length; i++) {
    if (operators[i].classList.contains("active")) {
      operators[i].classList.remove("active");
    }
  }
}
