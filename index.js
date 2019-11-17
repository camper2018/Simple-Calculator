 $(function() {
  let firstOperant = ""
  let secondOperant = "";
  let operator = null;
  let isNegative = false;
  let isFirstOperantDone = false;
  $('button').click((e) => {
    // variable to store and update display value.
    let displayValue = '';
    // when equal sign is pressed,and both operants and operator has been entered
    // calculate the result and display it.If number is greater than 15 digits, drop extra digits and add 'e'at end.
    // once calculation is done, reset all variables.
    if (e.target.value === '=' ) {
      if (isFirstOperantDone && secondOperant !== '' && operator !== null) {
        let result = calculate(firstOperant, secondOperant, operator);
        if (result.toString().length >= 15) {
          result = result.toString().slice(0, 15);
          result+='e';
        }
        displayValue = result;
      }
    // when backspace is pressed ,remove one digit from the end
    }else if (e.target.value === 'backspace') {
      if (isFirstOperantDone) {
        secondOperant = secondOperant.slice(0, secondOperant.length - 1);
        displayValue = secondOperant;
      } else {
        firstOperant = firstOperant.slice(0, firstOperant.length - 1);
        displayValue = firstOperant;
      }
    // when AC button is pressed, reset all variables and set display value to zero
    } else if (e.target.value === 'clear') {
      displayValue = '0';
      firstOperant = ""
      secondOperant = "";
      operator = null;
      isNegative = false;
      isFirstOperantDone = false;

    // when a +/- button is pressed,toggle between positive and negative sign and update display value accordingly.
    } else if (e.target.className === 'negative') {
      isNegative = !isNegative;
      if (isNegative && !isFirstOperantDone) {
        firstOperant = "-" + firstOperant;
        displayValue = firstOperant;
      } else if (isNegative && isFirstOperantDone){
        secondOperant = "-" + secondOperant;
        displayValue = secondOperant;
      } else {
        if (isFirstOperantDone) {
          secondOperant = secondOperant.substr(1);
          displayValue = secondOperant;
        } else {
          firstOperant = firstOperant.substr(1);
          displayValue = firstOperant;
        }
      }
    // when any number/decimal button is pressed:
    // concatenate that number to the previous number and display it.
    // when the operator is entered, set isFirstOperantDone to true.Now add input number to secondOperant variable.

    } else if (e.target.className !== 'operator') {
      let target = e.target.value;
      if (!isFirstOperantDone) {
        // to prevent multiple decimals entry
        if (target === '.') {
          firstOperant = displayDecimal(firstOperant,target);
        } else {
          firstOperant += target;
        }
        displayValue = firstOperant;
      } else {
        if (target === '.') {
          secondOperant = displayDecimal(secondOperant,target);
        }else {
          secondOperant += target;
        }
        displayValue = secondOperant;
      }

    // when any of the operator button is pressed.
    // if both first and second operants are truthy values: calculate the result and save it as firstOperant, set secondOperant to empty string and operant to the new operant.
    // if only first operant is truthy,store the entered operator into an operater variable and display it.
    //
    } else if(e.target.className === 'operator') {
        if (firstOperant && operator && secondOperant) {
          let result = calculate(firstOperant, secondOperant,operator);
          firstOperant = result;
          displayValue = result;
          secondOperant = '';
          operator = e.target.value;
          isNegative = false;
          isFirstOperantDone = true;
        } else {
          isNegative = false;
          operator = e.target.value;
          displayValue = operator;
          isFirstOperantDone = true;
        }
    }
    // will display the input value to the screen.
    displayValue ? $('.screen').text(displayValue) : $('.screen').text(0);
  });

});

function calculate(num1, num2, operator) {
  num1 = Number(num1);
  num2 = Number(num2);
  if (operator === '+'){
    return num1 + num2;
  } else if (operator === '-') {
    return num1 - num2;
  } if (operator === '*'){
    return num1 * num2;
  }if (operator === '/'){
      return num1 / num2;
  }
}

//function that prevents multiple decimal entry

function displayDecimal(value, targetVal) {
  if (!value.includes('.')) {
      value += targetVal;
  }
  return value;
}