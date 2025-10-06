////////////////////////////////////
////////////// INIT ////////////////
////////////////////////////////////

addEventListener('keydown', inputHandler);


let displayNum = document.getElementById("display-num");

let displayEquation = document.getElementById("display-equation");

let historyFrame = document.getElementById("historyFrame-Wrapper");

displayNum.innerText = "0";

let firstNum = "0";

let secondNum = "0";

let operators = 
{
    none: "", 
    add: "+", 
    subtract: "-", 
    multiply: "x", 
    divide: "/",
    modulus: "%",
    invert: "<sup>1</sup>/<sub>x</sub>",
    square: "x<sup>2</sup>",
    sqRoot: "√x",
    negative: "+/-"
};

let calcStates = {firstInput: 0, secondInput: 1}

let currentState = calcStates.firstInput;

let currentOperator = operators.none;

let lastInput = null;



function clickBtn(calcBtn)
{
    //handles button inputs

    console.log(`button clicked: ${calcBtn.innerText} class: ${calcBtn.className}`)

    if(calcBtn.className.includes("number-btn"))
    {
        calcNumber(calcBtn.innerText);
        lastInput = "number-btn";
    }
    else if(calcBtn.className.includes("operator-btn"))
    {
        calcOp(calcBtn.innerHTML);
        lastInput = "operator-btn";
    }
    else if(calcBtn.className.includes("equal-btn"))
    {
        evaluate();
        lastInput = "equal-btn";
    }
    else if(calcBtn.className.includes("clearentry-btn"))
    {
        clearEntry();
        lastInput = "clearentry-btn";
    }
    else if(calcBtn.className.includes("clear-btn"))
    {
        clear();
        lastInput = "clear-btn";
    }
    else if(calcBtn.className.includes("backspace-btn"))
    {
        backspace();
        lastInput = "backspace-btn";
    }

    //lastInput = calcBtn.className;
    console.log(`last input: ${lastInput}`)
}

function calcNumber(num)
{
    //takes a number from the button input and updates the display and stored nums


    if(displayNum.innerText === "0") //replaces "0" so that it doesnt display 07 instead of 7
    {
        displayNum.innerText = num;
    }
    else if(lastInput !== "number-btn")
    {
        displayNum.innerText = num;
    }
    else
    {
        displayNum.innerText += num;
    }

}

function calcOp(operator)
{
    //takes an operator from the button input and updates the display and state


    firstNum = displayNum.innerText;

    
    if(operator !== operators.negative)
        {
            currentOperator = operator;
            currentState = calcStates.secondInput;
            displayEquation.innerHTML = setDisplayEquation(firstNum, currentOperator);
        }

    if( operator === operators.sqRoot
        || operator === operators.square
        || operator === operators.invert)
    {
        evaluate() //these operators do not wait for user to press = to evaluate
    }
    if(operator === operators.negative)
    {
        if(currentState === calcStates.firstInput)
        {
            currentOperator = operator
            evaluate();
        }
        else
        {
            displayNum.innerText = String(Number(displayNum.innerText)*-1);
        }
    }

}

function evaluate()
{
    if(lastInput === "equal-btn")
    {
        firstNum = displayNum.innerText;
    }
    else
    {
        secondNum = displayNum.innerText;
    }

    console.log(secondNum)
    let result = 0;

    displayEquation.innerHTML = setDisplayEquation(firstNum, currentOperator, secondNum)+"=";
    console.log(currentOperator)
    if(currentOperator === operators.add)
    {
        result = Number(firstNum) + Number(secondNum);
    }
    else if(currentOperator === operators.subtract)
    {
        result = Number(firstNum) - Number(secondNum);
    }
    else if(currentOperator === operators.multiply)
    {
        result = Number(firstNum) * Number(secondNum);
    }
    else if(currentOperator === operators.divide)
    {
        result = Number(firstNum) / Number(secondNum);
    }
    else if(currentOperator === operators.modulus)
    {
        result = Number(firstNum) % Number(secondNum);
    }
    else if(currentOperator === operators.negative)
    {
        result = Number(secondNum)*-1;
    }
    else if(currentOperator === operators.sqRoot)
    {
        result = Math.sqrt(Number(secondNum));
    }
    else if(currentOperator === operators.square)
    {
        result = Math.pow(Number(secondNum),2);
    }
    else if(currentOperator === operators.invert)
    {
        result = 1/Number(secondNum);
    }
    else if(currentOperator === operators.none)
    {
        result = Number(secondNum);
    }
    console.log(result);
    let historyEquation = displayEquation.innerHTML + result;
    historyFrame.innerHTML += `<br>` + historyEquation;
    console.log(result)
    displayNum.innerText = String(result);

}

function setDisplayEquation(num1, operator, num2 ="")
{
    if(num2[0] === "-")
    {
        num2 = `(${num2})`
    }
    console.log(`num1: ${num1}, num2: ${num2}, operator: ${operator}`)
    if(operator === operators.sqRoot)
    {
        return `&radic;(${num2})`;
    }
    else if(operator === operators.square)
    {
        return `${num2}<sup>2</sup>`;
    }
    else if(operator === operators.invert)
    {
        return `1/${num2}`;
    }
    else if(operator === operators.negative)
    {
        return `-(${num2})`;
    }
    else if(operator === operators.none)
    {
        return num2;
    }
    else
    {
        return num1 + operator + num2;
    }
}

function clear()
{
    displayNum.innerText = "0";
    firstNum = "0";
    displayEquation.innerHTML = "";
    currentState = calcStates.firstInput;
    currentOperator = operators.none;
}

function clearEntry()
{
    displayNum.innerText = "0";
}

function backspace()
{
    if(displayNum.innerText !== "0")
    {
        if(displayNum.innerText.length > 1)
        {
            displayNum.innerText = displayNum.innerText.slice(0, displayNum.innerText.length-1)
        }
        else
        {
            displayNum.innerText = "0"
        }
    }
}

function inputHandler(event)
{
    console.log(event.key)
    if(!isNaN(Number(event.key)) || event.key === ".")
    {
        calcNumber(event.key);
        lastInput = "number-btn"
    }
    else if(event.key === "Enter" || event.key === "=")
    {
        evaluate()
        lastInput = "equal-btn";
    }
    else if(event.key === "Backspace")
    {
        backspace();
        lastInput = "backspace-btn";
    }
    else if(event.key === "+")
    {
        calcOp(operators.add)
        lastInput = "operator-btn"
    }
    else if(event.key === "-")
    {
        calcOp(operators.subtract)
        lastInput = "operator-btn"
    }
    else if(event.key === "*")
    {
        calcOp(operators.multiply)
        lastInput = "operator-btn"
    }
    else if(event.key === "/")
    {
        calcOp(operators.divide)
        lastInput = "operator-btn"
    }
    else if(event.key === "%")
    {
        calcOp(operators.modulus)
        lastInput = "operator-btn"
    }
}