////////////////////////////////////
////////////// INIT ////////////////
////////////////////////////////////



let displayNum = document.getElementById("display-num");

let displayEquation = document.getElementById("display-equation");

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
    invert: "<sup>1</sup>x",
    square: "x<sup>2</sup>",
    sqRoot: "sqRoot",
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
    }
    else if(calcBtn.className.includes("operator-btn"))
    {
        calcOp(calcBtn.innerHTML);
    }
    else if(calcBtn.className.includes("equal-btn"))
    {
        evaluate();
    }

    lastInput = calcBtn.className;
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
    currentOperator = operator;
    currentState = calcStates.secondInput;


    firstNum = displayNum.innerText;

    displayEquation.innerHTML = setDisplayEquation(firstNum, currentOperator);

    if(operator === operators.negative 
        || operator === operators.sqRoot
        || operator === operators.square
        || operator === operators.invert)
    {
        evaluate() //these operators do not wait for user to press = to evaluate
    }

}

function evaluate()
{
    secondNum = displayNum.innerText;
    let result = 0;

    displayEquation.innerHTML = setDisplayEquation(firstNum, currentOperator, secondNum)+"=";

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

    displayNum.innerText = String(result);

}

function setDisplayEquation(num1, operator, num2 ="")
{
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
    else
    {
        return num1 + operator + num2;
    }
}