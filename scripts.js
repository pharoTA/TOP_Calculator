let numberList = [];
let operatorList = [];
let lastNumber = "result";

const add = (a, b) => {
    return a + b
}
const substract = (a, b) => {
    return a - b
}
const multiply = (a, b) => {
    return a * b
}
const divide = (a, b) => {
    return a / b
}

const operate = (operator, firstNumber, secondNumber) => {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    if (operator == "+") {
        return add(firstNumber, secondNumber);
    } else if (operator == "-") {
        return substract(firstNumber, secondNumber);
    } else if (operator == "*") {
        return multiply(firstNumber, secondNumber);
    } else if (operator == "/") {
        if (secondNumber == 0) {
            return NaN
        } else {
            return divide(firstNumber, secondNumber);
        }
    }
    return "Unknown operator";
};

const addToDisplay = (textToAdd) => {
    const displaySectionText = document.querySelector(".displaySectionText");
    const currentText = displaySectionText.textContent;
    const newTextToDisplay = currentText + textToAdd;
    displaySectionText.textContent = newTextToDisplay;
    return newTextToDisplay
};

const eraseDisplay = () => {
    const displaySectionText = document.querySelector(".displaySectionText");
    displaySectionText.textContent = ""
};

const clearLastValue = () => {
    if (isOperator(lastNumber)) {
        operatorList.pop()
        lastNumber = numberList[numberList.length - 1].slice(length - 1);
        eraseDisplay();
        addToDisplay(numberList[numberList.length - 1]);
    } else {
        let tempNumber = String(numberList.pop());
        if (tempNumber.length > 1) {
            newNumber = tempNumber.split('').slice(0, tempNumber.length - 1).join();
            lastNumber = newNumber.slice(length - 1);
        } else {
            newNumber = "";
            lastNumber = "result"
        }
        numberList.push(newNumber);
        eraseDisplay();
        addToDisplay(newNumber);
    }
};

const isDecimal = (numberToCheck) => {
    return numberToCheck.split('').includes(".")
};

const isOperator = (letter) => {
    if (letter == "+" || letter == "*" || letter == "/" || letter == "-") {
        return true;
    } else {
        return false;
    }
}

const addFloatingPoint = () => {
    if (isOperator(lastNumber) || lastNumber == "result") {
        numberList.push("0.");
        lastNumber = ".";
        eraseDisplay();
        addToDisplay("0.");
    } else {
        if (isDecimal(numberList[numberList.length - 1])) {
            lastNumber = "result";
            eraseDisplay();
            addToDisplay("lmao");
        } else {
            numberList[numberList.length - 1] = numberList[numberList.length - 1] + ".";
            addToDisplay(".");
        }
    }
};

/// Add event listeners

floatingPointTouch = document.querySelector("#floatingPointTouch");
floatingPointTouch.addEventListener("click", () => addFloatingPoint());

eraseButton = document.querySelector(".eraseButton");
eraseButton.addEventListener("click", () => eraseDisplay());

backspaceButton = document.querySelector(".backspaceButton");
backspaceButton.addEventListener("click", () => clearLastValue())

touchButtons = document.querySelectorAll(".numberTouch, .operatorTouch");
touchButtons.forEach((touchButton) => {
    touchButton.addEventListener("click", () => {
        let buttonTextContent = touchButton.querySelector(".touchText").textContent
        if (buttonTextContent != "=" && buttonTextContent != ".") {
            if (touchButton.className == "numberTouch") {
                if (lastNumber == "result") {
                    numberList = [];
                    operatorList = [];
                    numberList.push(buttonTextContent);
                    eraseDisplay();
                }
                else if (!(isOperator(lastNumber)) && numberList.length > 0) {
                    numberList[numberList.length - 1] = numberList[numberList.length - 1] + buttonTextContent;
                } else {
                    numberList.push(buttonTextContent);
                    eraseDisplay();
                }
                addToDisplay(buttonTextContent);
                lastNumber = buttonTextContent;
            } else if (touchButton.className == "operatorTouch") {
                operatorList.push(buttonTextContent);
                eraseDisplay();
            }
            addToDisplay(buttonTextContent);
            lastNumber = buttonTextContent
        }
    });
});

const operateTouch = document.querySelector("#operateTouch");
operateTouch.addEventListener("click", () => {
    if (numberList.length < 2 && operatorList.length < 1) {
        window.alert("Error, please enter an operation before pressing =")
    } else {
        result = operate(operatorList[0], numberList[0], numberList[1]);
        eraseDisplay();
        if (isNaN(result)) {
            addToDisplay("lmao");
        } else {
            numberList = numberList.slice(2);
            operatorList = operatorList.slice(1);
            roundedResult = Math.round(result * 100000) / 100000;
            numberList.unshift(roundedResult);
            addToDisplay(roundedResult);
        }
        lastNumber = "result";
    }
});
