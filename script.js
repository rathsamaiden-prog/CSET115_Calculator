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


function Click(calcBtn)
{
    //handles button inputs

    if(calcBtn.class = "number-btn")
    {
        calcNumber(calcBtn.innerText);
    }
    else if(calcBtn.class = "operator-btn")
    {
        calcOp(calcBtn.innerText);
    }
    else if(calcBtn.class = "equal-btn")
    {

    }
}

function calcNumber(num)
{
    //takes a number from the button input and updates the display and stored nums
    displayNum += num;

}

function calcOp(operator)
{
    //takes an operator from the button input and updates the display and state
    currentOperator = operator;
    currentState = calcStates.secondInput;

}