// Assignment 3: Simple JavaScript Calculator

// Holds one entry per round of user input
var rows = [];

// Holds only the numeric results, used for the summary table
var validResults = [];

// Keeps looping until the user clicks Cancel on any prompt
while (true) {

  var x = prompt("Enter the first number (x):");
  if (x === null) {
    break;
  }

  var y = prompt("Enter the second number (y):");
  if (y === null) {
    break;
  }

  var operator = prompt("Enter an operator (+, -, *, /, %):");
  if (operator === null) {
    break;
  }

  var result;
  var isError = false;

  // Check that both entries are actually numbers
  if (isNaN(x) || x === "" || isNaN(y) || y === "") {
    result = "Error: non-numeric input";
    isError = true;
  } else {
    var num1 = parseFloat(x);
    var num2 = parseFloat(y);

    if (operator === "+") {
      result = num1 + num2;
    } else if (operator === "-") {
      result = num1 - num2;
    } else if (operator === "*") {
      result = num1 * num2;
    } else if (operator === "/") {
      if (num2 === 0) {
        result = "Error: cannot divide by zero";
        isError = true;
      } else {
        result = num1 / num2;
      }
    } else if (operator === "%") {
      if (num2 === 0) {
        result = "Error: cannot divide by zero";
        isError = true;
      } else {
        result = num1 % num2;
      }
    } else {
      result = "Error: invalid operator";
      isError = true;
    }
  }

  // Save this round so it can be printed after the loop ends
  rows.push({ x: x, operator: operator, y: y, result: result, isError: isError });

  if (isError === false) {
    validResults.push(result);
  }
}

// ----- Results table -----

document.write("<h2>Calculation Results</h2>");
document.write("<table>");
document.write("<tr><th>Number 1</th><th>Operator</th><th>Number 2</th><th>Result</th></tr>");

for (var i = 0; i < rows.length; i++) {
  var row = rows[i];
  var resultCell;

  if (row.isError === true) {
    resultCell = "<td class='error'>" + row.result + "</td>";
  } else {
    resultCell = "<td>" + row.result + "</td>";
  }

  document.write("<tr><td>" + row.x + "</td><td>" + row.operator + "</td><td>" + row.y + "</td>" + resultCell + "</tr>");
}

document.write("</table>");

// ----- Summary table -----

document.write("<h2>Summary of Valid Results</h2>");
document.write("<table>");
document.write("<tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>");

if (validResults.length === 0) {
  document.write("<tr><td colspan='4' class='error'>No valid results to summarize</td></tr>");
} else {
  var min = validResults[0];
  var max = validResults[0];
  var total = 0;

  for (var j = 0; j < validResults.length; j++) {
    if (validResults[j] < min) {
      min = validResults[j];
    }
    if (validResults[j] > max) {
      max = validResults[j];
    }
    total = total + validResults[j];
  }

  var avg = total / validResults.length;

  document.write("<tr><td>" + min + "</td><td>" + max + "</td><td>" + avg.toFixed(2) + "</td><td>" + total + "</td></tr>");
}

document.write("</table>");