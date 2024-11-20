const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let fullExpression = "";

// Function to handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.getAttribute("data-action");
    const value = button.textContent;

    if (!action) {
      appendNumber(value);
    } else if (action === "operator") {
      appendOperator(value);
    } else if (action === "decimal") {
      addDecimal();
    } else if (action === "clear") {
      clearCalculator();
    } else if (action === "delete") {
      deleteLastEntry();
    } else if (action === "equals") {
      calculateAndDisplay();
    }
    updateDisplay();
  });
});

// Append number to the current input and expression
function appendNumber(number) {
  currentInput += number;
  fullExpression += number;
}

// Append operator to the expression
function appendOperator(selectedOperator) {
  if (currentInput === "" && fullExpression === "") return;
  if (currentInput === "" && isNaN(fullExpression.slice(-1))) {
    // Replace the last operator if already present
    fullExpression = fullExpression.slice(0, -1) + selectedOperator;
    return;
  }
  fullExpression += ` ${selectedOperator} `;
  currentInput = "";
}

// Add a decimal point to the current input
function addDecimal() {
  if (currentInput.includes(".")) return;
  currentInput += ".";
  fullExpression += ".";
}

// Clear calculator
function clearCalculator() {
  currentInput = "";
  fullExpression = "";
}

// Delete the last entry from the expression
function deleteLastEntry() {
  if (currentInput) {
    currentInput = currentInput.slice(0, -1);
  }
  fullExpression = fullExpression.trimEnd().slice(0, -1);
}

// Calculate and display the result
function calculateAndDisplay() {
  try {
    const result = eval(fullExpression.replace(/\s+/g, ""));
    fullExpression = `${result}`; // Replace expression with result
    currentInput = result.toString();
  } catch (error) {
    fullExpression = "Error!";
    currentInput = "";
  }
}

// Update the display with the full expression
function updateDisplay() {
  display.textContent = fullExpression || "0";
}
