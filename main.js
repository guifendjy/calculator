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
var currentNumber = document.querySelectorAll("#number");

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

currentNumber.forEach((number) => {
  number.addEventListener("click", () => {
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
  // calculate();
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
var resultCalcution;
// functions|||||||

// allClear && clear
function cleaAll() {
  firstOperand = "";
  secondOperand = "";
  theOperator = "";
  defaultZero.classList.remove("default");
  calculatorDisplay.innerText = "";
  console.clear();
  deactivate();
}

// function clear() {
//   allClear.value = "C";
// }

// appendMinus(it add a minus infront of the current number when clicked)
function appendMinus() {
  firstOperand = "-" + firstOperand;
  displayNumber();
}

// update current and previous number after each buttonclick
function updateNumber(number) {
  defaultZero.classList.add("default");
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
    // if a new operator is press for a new op this will run and the last if statement in this function will store a new operator(the one press to further the calculations)
    calculate();
    displayResult();
  } else {
    // if equal is press this will run
    theOperator = op.value;
    secondOperand = firstOperand;
    firstOperand = "";
    console.log("eq",theOperator);
  }

  // this stores new operator for new calculation
  if ((firstOperand != undefined) & (theOperator === "")) {
    theOperator = op.value;
    secondOperand = firstOperand;
    firstOperand = "";
    console.log("resetop",theOperator);
  }
}

// does the calculations
function calculate() {
  const previous = parseFloat(firstOperand);
  const current = parseFloat(secondOperand);

  if ((firstOperand === "") & (secondOperand === "") & (theOperator === ""))
    return;

  if (firstOperand === "" || secondOperand === "" || theOperator === "") return;

  if ((firstOperand != "") & (secondOperand != "") & (theOperator != "")) {
    if (theOperator === "+") {
      resultCalcution = current + previous;
    }
    if (theOperator === "-") {
      resultCalcution = current - previous;
    }
    if (theOperator === "X") {
      resultCalcution = current * previous;
    }
    if (theOperator === "÷") {
      resultCalcution = current / previous;
    }
  }
  firstOperand = resultCalcution;
  secondOperand = "";
  theOperator = "";
}

// display result
function displayResult() {
  if (firstOperand === "") return;
  // if (secondOperand === "") return;
  calculate();
  console.log(firstOperand, theOperator, secondOperand);

  calculatorDisplay.innerHTML = firstOperand;
}

// add operator style
function active(op) {
  if (firstOperand != "" || secondOperand != "") {
    // adds operator style
    op.classList.toggle("active");

    // remove operator style from previous operators to new operator.
    for (var i = 0; i < operators.length; i++) {
      if (operators[i].classList.contains("active") && operators[i] != op) {
        operators[i].classList.remove("active");
      }
    }
  }
  return;
}

// remove operator style after i's been stored
function deactivate() {
  //  operator to default style
  for (var i = 0; i < operators.length; i++) {
    if (operators[i].classList.contains("active")) {
      operators[i].classList.remove("active");
    }
  }
}
