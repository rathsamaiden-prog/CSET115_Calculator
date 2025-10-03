////////////////////////////////////
////////////// INIT ////////////////
////////////////////////////////////



let displayNum = document.getElementById("display-num");

displayNum.innerText = "0";

let firstNum = "0";

let secondNum = "0";

let operators = {none: "", add: "+", subtract: "-", multiply: "x", divide: "/"};

let calcStates = {firstInput: 0, secondInput: 1}

let currentState = calcStates.firstInput;

let currentOperator = operators.none



function clickBtn(calcBtn)
{
    //handles button inputs

    console.log(`button clicked: ${calcBtn.innerText} class: ${calcBtn.className}`)

    if(calcBtn.className === "number-btn")
    {
        calcNumber(calcBtn.innerText);
    }
    else if(calcBtn.className === "operator-btn")
    {
        calcOp(calcBtn.innerText);
    }
    else if(calcBtn.className === "equal-btn")
    {
        evaluate();
    }
}

function calcNumber(num)
{
    //takes a number from the button input and updates the display and stored nums


    if(displayNum.innerText === "0") //replaces "0" so that it doesnt display 07 instead of 7
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
    displayNum.innerText = 0;

}

function evaluate()
{
    secondNum = displayNum.innerText;
    let result = 0;

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

    displayNum.innerText = String(result);

}